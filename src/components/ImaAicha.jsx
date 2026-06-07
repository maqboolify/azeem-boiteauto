import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CAR_ICON = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="13" width="30" height="14" rx="3"/>
    <path d="M7 13l3-7h16l3 7"/>
    <circle cx="10" cy="27" r="3"/>
    <circle cx="26" cy="27" r="3"/>
    <path d="M13 27h10"/>
    <path d="M7 19h4M25 19h4"/>
  </svg>
);

const CAMPER_ICON = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="12" width="26" height="14" rx="2"/>
    <path d="M28 16h5v10h-5"/>
    <circle cx="9" cy="26" r="3"/>
    <circle cx="23" cy="26" r="3"/>
    <rect x="6" y="15" width="7" height="5" rx="1"/>
    <rect x="16" y="15" width="7" height="5" rx="1"/>
    <path d="M2 19h2M30 19h2"/>
  </svg>
);

const PLANE_ICON = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M33 5L3 17l10 3 3 10 6-8 8 3 3-20z"/>
    <path d="M13 20l4-3"/>
  </svg>
);

const SEARCH_ICON = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="8.5" cy="8.5" r="5.5"/>
    <path d="M15 15l3 3"/>
  </svg>
);

const CHEVRON_DOWN = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 4l5 5 5-5"/>
  </svg>
);

const ARROW_RIGHT = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9h12M10 4l5 5-5 5"/>
  </svg>
);

const CHECK_ICON = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7l3.5 3.5L12 3"/>
  </svg>
);

const tripTypes = [
  { id: "car", label: "Car trip", Icon: CAR_ICON },
  { id: "camper", label: "Camper trip", Icon: CAMPER_ICON },
  { id: "round", label: "Round trip", Icon: PLANE_ICON },
];

const navLinks = ["Travel", "Destinations", "Type of trip", "Offers", "Blogs"];
const hasDropdown = ["Destinations", "Type of trip"];

const bannerItems = [
  "Personal travel advice",
  "Travel customizable as desired",
  "The most advantageous for 20 years",
];

export default function TravelWorld() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Top announcement bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1a2b1e] text-white text-sm py-2.5 px-6"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-8 flex-wrap">
          {bannerItems.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-2"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 400, fontSize: "0.8rem" }}
            >
              <CHECK_ICON />
              {item}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={`sticky top-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          scrolled ? "bg-[#0d1f13]/95 backdrop-blur-md shadow-xl" : "bg-[#0d1f13]"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-0">
          <span
            className="text-white text-xl tracking-widest uppercase font-bold"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "0.18em" }}
          >
            TRAVEL
          </span>
          <span
            className="text-[#4ade80] text-xl font-bold"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "0.05em" }}
          >
            W
          </span>
          <span
            className="text-white text-xl tracking-widest uppercase font-bold"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", letterSpacing: "0.18em" }}
          >
            ORLD
          </span>
        </a>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
            >
              <a
                href="#"
                className="flex items-center gap-1.5 text-white hover:text-[#4ade80] transition-colors duration-200 text-[0.92rem]"
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                {link}
                {hasDropdown.includes(link) && <CHEVRON_DOWN />}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-[#4ade80] transition-colors">
            <SEARCH_ICON />
          </button>
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#86efac" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-[#4ade80] text-[#0d1f13] font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Get in touch <ARROW_RIGHT />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-88px)] min-h-[600px] overflow-hidden">
        {/* Background image via gradient + landscape placeholder */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
        {/* Bottom green forest silhouette tint */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1f13]/70 to-transparent" />

        {/* Dashed orbit arc (decorative) */}
        <svg
          className="absolute left-1/4 top-0 pointer-events-none opacity-30"
          width="500" height="500" viewBox="0 0 500 500"
          fill="none"
        >
          <path d="M 60 10 Q 350 -80 490 260" stroke="white" strokeWidth="1.5" strokeDasharray="6 8" fill="none"/>
        </svg>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
            }}
          >
            Making{" "}
            <motion.span
              initial={{ color: "#ffffff" }}
              animate={{ color: "#4ade80" }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{ fontStyle: "italic" }}
            >
              trips
            </motion.span>
            <br />
            for memories
            <br />
            to create
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-white/80 text-lg mb-10 max-w-sm leading-relaxed"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 300 }}
          >
            Let's create your dream trip to one of our top destinations together.
          </motion.p>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="group inline-flex flex-col w-fit"
          >
            <span
              className="text-white font-semibold text-base group-hover:text-[#4ade80] transition-colors pb-1"
              style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
            >
              Check out our offers
            </span>
            <motion.span
              className="block h-px bg-white group-hover:bg-[#4ade80] transition-colors"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            />
          </motion.a>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full border border-white/40 border-dashed flex items-center justify-center cursor-pointer"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M9 3v12M4 10l5 5 5-5"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Trip Selector Card */}
        <motion.div
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="absolute right-16 top-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl p-8 w-80 shadow-2xl"
          style={{ maxWidth: "340px" }}
        >
          <h2
            className="text-[#1a2b1e] text-2xl mb-3 leading-snug"
            style={{ fontFamily: "'Georgia', serif", fontWeight: 700 }}
          >
            What{" "}
            <span className="text-[#4ade80]">kind</span>{" "}
            of{" "}
            <span className="text-[#4ade80]">trip</span>
            <br />
            are you looking for?
          </h2>
          <p
            className="text-gray-500 text-sm mb-6 leading-relaxed"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Are you a traveler who explores the country yourself by car or do you prefer to seek the adventure with a motorhome?
          </p>

          {/* Trip type options */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {tripTypes.map(({ id, label, Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedTrip(id)}
                className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl border transition-all duration-200 text-xs font-medium cursor-pointer ${
                  selectedTrip === id
                    ? "border-[#4ade80] bg-[#f0fdf4] text-[#1a2b1e]"
                    : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                }`}
                style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
              >
                <span className={selectedTrip === id ? "text-[#1a2b1e]" : "text-gray-500"}>
                  <Icon />
                </span>
                {label}
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#86efac" }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-[#4ade80] text-[#0d1f13] font-semibold py-3.5 rounded-full text-sm transition-colors"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            View our offer <ARROW_RIGHT />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}