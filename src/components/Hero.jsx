import { useState, useEffect, useCallback, useRef } from "react";
import ReviewsMarquee from "./ReviewsMarquee";
import Footer from "./Footer";
import { Link } from "react-router-dom";
// Google Font loaded via link tag — add this to your index.html <head> if not already present:
// <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700;800&display=swap" rel="stylesheet">

const slides = [
  {
    id: 1,
    tag: "Expertise Certifiée",
    title: (
      <>
        Diagnostic &amp; Réparation<br />
        Boîte Automatique
      </>
    ),
    titleText: "Diagnostic & Réparation Boîte Automatique",
    cta: "Prendre RDV",
    ctaHref: "#contact",
    video: "/videos/hero1.mp4",
    poster: "/videos/slide1-poster.jpg",
    overlay: "from-black/80 via-black/50 to-transparent",
  },
  {
  id: 2,
  tag: "Entretien Préventif",
  title: (
    <>
      Vidange Huile<br />
      Boîte de Vitesses
    </>
  ),
  titleText: "Vidange Huile Boîte de Vitesses",
  cta: "Prendre RDV",
  ctaHref: "#contact",
  video: "/videos/hero4.mp4",
  poster: "/videos/slide4-poster.jpg",
  overlay: "from-black/80 via-black/50 to-transparent",
},
  
  {
    id: 3,
    tag: "Mécatronique",
    title: (
      <>
         <h1 className="text-3xl md:text-5xl font-light text-center">
          &laquo;Votre voiture n&rsquo;a aucun secret pour moi.&raquo;
        </h1>

        <p className="text-2xl md:text-4xl font-light text-right mt-6">
          Azeem.
        </p>
      </>
    ),
    titleText: "Réparation Bloc Mécatronique",
    cta: "Nos Prestations",
    ctaHref: "#prestations",
    video: "/videos/hero3.mp4",
    poster: "/videos/slide3-poster.jpg",
    overlay: "from-black/80 via-black/50 to-transparent",
  },
  {
    id: 4,
    tag: "Spécialiste CVT & DSG",
    title: (
      <>
        Vidange &amp; Entretien<br />
        Tout Moteur
      </>
    ),
    titleText: "Vidange & Entretien Tout Moteur",
    cta: "Voir les Tarifs",
    ctaHref: "#tarifs",
    video: "/videos/hero2.mp4",
    poster: "/videos/slide2-poster.jpg",
    overlay: "from-black/80 via-black/50 to-transparent",
  },
  
];

const carBrands = [
  { name: "Renault",    slug: "renault",    img: "/images/renault.jpeg" },
  { name: "BMW",        slug: "bmw",        img: "/images/bmw.png" },
  { name: "Audi",       slug: "audi",       img: "/images/audi.jpeg" },
  { name: "Chrysler",   slug: "chrysler",   img: "/images/chrysler.jpeg" },
  { name: "Ford",       slug: "ford",       img: "/images/ford.jpeg" },
  { name: "Lexus",      slug: "lexus",      img: "/images/lexus.jpeg" },
  { name: "Nissan",     slug: "nissan",     img: "/images/nissan.jpeg" },
  { name: "Volkswagen", slug: "volkswagen", img: "/images/volkswagen.jpeg" },
  { name: "Citroën DS", slug: "citroen-ds", img: "/images/citroen-ds.jpeg" },
  { name: "Hyundai",    slug: "hyundai",    img: "/images/hyundai.jpeg" },
  { name: "Mercedes",   slug: "mercedes",   img: "/images/mercedes.jpeg" },
  { name: "Opel",       slug: "opel",       img: "/images/opel.jpeg" },
  { name: "Skoda",      slug: "skoda",      img: "/images/skoda.jpeg" },
  { name: "Volvo",      slug: "volvo",      img: "/images/volve.jpeg" },
  { name: "Dodge",      slug: "dodge",      img: "/images/dodge.jpeg" },
  { name: "Jeep",       slug: "jeep",       img: "/images/jeep.jpeg" },
  { name: "Mini",       slug: "mini",       img: "/images/mini.jpeg" },
  { name: "Peugeot",    slug: "peugeot",    img: "/images/peugeot.jpeg" },
  { name: "Smart",      slug: "smart",      img: "/images/smart.jpeg" },
  { name: "Chevrolet",  slug: "chevrolet",  img: "/images/chevrolet.jpeg" },
  { name: "Fiat",       slug: "fiat",       img: "/images/fiat.jpeg" },
  { name: "Land Rover", slug: "land-rover", img: "/images/land-rover.jpeg" },
  { name: "Mitsubishi", slug: "mitsubishi", img: "/images/mitsubishi.jpeg" },
  { name: "Porsche",    slug: "porsche",    img: "/images/porsche.jpeg" },
  { name: "Toyota",     slug: "toyota",     img: "/images/toyota.jpeg" },
];

