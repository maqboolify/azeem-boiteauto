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
        marginTop: 28,
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
        marginTop: 28,
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

// Image placeholder — replace inner content with your <img> tag
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
          {["Accueil", "Prestations", "Montage"].map((item, i, arr) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Link
                href="#"
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
          Montage
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
            maxWidth: 540,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Le montage d'une boîte automatique est une opération technique qui requiert un outillage
          spécialisé, un savoir-faire précis et un suivi rigoureux des procédures de calibrage et de
          mise à niveau.
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
    { value: "4–5h",  label: "Durée moyenne de montage" },
    { value: "+100%", label: "Temps sur motorisations élevées" },
    { value: "65°C",  label: "Température de contrôle huile" },
    { value: "100%",  label: "Calibrage & vérification inclus" },
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
                letterSpacing: "0.12em",
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

// ─── Section: Spécificités Techniques ────────────────────────────────────────
function SectionSpecificites() {
  const [ref, inView] = useReveal();

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
          <Tag>Technique · Précision</Tag>
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
            Spécificités
            <br />
            techniques
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.85, marginBottom: 16, marginTop: 0 }}>
            Le montage d'une boîte automatique prend en général <strong>4 à 5 heures</strong>. Le démontage prend
            un peu moins de temps. Pour les modèles à motorisation élevée, il faut prévoir{" "}
            <strong>50 % à 100 % de temps supplémentaire</strong> — il est souvent nécessaire de retirer le berceau
            et parfois le groupe motopropulseur.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.85, marginBottom: 16, marginTop: 0 }}>
            Un outillage spécifique est indispensable, notamment pour la rétention de l'huile. Une attention
            particulière doit être portée aux boîtes avec convertisseur de couple hydraulique, surtout lors du
            remontage (pompe à engrenage).
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.85, margin: 0 }}>
            Il est impératif de vérifier le niveau d'huile et d'effectuer les <strong>« adaptations »</strong> ou{" "}
            <strong>« réglages de base »</strong> après chaque montage.
          </p>
          <RedBtn>Contactez-nous</RedBtn>
        </motion.div>

        {/* Image slot */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 320px" }}
        >
          <MediaSlot type="image" src="/images/mont1.webp" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Particularités ──────────────────────────────────────────────────
function SectionParticularites() {
  const [ref, inView] = useReveal();

  const cards = [
    {
      title: "Convertisseur de couple",
      body: "Les boîtes à convertisseur de couple hydraulique nécessitent une attention particulière : il est essentiel de s'assurer que le convertisseur est correctement emboîté sur les goupilles afin d'éviter d'endommager la pompe à engrenage. Une mauvaise manipulation peut entraîner une casse.",
      icon: "⚙️",
    },
    {
      title: "Boîtes d'occasion",
      body: "Il est très difficile d'inspecter l'intérieur d'une boîte automatique d'occasion et de vérifier son état mécanique — le kilométrage réel ne peut pas être certifié. Sur la grande majorité des boîtes équipées d'un calculateur, une reprogrammation et un calibrage seront nécessaires. La couleur et la qualité de l'huile d'origine doivent être examinées attentivement.",
      icon: "🔍",
    },
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
          style={{ marginBottom: 48 }}
        >
          <Tag>Points de vigilance</Tag>
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
            Particularités
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                backgroundColor: WHITE,
                border: "1.5px solid #e8e8e8",
                padding: 36,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Red top border */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, backgroundColor: RED }} />
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 19,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#111",
                  margin: "0 0 14px",
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#666", fontSize: 14.5, lineHeight: 1.8, margin: 0 }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Attention — Boîtes Auto vs Manuelles ───────────────────────────
function SectionAttention() {
  const [ref, inView] = useReveal();

  const points = [
    {
      title: "Calibrage",
      body: "Les boîtes automatiques nécessitent un calibrage précis pour assurer des changements de vitesse fluides — contrairement aux boîtes manuelles qui n'en requièrent pas.",
    },
    {
      title: "Reprogrammation & Calculateur",
      body: "La grande majorité des boîtes automatiques sont équipées d'un calculateur. Sa reprogrammation doit être réalisée correctement pour garantir des performances optimales. Une erreur peut entraîner des dysfonctionnements graves.",
    },
    {
      title: "Niveau d'Huile",
      body: "Le contrôle et l'ajustement du niveau d'huile sont essentiels et doivent être réalisés avec précision. Pour une mesure exacte, il est nécessaire de vérifier le niveau lorsque la transmission est chaude — généralement à environ 65°C.",
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
          style={{ marginBottom: 52 }}
        >
          <Tag>À savoir · Différences clés</Tag>
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
            Boîtes automatiques :
            <br />
            <span style={{ color: RED }}>attention !</span>
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#888",
              fontSize: 15,
              marginTop: 16,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Les boîtes automatiques diffèrent des boîtes manuelles sur plusieurs points critiques que tout intervenant
            doit maîtriser.
          </p>
        </motion.div>

        {/* Accordion-style numbered list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                display: "flex",
                gap: 32,
                alignItems: "flex-start",
                padding: "32px 0",
                borderBottom: i < points.length - 1 ? "1px solid #eee" : "none",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: RED,
                  backgroundColor: "#fff5f5",
                  border: `1.5px solid ${RED}`,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#111",
                    margin: "0 0 10px",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.8, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Procédure niveau d'huile ───────────────────────────────────────
function SectionProcedure() {
  const [ref, inView] = useReveal();

  const steps = [
    {
      step: "01",
      title: "Chauffer l'huile",
      desc: "Faire monter la température de l'huile de boîte pour atteindre au moins 65°C, puis arrêter le moteur.",
    },
    {
      step: "02",
      title: "Vidange",
      desc: "Dévisser le carter, vider l'huile, nettoyer le fond du carter et l'aimant, puis dévisser la crépine pour laisser couler l'huile restante. Remonter le tout avec une nouvelle crépine.",
    },
    {
      step: "03",
      title: "Remplissage",
      desc: "Utiliser un entonnoir pour verser environ 4 litres d'huile dans l'orifice de remplissage situé sous le capot, près du moteur.",
    },
    {
      step: "04",
      title: "Mise à niveau",
      desc: "Mettre le moteur en marche au ralenti, appuyer sur la pédale de frein et enclencher toutes les vitesses avant de positionner le levier en mode « Parking » (P).",
    },
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
          style={{ marginBottom: 52 }}
        >
          <Tag>Procédure · Niveau d'huile</Tag>
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
            Contrôle du niveau
            <br />
            <span style={{ color: RED }}>étape par étape</span>
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "#888",
              fontSize: 15,
              marginTop: 16,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Procédure recommandée pour les boîtes à convertisseur de couple. Suite au remontage, le calibrage,
            la reprogrammation et la vérification du niveau d'huile sont impératifs.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              style={{
                backgroundColor: WHITE,
                padding: 32,
                position: "relative",
                overflow: "hidden",
                border: "1px solid #eee",
              }}
            >
              {/* Large background number */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: 12,
                  fontFamily: "Syne, sans-serif",
                  fontSize: 80,
                  fontWeight: 800,
                  color: "#f0f0f0",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {s.step}
              </div>

              {/* Red corner accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 3,
                  backgroundColor: RED,
                }}
              />

              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: RED,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Étape {s.step}
              </div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#111",
                  margin: "0 0 12px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  color: "#666",
                  fontSize: 14,
                  lineHeight: 1.75,
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          variants={fadeUp}
          custom={5}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            marginTop: 40,
            borderLeft: `4px solid ${RED}`,
            backgroundColor: "#fff5f5",
            padding: "16px 20px",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: RED }}>Important :</strong> Suite au remontage d'une boîte automatique, il est
            impératif d'effectuer le <strong>calibrage/reprogrammation</strong> et de vérifier le niveau d'huile avant
            toute mise en circulation du véhicule.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Image + résumé ──────────────────────────────────────────────────
function SectionResume() {
  const [ref, inView] = useReveal();

  return (
    <section ref={ref} style={{ backgroundColor: WHITE, padding: "80px 24px" }}>
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
          <MediaSlot type="image" src="/images/mont2.webp" />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ flex: "1 1 380px" }}
        >
          <Tag>Notre engagement</Tag>
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
            Un montage
            <br />
            <span style={{ color: RED }}>sans compromis</span>
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.85, marginBottom: 16, marginTop: 0 }}>
            Chez <strong>Bap Paris</strong>, chaque montage de boîte automatique est réalisé avec un outillage
            professionnel adapté à chaque modèle. Nous suivons scrupuleusement les procédures constructeur pour garantir
            une transmission fiable et durable.
          </p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: "#555", fontSize: 15, lineHeight: 1.85, margin: 0 }}>
            Calibrage, reprogrammation du calculateur, contrôle du niveau d'huile à chaud : chaque étape est vérifiée
            avant la restitution de votre véhicule.
          </p>

          {/* Mini checklist */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Outillage spécialisé par marque et modèle",
              "Calibrage et adaptations systématiques",
              "Vérification huile à 65°C",
              "Reprogrammation calculateur si nécessaire",
            ].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: RED,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "DM Sans, sans-serif", color: "#444", fontSize: 14.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const [ref, inView] = useReveal();

  return (
    <section ref={ref} style={{ backgroundColor: GRAY, padding: "72px 24px" }}>
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle at 85% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

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
              Besoin d'un montage
              <br />
              professionnel ?
            </h3>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "rgba(255,255,255,0.75)", fontSize: 15, margin: 0 }}>
              Diagnostic à 90€ · Devis gratuit · Intervention rapide
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            <motion.button
              whileHover={{ backgroundColor: "#111", color: WHITE }}
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
export default function MontagePage() {
  return (
    <div style={{ backgroundColor: WHITE }}>
      <Hero />
      <StatBar />
      <SectionSpecificites />
      <Divider />
      <SectionParticularites />
      <Divider />
      <SectionAttention />
      <Divider />
      <SectionProcedure />
      <Divider />
      <SectionResume />
      <CTABanner />
    </div>
  );
}