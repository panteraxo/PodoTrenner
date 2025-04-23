import { useState, useEffect } from "react";
import React from "react";

const slides = [
  {
    image: "/images/img1.jpg",
    title: "Fühle die Freiheit beim Gehen",
    description:
      "Genieße jedes Sandkorn schmerzfrei: Pflege deine Füße und erkunde das Meer mit höchstem Komfort.",
  },
  {
    image: "/images/img2.jpg",
    title: "Glückliche Füße, freier Geist",
    description:
      "Erkunde grüne Pfade ohne Sorgen: Behandlungen, die dich in der Natur aktiv halten.",
  },
  {
    image: "/images/img3.jpg",
    title: "Abenteuer ohne Grenzen",
    description:
      "Fachkundige Unterstützung für deine Füße, damit ihr gemeinsam weiterhin Kilometer und Erinnerungen sammelt.",
  },
  {
    image: "/images/img4.jpg",
    title: "Gib jedem Schritt Schwung",
    description:
      "Optimiere deinen Fußaufsatz und vermeide Verletzungen mit professioneller podologischer Betreuung.",
  },
  {
    image: "/images/img5.jpg",
    title: "Gehbegleiter",
    description:
      "Halte deine Füße fit, während du deine Wege mit deinem vierbeinigen Freund genießt.",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Pausar el carrusel cuando el mouse está encima
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  // Reanudar el carrusel cuando el mouse sale
  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden h-[calc(100vh-8rem)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slider absoluto */}
      <div
        className="absolute h-full top-0 left-0 flex transition-all duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          left: `-${current * 100}%`,
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="flex-1 h-full relative">
            <img
              src={slide.image}
              alt={`Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center px-4 bg-black/20">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg max-w-xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full p-2 z-20"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/40 hover:bg-white/70 text-black rounded-full p-2 z-20"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