const trustItems = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 shrink-0">
        <circle cx="24" cy="24" r="22" stroke="#db0000" strokeWidth="2" />
        <path d="M14 24l7 7 13-14" stroke="#db0000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Diagnostic Offert",
    desc: "Sur devis accepté",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 shrink-0">
        <rect x="8" y="16" width="32" height="20" rx="3" stroke="#db0000" strokeWidth="2" />
        <path d="M16 16v-4a8 8 0 0116 0v4" stroke="#db0000" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Garantie Réparation",
    desc: "6 à 12 mois selon prestation",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 shrink-0">
        <path d="M24 6l4 12h12l-10 7 4 12-10-7-10 7 4-12L8 18h12z" stroke="#db0000" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Toutes Marques",
    desc: "BMW, Renault, Mercedes, Audi…",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 shrink-0">
        <circle cx="24" cy="24" r="18" stroke="#db0000" strokeWidth="2" />
        <path d="M24 14v10l6 4" stroke="#db0000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Devis Rapide",
    desc: "Réponse sous 24h",
  },
];

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ visible }) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 600ms ease",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="w-14 h-14 mb-6"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" stroke="#db0000" strokeWidth="2" opacity="0.2" />
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="#db0000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="60 130"
          style={{ animation: "spin 1s linear infinite", transformOrigin: "32px 32px" }}
        />
        <path
          d="M32 20v4M32 40v4M20 32h4M40 32h4M23.5 23.5l2.8 2.8M37.7 37.7l2.8 2.8M23.5 40.5l2.8-2.8M37.7 26.3l2.8-2.8"
          stroke="#db0000"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="5" stroke="#db0000" strokeWidth="1.8" />
      </svg>

      <p
        className="text-white font-extrabold text-xl tracking-widest uppercase mb-2"
        style={{ fontFamily: "'Bai Jamjuree', sans-serif", letterSpacing: "0.2em" }}
      >
        Transmission
      </p>
      <p className="text-xs uppercase tracking-[0.3em] mb-8" style={{ color: "#db0000" }}>
        Spécialiste Boîte Automatique
      </p>

      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            background: "#db0000",
            animation: "loadBar 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

