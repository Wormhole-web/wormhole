
import { useEffect, useRef } from "react";
import interiorImg from "../img/interior-videoclub.png";

function Location() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por contactar con Wormhole Videoclub!");
  };

  const section = "border-t border-[#a80055] py-5 md:py-8";
  const h2 = "mb-3 text-base font-semibold uppercase tracking-wide md:text-xl";
  const field =
    "w-full rounded-lg border border-transparent bg-[#19192b] p-3 text-sm text-white outline-none placeholder:text-[#9999aa] focus:border-[#168cff]";

  const boxRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const onScroll = () => {
      const box = boxRef.current;
      const img = imgRef.current;
      if (!box || !img) return;

      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 cuando la foto entra por abajo, 1 cuando sale por arriba
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));

      img.style.transform = `translateY(${clamped * -30}px) scale(1.25)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#080817] px-5 py-5 text-[#f5f5fa] md:px-[5%] md:py-9">
      <div className="w-full">

        {/* UBICACIÓN */}
        <section className={section}>
          <span className="text-sm font-bold text-[#168cff]">VISÍTANOS</span>
          <h1 className="my-2 text-2xl font-bold md:text-4xl">ESTAMOS AQUÍ.</h1>
          <p className="mb-5 text-sm text-[#b8b8c5] md:text-base">
            Un espacio para descubrir, compartir y disfrutar del cine.
          </p>

          <h2 className={h2}>Encuéntranos</h2>

          <div className="h-70 w-full overflow-hidden rounded-xl md:h-100">
            <iframe
              title="Mapa de ubicación de Wormhole Videoclub"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7120%2C40.4170%2C-3.7000%2C40.4235&layer=mapnik&marker=40.4203%2C-3.7060"
              className="h-full w-full border-0 filter-[invert(90%)_hue-rotate(180deg)]"
              loading="lazy"
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#168cff]">⌖</span>
              <div>
                <strong className="text-sm">Nuestra dirección</strong>
                <p className="mt-0.5 text-xs text-[#a5a5b5]">
                  Preciados, 28 · 28013 Madrid
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=40.4203%2C-3.7060"
              target="_blank"
              rel="noreferrer"
              className="whitespace-nowrap text-sm text-[#168cff] transition hover:text-[#ff168c]"
            >
              Cómo llegar ↗
            </a>
          </div>
        </section>

        {/* NUESTRO ESPACIO */}
        <section className={section}>
          <h2 className={h2}>Así es nuestro espacio</h2>
          <div ref={boxRef} className="h-64 w-full overflow-hidden rounded-xl md:h-96">
            <img
              ref={imgRef}
              src={interiorImg}
              alt="Interior de Wormhole Videoclub"
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
          <p className="mt-2 text-xs text-[#b8b8c5] md:text-sm">
            Un lugar creado para los amantes del séptimo arte.
          </p>
        </section>

        {/* HORARIO */}
        <section className={section}>
          <h2 className={h2}>Horario</h2>
          <div className="flex w-full flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#b8b8c5]">Lunes – Viernes</span>
              <strong>10:00 – 21:00</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b8b8c5]">Sábado</span>
              <strong>10:00 – 21:00</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#b8b8c5]">Domingo</span>
              <strong>11:00 – 19:00</strong>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section className={section}>
          <h2 className={h2}>¿Hablamos?</h2>
          <p className="mb-5 text-sm text-[#b8b8c5] md:text-base">
            Envíanos un mensaje. Nos encantará atenderte.
          </p>

          <form className="flex w-full flex-col gap-2.5" onSubmit={handleSubmit}>
            <input className={field} type="text" placeholder="Tu nombre" required />
            <input className={field} type="email" placeholder="Tu correo electrónico" required />
            <textarea
              className={`${field} min-h-24 resize-y`}
              placeholder="Escribe tu mensaje..."
              rows="4"
              required
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-[#168cff] p-3 text-sm font-bold text-[#080817] transition hover:bg-[#ff168c] hover:text-white"
            >
              ENVIAR MENSAJE
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}

export default Location;