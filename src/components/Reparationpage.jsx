import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
// ─── Google Fonts ─────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ─── Design Tokens ────────────────────────────────────────────────────────────
const RED   = "#db0000";
const WHITE = "#ffffff";
const GRAY  = "#f5f5f5";

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.11 },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: -56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

const slideRight = {
  hidden: { opacity: 0, x: 56 },
  show: { opacity: 1, x: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Tag({ children }) {
  return (
    <span
      style={{
        fontFamily: "Syne, sans-serif",
        color: RED,
        border: `1.5px solid ${RED}`,
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        padding: "4px 12px",
        borderRadius: 999,
        marginBottom: 16,
      }}
    >
      {children}
    </span>
  );
}

function RedBtn({ children }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "#b50000" }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "Syne, sans-serif",
        backgroundColor: RED,
        color: WHITE,
        border: "none",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "14px 30px",
        cursor: "pointer",
        marginTop: 24,
        display: "inline-block",
        transition: "background-color .2s",
      }}
    >
      {children}
    </motion.button>
  );
}

function OutlineBtn({ children }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: RED, color: WHITE }}
      whileTap={{ scale: 0.97 }}
      style={{
        fontFamily: "Syne, sans-serif",
        backgroundColor: "transparent",
        color: RED,
        border: `2px solid ${RED}`,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "12px 28px",
        cursor: "pointer",
        marginTop: 24,
        display: "inline-block",
        transition: "background-color .2s, color .2s",
      }}
    >
      {children}
    </motion.button>
  );
}

function Divider() {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} style={{ padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0", transformOrigin: "left" }}
      />
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={inView ? { scale: 1, rotate: 45 } : {}}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{ width: 8, height: 8, backgroundColor: RED, flexShrink: 0 }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        style={{ flex: 1, height: 1, backgroundColor: "#e0e0e0", transformOrigin: "right" }}
      />
    </div>
  );
}

