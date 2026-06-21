import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
// ─── EMAILJS CONFIG ──────────────────────────────────────────────────────────
// 🔑 Paste your own EmailJS credentials here:
const EMAILJS_SERVICE_ID  = "service_t9wyhci";   // e.g. "service_xxxxxxx"
const EMAILJS_TEMPLATE_ID = "template_9gj0dhs";  // e.g. "template_xxxxxxx"
const EMAILJS_PUBLIC_KEY  = "09iZyP_yUrwHYvgmS";   // e.g. "AbCdEfGhIjKlMnOp"

// ─── ALL MODELS PER BRAND ────────────────────────────────────────────────────
const BRAND_MODELS = {
  Audi: [
    "A1","A2","A3","A3 Sportback","A4","A4 Allroad","A4 Avant","A5","A5 Sportback",
    "A6","A6 Allroad","A6 Avant","A7","A8","A8 L","Q2","Q3","Q3 Sportback",
    "Q4 e-tron","Q4 Sportback e-tron","Q5","Q5 Sportback","Q6","Q7","Q8",
    "Q8 e-tron","TT","TTS","TT RS","R8","R8 Spyder","RS3","RS3 Sportback",
    "RS4 Avant","RS5","RS5 Sportback","RS6 Avant","RS7","S3","S4","S4 Avant",
    "S5","S5 Sportback","S6","S7","S8","e-tron GT","RS e-tron GT",
  ],
  BMW: [
    "118i","120i","120d","125i","128ti","130i","M135i",
    "218i","220i","220d","225i","230i","M235i","228i Gran Coupé",
    "316i","318i","320i","320d","325i","330i","330e","340i","M340i","M3","M3 Competition",
    "420i","430i","420d","430d","440i","M440i","M4","M4 Competition","418i Gran Coupé",
    "520i","523i","525i","530i","530e","540i","545e","550i","M550i","M5","M5 Competition",
    "630i","640i","630d","640d","M635i","M6","640i Gran Turismo",
    "730i","740i","740e","750i","M760i","730d","740d",
    "840i","850i","M840i","M8","M8 Gran Coupé",
    "X1","X2","X2 M35i","X3","X3 M","X3 M40i","X3 M Competition",
    "X4","X4 M","X4 M40i","X4 M Competition",
    "X5","X5 M","X5 M50i","X5 M Competition",
    "X6","X6 M","X6 M50i","X6 M Competition",
    "X7","X7 M60i","Z4 sDrive20i","Z4 M40i",
    "i3","i4 eDrive40","i4 M50","i5","i7","iX","iX1","iX3","iX M60",
    "M2","M2 Competition",
  ],
  Volkswagen: [
    "Polo","Polo GTI","Golf","Golf Plus","Golf Sportsvan","Golf Alltrack",
    "Golf GTI","Golf GTI Clubsport","Golf R","Golf GTE","Golf Variant",
    "Passat","Passat Alltrack","Passat GTE","Passat Variant",
    "Arteon","Arteon Shooting Brake","Arteon R",
    "Tiguan","Tiguan Allspace","Tiguan R",
    "T-Roc","T-Roc R","T-Cross","Taigo",
    "Touareg","Touareg R","Touran","Grand Touran",
    "Sharan","Caddy","Caddy Maxi",
    "ID.3","ID.4","ID.4 GTX","ID.5","ID.5 GTX","ID.6","ID.7","ID.7 Tourer",
    "Phaeton","Scirocco","Eos","CC","up!","e-up!",
  ],
  SEAT: [
    "Ibiza","Ibiza FR","León","León ST","León FR","León Cupra","León e-Hybrid",
    "León Sportstourer","Arona","Arona FR","Ateca","Ateca FR","Tarraco","Tarraco FR",
    "Alhambra","Mii","Toledo","Exeo","Altea","Altea XL","Altea Freetrack",
    "Cupra Formentor","Cupra Formentor VZ","Cupra Born","Cupra Ateca","Cupra León",
    "Cupra León Sportstourer","Cupra Terramar",
  ],
  Peugeot: [
    "106","107","108","205","206","207","208","208 GT","208 GTi",
    "301","305","306","307","308","308 SW","308 GT","308 GTi",
    "405","406","407","408","508","508 SW","508 PSE","508 RXH",
    "2008","3008","3008 GT","4007","4008","5008","5008 GT",
    "Rifter","Traveller","Expert","Partner","Partner Tepee",
    "RCZ","iOn","e-208","e-2008","e-308","e-3008","e-5008","Bipper","Boxer",
  ],
  "Citroën": [
    "C1","C2","C3","C3 Aircross","C3 Picasso","C3 Pluriel",
    "C4","C4 Cactus","C4 Picasso","C4 SpaceTourer","C4 X","C4 Grand Picasso",
    "C5","C5 Aircross","C5 X","C5 Tourer","C6","C8",
    "Grand C4 Picasso","Grand C4 SpaceTourer",
    "Berlingo","Berlingo Multispace","SpaceTourer",
    "DS3","DS3 Crossback","DS4","DS4 Crossback","DS5","DS7 Crossback","DS9",
    "ë-C4","ë-C4 X","ë-Berlingo","ë-SpaceTourer","C-Zero","C-Elysée",
    "Xantia","Xsara","Xsara Picasso","ZX","Saxo","Jumpy","Jumper",
  ],
  Renault: [
    "Twingo","Twingo RS","Clio","Clio RS","Clio RS Trophy","Clio E-Tech",
    "Mégane","Mégane RS","Mégane RS Trophy","Mégane E-Tech","Mégane Grandtour",
    "Laguna","Laguna Coupé","Laguna GT","Talisman","Talisman Estate",
    "Fluence","Kangoo","Kangoo E-Tech","Scénic","Grand Scénic","Scénic E-Tech",
    "Captur","Captur E-Tech","Kadjar","Koleos","Espace","Grand Espace",
    "Vel Satis","Safrane","Zoe","Austral","Austral E-Tech","Arkana",
    "Symbioz","Master","Trafic","Alaskan","Latitude",
  ],
  Porsche: [
    "911 Carrera","911 Carrera S","911 Carrera 4","911 Carrera 4S",
    "911 Carrera T","911 Targa 4","911 Targa 4S","911 Targa 4 GTS",
    "911 Turbo","911 Turbo S","911 GT3","911 GT3 RS","911 GT3 Touring",
    "911 GT2 RS","911 GTS","911 Dakar","911 Sport Classic",
    "718 Boxster","718 Boxster S","718 Boxster GTS","718 Boxster Spyder",
    "718 Cayman","718 Cayman S","718 Cayman GTS","718 Cayman GT4",
    "718 Cayman GT4 RS","718 Spyder RS",
    "Cayenne","Cayenne S","Cayenne GTS","Cayenne Turbo","Cayenne Turbo S",
    "Cayenne E-Hybrid","Cayenne Turbo E-Hybrid","Cayenne Coupé","Cayenne Turbo Coupé",
    "Macan","Macan S","Macan GTS","Macan Turbo","Macan Electric","Macan 4 Electric",
    "Panamera","Panamera 4","Panamera 4S","Panamera GTS","Panamera Turbo",
    "Panamera Turbo S","Panamera E-Hybrid","Panamera Turbo S E-Hybrid",
    "Panamera Sport Turismo","Panamera Executive",
    "Taycan","Taycan 4S","Taycan GTS","Taycan Turbo","Taycan Turbo S",
    "Taycan Sport Turismo","Taycan Cross Turismo","Taycan Turbo GT",
  ],
  Jaguar: [
    "XE","XE S","XE 300 Sport","XE SV Project 8",
    "XF","XF Sportbrake","XF S","XF 300 Sport","XF Portfolio",
    "XJ","XJ L","XJ Supersport","XJ Ultimate",
    "XK","XKR","XKR-S","XK Portfolio",
    "F-Type","F-Type S","F-Type R","F-Type SVR","F-Type P450",
    "F-Pace","F-Pace S","F-Pace SVR","F-Pace R-Dynamic","F-Pace P400e",
    "E-Pace","E-Pace R-Dynamic","E-Pace P300e",
    "I-Pace","I-Pace EV400","I-Pace S","I-Pace SE","I-Pace HSE",
  ],
  Autres: [],
};

