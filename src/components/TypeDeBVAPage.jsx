"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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

/* ─── DATA — brand → model → year → BVA type ──────────────────────────────── */
const DATA = {
  Renault: {
    Clio: {
      "2013–2019": { type: "EDC (Double embrayage sec)", code: "EDC6", detail: "Boîte robotisée à 6 rapports à double embrayage sec. Légère et compacte, elle équipe les petites cylindrées Renault." },
      "2019–2024": { type: "EDC (Double embrayage mouillé)", code: "EDC7", detail: "7 rapports, double embrayage mouillé. Amélioration significative par rapport à la version sèche, meilleure gestion thermique." },
    },
    Mégane: {
      "2009–2016": { type: "EDC (Double embrayage sec)", code: "EDC6", detail: "Boîte robotisée 6 rapports à double embrayage sec. Modèles diesels et essences de gamme moyenne." },
      "2016–2024": { type: "EDC (Double embrayage mouillé)", code: "EDC7", detail: "7 rapports, double embrayage mouillé. Version améliorée avec meilleur comportement thermique." },
    },
    Kadjar: {
      "2015–2022": { type: "EDC (Double embrayage mouillé)", code: "EDC7", detail: "7 rapports double embrayage mouillé, adapté aux SUV compacts." },
    },
    Scenic: {
      "2016–2023": { type: "EDC (Double embrayage mouillé)", code: "EDC7", detail: "7 rapports double embrayage mouillé." },
    },
    Talisman: {
      "2016–2022": { type: "EDC (Double embrayage mouillé)", code: "EDC7", detail: "7 rapports double embrayage mouillé, grand confort pour la berline haut de gamme Renault." },
    },
  },
  Volkswagen: {
    Golf: {
      "2008–2013 (DSG6)": { type: "DSG 6 rapports (DQ250)", code: "DQ250", detail: "Double embrayage mouillé 6 rapports. Robuste et fiable, répandu sur les motorisations 2.0 TDI et TSI." },
      "2008–2013 (DSG7)": { type: "DSG 7 rapports (DQ200)", code: "DQ200", detail: "Double embrayage sec 7 rapports. Adapté aux petits moteurs (1.2 / 1.4 TSI). Calculateur mécatronique connu pour ses défauts." },
      "2013–2020": { type: "DSG 7 rapports (DQ381)", code: "DQ381", detail: "Double embrayage mouillé 7 rapports. Remplace le DQ250 sur les grosses cylindrées, très fiable." },
      "2020–2024": { type: "DSG 7 rapports (DQ381)", code: "DQ381", detail: "Dernière génération DSG mouillée 7 rapports, technologie hybride compatible." },
    },
    Passat: {
      "2005–2010": { type: "DSG 6 rapports (DQ250)", code: "DQ250", detail: "Double embrayage mouillé 6 rapports. Génération pionnière du DSG Volkswagen." },
      "2010–2015": { type: "DSG 6 rapports (DQ250)", code: "DQ250", detail: "Double embrayage mouillé 6 rapports." },
      "2015–2024": { type: "DSG 7 rapports (DQ381)", code: "DQ381", detail: "7 rapports mouillé, traction ou 4Motion. Boîte robuste et bien adaptée à la Passat." },
    },
    Tiguan: {
      "2007–2016": { type: "DSG 6 rapports (DQ250)", code: "DQ250", detail: "Double embrayage mouillé 6 rapports, traction intégrale 4Motion disponible." },
      "2016–2024": { type: "DSG 7 rapports (DQ381)", code: "DQ381", detail: "7 rapports mouillé. Très répandu sur les Tiguan 2.0 TDI et TSI." },
    },
    Polo: {
      "2009–2017": { type: "DSG 7 rapports (DQ200)", code: "DQ200", detail: "Double embrayage sec 7 rapports pour les petits moteurs 1.2 / 1.4 TSI." },
      "2017–2024": { type: "DSG 7 rapports (DQ200)", code: "DQ200", detail: "7 rapports sec, même architecture, compatible boîtiers mécatroniques mis à jour." },
    },
  },
  BMW: {
    "Série 3": {
      "2005–2013 (6HP)": { type: "ZF 6HP — Convertisseur de couple", code: "6HP19/26", detail: "Boîte ZF 6 rapports à convertisseur de couple. Extrêmement robuste et répandue sur les BMW E90/E92. Module de valve body souvent à surveiller." },
      "2012–2019 (8HP)": { type: "ZF 8HP — Convertisseur de couple", code: "8HP45/70", detail: "8 rapports ZF à convertisseur de couple. Réputée pour son rendement et son agrément. Légère usure du mécatronique après 150 000 km." },
      "2019–2024": { type: "ZF 8HP — Convertisseur de couple", code: "8HP75", detail: "Dernière génération ZF 8HP, compatible hybride léger 48V sur certaines versions." },
    },
    "Série 5": {
      "2003–2010 (6HP)": { type: "ZF 6HP — Convertisseur de couple", code: "6HP26", detail: "6 rapports ZF, boîte costaud adaptée aux fortes cylindrées. Huile ATF à changer toutes les 60 000 km recommandé." },
      "2010–2017 (8HP)": { type: "ZF 8HP — Convertisseur de couple", code: "8HP70", detail: "ZF 8HP 8 rapports, le standard sur la F10. Excellente longévité avec entretien régulier." },
      "2017–2024": { type: "ZF 8HP — Convertisseur de couple", code: "8HP75", detail: "Série 5 G30 — 8HP75 avec intégration hybride mild-hybrid." },
    },
    "Série 1": {
      "2007–2014": { type: "ZF 6HP — Convertisseur de couple", code: "6HP19", detail: "6 rapports ZF compact pour les E81/E87. Fiable avec entretien régulier." },
      "2014–2024": { type: "ZF 8HP — Convertisseur de couple", code: "8HP45", detail: "8 rapports ZF. Monté sur les F20/F40 avec moteurs 2.0 essence ou diesel." },
    },
    X5: {
      "2000–2006": { type: "ZF 5HP — Convertisseur de couple", code: "5HP24", detail: "5 rapports ZF. Boîte ancienne génération, robuste mais demandant un entretien suivi." },
      "2006–2013": { type: "ZF 6HP — Convertisseur de couple", code: "6HP26X", detail: "6 rapports ZF 4×4. Bien adaptée au SUV, valve body à surveiller sur les hauts kilométrages." },
      "2013–2024": { type: "ZF 8HP — Convertisseur de couple", code: "8HP90", detail: "8 rapports ZF, version renforcée pour les grosses cylindrées SUV." },
    },
  },
  Audi: {
    A3: {
      "2003–2012 (S-tronic 6)": { type: "S-tronic DSG6 (DQ250)", code: "DQ250", detail: "Identique au DSG6 Volkswagen. Double embrayage mouillé 6 rapports sur les moteurs 2.0 TDI/TFSI." },
      "2003–2012 (S-tronic 7)": { type: "S-tronic DSG7 (DQ200)", code: "DQ200", detail: "Double embrayage sec 7 rapports. Moteurs 1.2 / 1.4 TFSI. Mécatronique (calculateur de valve body) souvent défaillant." },
      "2012–2024": { type: "S-tronic DSG7 (DQ381)", code: "DQ381", detail: "7 rapports mouillé, nouvelle génération. Beaucoup plus fiable que le DQ200." },
    },
    A4: {
      "2007–2016 (S-tronic)": { type: "S-tronic DSG7 (DL501)", code: "DL501", detail: "Double embrayage mouillé 7 rapports, spécifique aux Audi A4/A5/Q5 quattro. Complexe mais performant." },
      "2016–2024 (S-tronic)": { type: "S-tronic DSG7 (DQ381)", code: "DQ381", detail: "7 rapports mouillé, version améliorée plus fiable." },
      "Toutes (Tiptronic)": { type: "ZF 8HP — Convertisseur de couple", code: "8HP45/55", detail: "8 rapports ZF monté sur les versions quattro haut de gamme. Très fiable." },
    },
    Q5: {
      "2008–2017": { type: "S-tronic DSG7 (DL501)", code: "DL501", detail: "Double embrayage mouillé 7 rapports quattro. Boîte puissante mais gourmande en entretien." },
      "2017–2024": { type: "S-tronic DSG7 (DQ381)", code: "DQ381", detail: "7 rapports mouillé nouvelle génération, nettement plus robuste." },
    },
    A6: {
      "Toutes versions": { type: "ZF 8HP — Convertisseur de couple", code: "8HP55/75", detail: "8 rapports ZF à convertisseur de couple. Boîte standard sur l'A6 depuis 2011, très fiable et agréable." },
    },
  },
  Mercedes: {
    "Classe A / B": {
      "2012–2018 (7G-DCT)": { type: "7G-DCT — Double embrayage mouillé", code: "7G-DCT", detail: "7 rapports double embrayage mouillé Getrag/Mercedes. Mécatronique (calculateur + valve body) souvent défaillant — symptômes : à-coups, vibrations, passage de rapports difficile." },
      "2018–2024": { type: "8G-DCT — Double embrayage mouillé", code: "8G-DCT", detail: "8 rapports double embrayage mouillé. Nouvelle génération, plus souple et plus fiable." },
    },
    "Classe C": {
      "2000–2011 (7G-Tronic)": { type: "7G-Tronic — Convertisseur de couple", code: "722.9", detail: "7 rapports Mercedes à convertisseur de couple. Fiable mais sensible à la qualité de l'huile ATF." },
      "2011–2021 (7G-Tronic+)": { type: "7G-Tronic Plus — Convertisseur de couple", code: "722.9+", detail: "Version améliorée du 722.9 avec démarrage stop & start intégré." },
      "2021–2024 (9G-Tronic)": { type: "9G-Tronic — Convertisseur de couple", code: "725.0", detail: "9 rapports à convertisseur de couple. Très doux et économique. Sensible à la contamination de l'huile." },
    },
    "Classe E": {
      "2002–2009 (7G-Tronic)": { type: "7G-Tronic — Convertisseur de couple", code: "722.9", detail: "7 rapports convertisseur de couple. Pionnier de la transmission Mercedes moderne." },
      "2009–2016 (7G-Tronic+)": { type: "7G-Tronic Plus — Convertisseur de couple", code: "722.9+", detail: "7 rapports amélioré stop & start." },
      "2016–2024 (9G-Tronic)": { type: "9G-Tronic — Convertisseur de couple", code: "725.0", detail: "9 rapports. Très apprécié pour son confort de conduite." },
    },
    "Classe GLC": {
      "2015–2024": { type: "9G-Tronic — Convertisseur de couple", code: "725.0", detail: "9 rapports à convertisseur de couple monté sur tous les GLC. Fiable avec entretien régulier." },
    },
  },
  Peugeot: {
    "308": {
      "2013–2021 (EAT6)": { type: "EAT6 — Convertisseur de couple (Aisin)", code: "AF40", detail: "6 rapports Aisin à convertisseur de couple. Boîte fiable et douce, entretien recommandé tous les 60 000 km." },
      "2021–2024 (EAT8)": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports Aisin. Très agréable, rendement amélioré. Même logique d'entretien." },
    },
    "3008": {
      "2016–2021 (EAT6)": { type: "EAT6 — Convertisseur de couple (Aisin)", code: "AF40", detail: "6 rapports Aisin. SUV compact, boîte bien adaptée à l'usage urbain/route." },
      "2021–2024 (EAT8)": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports Aisin. Version actualisée du 3008." },
    },
    "5008": {
      "2017–2024": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports Aisin. Bon comportement sur le grand SUV familial." },
    },
    "508": {
      "2011–2018 (EAT6)": { type: "EAT6 — Convertisseur de couple (Aisin)", code: "AF40", detail: "6 rapports Aisin. Berline/break, confort prioritaire." },
      "2018–2024 (EAT8)": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports. Nouvelle 508, très réussie." },
    },
  },
  Citroën: {
    C4: {
      "2010–2018 (EAT6)": { type: "EAT6 — Convertisseur de couple (Aisin)", code: "AF40", detail: "6 rapports Aisin à convertisseur de couple. Partagée avec Peugeot, fiable et bien éprouvée." },
      "2020–2024 (EAT8)": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports Aisin sur la nouvelle C4." },
    },
    C5: {
      "2008–2017 (EAT6)": { type: "EAT6 — Convertisseur de couple (Aisin)", code: "AF40", detail: "6 rapports Aisin. Confort prioritaire, adapté à la grande routière Citroën." },
    },
    "C5 Aircross": {
      "2018–2024 (EAT8)": { type: "EAT8 — Convertisseur de couple (Aisin)", code: "AW8F35", detail: "8 rapports Aisin. SUV familial, très bon comportement de la boîte." },
    },
  },
  Toyota: {
    Yaris: {
      "2006–2020": { type: "CVT — Variateur continu", code: "K110", detail: "Boîte CVT (variation continue) légère et économique. Souple en ville mais peu sportive. Vidange recommandée tous les 40 000 km." },
      "2020–2024 (hybride)": { type: "e-CVT — Variateur électrique hybride", code: "P710", detail: "CVT électrique du système hybride Toyota THS II. Aucun embrayage, fonctionnement uniquement électromécanique." },
    },
    Corolla: {
      "2007–2019": { type: "CVT — Variateur continu", code: "K111", detail: "CVT à courroie, bien adapté à la Corolla. Attention à la qualité de l'huile spécifique Multi CVT." },
      "2019–2024 (hybride)": { type: "e-CVT — Variateur électrique hybride", code: "P710", detail: "CVT électrique hybride THS II. Très fiable sur la durée, peu de pannes enregistrées." },
    },
    "C-HR": {
      "2016–2024": { type: "CVT / e-CVT hybride", code: "K120/P710", detail: "CVT ou e-CVT selon version. L'essentiel du marché est hybride (e-CVT)." },
    },
    "RAV4": {
      "2013–2019": { type: "CVT — Variateur continu", code: "K120", detail: "CVT adaptée au gabarit SUV. Vidange régulière indispensable." },
      "2019–2024 (hybride)": { type: "e-CVT — Variateur électrique hybride", code: "P812", detail: "CVT électrique AWD intégral sur le RAV4 hybride." },
    },
  },
  Ford: {
    Fiesta: {
      "2011–2019 (PowerShift)": { type: "PowerShift DCT — Double embrayage sec", code: "DPS6", detail: "6 rapports double embrayage sec Ford/Getrag. Boîte réputée pour ses problèmes de tremblement et de glissement. Calculateur sensible." },
    },
    Focus: {
      "2011–2019 (PowerShift)": { type: "PowerShift DCT — Double embrayage sec", code: "DPS6", detail: "Même boîte que la Fiesta, problèmes similaires connus. Ford a émis plusieurs rappels." },
      "2019–2024 (EcoBlue)": { type: "PowerShift DCT 8 rapports", code: "8F35", detail: "Double embrayage sec 8 rapports, nouvelle génération plus fiable." },
    },
    Kuga: {
      "2013–2020": { type: "PowerShift DCT 6 rapports", code: "6F35", detail: "Double embrayage sec 6 rapports. Même famille que le DPS6, surveillance recommandée." },
      "2020–2024": { type: "CVT / eAWD hybride", code: "—", detail: "Selon version : CVT ou transmission électrique AWD (hybride rechargeable)." },
    },
  },
};