// ── Image placeholder — replace the inner div with your own <img> tag ─────────
function MediaSlot({ type = "image", src, alt }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "4/3",
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        backgroundColor: WHITE,
        borderBottom: "1px solid #eee",
        padding: "72px 24px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Red top-left accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 5,
          width: "35%",
          backgroundColor: RED,
          transformOrigin: "left",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Breadcrumb */}
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            listStyle: "none",
            padding: 0,
            margin: "0 0 36px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: 13,
            color: "#999",
          }}
        >
          {["Accueil", "Prestations", "Réparation"].map((item, i, arr) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                to="#"
                style={{
                  color: i === arr.length - 1 ? RED : "#999",
                  fontWeight: i === arr.length - 1 ? 600 : 400,
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
              {i < arr.length - 1 && <span style={{ color: "#ddd" }}>›</span>}
            </li>
          ))}
        </motion.ol>

        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            fontFamily: "DM Sans, sans-serif",
            color: RED,
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 14,
            marginTop: 0,
          }}
        >
          Spécialiste en transmission automatique
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 800,
            lineHeight: 1.02,
            color: "#111",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Réparation
          <br />
          <span style={{ color: RED }}>Boîte Auto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{
            fontFamily: "DM Sans, sans-serif",
            color: "#666",
            fontSize: 16,
            lineHeight: 1.75,
            maxWidth: 520,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Expert en diagnostic, réparation et entretien de toutes les transmissions automatiques —
          CVT, robotisées, double embrayage et convertisseur de couple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <RedBtn>Contactez-nous</RedBtn>
          <OutlineBtn>Nos tarifs →</OutlineBtn>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stat Bar ─────────────────────────────────────────────────────────────────
function StatBar() {
  const [ref, inView] = useReveal();
  const stats = [
    { value: "15+",    label: "Années d'expérience" },
    { value: "5 000+", label: "Boîtes réparées" },
    { value: "3",      label: "Ateliers en IDF" },
    { value: "100%",   label: "Garantie qualité" },
  ];

  return (
    <div ref={ref} style={{ backgroundColor: RED }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "20px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          textAlign: "center",
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <div style={{ fontFamily: "Syne, sans-serif", color: WHITE, fontSize: 28, fontWeight: 800 }}>
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                color: "rgba(255,255,255,0.7)",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: CVT ─────────────────────────────────────────────────────────────
function SectionCVT() {
  const [ref, inView] = useReveal();
  const models = ["Mercedes 722.8", "Audi Multitronic", "Ford Mondeo HF35", "Nissan Xtronic CVT"];

  return (
    <section ref={ref} style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          gap: 64,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Text */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 380px" }}
        >
          <Tag>CVT · Variation Continue</Tag>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#111",
              lineHeight: 1.08,
              margin: "0 0 20px",
            }}
          >
            Boîtes CVT à<br />variation continue
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, marginBottom: 14, marginTop: 0 }}>
            Les boîtes CVT — comme la Mercedes <strong>722.8</strong> des classes A et B, la Multitronic d'Audi ou la{" "}
            <strong>HF35</strong> des Ford Mondeo Hybrid — utilisent une courroie segmentée en acier reliant des pignons
            primaires et secondaires, permettant un ajustement continu des rapports. Leur réparation exige des outils
            hautement spécialisés.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
            Les passages de vitesses sont en réalité des <strong>« ratios »</strong>. Il existe aussi des problèmes sur
            l'embrayage situé juste avant le système CVT, nécessitant une intervention précise pour ne pas endommager la
            transmission.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {models.map((m) => (
              <span
                key={m}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 12,
                  padding: "5px 12px",
                  border: "1px solid #e0e0e0",
                  borderRadius: 999,
                  color: "#444",
                  backgroundColor: GRAY,
                }}
              >
                {m}
              </span>
            ))}
          </div>

          <RedBtn>Contactez-nous</RedBtn>
        </motion.div>

        {/* Image slot */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 320px" }}
        >
          <MediaSlot type="video" src="/images/repara1.webm" />
          {/* <ImgSlot src="/images/diag3.png" alt="Boîte CVT" /> */}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Robotisées ──────────────────────────────────────────────────────
function SectionRobotisees() {
  const [ref, inView] = useReveal();

  return (
    <section ref={ref} style={{ backgroundColor: GRAY, padding: "80px 24px" }}>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          gap: 64,
          alignItems: "center",
          flexWrap: "wrap-reverse",
        }}
      >
        {/* Image slot */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 320px" }}
        >
          <MediaSlot type="image" src="/images/repara2.webp" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 380px" }}
        >
          <Tag>Robotisées · Pilotées</Tag>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#111",
              lineHeight: 1.08,
              margin: "0 0 20px",
            }}
          >
            Boîtes robotisées
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, marginBottom: 14, marginTop: 0 }}>
            Les boîtes robotisées ou pilotées — comme la <strong>Powershift</strong> chez Renault (Modus, Twingo) et
            Fiat, ainsi que sur les anciennes Peugeot 5008 — sont constituées d'un embrayage, d'une butée d'embrayage,
            et d'un robot comprenant souvent un accumulateur. Ce sont en réalité des boîtes manuelles pilotées, avec
            moins de confort qu'une vraie boîte automatique.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
            Il est possible de <strong>réparer le robot en fonction des codes défauts et symptômes</strong> — souvent
            bien moins coûteux qu'un remplacement neuf.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Double Embrayage ────────────────────────────────────────────────
