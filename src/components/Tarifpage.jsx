// TarifPage.jsx — Bap Paris
// Requires: framer-motion  (`npm install framer-motion`)
// Font: add to index.html <head>
// <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

// ─── Reusable InView wrapper ──────────────────────────────────────────────────
function InView({ children, variants, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const defaultVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: custom * 0.1 },
    },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants || defaultVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Red pill label ───────────────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-5"
      style={{ background: "rgba(219,0,0,0.12)", color: "#db0000" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
      {children}
    </span>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function Divider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="my-24 h-px origin-left"
      style={{ background: "linear-gradient(to right, #db0000, rgba(219,0,0,0.2), transparent)" }}
    />
  );
}

// ─── Repair tier card ─────────────────────────────────────────────────────────
function TierCard({ tier, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <InView custom={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl overflow-hidden border flex flex-col h-full"
        style={{
          background: tier.featured
            ? "linear-gradient(145deg, rgba(219,0,0,0.08), rgba(219,0,0,0.02))"
            : "#f9f9f9",
          borderColor: tier.featured ? "rgba(219,0,0,0.6)" : "#e5e5e5",
        }}
      >
        {tier.featured && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(to right, #db0000, #ff4444, #db0000)" }}
          />
        )}
        {tier.featured && (
          <div className="absolute top-4 right-4">
            <span
              className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "#db0000", color: "white" }}
            >
              Populaire
            </span>
          </div>
        )}

        <div className="p-6 flex-1">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: tier.featured ? "rgba(219,0,0,0.12)" : "#efefef" }}
          >
            {tier.icon}
          </div>

          {/* Price */}
          <div className="mb-1 flex items-end gap-1">
            <span
              className="font-black leading-none"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                color: tier.featured ? "#db0000" : "#111111",
              }}
            >
              {tier.price}
            </span>
          </div>
          <p className="text-xs mb-4" style={{ color: "rgba(0,0,0,0.35)" }}>
            {tier.priceNote}
          </p>

          <h3
            className="font-bold text-gray-900 text-base mb-2"
            style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
          >
            {tier.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "rgba(0,0,0,0.45)", fontFamily: "'Bai Jamjuree', sans-serif" }}
          >
            {tier.desc}
          </p>

          {/* Features */}
          <ul className="space-y-2.5">
            {tier.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: tier.featured ? "rgba(219,0,0,0.15)" : "#e8e8e8" }}
                >
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path
                      d="M2 5l2 2 4-4"
                      stroke={tier.featured ? "#db0000" : "rgba(0,0,0,0.4)"}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 pb-6">
          <Link
            to="/contact"
            className="block text-center font-bold text-xs uppercase tracking-wider rounded-xl py-3.5 transition-all duration-300"
            style={
              tier.featured
                ? { background: "#db0000", color: "white" }
                : { background: "#f0f0f0", color: "rgba(0,0,0,0.6)" }
            }
            onMouseEnter={(e) => {
              if (!tier.featured) e.currentTarget.style.background = "rgba(219,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              if (!tier.featured) e.currentTarget.style.background = "#f0f0f0";
            }}
          >
            Demander un devis
          </Link>
        </div>
      </motion.div>
    </InView>
  );
}

