// VidangePage.jsx — Bap Paris
// Requires: framer-motion  (`npm install framer-motion`)
// Font: add to index.html <head>
// <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
// ─── Theme tokens ─────────────────────────────────────────────────────────────
const T = {
  bg: "#ffffff",
  surface: "#f8f8f8",
  surfaceHover: "#f3f3f3",
  border: "#e8e8e8",
  borderAccent: "rgba(219,0,0,0.25)",
  text: "#111111",
  muted: "rgba(0,0,0,0.45)",
  faint: "rgba(0,0,0,0.28)",
  red: "#db0000",
  redSoft: "rgba(219,0,0,0.08)",
  redMid: "rgba(219,0,0,0.14)",
};

// ─── InView scroll-reveal wrapper ────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-72px" });
  const offsets = { up: [40, 0], down: [-40, 0], left: [0, 0, -40, 0], right: [0, 0, 40, 0] };
  const isX = direction === "left" || direction === "right";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, [isX ? "x" : "y"]: direction === "left" ? -40 : direction === "right" ? 40 : 36 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Red pill tag ─────────────────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5"
      style={{ background: T.redSoft, color: T.red }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.red }} />
      {children}
    </span>
  );
}

// ─── Animated section divider ─────────────────────────────────────────────────
function Divider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="my-20 lg:my-28 flex items-center gap-5">
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-px origin-left"
        style={{ background: `linear-gradient(to right, ${T.red}, rgba(219,0,0,0.1), transparent)` }}
      />
      <div className="flex gap-1.5 shrink-0">
        {[1, 0.4, 0.15].map((o, i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ background: `rgba(219,0,0,${o})` }} />
        ))}
      </div>
      <motion.div
        initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex-1 h-px origin-right"
        style={{ background: `linear-gradient(to left, ${T.red}, rgba(219,0,0,0.1), transparent)` }}
      />
    </div>
  );
}

// ─── Stat badge used in hero ──────────────────────────────────────────────────
function StatBadge({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl px-6 py-5 border"
      style={{ background: T.surface, borderColor: T.border }}
    >
      <span
        className="font-black leading-none mb-1"
        style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", color: T.red }}
      >
        {value}
      </span>
      <span className="text-xs font-medium" style={{ color: T.muted }}>{label}</span>
    </motion.div>
  );
}

// ─── Oil type card ────────────────────────────────────────────────────────────
function OilCard({ name, desc, use, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.28 }}
        className="rounded-2xl p-5 border h-full flex flex-col transition-colors duration-300"
        style={{
          background: hovered ? T.redSoft : T.surface,
          borderColor: hovered ? T.borderAccent : T.border,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: hovered ? "rgba(219,0,0,0.15)" : T.border }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: T.red }} />
          </div>
          <span
            className="font-black text-sm"
            style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
          >
            {name}
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-2 flex-1" style={{ color: T.muted }}>{desc}</p>
        <p
          className="text-xs font-semibold mt-auto pt-3 border-t"
          style={{ color: T.red, borderColor: hovered ? T.borderAccent : T.border }}
        >
          {use}
        </p>
      </motion.div>
    </Reveal>
  );
}