function SectionDoubleEmbrayage() {
  const [ref, inView] = useReveal();

  const clutchTypes = [
    {
      name: "Embrayage Mouillé",
      models: ["DQ500", "DQ381", "DSG6 (DQ250)", "Mercedes 724.0"],
      desc: "Lubrification continue — équipe les moteurs les plus puissants. Robuste sous haute charge. Nécessite des outils LUK spécifiques.",
    },
    {
      name: "Embrayage Sec",
      models: ["DSG7 (DQ200)", "6DCT250 GETRAG", "EDC / DC4"],
      desc: "Très peu de lubrification : une partie dans le mécatronique, à peine dans la mécanique. Outillage LUK obligatoire.",
    },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ marginBottom: 48 }}
        >
          <Tag>DSG · EDC · DCT</Tag>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#111",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Boîtes double embrayage
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 56 }}>
          {clutchTypes.map((ct, i) => (
            <motion.div
              key={ct.name}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                border: "1.5px solid #e8e8e8",
                padding: 32,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Red left border */}
              <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", backgroundColor: RED }} />
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#111",
                  margin: "0 0 12px",
                }}
              >
                {ct.name}
              </h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#666", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px" }}>
                {ct.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {ct.models.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: 11,
                      padding: "4px 10px",
                      border: `1px solid ${RED}`,
                      color: RED,
                      borderRadius: 999,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Body text + image */}
        <div style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            style={{ flex: "1 1 340px" }}
          >
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              L'entretien ou la réparation de ces boîtes demande des outils spécifiques tels que ceux fournis par la
              marque <strong>LUK</strong>. Le plus important est de disposer du bon outillage pour remplacer l'embrayage
              — sec ou mouillé.
            </p>
            <RedBtn>Contactez-nous</RedBtn>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            style={{ flex: "1 1 300px" }}
          >
            <MediaSlot type="image" src="/images/repara3.webp" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Section: Convertisseur de couple ────────────────────────────────────────
function SectionConvertisseur() {
  const [ref, inView] = useReveal();

  const brands = [
    { name: "ZF",            models: "6HP21 · 6HP26 · 8HP" },
    { name: "Aisin",         models: "TF80 et dérivés" },
    { name: "Mercedes",      models: "7G-Tronic · 9G-Tronic" },
    { name: "Renault / PSA", models: "DP0 · AL4" },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: GRAY, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ marginBottom: 40 }}
        >
          <Tag>ZF · Aisin · Mercedes</Tag>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "#111",
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Boîtes à convertisseur
            <br />
            de couple
          </h2>
        </motion.div>

        {/* Brand grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                backgroundColor: WHITE,
                border: "1px solid #e8e8e8",
                borderTop: `3px solid ${RED}`,
                padding: "20px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "Syne, sans-serif", color: RED, fontSize: 18, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>
                {b.name}
              </div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: "#999", fontSize: 12 }}>
                {b.models}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Text + image */}
        <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            style={{ flex: "1 1 300px" }}
          >
            <MediaSlot type="video" src="/images/repara4.webp" />
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            style={{ flex: "1 1 340px" }}
          >
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, marginTop: 0, marginBottom: 16 }}>
              Les boîtes équipées de convertisseurs de couple hydraulique — ZF <strong>6HP21, 6HP26, 8HP</strong> sur
              BMW, <strong>7G-Tronic ou 9G-Tronic</strong> (Mercedes), <strong>DP0/AL4</strong> (Renault/Peugeot) — sont
              réputées pour leur robustesse. Le convertisseur permet à la voiture de démarrer sans à-coups.
            </p>

            {/* Alert box */}
            <div
              style={{
                borderLeft: `4px solid ${RED}`,
                backgroundColor: "#fff5f5",
                padding: "12px 16px",
                marginBottom: 16,
                borderRadius: "0 6px 6px 0",
              }}
            >
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
                <strong style={{ color: RED }}>Symptômes à surveiller :</strong> patinage, oscillations anormales des
                tours moteur, secousses au démarrage ou à l'arrêt.
              </p>
            </div>

            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: "0 0 16px" }}>
              Son embrayage interne <strong>fait office de frein moteur</strong> et réduit la consommation de carburant.
              Il isole la boîte du moteur, permettant au véhicule de rester en marche à l'arrêt.
            </p>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
              Il existe aussi des boîtes CVT équipées d'un convertisseur — <strong>XTRONIC CVT</strong> (Nissan Qashqai)
              ou <strong>722.8</strong> (Mercedes Classe A/B) — à l'exception des Multitronic (01J/0AN ou 0AW).
            </p>

            <RedBtn>Contactez-nous</RedBtn>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, inView] = useReveal();

  return (
    <section ref={ref} style={{ backgroundColor: WHITE, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            backgroundColor: RED,
            padding: "56px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 85% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              style={{
                fontFamily: "Syne, sans-serif",
                color: WHITE,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                fontWeight: 800,
                textTransform: "uppercase",
                lineHeight: 1.1,
                margin: "0 0 10px",
              }}
            >
              Votre boîte automatique
              <br />
              en bonne santé
            </h3>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 15, margin: 0 }}>
              Diagnostic à 90€ · Prise en charge rapide · Devis gratuit
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <motion.button
              whileHover={{ backgroundColor: "#111" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "Syne, sans-serif",
                backgroundColor: WHITE,
                color: RED,
                border: "none",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "16px 32px",
                cursor: "pointer",
                transition: "background-color .2s, color .2s",
              }}
            >
              Prendre rendez-vous
            </motion.button>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.7)", fontSize: 13, textAlign: "center", margin: 0 }}>
              📞+33 6 64 41 23 76
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────
export default function ReparationPage() {
  return (
    <div style={{ backgroundColor: WHITE }}>
      <Hero />
      <StatBar />
      <SectionCVT />
      <Divider />
      <SectionRobotisees />
      <Divider />
      <SectionDoubleEmbrayage />
      <Divider />
      <SectionConvertisseur />
      <CTABanner />
    </div>
  );
}