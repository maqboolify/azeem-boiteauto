"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
/* ─── Google Fonts ─────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </>
);

/* ─── animation presets ────────────────────────────────────────────────────── */
const inViewOpts = { once: true, margin: "-80px" };

const slideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const slideLeft = (delay = 0) => ({
  hidden: { opacity: 0, x: -56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const slideRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  },
});

/* ─── hook shortcut ────────────────────────────────────────────────────────── */
function useSection() {
  const ref = useRef(null);
  const inView = useInView(ref, inViewOpts);
  return { ref, inView };
}

/* ─── image / video placeholder ────────────────────────────────────────────── */
function Img({ src, alt = "", className = "", isVideo = false }) {
  const inner = (
    <div className="w-full min-h-[360px] bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center gap-3 text-neutral-400">
      {isVideo ? (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
        </svg>
      )}
      <p className="text-sm font-medium">{isVideo ? "Votre vidéo ici" : "Votre image ici"}</p>
      <p className="text-xs font-mono text-neutral-300">{src}</p>
    </div>
  );

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${className}`}>
      {/*
        TO USE YOUR OWN ASSETS — replace the div above with:
        Video: <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover rounded-2xl" />
        Image: <img src={src} alt={alt} className="w-full h-full object-cover rounded-2xl" />
      */}
      {inner}
    </div>
  );
}

/* ─── animated red divider ──────────────────────────────────────────────────── */
function RedLine() {
  const { ref, inView } = useSection();
  return (
    <div ref={ref} className="my-20 flex items-center gap-3">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px flex-1 bg-gradient-to-r from-red-600 via-red-400 to-transparent"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="w-2 h-2 rounded-full bg-red-600 shrink-0"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{ transformOrigin: "right" }}
        className="h-px flex-1 bg-gradient-to-l from-red-600 via-red-400 to-transparent"
      />
    </div>
  );
}

/* ─── section label ─────────────────────────────────────────────────────────── */
function Label({ n, text }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-red-600 font-mono text-xs font-bold tracking-widest">{n}</span>
      <div className="h-px w-8 bg-red-600" />
      <span className="text-xs font-semibold uppercase tracking-widest text-red-600">{text}</span>
    </div>
  );
}
function MediaSlot({ type = "image", src, alt }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {type === "video" ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
}
/* ─── animated checklist item ───────────────────────────────────────────────── */
function Check({ children, delay = 0 }) {
  const { ref, inView } = useSection();
  return (
    <motion.li
      ref={ref}
      variants={slideUp(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="flex items-start gap-3"
    >
      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p className="text-neutral-600 text-[15px] leading-relaxed">{children}</p>
    </motion.li>
  );
}

/* ─── method card ───────────────────────────────────────────────────────────── */
function MethodCard({ icon, title, desc, delay = 0 }) {
  const { ref, inView } = useSection();
  return (
    <motion.div
      ref={ref}
      variants={slideUp(delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="flex items-start gap-4 bg-white border border-neutral-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-200 group cursor-default"
    >
      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-600 transition-colors duration-200">
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <p className="font-semibold text-neutral-900 text-sm mb-0.5" style={{ fontFamily: "'Syne', sans-serif" }}>
          {title}
        </p>
        <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════════════════════ */
export default function MecatroniquePage() {
  /* hero section ref */
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  /* section refs */
  const s1L = useSection(), s1R = useSection();
  const s2L = useSection(), s2R = useSection();
  const s3L = useSection(), s3R = useSection();
  const s4L = useSection(), s4R = useSection();

  return (
    <>
      <FontLoader />

      <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white text-neutral-800 min-h-screen antialiased">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#0e0e0e]">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-red-600/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-red-600/6 blur-[80px]" />

          {/* top red stripe */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-[3px] w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent"
          />

          <div className="container mx-auto px-6 md:px-14 py-24 md:py-32 relative z-10">
            {/* breadcrumb */}
            <motion.nav
              variants={slideUp(0.1)}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 text-xs text-neutral-500 mb-10 font-medium tracking-wide"
            >
              {["Accueil", "Prestations", "Mécatronique"].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-2">
                  <Link
                    to="#"
                    className={
                      i === arr.length - 1
                        ? "text-red-500 pointer-events-none"
                        : "hover:text-red-400 transition-colors"
                    }
                  >
                    {item}
                  </Link>
                  {i < arr.length - 1 && <span className="text-neutral-700">/</span>}
                </span>
              ))}
            </motion.nav>

            <div className="max-w-3xl">
              <motion.h1
                ref={heroRef}
                variants={slideUp(0.2)}
                initial="hidden"
                animate={heroInView ? "show" : "hidden"}
                className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Réparation<br />
                <span className="text-red-500">Mécatronique</span>
              </motion.h1>

              <motion.p
                variants={slideUp(0.35)}
                initial="hidden"
                animate="show"
                className="text-neutral-400 text-lg leading-relaxed max-w-xl"
              >
                Le bloc de contrôle hydraulique au cœur de votre transmission automatique — diagnostic, réparation et calibrage par des spécialistes Bap Paris.
              </motion.p>

              {/* model tags */}
              <motion.div
                variants={slideUp(0.5)}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-2 mt-8"
              >
                {["DSG7", "Mercedes A/B", "Renault EDC", "DQ381", "DQ500", "BMW 6HP", "BMW 8HP"].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border border-red-900 text-red-400 bg-red-950/40"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
        <main className="container mx-auto px-6 md:px-14">

          {/* ── SECTION 1 — Les différents types ──────────────────────────────── */}
          <section className="pt-20 pb-4">
            <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* text left */}
              <motion.div
                ref={s1L.ref}
                variants={slideLeft()}
                initial="hidden"
                animate={s1L.inView ? "show" : "hidden"}
              >
                <Label n="01" text="Vue d'ensemble" />
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Les différents types
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Le bloc de contrôle hydraulique, appelé aussi <strong className="text-neutral-900">«&nbsp;mécatronique&nbsp;»</strong>, est indispensable dans les transmissions automatiques. Celui-ci comprend un <em>«&nbsp;valve body&nbsp;»</em> ou <em>«&nbsp;corps de valve&nbsp;»</em> lui-même greffé au calculateur.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Les modèles souvent problématiques incluent les <strong className="text-neutral-900">DSG7</strong>, les Mercedes Classe A et B, les boîtes Renault à double embrayage mouillé, les Volkswagen récents (DQ381, DQ500) et BMW (6HP, 8HP).
                </p>
                <p className="text-neutral-600 leading-relaxed">
                  En général, le bloc hydraulique baigne dans l'huile avec les solénoïdes (à bien contrôler) mais peuvent être électroniques (électrovannes). Les défaillances courantes concernent la qualité de l'huile et les courts-circuits à haute température. Il est possible de réparer ou de reconditionner les mécatroniques.
                </p>
              </motion.div>

              {/* video right */}
              <motion.div
                ref={s1R.ref}
                variants={slideRight()}
                initial="hidden"
                animate={s1R.inView ? "show" : "hidden"}
                className="relative"
              >
                {/* swap Img with your real video tag — see Img component comment */}
                <MediaSlot type="video" src="/images/meca1.webm" />

                {/* floating stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl border border-neutral-100 px-5 py-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 leading-none text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Tous types de BVA
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">Toutes marques acceptées</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <RedLine />

          {/* ── SECTION 2 — Réparation Mécatronique ──────────────────────────── */}
          <section className="pb-4">
            <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-start">

              {/* text left */}
              <motion.div
                ref={s2L.ref}
                variants={slideLeft()}
                initial="hidden"
                animate={s2L.inView ? "show" : "hidden"}
              >
                <Label n="02" text="Réparation" />
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Réparation Mécatronique
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  C'est une composante essentielle des boîtes de vitesses automatiques. Pour la plupart des modèles, ce bloc baigne dans l'huile, indispensable pour son bon fonctionnement. À l'intérieur de ce bloc, des billes circulent, permettant le blocage ou le passage des vitesses.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Cependant, l'utilisation d'une mauvaise huile peut endommager l'ensemble du bloc. Lorsque la température de l'huile devient trop élevée, cela peut provoquer des courts-circuits. Ces courts-circuits peuvent entraîner divers problèmes, tels que la lenteur au passage des rapports, des à-coups ou même l'impossibilité de passer à une vitesse supérieure.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-7">
                  Dans la plupart des cas, lorsqu'il y a un problème sur celui-ci, un code défaut va remonter sur la valise diagnostic : défaut de pression, défaut moteur embrayage 2 court-circuit à la masse, rapport de démultiplication incorrect, ratio incorrect, rapports incorrects…
                </p>

                {/* diagnostic checklist */}
                <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                  <p
                    className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Le diagnostic doit inclure plusieurs vérifications :
                  </p>
                  <ul className="space-y-3">
                    <Check delay={0}>
                      <strong>Pression d'huile :</strong> sur chacun des solénoïdes ou électrovannes.
                    </Check>
                    <Check delay={0.08}>
                      <strong>Solénoïde du convertisseur de couple :</strong> assurer son bon fonctionnement.
                    </Check>
                    <Check delay={0.16}>
                      <strong>Rapports de démultiplication :</strong> vérifier la cohérence et les ratios avec les données en temps réel.
                    </Check>
                    <Check delay={0.24}>
                      <strong>Température de l'huile de transmission :</strong> vérifier la stabilité et la surchauffe.
                    </Check>
                  </ul>
                </div>

                <p className="text-neutral-600 leading-relaxed mt-6">
                  Un entretien régulier et une attention particulière à la qualité de l'huile utilisée sont essentiels pour maintenir le bon fonctionnement du mécatronique et ainsi prolonger la durée de vie de la transmission.
                </p>
              </motion.div>

              {/* right: quote + image */}
              <motion.div
                ref={s2R.ref}
                variants={slideRight()}
                initial="hidden"
                animate={s2R.inView ? "show" : "hidden"}
                className="flex flex-col gap-8"
              >
                {/* pull quote */}
                <div className="relative border-l-4 border-red-600 pl-6 py-2 bg-red-50/60 rounded-r-xl pr-5">
                  <svg className="w-8 h-8 text-red-200 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-neutral-700 font-medium leading-relaxed italic">
                    Dans la plupart des cas, lorsqu'il y a un problème sur le mécatronique, un code défaut va remonter sur la valise diagnostic.
                  </p>
                  <p className="text-red-600 font-semibold text-sm mt-3">— Équipe Bap Paris</p>
                </div>

                {/* swap Img with your real image */}
                <MediaSlot type="image" src="/images/meca3.webp" />
              </motion.div>
            </div>
          </section>

          <RedLine />

          {/* ── SECTION 3 — Réparation du mécatronique ───────────────────────── */}
          <section className="pb-4">
            <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* image left */}
              <motion.div
                ref={s3L.ref}
                variants={slideLeft()}
                initial="hidden"
                animate={s3L.inView ? "show" : "hidden"}
                className="relative order-2 md:order-1"
              >
                {/* swap Img with your real image */}
                <MediaSlot type="image" src="/images/meca2.webp" />
                <div className="absolute -bottom-3 -left-3 w-14 h-14 rounded-xl bg-red-600 -z-10" />
              </motion.div>

              {/* text right */}
              <motion.div
                ref={s3R.ref}
                variants={slideRight()}
                initial="hidden"
                animate={s3R.inView ? "show" : "hidden"}
                className="order-1 md:order-2"
              >
                <Label n="03" text="Méthodes d'intervention" />
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Réparation du mécatronique
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Réparer un mécatronique peut se faire de plusieurs façons. Il est possible de réparer la platine ou le calculateur, ce qui relève de l'électronique pure. On peut aussi remplacer les solénoïdes (soit tous ou uniquement ceux de pression). Il faut aussi vérifier l'étanchéité et remplacer éventuellement les joints (kit joints) pour enlever les défauts de pression.
                </p>

                <div className="space-y-3 mb-6">
                  <MethodCard delay={0}   icon="🔌" title="Électronique pure"            desc="Réparation de la platine ou du calculateur." />
                  <MethodCard delay={0.1} icon="⚙️" title="Remplacement des solénoïdes" desc="Tous les solénoïdes ou uniquement ceux de pression." />
                  <MethodCard delay={0.2} icon="🔩" title="Étanchéité & joints"          desc="Kit joints pour supprimer les défauts de pression." />
                </div>

                <p className="text-neutral-600 leading-relaxed mb-2">
                  Il est préférable (si possible) de commencer par le mécatronique avant de démonter la boîte pour s'assurer que le problème n'est pas mécanique. Un diagnostic précis et une réparation efficace nécessitent de l'expérience pour bien identifier la source du problème.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  Pour résumer, il faut <strong className="text-neutral-900">toujours dans un premier temps vérifier le niveau d'huile.</strong>
                </p>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md shadow-red-600/20 transition-colors duration-200 text-sm"
                >
                  Contactez-nous
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </section>

          <RedLine />

          {/* ── SECTION 4 — Calibrage ─────────────────────────────────────────── */}
          <section className="pb-4">
            <div className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* text left */}
              <motion.div
                ref={s4L.ref}
                variants={slideLeft()}
                initial="hidden"
                animate={s4L.inView ? "show" : "hidden"}
              >
                <Label n="04" text="Calibrage" />
                <h2
                  className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight mb-5"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Calibrage
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Dans la plupart des cas, il faut faire un calibrage ou une réinitialisation des valeurs auto-adaptatives. Cela peut être appelé calibrage, réinitialisation, réglages de base ou adaptations. Lorsqu'un module de commande est vierge, un clonage ou une programmation en ligne est nécessaire.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  Nous sommes équipés pour les véhicules BMW, Volkswagen, Audi, Calculateur Renault DC4 (boîtes EDC), Peugeot. Dans tous les cas, nous informons nos clients si nous pouvons réaliser le calibrage ou non, afin de ne pas leur faire perdre de temps. Nous orientons volontiers nos clients vers nos partenaires si nécessaire.
                </p>
                <p className="text-neutral-600 leading-relaxed mb-7">
                  Pour résumer, calibrage, étalonnage, calibrage des points de touche, calibrage des points de léchage désignent tous le même terme et font partie de la procédure. Dans certains cas, il ne vaut mieux pas faire de calibrage.
                </p>

                {/* brand pills */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <p
                    className="text-xs font-bold uppercase tracking-widest text-red-600 mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Véhicules compatibles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["BMW", "Volkswagen", "Audi", "Renault DC4 (EDC)", "Peugeot"].map((b) => (
                      <span
                        key={b}
                        className="text-sm font-semibold px-4 py-1.5 rounded-lg bg-white border border-red-100 text-neutral-800 shadow-sm hover:border-red-400 transition-colors duration-200 cursor-default"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* image right */}
              <motion.div
                ref={s4R.ref}
                variants={slideRight()}
                initial="hidden"
                animate={s4R.inView ? "show" : "hidden"}
                className="relative"
              >
                {/* swap Img with your real image */}
                <MediaSlot type="image" src="/images/meca4.png" />
                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-xl bg-red-600 -z-10" />

                {/* floating turnaround card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -bottom-6 -left-6 bg-[#0e0e0e] text-white rounded-2xl shadow-2xl px-6 py-5"
                >
                  <p className="text-xs text-neutral-400 mb-1">Délai moyen</p>
                  <p
                    className="font-extrabold text-2xl text-white leading-none"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    24 – 48 h
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">après réception du bloc</p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-24 mb-16 rounded-3xl overflow-hidden bg-[#0e0e0e] p-10 md:p-16"
          >
            {/* ambient glows */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-red-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 right-10 w-56 h-56 rounded-full bg-red-600/10 blur-3xl" />
            {/* top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">
                  Bap Paris — Spécialistes en mécatronique
                </p>
                <h3
                  className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Un problème de mécatronique ?<br />
                  <span className="text-red-500">Parlons-en.</span>
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 transition-colors duration-200 text-sm"
                >
                  Demander un devis
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>

                {/* ← Replace href and label with your actual phone number */}
                <motion.a
                  href="tel:+33XXXXXXXXX"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
                  </svg>
                  +33 6 64 41 23 76 {/* ← Replace */}
                </motion.a>
              </div>
            </div>
          </motion.section>

        </main>
      </div>
    </>
  );
}