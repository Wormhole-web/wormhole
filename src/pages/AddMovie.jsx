import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMovie, getMovieById, updateMovie } from "../services/MovieServices";
import '../index.css'
import '../AddMovies.css'

/* ---------- Constantes ---------- */

const GENEROS = [
  "Comedia",
  "Acción",
  "Drama",
  "Terror",
  "Fantasía",
  "Ciencia ficción",
  "Romántica",
  "Crimen",
];

const INITIAL_FORM = {
  titulo: "",
  anio: "",
  genero: "",
  sinopsis: "",
  url: "",
};

const toSrc = (p) => (!p || /^(https?:|data:|\/)/.test(p) ? p : `/${p}`);

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
/* ---------- Iconos ---------- */

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FilmIcon = () => (
  <Icon>
    <rect x="3" y="9" width="18" height="12" rx="2" />
    <path d="M3 9l2-5 4 1 3-2 3 2 4-1 2 5" />
  </Icon>
);

const ImagePlusIcon = () => (
  <Icon>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
    <circle cx="9" cy="9" r="1.5" />
    <path d="M21 15l-4-4-9 10" />
    <path d="M19 2v6M16 5h6" />
  </Icon>
);

const UploadCloudIcon = () => (
  <Icon>
    <path d="M16 16l-4-4-4 4" />
    <path d="M12 12v9" />
    <path d="M20.4 18.1A5 5 0 0 0 18 8.7h-1.3A8 8 0 1 0 4 16.3" />
  </Icon>
);

const ChevronIcon = () => (
  <Icon>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

/* ---------- Hook: vista previa de la portada ---------- */

function useCoverPreview() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [urlPreview, setUrlPreview] = useState("");
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {
    if (!file) {
      setFileUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setFileUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const src = fileUrl || urlPreview;

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const selectFile = (selected) => {
    if (selected?.type.startsWith("image/")) setFile(selected);
  };

  const reset = () => {
    setFile(null);
    setUrlPreview("");
  };

  return { file, src, loaded, setLoaded, selectFile, setUrlPreview, reset };
}

/* ---------- Subcomponentes ---------- */

function Field({ id, label, children }) {
  return (
    <div className="add-movie__field">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

function CoverDropzone({ inputRef, preview }) {
  const [dragging, setDragging] = useState(false);

  const stop = (e, state) => {
    e.preventDefault();
    setDragging(state);
  };

  const handleDrop = (e) => {
    stop(e, false);
    preview.selectFile(e.dataTransfer.files[0]);
  };

  const classes = [
    "add-movie__dropzone",
    dragging && "is-drag",
    preview.loaded && "has-img",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="add-movie__cover-card">
      <h2 className="add-movie__cover-title">
        <ImagePlusIcon />
        Portada de la película
      </h2>

      <label
        htmlFor="portada"
        className={classes}
        onDragEnter={(e) => stop(e, true)}
        onDragOver={(e) => stop(e, true)}
        onDragLeave={(e) => stop(e, false)}
        onDrop={handleDrop}
      >
        <UploadCloudIcon />
        <strong>Añadir imagen</strong>
        <small>Sube el cartel de la película</small>
        <input
          ref={inputRef}
          type="file"
          id="portada"
          name="portada"
          accept="image/*"
          onChange={(e) => preview.selectFile(e.target.files[0])}
        />
        <img
          src={preview.src || undefined}
          alt="Vista previa de la portada"
          onLoad={() => preview.setLoaded(true)}
          onError={() => preview.setLoaded(false)}
        />
      </label>
    </section>
  );
}

/* ---------- Página ---------- */

export default function AddMovie({ onSave, onCancel }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [current, setCurrent] = useState(null);
  const fileInputRef = useRef(null);
  const preview = useCoverPreview();


  useEffect(() => {
    if (!id) return;
    getMovieById(id)
      .then((m) => {
        setCurrent(m);
        setForm({
          titulo: m.title ?? "",
          anio: m.year ?? "",
          genero: m.genre ?? "",
          sinopsis: m.synopsis ?? "",
          url: /^https?:/.test(m.poster ?? "") ? m.poster : "",
        });
        preview.setUrlPreview(toSrc(m.poster));
      })
      .catch(() => alert("No se pudo cargar la película"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }

    if (preview.file && preview.file.size > 500_000) {
      alert("La imagen pesa demasiado (máx. 500 KB). Usa una más pequeña o pega una URL.");
      return;
    }

    try {
      let poster = current?.poster ?? "";
      if (preview.file) poster = await fileToDataUrl(preview.file);
      else if (form.url) poster = form.url;

      const movie = {
        ...current,
        title: form.titulo,
        year: Number(form.anio),
        genre: form.genero,
        synopsis: form.sinopsis,
        poster,
        duration: current?.duration ?? "—",
        ageRating: current?.ageRating ?? "—",
      };

      if (id) await updateMovie(id, movie); // PUT
      else await addMovie(movie); // POST

      onSave?.(movie);
      navigate("/movies");
    } catch {
      alert("No se pudo guardar. ¿Está corriendo npm run api?");
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm(INITIAL_FORM);
    preview.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
    onCancel?.();
    if (id) navigate("/movies");
  };

  return (
    <div className="add-movie">
      <div className="add-movie__breadcrumb">
        <FilmIcon />
        <span>Películas / Nueva película</span>
      </div>

      <h1 className="add-movie__title">{id ? "Editar película" : "Añadir película"}</h1>
      <p className="add-movie__subtitle">
        Incorpora una nueva historia a nuestro universo cinematográfico.
      </p>

      <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
        <CoverDropzone inputRef={fileInputRef} preview={preview} />

        <Field id="titulo" label="Título de la película *">
          <input
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Ej. Interstellar"
            value={form.titulo}
            onChange={handleChange}
            required
          />
        </Field>

        <div className="add-movie__row">
          <Field id="anio" label="Año *">
            <input
              type="number"
              id="anio"
              name="anio"
              placeholder="2026"
              min="1888"
              max="2100"
              value={form.anio}
              onChange={handleChange}
              required
            />
          </Field>

          <Field id="genero" label="Género *">
            <div className="add-movie__select-wrap">
              <select
                id="genero"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                className={form.genero ? "is-chosen" : ""}
                required
              >
                <option value="" disabled>
                  Seleccionar
                </option>
                {GENEROS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </Field>
        </div>

        <Field id="sinopsis" label="Sinopsis *">
          <textarea
            id="sinopsis"
            name="sinopsis"
            placeholder="Escribe una breve descripción..."
            value={form.sinopsis}
            onChange={handleChange}
            required
          />
        </Field>

        <Field id="url" label="URL del cartel">
          <input
            type="url"
            id="url"
            name="url"
            placeholder="https://..."
            value={form.url}
            onChange={handleChange}
            onBlur={() => !preview.file && preview.setUrlPreview(form.url)}
          />
        </Field>

        <button className="add-movie__btn add-movie__btn--save" type="submit">
          {id ? "Guardar cambios" : "+ Guardar película"}
        </button>
        <button className="add-movie__btn add-movie__btn--cancel" type="reset">
          Cancelar
        </button>
      </form>
    </div>
  );
}