
import { useRef, useState } from "react";
import "../Hero.css";

export default function Hero() {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    // Reproducir vídeo y música al pasar el cursor
    const startTrailer = async () => {
        const video = videoRef.current;
        const audio = audioRef.current;

        if (!video || !audio) return;

        video.currentTime = 0;
        audio.currentTime = 0;

        video.muted = true;
        audio.volume = 0.5;

        try {
            // Iniciar los dos al mismo tiempo
            const results = await Promise.allSettled([
                video.play(),
                audio.play()
            ]);

            if (results[0].status === "fulfilled") {
                setIsPlaying(true);
            }

            if (results[1].status === "rejected") {
                console.log(
                    "El navegador bloqueó la música:",
                    results[1].reason
                );
            }
        } catch (error) {
            console.error("Error al reproducir:", error);
        }
    };

    // Detener ambos al retirar el cursor
    const stopTrailer = () => {
        const video = videoRef.current;
        const audio = audioRef.current;

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        setIsPlaying(false);
    };

    return (
        <section
            className="wormhole-hero"
            onMouseEnter={startTrailer}
            onMouseLeave={stopTrailer}
        >
            /* IMAGEN Y VIDEO */

            <div className="wormhole-hero__visual">
                <video
                    ref={videoRef}
                    src="/videos/interstellar-trailer.mp4"
                    className="wormhole-hero__video"
                    muted
                    loop
                    playsInline
                    preload="auto"
                />

                <img
                    src="/images/interstellar-panoramica.png"
                    alt="Astronauta de Interstellar"
                    className={`wormhole-hero__poster ${isPlaying ? "hidden" : "visible"
                        }`}
                />

                <div className="wormhole-hero__overlay"></div>
            </div>

            {/* TEXTO A LA IZQUIERDA */}
            <div className="wormhole-hero__content">

                <h1>
                    <span>INTERSTELLAR</span>
                </h1>

                <p className="wormhole-hero__info">
                    2014 · Ciencia ficción · 2h 49min
                </p>

                <p className="wormhole-hero__description">
                    Un viaje más allá de las estrellas.
                    Cuando el futuro de la humanidad está
                    en peligro, un grupo de exploradores
                    emprende una misión a través del espacio.
                </p>
            </div>

            {/* MÚSICA */}
            <audio
                ref={audioRef}
                src="/audio/musica-espacial.mp3"
                preload="auto"
                loop
            />

        </section>
    );
}