// ─── Oil change service card ──────────────────────────────────────────────────
function OilServiceCard({ service, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <InView custom={delay}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative rounded-2xl border p-6 flex flex-col h-full"
        style={{
          background: service.highlight ? "linear-gradient(145deg, rgba(219,0,0,0.07), rgba(219,0,0,0.01))" : "#f9f9f9",
          borderColor: service.highlight ? "rgba(219,0,0,0.5)" : "#e5e5e5",
        }}
      >
        {service.highlight && (
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: "linear-gradient(to right, #db0000, #ff4444, #db0000)" }}
          />
        )}

        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
          style={{ background: service.highlight ? "rgba(219,0,0,0.12)" : "#efefef" }}
        >
          {service.icon}
        </div>

        <h3
          className="font-bold text-gray-900 text-sm mb-1"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          {service.title}
        </h3>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(0,0,0,0.4)" }}>
          {service.desc}
        </p>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(0,0,0,0.3)" }}>
                Tarif
              </p>
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.5rem",
                  color: service.highlight ? "#db0000" : "#111111",
                }}
              >
                {service.price}
              </span>
            </div>
            {service.badge && (
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: "rgba(219,0,0,0.12)", color: "#db0000" }}
              >
                {service.badge}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </InView>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const repairTiers = [
  {
    price: "< 300€",
    priceNote: "Interventions légères",
    title: "Réparation Mineure",
    desc: "Problèmes électroniques, remplacement de joints de carter, ajustements de niveau d'huile et petites réparations sans démontage.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "Défauts électroniques & solénoïdes",
      "Remplacement joints de carter",
      "Ajustement niveau d'huile ATF",
      "Recalibrage calculateur de boîte",
    ],
  },
  {
    price: "< 1 000€",
    priceNote: "Sans démontage complet",
    title: "Réparation Modérée",
    desc: "Interventions ciblées sans démontage complet de la boîte : remplacement de pièces internes accessibles, réparation mécatronique.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
      </svg>
    ),
    features: [
      "Remplacement pièces internes ciblées",
      "Réparation bloc mécatronique",
      "Remplacement solénoïdes de pression",
      "Vidange complète incluse",
    ],
  },
  {
    price: "1 000–3 500€",
    priceNote: "Réparations majeures",
    title: "Réparation Majeure",
    desc: "Remplacement d'éléments hydrauliques complexes ou du convertisseur de couple, sans démontage complet de la boîte.",
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#db0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    features: [
      "Remplacement convertisseur de couple",
      "Éléments hydrauliques complexes",
      "Reconstruction partielle de la boîte",
      "Reprogrammation & calibrage post-réparation",
    ],
  },
  {
    price: "1 000€ +",
    priceNote: "Pièces complexes en sus",
    title: "Démontage Complet",
    desc: "Démontage intégral de la boîte, notamment pour les doubles embrayages DSG/DCT. Prix pièces (mécatronique, convertisseur) en supplément.",
    featured: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" />
      </svg>
    ),
    features: [
      "Démontage & remontage complet",
      "Boîtes DSG, DCT, CVT robotisées",
      "Remplacement mécatronique si nécessaire",
      "Garantie 6 à 12 mois sur la réparation",
    ],
  },
];

const vidangeItems = [
  { label: "Huile Multi ATF", note: "Boîtes automatiques classiques" },
  { label: "Huile Multi CVT", note: "Transmissions à variation continue" },
  { label: "ATF 6 / ATF 8", note: "ZF, Aisin, 7G-Tronic, 9G-Tronic" },
  { label: "DCTF", note: "Doubles embrayages à bain d'huile" },
  { label: "Multi HF", note: "Boîtes robotisées" },
  { label: "Crépine & joints", note: "Remplacement selon état" },
];