/* ─── BVA TYPE COLOR MAP ──────────────────────────────────────────────────── */
const TYPE_COLORS = {
  "DSG": { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", text: "text-blue-700" },
  "EDC": { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-600", text: "text-violet-700" },
  "ZF": { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-600", text: "text-amber-800" },
  "S-tronic": { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-600", text: "text-blue-700" },
  "7G-Tronic": { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-700", text: "text-slate-700" },
  "9G-Tronic": { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-700", text: "text-slate-700" },
  "7G-DCT": { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-700", text: "text-slate-700" },
  "8G-DCT": { bg: "bg-slate-50", border: "border-slate-200", badge: "bg-slate-700", text: "text-slate-700" },
  "EAT": { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-600", text: "text-orange-700" },
  "CVT": { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", text: "text-green-700" },
  "e-CVT": { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", text: "text-green-700" },
  "PowerShift": { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-600", text: "text-red-700" },
};

function getTypeColor(typeName) {
  for (const [key, val] of Object.entries(TYPE_COLORS)) {
    if (typeName.includes(key)) return val;
  }
  return { bg: "bg-neutral-50", border: "border-neutral-200", badge: "bg-neutral-600", text: "text-neutral-700" };
}

/* ─── animation presets ────────────────────────────────────────────────────── */
const slideUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── custom select ─────────────────────────────────────────────────────────── */
function Select({ label, value, onChange, options, disabled, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500" style={{ fontFamily: "'Syne', sans-serif" }}>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full appearance-none rounded-xl border px-4 py-3.5 pr-10 text-sm font-medium
            bg-white text-neutral-800 outline-none transition-all duration-200
            ${disabled
              ? "border-neutral-100 text-neutral-300 cursor-not-allowed bg-neutral-50"
              : "border-neutral-200 hover:border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100 cursor-pointer shadow-sm"
            }
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${disabled ? "text-neutral-300" : "text-red-600"}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── result card ───────────────────────────────────────────────────────────── */
function ResultCard({ result, brand, model, year }) {
  const colors = getTypeColor(result.type);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${brand}-${model}-${year}`}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-6 mt-2`}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">
              {brand} {model} — {year}
            </p>
            <h3 className="text-xl font-extrabold text-neutral-900 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              {result.type}
            </h3>
          </div>
          <span className={`shrink-0 ${colors.badge} text-white text-xs font-bold px-3 py-1.5 rounded-lg`}>
            {result.code}
          </span>
        </div>

        {/* divider */}
        <div className="h-px bg-neutral-200 mb-4" />

        {/* detail */}
        <p className="text-neutral-600 text-sm leading-relaxed mb-5">{result.detail}</p>

        {/* CTA */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors duration-200 shadow-md shadow-red-600/20"
        >
          Prendre rendez-vous
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </AnimatePresence>
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

/* ─── video placeholder ─────────────────────────────────────────────────────── */


/* ══════════════════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function TypeDeBVAPage() {
  const [brand, setBrand]   = useState("");
  const [model, setModel]   = useState("");
  const [year, setYear]     = useState("");

  const brands  = Object.keys(DATA);
  const models  = brand ? Object.keys(DATA[brand]) : [];
  const years   = brand && model ? Object.keys(DATA[brand][model]) : [];
  const result  = brand && model && year ? DATA[brand][model][year] : null;

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const toolRef = useRef(null);
  const toolInView = useInView(toolRef, { once: true, margin: "-60px" });

  function handleBrandChange(val) {
    setBrand(val);
    setModel("");
    setYear("");
  }
  function handleModelChange(val) {
    setModel(val);
    setYear("");
  }

  return (
    <>
      <FontLoader />

      <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white text-neutral-800 min-h-screen antialiased">

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#0e0e0e]">
          <div className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-red-600/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-red-600/6 blur-[80px]" />

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-[3px] w-full bg-gradient-to-r from-red-600 via-red-500 to-transparent"
          />

          <div className="container mx-auto px-6 md:px-14 py-24 md:py-32 relative z-10">
            {/* breadcrumb */}
            <motion.nav
              variants={slideUp} initial="hidden" animate="show"
              className="flex items-center gap-2 text-xs text-neutral-500 mb-10 font-medium tracking-wide"
            >
              {["Accueil", "Ressources", "Type de BVA"].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-2">
                  <Link to="#" className={i === arr.length - 1 ? "text-red-500 pointer-events-none" : "hover:text-red-400 transition-colors"}>
                    {item}
                  </Link>
                  {i < arr.length - 1 && <span className="text-neutral-700">/</span>}
                </span>
              ))}
            </motion.nav>

            <div className="max-w-3xl" ref={heroRef}>
              <motion.h1
                initial={{ opacity: 0, y: 48 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Trouvez votre<br />
                <span className="text-red-500">boîte automatique</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                className="text-neutral-400 text-lg leading-relaxed max-w-xl"
              >
                Sélectionnez la marque, le modèle et l'année de votre véhicule pour identifier immédiatement le type de boîte de vitesses automatique dont il est équipé.
              </motion.p>

              {/* stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3 mt-8"
              >
                {[
                  { n: "8", label: "Marques" },
                  { n: "30+", label: "Modèles" },
                  { n: "60+", label: "Configurations" },
                  { n: "100%", label: "Gratuit" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                    <span className="font-extrabold text-red-400 text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{s.n}</span>
                    <span className="text-neutral-400 text-xs">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══ MAIN TOOL ═════════════════════════════════════════════════════════ */}
        <main className="container mx-auto px-6 md:px-14 py-16">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT — video */}
            <motion.div
              ref={toolRef}
              initial={{ opacity: 0, x: -56 }}
              animate={toolInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="md:sticky md:top-8"
            >
              <MediaSlot type="video" src="/images/repara1.webm" />

              {/* type legend below video */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  { label: "DSG / S-tronic",    color: "bg-blue-600",    desc: "Double embrayage" },
                  { label: "EDC",               color: "bg-violet-600",  desc: "Double embrayage" },
                  { label: "ZF / Aisin (EAT)",  color: "bg-amber-500",   desc: "Convertisseur" },
                  { label: "CVT / e-CVT",       color: "bg-green-600",   desc: "Variateur continu" },
                  { label: "PowerShift",         color: "bg-red-600",    desc: "Double embrayage sec" },
                  { label: "7G / 9G-Tronic",    color: "bg-slate-600",   desc: "Convertisseur Mercedes" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-2 bg-neutral-50 rounded-xl px-3 py-2 border border-neutral-100">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.color}`} />
                    <div>
                      <p className="text-xs font-semibold text-neutral-800 leading-none">{t.label}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — selector */}
            <motion.div
              initial={{ opacity: 0, x: 56 }}
              animate={toolInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {/* tool header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-red-600 font-mono text-xs font-bold tracking-widest">01</span>
                  <div className="h-px w-8 bg-red-600" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-red-600">Identifiez votre boîte</span>
                </div>
                <h2
                  className="text-3xl font-extrabold text-neutral-900"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Sélectionnez votre véhicule
                </h2>
                <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                  Choisissez la marque, puis le modèle, puis l'année pour identifier votre type de boîte automatique.
                </p>
              </div>

              {/* step indicators */}
              <div className="flex items-center gap-2 mb-6">
                {["Marque", "Modèle", "Année"].map((step, i) => {
                  const active = (i === 0 && !!brand) || (i === 1 && !!model) || (i === 2 && !!year);
                  const current = (i === 0) || (i === 1 && !!brand) || (i === 2 && !!model);
                  return (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                        active ? "bg-red-600 text-white" : current ? "bg-red-50 text-red-600 border border-red-200" : "bg-neutral-100 text-neutral-400"
                      }`}>
                        <span className="font-bold">{i + 1}</span>
                        <span>{step}</span>
                      </div>
                      {i < 2 && <svg className="w-3 h-3 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
                    </div>
                  );
                })}
              </div>

              {/* selects */}
              <div className="space-y-4 mb-6">
                <Select
                  label="Marque"
                  value={brand}
                  onChange={handleBrandChange}
                  options={brands}
                  placeholder="Sélectionnez la marque"
                />
                <Select
                  label="Modèle"
                  value={model}
                  onChange={handleModelChange}
                  options={models}
                  disabled={!brand}
                  placeholder={brand ? "Sélectionnez le modèle" : "Choisissez d'abord une marque"}
                />
                <Select
                  label="Année / Génération"
                  value={year}
                  onChange={setYear}
                  options={years}
                  disabled={!model}
                  placeholder={model ? "Sélectionnez l'année" : "Choisissez d'abord un modèle"}
                />
              </div>

              {/* empty state */}
              {!result && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border-2 border-dashed border-neutral-200 p-8 flex flex-col items-center text-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                      <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-neutral-700" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {!brand ? "Commencez par sélectionner une marque" : !model ? "Sélectionnez maintenant le modèle" : "Choisissez l'année ou la génération"}
                    </p>
                    <p className="text-neutral-400 text-sm">Le type de boîte automatique s'affichera ici.</p>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* result */}
              {result && (
                <ResultCard result={result} brand={brand} model={model} year={year} />
              )}
            </motion.div>
          </div>

          {/* ── INFO CARDS ──────────────────────────────────────────────────── */}
          <div className="mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-red-600 font-mono text-xs font-bold tracking-widest">02</span>
              <div className="h-px w-8 bg-red-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-red-600">Les types de boîtes</span>
            </div>
            <h2
              className="text-3xl font-extrabold text-neutral-900 mb-10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Comprendre les différentes technologies
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "⚙️",
                  title: "Convertisseur de couple",
                  sub: "ZF 6HP / 8HP · 7G-Tronic · EAT6/8 · Aisin",
                  desc: "La technologie la plus répandue et la plus robuste. Un convertisseur hydraulique remplace l'embrayage. Très doux, idéal pour les longues distances. Sensible à la qualité de l'huile ATF.",
                  color: "border-amber-200 bg-amber-50",
                  badge: "bg-amber-500",
                },
                {
                  icon: "🔁",
                  title: "Double embrayage mouillé",
                  sub: "DSG6 DQ250 · DSG7 DQ381 · DL501 · S-tronic · EDC",
                  desc: "Deux embrayages alternent les passages de rapports pour une rapidité extrême. Baigne dans l'huile (mouillé) — plus robuste et adapté aux grosses cylindrées. Le mécatronique est un point de vigilance.",
                  color: "border-blue-200 bg-blue-50",
                  badge: "bg-blue-600",
                },
                {
                  icon: "🔌",
                  title: "Double embrayage sec",
                  sub: "DSG7 DQ200 · EDC6 · PowerShift DPS6",
                  desc: "Sem huile de lubrification sur les embrayages. Léger et économique mais plus sensible aux usures et à-coups en usage urbain. La mécatronique est particulièrement critique sur ces boîtes.",
                  color: "border-violet-200 bg-violet-50",
                  badge: "bg-violet-600",
                },
                {
                  icon: "〰️",
                  title: "CVT — Variateur continu",
                  sub: "Toyota · Nissan · Subaru · Honda",
                  desc: "Pas de rapports fixes : une courroie/poulie fait varier le ratio en continu. Très souple et économique en ville. Huile Multi CVT spécifique indispensable. Durée de vie dépendant fortement de l'entretien.",
                  color: "border-green-200 bg-green-50",
                  badge: "bg-green-600",
                },
                {
                  icon: "⚡",
                  title: "e-CVT hybride",
                  sub: "Toyota THS II · Honda i-MMD",
                  desc: "Pas d'embrayage mécanique : deux moteurs électriques remplacent la boîte. Fiable, sans entretien spécifique fréquent. Réservé aux véhicules hybrides Toyota/Honda.",
                  color: "border-green-200 bg-green-50",
                  badge: "bg-green-500",
                },
                {
                  icon: "🛠️",
                  title: "Bloc mécatronique",
                  sub: "Valve body + Calculateur intégré",
                  desc: "Quelle que soit la boîte, le mécatronique pilote l'hydraulique et les solénoïdes. C'est souvent la première pièce à contrôler en cas de code défaut. Bap Paris est spécialisé dans sa réparation.",
                  color: "border-red-200 bg-red-50",
                  badge: "bg-red-600",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className={`rounded-2xl border-2 p-5 ${card.color} hover:shadow-md transition-shadow duration-200`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-8 h-8 rounded-lg ${card.badge} flex items-center justify-center text-sm`}>
                      {card.icon}
                    </span>
                    <div>
                      <p className="font-extrabold text-neutral-900 text-sm leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>{card.title}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5 leading-tight">{card.sub}</p>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-20 mb-16 rounded-3xl overflow-hidden bg-[#0e0e0e] p-10 md:p-16"
          >
            <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-red-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 right-10 w-56 h-56 rounded-full bg-red-600/10 blur-3xl" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-red-500 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-3">Bap Paris — Experts en boîtes automatiques</p>
                <h3
                  className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Vous avez identifié votre boîte ?<br />
                  <span className="text-red-500">Contactez nos experts.</span>
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-600/30 transition-colors duration-200 text-sm"
                >
                  Demander un diagnostic
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
                <motion.a
                  href="tel:+33XXXXXXXXX" /* ← Replace with your actual number */
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
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