const CAR_BRANDS = Object.keys(BRAND_MODELS);

const SERVICES = [
  "Diagnostic",
  "Réparation boîte automatique",
  "Vidange huile BVA",
  "Montage BVA",
  "Mécatronique",
  "Autre",
];

const HOURS = [
  { day: "Lun – Ven", time: "08h00 – 18h00", closed: false },
  { day: "Samedi",    time: "09h00 – 13h00", closed: false },
  { day: "Dimanche",  time: "Fermé",          closed: true  },
];

const INFO_CARDS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
    ),
    label: "Téléphone",
    value: "+33 6 64 41 23 76",
    href: "tel:+33664412376",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "Email",
    value: "atelierazeem@gmail.com",
    href: "mailto:atelierazeem@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    label: "Adresse",
    value: "3 Rue Anatole France\n93230 Romainville, France",
    href: "https://maps.app.goo.gl/bjqKVS9KWkoAhp649",
  },
];

const SocialLinks = [
  {
    label: "Facebook",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671C19.369,9.312,19.378,9.597,19.378,12s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31C14.688,19.369,14.403,19.378,12,19.378s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622M12,3C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3z M12,7.378c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.4l5.3 2.6-5.3 2.5z" />
      </svg>
    ),
  },
];

// ─── Confetti hook ────────────────────────────────────────────────────────────
function useConfetti() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.confetti) { ref.current = window.confetti; return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
    s.onload = () => { ref.current = window.confetti; };
    document.head.appendChild(s);
  }, []);
  return useCallback((ox, oy) => {
    const fn = ref.current; if (!fn) return;
    const colors = ["#db0000", "#ff4444", "#ffffff", "#ff8888", "#111111"];
    fn({ particleCount: 80, spread: 70, origin: { x: ox, y: oy }, colors, startVelocity: 45, ticks: 140, zIndex: 9999 });
    fn({ particleCount: 35, angle: 60,  spread: 60, startVelocity: 65, origin: { x: 0,   y: 0.65 }, colors });
    fn({ particleCount: 35, angle: 120, spread: 60, startVelocity: 65, origin: { x: 1,   y: 0.65 }, colors });
  }, []);
}

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function StyledSelect({ id, name, value, onChange, children, required, disabled }) {
  return (
    <div className="relative">
      <select
        id={id} name={name} value={value} onChange={onChange}
        required={required} disabled={disabled}
        className="w-full appearance-none bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 font-medium outline-none focus:border-red-600 focus:shadow-[3px_3px_0_rgba(219,0,0,0.12)] transition-all cursor-pointer pr-10 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke={disabled ? "#ccc" : "#db0000"} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function InputField({ id, name, type = "text", placeholder, value, onChange, required }) {
  return (
    <input
      id={id} name={name} type={type} placeholder={placeholder}
      value={value} onChange={onChange} required={required}
      className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:shadow-[3px_3px_0_rgba(219,0,0,0.12)] transition-all placeholder:text-gray-400"
      style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600 whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function PrefilledBadge({ brand, model }) {
  if (!brand) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 border-l-4 border-l-red-600"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#db0000">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
      </svg>
      <p className="text-sm text-red-700 font-semibold">
        Véhicule pré-sélectionné :&nbsp;
        <span className="font-extrabold">{brand}{model ? ` — ${model}` : ""}</span>
      </p>
    </motion.div>
  );
}

// ─── Success Overlay (full-screen celebration popup) ─────────────────────────
function SuccessOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center px-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.78, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white max-w-md w-full p-10 text-center"
        style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
      >
        {/* Red top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

        {/* Animated checkmark circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-red-600 flex items-center justify-center"
        >
          <motion.svg
            width="34" height="34" viewBox="0 0 24 24" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          >
            <motion.path
              d="M4 12.5L9 17.5L20 7"
              stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-[26px] font-extrabold text-[#111] tracking-[-0.03em] mb-2"
        >
          Message envoyé !
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-sm text-gray-500 mb-1 leading-[1.7]"
        >
          Merci pour votre demande. Notre équipe vous répondra dans les plus brefs délais.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-xs text-gray-400 mb-8"
        >
          Réponse garantie sous 24h ouvrées.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-stretch justify-center gap-0 mb-8 border border-gray-200"
        >
          {[
            { num: "24h",   label: "Temps de réponse" },
            { num: "100%",  label: "Satisfaction client" },
            { num: "10+",   label: "Ans d'expérience" },
          ].map(({ num, label }, i) => (
            <div key={i} className={`flex-1 py-4 px-2 text-center ${i < 2 ? "border-r border-gray-200" : ""}`}>
              <p className="text-[18px] font-extrabold text-red-600 tracking-tight leading-none mb-1">{num}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">{label}</p>
            </div>
          ))}
        </motion.div>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 bg-red-600 text-white text-[11px] font-bold uppercase tracking-[0.18em] transition-colors hover:bg-red-700 border-none cursor-pointer"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          Fermer
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function BAPContactPage() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const prefilledBrand = params.get("brand") || "";
  const prefilledModel = params.get("model") || "";

  const EMPTY = {
    nom: "", prenom: "", email: "", tel: "",
    immat: "", marque: prefilledBrand, modele: prefilledModel,
    service: "", message: "",
  };

  const [form, setForm]         = useState(EMPTY);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const availableModels = BRAND_MODELS[form.marque] || [];
  const submitBtnRef    = useRef(null);
  const fireConfetti    = useConfetti();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "marque") {
      setForm((prev) => ({ ...prev, marque: value, modele: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nom:          form.nom,
          prenom:       form.prenom,
          fullName:     `${form.prenom} ${form.nom}`,
          email:        form.email,
          tel:          form.tel || "Non renseigné",
          immat:        form.immat,
          marque:       form.marque,
          modele:       form.modele || "Non précisé",
          service:      form.service || "Non précisé",
          message:      form.message,
          submittedAt:  new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" }),
        },
        EMAILJS_PUBLIC_KEY
      );

      // Fire confetti from submit button position
      if (submitBtnRef.current) {
        const r = submitBtnRef.current.getBoundingClientRect();
        fireConfetti(
          (r.left + r.width / 2) / window.innerWidth,
          (r.top  + r.height / 2) / window.innerHeight
        );
      }

      setShowSuccess(true);
      setForm(EMPTY);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-white font-['Bai_Jamjuree',sans-serif]" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Bai Jamjuree', sans-serif; }
        .info-card-hover { transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s; }
        .info-card-hover:hover { border-color: #db0000; box-shadow: 4px 4px 0 #db0000; transform: translate(-2px,-2px); }
        .btn-submit-hover:hover:not(:disabled) { background: #a80000 !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(219,0,0,0.3); }
        .btn-submit-hover:active:not(:disabled) { transform: translateY(0); }
        .nav-link-active { color: #db0000; border-bottom: 2px solid #db0000; }
        .nav-link:hover { color: #db0000; }
        .topbar-link:hover { color: #fff; }
        .footer-social:hover { color: #db0000; }
        .btn-directions { transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-directions:hover { background: #a80000 !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(219,0,0,0.35); }
        textarea { font-family: 'Bai Jamjuree', sans-serif; }
        .map-overlay-pulse { animation: pulse-pin 2s ease-in-out infinite; }
        @keyframes pulse-pin { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.15);opacity:0.7} }
        .hero-glow { background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(219,0,0,0.12) 0%, transparent 70%); }
        .number-shimmer { background: linear-gradient(90deg, #db0000 0%, #ff4444 50%, #db0000 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s linear infinite; }
        @keyframes shimmer { 0%{background-position:0% center} 100%{background-position:200% center} }
        .model-badge { animation: badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes badgePop { 0%{transform:scale(0.85);opacity:0} 100%{transform:scale(1);opacity:1} }
        .error-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake { 10%,90%{transform:translateX(-2px)} 20%,80%{transform:translateX(3px)} 30%,50%,70%{transform:translateX(-4px)} 40%,60%{transform:translateX(4px)} }
      `}</style>

      {/* ── Success overlay ── */}
      <AnimatePresence>
        {showSuccess && <SuccessOverlay onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>

      {/* ── HERO ── */}
      <div className="bg-[#111] px-10 pt-14 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600" />
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-10 top-1/2 -translate-y-1/2 text-[120px] font-extrabold tracking-[-0.06em] text-white/[0.04] leading-none pointer-events-none select-none hidden lg:block"
        >
          CONTACT
        </motion.div>
        <div className="max-w-[1400px] mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-5"
          >
            <Link to="/" className="text-white/40 text-xs tracking-[0.06em] no-underline uppercase hover:text-white/70 transition-colors">Accueil</Link>
            <span className="text-white/20 text-[11px]">›</span>
            <span className="text-red-600 text-xs tracking-[0.06em] uppercase font-bold">Contact</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[clamp(32px,5vw,56px)] font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
          >
            Parlons de votre<br />
            <span className="text-red-600">boîte automatique</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-3.5 text-[15px] text-white/45 max-w-[480px] font-normal"
          >
            Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre projet.
          </motion.p>
          <motion.a
            href="tel:+33664412376"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.4 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-3 bg-white/[0.06] border border-white/10 px-5 py-3 no-underline group"
          >
            <span className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
            </span>
            <span className="number-shimmer text-[18px] font-extrabold tracking-[-0.01em]">+33 6 64 41 23 76</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* ── MAIN SECTION ── */}
      <section>
        <div className="max-w-[1400px] mx-auto px-10 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-20 items-start">

          {/* LEFT: INFO */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <SectionLabel>Informations</SectionLabel>
            <motion.div variants={fadeUp} className="mb-10">
              <h2 className="text-[28px] font-extrabold text-[#111] tracking-[-0.02em] leading-[1.15] mb-6">
                BAP <span className="text-red-600">Paris</span><br />à votre service
              </h2>
            </motion.div>
            <div className="flex flex-col gap-3">
              {INFO_CARDS.map((card, i) => (
                <motion.div
                  key={card.label} variants={fadeUp} custom={i}
                  className="info-card-hover flex items-start gap-4 p-5 border border-gray-200 cursor-default"
                >
                  <div className="w-10 h-10 bg-red-600 flex items-center justify-center text-white flex-shrink-0">{card.icon}</div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-1">{card.label}</div>
                    {card.href ? (
                      <Link to={card.href} target={card.label === "Adresse" ? "_blank" : undefined} rel="noopener noreferrer"
                        className="text-[15px] font-semibold text-[#111] no-underline block leading-snug hover:text-red-600 transition-colors whitespace-pre-line">
                        {card.value}
                      </Link>
                    ) : (
                      <span className="text-[15px] font-semibold text-[#111] block leading-snug whitespace-pre-line">{card.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Hours */}
            <motion.div variants={fadeUp} custom={4} className="mt-10">
              <SectionLabel>Horaires</SectionLabel>
              <div className="border border-gray-200">
                {HOURS.map((row, i) => (
                  <motion.div
                    key={row.day}
                    initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className={`grid grid-cols-2 ${i < HOURS.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 border-r border-gray-200">{row.day}</div>
                    <div className={`px-4 py-3 text-sm font-semibold ${row.closed ? "text-red-600" : "text-[#111]"}`}>{row.time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel>Formulaire de contact</SectionLabel>
            <h2 className="text-[28px] font-extrabold text-[#111] tracking-[-0.02em] leading-[1.15] mb-2">
              Vous avez une <span className="text-red-600">question ?</span>
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>

            <AnimatePresence>
              {prefilledBrand && <PrefilledBadge brand={prefilledBrand} model={prefilledModel} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
              {/* Row 1: Nom / Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nom" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Nom *</label>
                  <InputField id="nom" name="nom" placeholder="Votre nom" value={form.nom} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prenom" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Prénom *</label>
                  <InputField id="prenom" name="prenom" placeholder="Votre prénom" value={form.prenom} onChange={handleChange} required />
                </div>
              </div>

              {/* Row 2: Email / Tel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Email *</label>
                  <InputField id="email" name="email" type="email" placeholder="votre@email.fr" value={form.email} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tel" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Téléphone</label>
                  <InputField id="tel" name="tel" type="tel" placeholder="+33 6 xx xx xx xx" value={form.tel} onChange={handleChange} />
                </div>
              </div>

              {/* Row 3: Immat / Marque */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="immat" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Immatriculation *</label>
                  <InputField id="immat" name="immat" placeholder="AB-123-CD" value={form.immat} onChange={handleChange} required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="marque" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 flex items-center gap-1.5">
                    Marque du véhicule *
                    {form.marque && prefilledBrand === form.marque && (
                      <span className="model-badge inline-flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>Auto
                      </span>
                    )}
                  </label>
                  <StyledSelect id="marque" name="marque" value={form.marque} onChange={handleChange} required>
                    <option value="">Sélectionner...</option>
                    {CAR_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </StyledSelect>
                </div>
              </div>

              {/* Row 4: Modèle */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="modele" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500 flex items-center gap-2">
                  Modèle du véhicule
                  {form.modele && prefilledModel === form.modele && (
                    <span className="model-badge inline-flex items-center gap-1 bg-red-100 text-red-600 text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>Auto
                    </span>
                  )}
                </label>
                <StyledSelect
                  id="modele" name="modele" value={form.modele} onChange={handleChange}
                  disabled={!form.marque || availableModels.length === 0}
                >
                  <option value="">
                    {!form.marque ? "Sélectionnez d'abord une marque..." : availableModels.length === 0 ? "Aucun modèle disponible" : "Sélectionner un modèle..."}
                  </option>
                  {availableModels.map((m) => <option key={m} value={m}>{m}</option>)}
                </StyledSelect>
                {!form.marque && (
                  <p className="text-[11px] text-gray-400 mt-0.5 pl-1">↑ Choisissez une marque pour voir les modèles disponibles</p>
                )}
              </div>

              {/* Row 5: Service */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="service" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Type de service</label>
                <StyledSelect id="service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Sélectionner...</option>
                  {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                </StyledSelect>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 mb-4">
                <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Message *</label>
                <textarea
                  id="message" name="message"
                  placeholder="Décrivez votre problème ou votre demande..."
                  value={form.message} onChange={handleChange} required rows={5}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:shadow-[3px_3px_0_rgba(219,0,0,0.12)] transition-all resize-y placeholder:text-gray-400"
                  style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                />
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="error-shake mb-4 px-4 py-3 bg-red-50 border border-red-200 border-l-4 border-l-red-600 text-xs text-red-700 font-semibold leading-relaxed"
                  >
                    ⚠ {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="mt-8 flex items-center gap-5 flex-wrap">
                <motion.button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="btn-submit-hover flex items-center gap-2.5 px-9 h-[52px] text-xs font-bold uppercase tracking-[0.14em] text-white border-none cursor-pointer transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: loading ? "#a80000" : "#db0000",
                    fontFamily: "'Bai Jamjuree', sans-serif",
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </motion.button>
                <p className="text-xs text-black/30 leading-relaxed">
                  * Champs obligatoires.<br />Réponse sous 24h ouvrées.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── MAP STRIP ── */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8 }}
        className="bg-gray-100 border-t border-gray-200"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px]">
          <div className="h-[420px] relative overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.6!2d2.4385!3d48.8815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66d8b3c8a3f1b%3A0x0!2s3%20Rue%20Anatole%20France%2C%2093230%20Romainville%2C%20France!5e0!3m2!1sfr!2sfr!4v1680000000000!5m2!1sfr!2sfr"
              title="BAP Paris — 3 Rue Anatole France, Romainville"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-none block"
              style={{ filter: "grayscale(0.2) contrast(1.05)" }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="bg-[#111] px-10 py-12 flex flex-col justify-center"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4">Nous trouver</p>
            <h3 className="text-[22px] font-extrabold text-white tracking-[-0.02em] leading-[1.2] mb-5">
              Notre atelier<br /><span className="text-red-600">Romainville</span>
            </h3>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-7 h-7 bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#db0000">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <address className="not-italic text-sm text-white/60 leading-[1.7]">
                3 Rue Anatole France<br />93230 Romainville<br />France
              </address>
            </div>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-7 h-7 bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#db0000">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
              </div>
              <Link to="tel:+33664412376" className="text-sm font-bold text-white/80 no-underline hover:text-white transition-colors">+33 6 64 41 23 76</Link>
            </div>
            <motion.a
              href="https://maps.app.goo.gl/bjqKVS9KWkoAhp649" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="btn-directions inline-flex items-center gap-2.5 bg-red-600 text-white no-underline text-[11px] font-bold uppercase tracking-[0.14em] px-[22px] py-[13px] w-fit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.71 11.29l-9-9a1 1 0 00-1.42 0l-9 9a1 1 0 000 1.42l9 9a1 1 0 001.42 0l9-9a1 1 0 000-1.42zM14 14.5V12h-4v3H8v-4a1 1 0 011-1h5V7.5l3.5 3.5-3.5 3.5z" />
              </svg>
              Obtenir l'itinéraire
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] border-t border-white/[0.06] px-10 py-10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-6">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-[-0.04em] text-white uppercase">BAP</span>
            <span className="text-[8px] font-bold tracking-[0.28em] text-red-600 uppercase -mt-0.5">Paris</span>
          </div>
          <div className="text-[13px] text-white/30 text-center">
            <p>© 2025 BAP Paris — Tous droits réservés</p>
            <p className="mt-1">
              <Link to="/mention-legales" className="text-white/30 no-underline hover:text-white/70 transition-colors">Mentions légales</Link>
              {" · "}
              <Link to="/cookies" className="text-white/30 no-underline hover:text-white/70 transition-colors">Cookies</Link>
            </p>
          </div>
          <div className="flex items-center gap-4">
            {SocialLinks.map((s) => (
              <Link key={s.label} to="#" aria-label={s.label} className="footer-social text-white/35 transition-colors duration-200">{s.icon}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}