// ─── Oil change section data ──────────────────────────────────────────────────
const oilChangeServices = [
  {
    title: "Vidange Standard",
    desc: "Véhicules courants essence ou diesel avec filtre à huile standard. Huile 5W-30 ou 5W-40 selon préconisation constructeur.",
    price: "100–150€",
    badge: null,
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Vidange Premium",
    desc: "Moteurs haute performance, turbocompressés ou hybrides. Huile full-synthétique longue durée 0W-20, 0W-30 ou 0W-40.",
    price: "129–199€",
    badge: "Populaire",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#db0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Vidange Prestige",
    desc: "Moteurs exigeants BMW M, Porsche, AMG, Audi RS. Huiles homologuées constructeur, filtres OEM garantis, niveau d'exigence maximum.",
    price: "180–350€",
    badge: null,
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Vidange Moteur + Boîte",
    desc: "Forfait combiné vidange moteur et boîte automatique au même rendez-vous. Économisez sur la main-d'œuvre.",
    price: "Dès 299€",
    badge: "Forfait",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="12" y2="16" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="14" x2="14" y2="14" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const oilIncludes = [
  "Huile moteur sélectionnée selon fiche constructeur",
  "Remplacement filtre à huile (OEM ou équivalent)",
  "Vérification et appoint des niveaux (liquide de refroidissement, direction, frein)",
  "Inspection visuelle des courroies et durites",
  "Rapport d'état remis après intervention",
];

const oilTypes = [
  { grade: "0W-20", usage: "Hybrides, moteurs Atkinson" },
  { grade: "0W-30 / 0W-40", usage: "BMW M, Porsche, AMG" },
  { grade: "5W-30", usage: "Diesel courants, moteurs Euro 6" },
  { grade: "5W-40", usage: "Essence standard, polyvalent" },
  { grade: "10W-60", usage: "Moteurs haute performance piste" },
  { grade: "Huiles LongLife", usage: "BMW LL-04, VW 507.00, MB 229.5" },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TarifPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main
      style={{
        background: "#ffffff",
        fontFamily: "'Bai Jamjuree', sans-serif",
        color: "#1a1a1a",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ minHeight: "46vh" }}>
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.07) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Glow blob */}
        <motion.div
          style={{ y: blobY }}
          className="absolute pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <div
            style={{
              width: "680px",
              height: "680px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(219,0,0,0.08) 0%, transparent 68%)",
              position: "absolute",
              top: "-160px",
              left: "-160px",
            }}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs mb-8"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            <Link to="/" className="hover:text-red-500 transition-colors">Accueil</Link>
            <span>/</span>
            <span style={{ color: "#db0000" }}>Tarifs</span>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tag>Transparence tarifaire</Tag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                fontFamily: "'DM Serif Display', serif",
                color: "#111111",
              }}
            >
              Nos <em className="not-italic" style={{ color: "#db0000" }}>tarifs</em>
              <br />clairs &amp; honnêtes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base leading-relaxed max-w-2xl"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              Chez Bap Paris, chaque prestation est facturée au juste prix. Diagnostic à tarif fixe, vidange forfaitisée et réparations évaluées après inspection — jamais de mauvaise surprise.
            </motion.p>
          </div>

          {/* Quick price badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {[
              { label: "Diagnostic", price: "90€ fixe" },
              { label: "Vidange boîte", price: "300 – 600€" },
              { label: "Vidange moteur", price: "79 – 299€" },
              { label: "Réparation", price: "Dès 300€" },
              { label: "Révision complète", price: "Sur devis" },
            ].map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-5 py-3 border border-gray-200"
                style={{ background: "#f5f5f5" }}
              >
                <span className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {b.label}
                </span>
                <span
                  className="text-xs font-black"
                  style={{ fontFamily: "'DM Serif Display', serif", color: "#db0000" }}
                >
                  {b.price}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — DIAGNOSTIC
        ═══════════════════════════════════════════════════════════ */}
        <section className="py-10 pb-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Big price display */}
            <InView>
              <div
                className="relative rounded-3xl overflow-hidden p-10 lg:p-14 border border-gray-200 flex flex-col items-center justify-center text-center"
                style={{ background: "#f8f8f8", minHeight: "320px" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(219,0,0,0.07) 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(to right, transparent, #db0000, transparent)" }}
                />
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ color: "rgba(219,0,0,0.7)" }}
                >
                  Tarif fixe
                </p>
                <div
                  className="font-black leading-none mb-3"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(5rem, 12vw, 8rem)",
                    color: "#111111",
                  }}
                >
                  90<span style={{ color: "#db0000" }}>€</span>
                </div>
                <p className="text-sm max-w-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
                  Déduit du montant total si vous confiez la réparation à Bap Paris
                </p>

                {/* Animated ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 rounded-full border border-dashed pointer-events-none"
                  style={{ borderColor: "rgba(219,0,0,0.2)" }}
                />
              </div>
            </InView>

            {/* Text */}
            <div>
              <InView>
                <Tag>Prestation #1</Tag>
              </InView>
              <InView>
                <h2
                  className="font-black leading-tight mb-5"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontFamily: "'DM Serif Display', serif",
                    color: "#111111",
                  }}
                >
                  Diagnostic{" "}
                  <span style={{ color: "#db0000" }}>complet</span>
                </h2>
              </InView>
              <InView>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Notre diagnostic à <strong className="text-gray-900">90€ fixe</strong> couvre l'ensemble du processus d'évaluation : lecture des codes défaut via valise professionnelle adaptée à votre boîte, vérification du niveau et de la qualité de l'huile ATF, contrôle des solénoïdes de pression, inspection des supports moteur et boîte, et analyse de la partie mécatronique.
                </p>
              </InView>
              <InView>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(0,0,0,0.5)" }}>
                  Ce montant est <strong className="text-gray-900">intégralement déduit</strong> du coût de la réparation si vous nous confiez votre véhicule. Un diagnostic rigoureux, c'est la garantie d'une réparation ciblée et sans mauvaise surprise.
                </p>
              </InView>

              {/* Checklist */}
              <div className="space-y-3">
                {[
                  "Lecture codes défaut (valise multi-marques)",
                  "Vérification niveau & qualité huile ATF",
                  "Contrôle pression solénoïdes mécatronique",
                  "Inspection supports moteur & boîte",
                  "Rapport de diagnostic détaillé remis",
                ].map((item, i) => (
                  <InView key={i} custom={i}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(219,0,0,0.15)" }}
                      >
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke="#db0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{item}</span>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — VIDANGE BOÎTE
        ═══════════════════════════════════════════════════════════ */}
        <section className="pb-4">
          <div className="text-center mb-14">
            <InView>
              <Tag>Prestation #2</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#111111",
                }}
              >
                Vidange boîte automatique
              </h2>
            </InView>
            <InView>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>
                Entre <strong className="text-gray-900">300€ et 600€</strong> selon le type d'huile, les pièces à remplacer et la complexité du modèle. Main-d'œuvre et composants inclus.
              </p>
            </InView>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Price range visual */}
            <InView>
              <div
                className="rounded-2xl p-8 border border-gray-200"
                style={{ background: "#f8f8f8" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>
                  Fourchette de prix
                </p>

                {/* Range bar */}
                <div className="relative mb-8">
                  <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>
                    <span>300€</span>
                    <span>600€</span>
                  </div>
                  <div className="h-2 rounded-full w-full" style={{ background: "#e8e8e8" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(to right, #db0000, #ff4444)" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2" style={{ color: "rgba(0,0,0,0.25)" }}>
                    <span>Vidange simple</span>
                    <span>BMW / Porsche complexe</span>
                  </div>
                </div>

                {/* What's included */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "rgba(0,0,0,0.3)" }}>
                    Ce qui influence le tarif
                  </p>
                  {[
                    { factor: "Type et quantité d'huile ATF", impact: "Variable" },
                    { factor: "Remplacement joint de carter", impact: "+30–80€" },
                    { factor: "Crépine interne ou cartouche externe", impact: "+50–150€" },
                    { factor: "Tubes & pièces spécifiques (BMW, Porsche)", impact: "+100–200€" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-xs" style={{ color: "rgba(0,0,0,0.45)" }}>{row.factor}</span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: i === 0 ? "rgba(0,0,0,0.35)" : "#db0000" }}
                      >
                        {row.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </InView>

            {/* Oil types grid */}
            <div>
              <InView>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.3)" }}>
                  Huiles utilisées selon votre boîte
                </p>
              </InView>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {vidangeItems.map((item, i) => (
                  <InView key={i} custom={i}>
                    <div
                      className="rounded-xl p-4 border border-gray-200 group hover:border-red-300 transition-colors duration-300"
                      style={{ background: "#f8f8f8" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mb-3"
                        style={{ background: "#db0000" }}
                      />
                      <p className="text-xs font-bold text-gray-900 mb-1">{item.label}</p>
                      <p className="text-xs" style={{ color: "rgba(0,0,0,0.35)" }}>
                        {item.note}
                      </p>
                    </div>
                  </InView>
                ))}
              </div>

              <InView>
                <div
                  className="rounded-xl p-5 border"
                  style={{ background: "rgba(219,0,0,0.06)", borderColor: "rgba(219,0,0,0.2)" }}
                >
                  <div className="flex gap-3">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#db0000" }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                      Le prix comprend <strong className="text-gray-900">la main-d'œuvre et tous les composants nécessaires</strong> à une vidange réalisée dans les règles de l'art. Méthode par gravité ou flushing (jusqu'à 95–100% de renouvellement de l'huile).
                    </p>
                  </div>
                </div>
              </InView>
            </div>
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — RÉPARATIONS (4 tiers)
        ═══════════════════════════════════════════════════════════ */}
        <section className="pb-10">
          <div className="text-center mb-14">
            <InView>
              <Tag>Prestation #3</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#111111",
                }}
              >
                Réparations boîtes automatiques
              </h2>
            </InView>
            <InView>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>
                Les coûts varient selon la complexité de l'intervention. Chaque réparation commence par notre diagnostic à 90€ — déduit du total.
              </p>
            </InView>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {repairTiers.map((tier, i) => (
              <TierCard key={i} tier={tier} delay={i} />
            ))}
          </div>
        </section>

        <Divider />

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — VIDANGE MOTEUR (NEW)
        ═══════════════════════════════════════════════════════════ */}
        <section className="pb-10">
          <div className="text-center mb-14">
            <InView>
              <Tag>Prestation #4</Tag>
            </InView>
            <InView>
              <h2
                className="font-black leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "#111111",
                }}
              >
                Vidange <span style={{ color: "#db0000" }}>moteur</span>
              </h2>
            </InView>
            <InView>
              <p className="text-sm max-w-2xl mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>
                De <strong className="text-gray-900">79€ à 299€</strong> selon le grade d'huile, la motorisation et le véhicule. Filtre à huile et appoint des niveaux toujours inclus.
              </p>
            </InView>
          </div>

          {/* 4 service cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
            {oilChangeServices.map((service, i) => (
              <OilServiceCard key={i} service={service} delay={i} />
            ))}
          </div>

          {/* Two-column detail block */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* What's included */}
            <InView>
              <div
                className="rounded-2xl p-8 border border-gray-200 h-full"
                style={{ background: "#f8f8f8" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(0,0,0,0.3)" }}>
                  Inclus dans toutes les formules
                </p>
                <div className="space-y-3">
                  {oilIncludes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(219,0,0,0.15)" }}
                      >
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l3 3 5-5" stroke="#db0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Interval note */}
                <div
                  className="mt-8 rounded-xl p-5 border"
                  style={{ background: "rgba(219,0,0,0.06)", borderColor: "rgba(219,0,0,0.2)" }}
                >
                  <div className="flex gap-3 items-start">
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#db0000" }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                      Intervalle recommandé : <strong className="text-gray-900">tous les 10 000 à 20 000 km</strong> selon le constructeur. Un changement d'huile régulier est le premier facteur de longévité moteur.
                    </p>
                  </div>
                </div>
              </div>
            </InView>

            {/* Oil grades grid */}
            <div>
              <InView>
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "rgba(0,0,0,0.3)" }}>
                  Grades d'huile disponibles
                </p>
              </InView>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {oilTypes.map((oil, i) => (
                  <InView key={i} custom={i}>
                    <div
                      className="rounded-xl p-4 border border-gray-200 hover:border-red-300 transition-colors duration-300"
                      style={{ background: "#f8f8f8" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full mb-3"
                        style={{ background: "#db0000" }}
                      />
                      <p className="text-xs font-bold text-gray-900 mb-1">{oil.grade}</p>
                      <p className="text-xs leading-snug" style={{ color: "rgba(0,0,0,0.35)" }}>{oil.usage}</p>
                    </div>
                  </InView>
                ))}
              </div>

              {/* Price summary bar */}
              <InView>
                <div className="rounded-2xl border border-gray-200 overflow-hidden" style={{ background: "#f8f8f8" }}>
                  <div className="px-6 py-4 border-b border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(0,0,0,0.3)" }}>
                      Récapitulatif des tarifs
                    </p>
                  </div>
                  {[
                    { label: "Vidange Standard", price: "79–129€", note: "Huile minérale / semi-synthèse" },
                    { label: "Vidange Premium", price: "129–199€", note: "Full-synthèse longue durée" },
                    { label: "Vidange Prestige", price: "199–299€", note: "Homologuée constructeur" },
                    { label: "Forfait Moteur + Boîte", price: "Dès 299€", note: "Économisez sur la MO" },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{row.label}</p>
                        <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.35)" }}>{row.note}</p>
                      </div>
                      <span
                        className="text-sm font-black"
                        style={{ fontFamily: "'DM Serif Display', serif", color: "#db0000" }}
                      >
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            BOTTOM CTA BAND
        ═══════════════════════════════════════════════════════════ */}
        <section className="pb-28">
          <InView>
            <div
              className="mt-6 rounded-3xl p-10 lg:p-14 border border-gray-200 relative overflow-hidden"
              style={{ background: "#fdf3f3" }}
            >
              <div
                className="absolute inset-0 opacity-100"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.07) 1px,transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(219,0,0,0.06) 0%, transparent 60%)" }}
              />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div>
                  <p
                    className="font-black text-gray-900 mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  >
                    Besoin d'un devis précis ?
                  </p>
                  <p className="text-sm max-w-lg" style={{ color: "rgba(0,0,0,0.45)" }}>
                    Chaque véhicule est différent. Contactez-nous avec l'immatriculation et le modèle exact — nous vous répondons sous 24h avec un diagnostic complet et un devis transparent.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 font-bold text-xs uppercase tracking-wider text-white rounded-full px-8 h-[50px] transition-all duration-300 hover:scale-[1.03] whitespace-nowrap"
                    style={{ background: "#db0000" }}
                  >
                    Demander un devis
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    to="tel:+33 6 64 41 23 76"
                    className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-wider h-[50px] px-8 rounded-full border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-500 transition-all duration-300 whitespace-nowrap"
                  >
                   +33 6 64 41 23 76
                  </Link>
                </div>
              </div>
            </div>
          </InView>
        </section>

      </div>
    </main>
  );
}