// ─── Comparison card (gravity vs flushing) ────────────────────────────────────
function CompareCard({ title, icon, coverage, pros, cons, highlight, delay }) {
  return (
    <Reveal delay={delay}>
      <div
        className="rounded-2xl p-7 border h-full flex flex-col"
        style={{
          background: highlight ? T.redSoft : T.surface,
          borderColor: highlight ? T.borderAccent : T.border,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {highlight && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(to right, ${T.red}, #ff4444, ${T.red})` }}
          />
        )}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: highlight ? "rgba(219,0,0,0.15)" : T.border }}
          >
            {icon}
          </div>
          {highlight && (
            <span
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: T.red, color: "white" }}
            >
              Recommandé
            </span>
          )}
        </div>

        <h3
          className="font-black text-lg mb-2"
          style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}
        >
          {title}
        </h3>

        {/* Coverage bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-1.5" style={{ color: T.faint }}>
            <span>Renouvellement huile</span>
            <span className="font-bold" style={{ color: highlight ? T.red : T.text }}>{coverage}</span>
          </div>
          <div className="h-2 rounded-full w-full" style={{ background: T.border }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: coverage }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: delay + 0.3 }}
              className="h-full rounded-full"
              style={{ background: highlight ? `linear-gradient(to right, ${T.red}, #ff6666)` : "#aaaaaa" }}
            />
          </div>
        </div>

        <ul className="space-y-2 mb-4 flex-1">
          {pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: highlight ? "rgba(219,0,0,0.15)" : "#e8e8e8" }}
              >
                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                  <path d="M2 5l2 2 4-4" stroke={highlight ? T.red : "#666"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xs leading-relaxed" style={{ color: T.muted }}>{p}</span>
            </li>
          ))}
        </ul>

        {cons.length > 0 && (
          <ul className="space-y-2 pt-4 border-t" style={{ borderColor: T.border }}>
            {cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "#f0f0f0" }}
                >
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path d="M3 3l4 4M7 3l-4 4" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "rgba(0,0,0,0.3)" }}>{c}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function VidangePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const oilTypes = [
    {
      name: "Multi ATF",
      desc: "Huile polyvalente pour la grande majorité des boîtes automatiques à convertisseur de couple.",
      use: "Usage universel — toutes marques",
    },
    {
      name: "ATF 6 / ATF 8",
      desc: "Spécifique aux boîtes modernes ZF, Aisin, Mercedes 7G/9G-Tronic. Meilleure fluidité à basse température.",
      use: "BMW, Mercedes, Audi, Porsche",
    },
    {
      name: "Multi CVT",
      desc: "Conçue pour les transmissions à variation continue (CVT). Formulée pour la courroie et les variateurs.",
      use: "Nissan, Honda, Toyota CVT",
    },
    {
      name: "DCTF",
      desc: "Huile dédiée aux doubles embrayages à bain d'huile (wet DCT). Changements de vitesse rapides et précis.",
      use: "VW DSG6, Ford PowerShift",
    },
    {
      name: "Multi HF",
      desc: "Huile pour boîtes robotisées et mécatroniques DSG7 (DQ200). Viscosité adaptée aux actionneurs.",
      use: "VW/Audi DSG7 DQ200",
    },
    {
      name: "Trans ATF",
      desc: "Huile transparente pour convertisseurs récents. Haute performance thermique et longévité accrue.",
      use: "BMW récents, modèles ZF 8HP",
    },
    {
      name: "Dexron VI®",
      desc: "Excellente fluidité à froid, réduit la consommation. Adaptée marques américaines, asiatiques, européennes.",
      use: "GM, Ford, Chrysler récents",
    },
    {
      name: "ATF+4®",
      desc: "Formulée pour les transmissions Chrysler. Améliore les changements, réduit les tremblements et l'usure.",
      use: "Chrysler, Jeep, Dodge",
    },
  ];

  return (
    <main style={{ background: T.bg, fontFamily: "'Bai Jamjuree', sans-serif", color: T.text }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "48vh" }}>
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.055) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.055) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Red glow */}
        <motion.div
          style={{ y: blobY }}
          className="absolute pointer-events-none"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div style={{
            width: 700, height: 700, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(219,0,0,0.07) 0%, transparent 68%)",
            position: "absolute", top: -180, right: -200,
          }} />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          {/* Breadcrumb */}
          {/* <motion.ol
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs mb-8"
            style={{ color: T.faint }}
          >
            <li><a href="/" className="hover:text-red-600 transition-colors">Accueil</a></li>
            <li>/</li>
            <li><a href="/prestations" className="hover:text-red-600 transition-colors">Prestations</a></li>
            <li>/</li>
            <li style={{ color: T.red }}>Vidange</li>
          </motion.ol> */}

          <div className="flex flex-col lg:flex-row lg:items-end gap-12">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Tag>Entretien Transmission</Tag>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-black leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)", fontFamily: "'DM Serif Display', serif", color: T.text }}
              >
                Vidange<br />
                <em className="not-italic" style={{ color: T.red }}>boîte automatique</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-base leading-relaxed mb-10"
                style={{ color: T.muted }}
              >
                Un entretien régulier de votre boîte automatique est indispensable pour garantir sa longévité. Chez Bap Paris, nous utilisons la méthode par flushing pour un renouvellement optimal de l'huile ATF, toutes marques confondues.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: T.red }}
                >
                  Prendre Rendez-vous
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  to="#pourquoi"
                  className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider h-[50px] px-8 rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-300"
                  style={{ color: T.muted }}
                >
                  En savoir plus
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 shrink-0">
              <StatBadge value="95–100%" label="Renouvellement huile (flushing)" delay={0.5} />
              <StatBadge value="70%" label="Renouvellement gravité" delay={0.6} />
              <StatBadge value="60–80k" label="km entre vidanges" delay={0.7} />
              <StatBadge value="7–10L" label="Capacité huile standard" delay={0.8} />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${T.bg})` }}
        />
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ══════════════════════════════════════════════════════
            SECTION 1 — POURQUOI VIDANGER
        ══════════════════════════════════════════════════════ */}
        <section id="pourquoi" className="py-8 pb-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <div>
              <Reveal><Tag>Prestation Essentielle</Tag></Reveal>
              <Reveal delay={0.05}>
                <h2
                  className="font-black leading-tight mb-6"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontFamily: "'DM Serif Display', serif", color: T.text }}
                >
                  Pourquoi vidanger<br />
                  <span style={{ color: T.red }}>votre BVA ?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm leading-relaxed mb-4" style={{ color: T.muted }}>
                  Les boîtes automatiques existent sous de nombreuses formes — à convertisseur de couple, à double embrayage, à variation continue. Certaines disposent d'une crépine interne ou externe, avec ou sans joint de carter. La quantité d'huile varie considérablement selon les modèles : les doubles embrayages à sec nécessitent peu d'huile, tandis que les boîtes classiques contiennent généralement entre <strong style={{ color: T.text }}>7 et 10 litres</strong>.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="text-sm leading-relaxed mb-8" style={{ color: T.muted }}>
                  Une lubrification optimale est indispensable au bon fonctionnement de tous ces composants. L'huile ATF se dégrade avec le temps et l'usage, perdant ses propriétés lubrifiantes et accumulant des particules métalliques d'usure. Une vidange régulière tous les <strong style={{ color: T.text }}>60 000 à 80 000 km</strong> permet d'éviter des réparations coûteuses.
                </p>
              </Reveal>

              {/* Key points */}
              <div className="space-y-3 mb-8">
                {[
                  { icon: "🔧", text: "Prolonge la durée de vie de la boîte automatique" },
                  { icon: "⚡", text: "Restaure des changements de vitesse fluides et précis" },
                  { icon: "🌡️", text: "Prévient la surchauffe et la dégradation mécanique" },
                  { icon: "💰", text: "Évite des réparations majeures à 1 000€ et plus" },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div
                      className="flex items-center gap-4 rounded-xl px-4 py-3 border"
                      style={{ background: T.surface, borderColor: T.border }}
                    >
                      <span className="text-lg shrink-0">{item.icon}</span>
                      <span className="text-sm font-medium" style={{ color: T.text }}>{item.text}</span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[48px] transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: T.red }}
                >
                  Nous Contacter
                </Link>
              </Reveal>
            </div>

            {/* Image */}
            <Reveal direction="right">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/vid1.webp"
                  alt="Vidange boîte automatique Bap Paris"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                />
                <div
                  className="absolute inset-0 items-center justify-center hidden rounded-2xl"
                  style={{ background: T.redSoft, border: `1px dashed ${T.borderAccent}` }}
                >
                  <p className="text-xs text-center px-8" style={{ color: "rgba(219,0,0,0.5)" }}>/images/vidange-bva.jpg</p>
                </div>

                {/* Overlay badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 rounded-xl px-5 py-4 border border-white/30"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: T.redSoft }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" stroke={T.red} strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: T.text }}>Recommandé tous les 60–80 000 km</p>
                      <p className="text-xs" style={{ color: T.muted }}>Toutes marques et tous types de BVA</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            SECTION 2 — GRAVITÉ VS FLUSHING
        ══════════════════════════════════════════════════════ */}
        <section className="pb-4">
          <div className="text-center mb-14">
            <Reveal><Tag>Méthode de Vidange</Tag></Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontFamily: "'DM Serif Display', serif", color: T.text }}
              >
                Gravité vs{" "}
                <span style={{ color: T.red }}>Flushing</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: T.muted }}>
                Toutes les vidanges ne se valent pas. La méthode par flushing remplace jusqu'à 100% de l'huile là où la gravité n'atteint que 70% — voire 50% sur certains modèles Jatco.
              </p>
            </Reveal>
          </div>

          {/* Compare cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <CompareCard
              title="Vidange par gravité"
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M12 2v20M2 12h20" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="5" stroke="#aaa" strokeWidth="1.5" />
                </svg>
              }
              coverage="70%"
              pros={[
                "Procédure simple et rapide",
                "Coût légèrement inférieur",
                "Suffisant pour des entretiens très réguliers",
              ]}
              cons={[
                "Ne renouvelle que 70% de l'huile (50% sur Jatco)",
                "Ne nettoie pas le convertisseur de couple",
                "Laisse des résidus métalliques dans le circuit",
              ]}
              highlight={false}
              delay={0}
            />
            <CompareCard
              title="Vidange par flushing"
              icon={
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <path d="M20 14.5a8 8 0 01-15.28 3.2M4 9.5a8 8 0 0115.28-3.2" stroke={T.red} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M22 12l-2 2.5-2-2.5M2 12l2-2.5 2 2.5" stroke={T.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              coverage="95%"
              pros={[
                "Remplacement quasi-intégral de l'huile (95–100%)",
                "Nettoie le convertisseur de couple et les conduites",
                "Élimine la poussière métallique d'usure",
                "Ajustement automatique du niveau d'huile",
                "Recommandé pour les boîtes sans carter (Audi, Peugeot, Renault…)",
              ]}
              cons={[]}
              highlight={true}
              delay={0.1}
            />
          </div>

          {/* How flushing works */}
          <Reveal>
            <div
              className="rounded-3xl p-8 lg:p-12 border relative overflow-hidden"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(219,0,0,0.06) 0%, transparent 65%)", transform: "translate(30%,-30%)" }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: T.redSoft }}>
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10" stroke={T.red} strokeWidth="1.5" />
                      <path d="M12 8v5l3 3" stroke={T.red} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-black text-lg" style={{ fontFamily: "'DM Serif Display', serif", color: T.text }}>
                    Comment fonctionne le flushing ?
                  </h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                  {[
                    { step: "01", title: "Connexion machine", desc: "Les tuyaux de la machine de flushing sont raccordés aux connecteurs du radiateur de la boîte de vitesses." },
                    { step: "02", title: "Injection sous pression", desc: "L'huile neuve est injectée sous pression pendant que l'huile usagée est collectée simultanément." },
                    { step: "03", title: "Ajustement automatique", desc: "La machine ajuste automatiquement le niveau d'huile. Plus on injecte, plus on approche les 100%." },
                  ].map((s, i) => (
                    <div key={i}>
                      <div
                        className="text-3xl font-black mb-2 leading-none"
                        style={{ fontFamily: "'DM Serif Display', serif", color: "rgba(219,0,0,0.18)" }}
                      >
                        {s.step}
                      </div>
                      <h4 className="text-sm font-bold mb-1" style={{ color: T.text }}>{s.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Brands strip */}
                <div className="pt-5 border-t" style={{ borderColor: T.border }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: T.faint }}>
                    Recommandé en particulier pour les boîtes sans carter :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Audi A4/A5/A6/A7/A8", "Peugeot 508", "Citroën", "Opel", "Renault", "Volvo", "Mini"].map((b) => (
                      <span
                        key={b}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{ background: T.redSoft, color: T.red }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Video placeholder */}
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl overflow-hidden border" style={{ borderColor: T.border }}>
              <video
                src="/videos/hero4.mp4"
                className="w-full max-h-[480px] object-cover"
                autoPlay muted loop playsInline
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              <div
                className="hidden items-center justify-center py-16 rounded-2xl"
                style={{ background: T.surface, border: `1px dashed ${T.border}` }}
              >
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ background: T.redSoft }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                      <polygon points="5 3 19 12 5 21 5 3" stroke={T.red} strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: T.muted }}>Vidéo de démonstration</p>
                  <p className="text-xs mt-1" style={{ color: T.faint }}>/videos/flushing-demo.mp4</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            SECTION 3 — BIEN CHOISIR SON HUILE
        ══════════════════════════════════════════════════════ */}
        <section className="pb-28">
          <div className="mb-14">
            <Reveal><Tag>Lubrifiants ATF</Tag></Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-black leading-tight mb-4"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontFamily: "'DM Serif Display', serif", color: T.text }}
              >
                Bien choisir<br />
                <span style={{ color: T.red }}>son huile ATF</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-sm max-w-2xl" style={{ color: T.muted }}>
                Contrairement aux boîtes manuelles qui utilisent une huile minérale, les boîtes automatiques requièrent des huiles de synthèse ATF (Automatic Transmission Fluid) — des lubrifiants à molécules homogènes extrêmement fluides à froid, garantissant une lubrification optimale des actionneurs hydrauliques. Le choix de l'huile est critique : utiliser la mauvaise référence peut endommager irrémédiablement votre boîte.
              </p>
            </Reveal>
          </div>

          {/* Oil types grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {oilTypes.map((oil, i) => (
              <OilCard key={i} {...oil} delay={i * 0.06} />
            ))}
          </div>

          {/* Info callout */}
          <Reveal>
            <div
              className="rounded-2xl p-6 border flex gap-4"
              style={{ background: T.redSoft, borderColor: T.borderAccent }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(219,0,0,0.15)" }}>
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle cx="12" cy="12" r="10" stroke={T.red} strokeWidth="1.5" />
                  <path d="M12 8v5m0 3h.01" stroke={T.red} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: T.muted }}>
                <strong style={{ color: T.text }}>Respectez toujours les préconisations constructeur.</strong>{" "}
                L'utilisation d'une huile inadaptée peut entraîner des glissements d'embrayage, des à-coups, une surchauffe et des dommages irréversibles. Chez Bap Paris, nous sélectionnons systématiquement la référence exacte recommandée pour votre modèle de boîte avant toute intervention.
              </p>
            </div>
          </Reveal>

          {/* CTA band */}
          <Reveal delay={0.1}>
            <div
              className="mt-10 rounded-3xl p-10 lg:p-14 border relative overflow-hidden"
              style={{ background: T.surface, borderColor: T.border }}
            >
              <div
                className="absolute inset-0 opacity-100"
                style={{
                  backgroundImage: "linear-gradient(rgba(0,0,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.035) 1px,transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(219,0,0,0.06) 0%, transparent 60%)" }}
              />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <h3
                    className="font-black mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: T.text }}
                  >
                    Prêt à entretenir votre boîte ?
                  </h3>
                  <p className="text-sm max-w-lg" style={{ color: T.muted }}>
                    Contactez Bap Paris avec l'immatriculation et le modèle exact de votre véhicule. Nos techniciens sélectionnent l'huile adaptée et vous proposent un devis vidange transparent sous 24h.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
                    style={{ background: T.red }}
                  >
                    Demander un devis
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    to="tel:+33 6 64 41 23 76"
                    className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider h-[50px] px-8 rounded-full border border-gray-300 hover:border-gray-500 transition-all duration-300 whitespace-nowrap"
                    style={{ color: T.muted }}
                  >
                   +33 6 64 41 23 76
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

      </div>
    </main>
  );
}