// ─── Car Brand Grid / Sidebar ─────────────────────────────────────────────────
// Desktop: vertical scrollable sidebar (no auto-scroll, manual scroll only)
// Mobile: horizontal scrollable row (below the video)
function CarSidebar({ height, isMobile }) {
  const scrollRef = useRef(null);

  // Drag-to-scroll for desktop vertical sidebar
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = e.clientY;
    scrollStart.current = scrollRef.current.scrollTop;
    scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientY - dragStart.current;
    scrollRef.current.scrollTop = scrollStart.current - delta;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  if (isMobile) {
    // ── Mobile: horizontal scrollable strip below the video ──
    return (
      <div
        style={{
          width: "100%",
          background: "#111",
          overflowX: "auto",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
        className="hide-scrollbar"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            padding: "8px",
            width: "max-content",
          }}
        >
          {carBrands.map((brand, idx) => (
            <Link
              to={idx}
              href={`/articles`}
              className="relative block rounded-md overflow-hidden group"
              style={{ width: "120px", height: "70px", flexShrink: 0 }}
            >
              <img
                src={brand.img}
                alt={brand.name}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div
                className="absolute bottom-0 left-0 right-0 py-1 text-center"
                style={{ background: "rgba(44, 128, 239, 0.55)" }}
              >
                <span className="text-white text-xs font-semibold capitalize leading-tight">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // ── Desktop: vertical scrollable sidebar (manual only, drag supported) ──
  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="shrink-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
      style={{
        width: "200px",
        height: height,
        background: "#111",
        cursor: "grab",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "8px",
        }}
      >
        {carBrands.map((brand, idx) => (
          <Link
            key={idx}
            to={`/articles`}
            className="relative block rounded-md overflow-hidden group"
            style={{ aspectRatio: "2 / 1", flexShrink: 0 }}
            // Prevent link click when dragging
            onClick={(e) => { if (Math.abs(scrollRef.current?.scrollTop - scrollStart.current) > 4) e.preventDefault(); }}
          >
            <img
              src={brand.img}
              alt={brand.name}
              loading="eager"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div
              className="absolute bottom-0 left-0 right-0 py-1 text-center"
              style={{ background: "rgba(44, 128, 239, 0.55)" }}
            >
              <span className="text-white text-xs font-semibold capitalize leading-tight">
                {brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const readySet = useRef(new Set());
  const videoRefs = useRef([]);
  const sliderHeight = "min(88vh, 720px)";

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = useCallback(
    (index) => {
      if (animating || index === current) return;
      setAnimating(true);
      setVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating, current]
  );

  useEffect(() => {
    if (loading) return;
    const id = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current, goTo, loading]);

  useEffect(() => {
    if (loading) return;
    const id = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(id);
  }, [current, loading]);

  const handleVideoReady = useCallback((index) => {
    readySet.current.add(index);
    if (readySet.current.size < slides.length) return;
    setLoading(false);
    setLoaderVisible(false);
    setTimeout(() => setVisible(true), 80);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setLoaderVisible(false);
        setTimeout(() => setVisible(true), 80);
      }
    }, 8000);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
  videoRefs.current.forEach((el, i) => {
    if (!el) return;
    if (i === current) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  });
}, [current]);
  const slide = slides[current];

  return (
    <>
      <LoadingScreen visible={loaderVisible} />

      <section style={{ fontFamily: "'Bai Jamjuree', sans-serif" }} className="w-full">

        {/* ─── DESKTOP: SLIDER + SIDEBAR SIDE BY SIDE ─── */}
        {!isMobile && (
          <div className="flex w-full" style={{ height: sliderHeight }}>
            {/* ── Main Slider ── */}
            <div className="relative flex-1 overflow-hidden">
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                  aria-hidden={i !== current}
                >
                  <video
                    src={s.video}
                    poster={s.poster}
                    className="w-full h-full object-cover object-center"
                    autoPlay={i === current}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={() => handleVideoReady(i)}
                    onLoadedData={() => handleVideoReady(i)}
                    ref={(el) => {
                      if (!el) return;
                      if (i === current) {
                        el.currentTime = 0;
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                      }
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
                </div>
              ))}

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
                  <div className="max-w-xl">
                    <p
                      className="text-sm font-semibold uppercase tracking-widest mb-4 transition-all duration-500"
                      style={{
                        color: "#db0000",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateX(0)" : "translateX(-24px)",
                        transitionDelay: "0ms",
                      }}
                    >
                      {slide.tag}
                    </p>

                    <h1
                      className="text-white font-extrabold leading-tight mb-8 transition-all duration-500"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        lineHeight: 1.1,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transitionDelay: "80ms",
                      }}
                    >
                      {slide.title}
                    </h1>

                    <div
                      className="transition-all duration-500"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transitionDelay: "160ms",
                      }}
                    >
                      <Link
                        to={slide.ctaHref}
                        className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 group"
                        style={{ background: "#db0000" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#b50000")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#db0000")}
                      >
                        {slide.cta}
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dot navigation */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: i === current ? "28px" : "8px",
                      height: "8px",
                      background: i === current ? "#db0000" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>

              {/* Side arrows */}
              <button
                onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 flex items-center justify-center transition-all duration-200 focus:outline-none"
                aria-label="Précédent"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M10 4L6 8l4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => goTo((current + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 flex items-center justify-center transition-all duration-200 focus:outline-none"
                aria-label="Suivant"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
                <div
                  key={current}
                  className="h-full bg-red-600"
                  style={{ animation: "progress 5s linear forwards" }}
                />
              </div>
            </div>

            {/* ── Desktop Sidebar (right) ── */}
            <CarSidebar height={sliderHeight} isMobile={false} />
          </div>
        )}

        {/* ─── MOBILE: SLIDER FULL WIDTH, THEN CARS BELOW ─── */}
        {isMobile && (
          <>
            {/* Full-width slider */}
            <div className="relative w-full overflow-hidden" style={{ height: "60vw", minHeight: "240px", maxHeight: "420px" }}>
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                  aria-hidden={i !== current}
                >
                  <video
                    src={s.video}
                    poster={s.poster}
                    className="w-full h-full object-cover object-center"
                    autoPlay={i === current}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onCanPlay={() => handleVideoReady(i)}
                    onLoadedData={() => handleVideoReady(i)}
                    ref={(el) => {
                      if (!el) return;
                      if (i === current) {
                        el.currentTime = 0;
                        el.play().catch(() => {});
                      } else {
                        el.pause();
                      }
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${s.overlay}`} />
                </div>
              ))}

              {/* Mobile Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="px-5 pt-4">
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2 transition-all duration-500"
                    style={{
                      color: "#db0000",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-16px)",
                    }}
                  >
                    {slide.tag}
                  </p>
                  <h1
                    className="text-white font-extrabold leading-tight mb-4 transition-all duration-500"
                    style={{
                      fontSize: "clamp(1.4rem, 6vw, 2.2rem)",
                      lineHeight: 1.15,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(16px)",
                      transitionDelay: "80ms",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <div
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(16px)",
                      transitionDelay: "160ms",
                      transition: "all 500ms",
                    }}
                  >
                    <Link
                      to={slide.ctaHref}
                      className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-white rounded-full px-5 h-[42px] transition-all duration-300"
                      style={{ background: "#db0000" }}
                    >
                      {slide.cta}
                      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="rounded-full transition-all duration-300 focus:outline-none"
                    style={{
                      width: i === current ? "24px" : "7px",
                      height: "7px",
                      background: i === current ? "#db0000" : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>

              {/* Mobile progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-20">
                <div
                  key={current}
                  className="h-full bg-red-600"
                  style={{ animation: "progress 5s linear forwards" }}
                />
              </div>
            </div>

            {/* ── Mobile Car Strip (below video) ── */}
            <CarSidebar isMobile={true} />
          </>
        )}

        {/* ─── TRUST BAR ─── */}
        <div className="w-full" style={{ background: "#f7f7f7", borderTop: "1px solid #ebebeb" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-6 px-4 lg:px-8 group">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 leading-tight">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes progress {
            from { width: 0% }
            to   { width: 100% }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes loadBar {
            0%   { width: 0%;   margin-left: 0%; }
            50%  { width: 60%;  margin-left: 20%; }
            100% { width: 0%;   margin-left: 100%; }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>
      <ReviewsMarquee/>
      <Footer/>
    </>
  );
}