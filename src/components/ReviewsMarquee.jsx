import React, { useEffect, useRef, useState } from "react";

const STYLES = `
  @keyframes mv-down {
    from { transform: translateY(0); }
    to   { transform: translateY(-50%); }
  }
  @keyframes mv-up {
    from { transform: translateY(-50%); }
    to   { transform: translateY(0); }
  }
  .rm-col { overflow: hidden; flex: 1; min-width: 0; }
  .rm-track-down {
    animation: mv-down var(--dur, 40s) linear infinite;
    display: flex; flex-direction: column; gap: 14px;
  }
  .rm-track-up {
    animation: mv-up var(--dur, 40s) linear infinite;
    display: flex; flex-direction: column; gap: 14px;
  }
  .rm-col:hover .rm-track-down,
  .rm-col:hover .rm-track-up { animation-play-state: paused; }

  .rm-grid {
    display: flex;
    flex-direction: row;
    gap: 14px;
    padding: 0 24px;
    height: 100%;
    width: 100%;
    align-items: flex-start;
    transform-style: preserve-3d;
  }

  @media (max-width: 480px) {
    .rm-grid {
      gap: 10px;
      padding: 0 12px;
      transform: rotateX(14deg) rotateY(-4deg) rotateZ(5deg) translateY(-20px) !important;
    }
    .rm-title { font-size: 26px !important; }
    .rm-badge { font-size: 11px !important; }
    .rm-rating-score { font-size: 13px !important; }
    .rm-rating-count { font-size: 12px !important; }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .rm-grid {
      gap: 12px;
      padding: 0 16px;
      transform: rotateX(18deg) rotateY(-6deg) rotateZ(6deg) translateY(-30px) !important;
    }
    .rm-title { font-size: 30px !important; }
  }
`;

function Stars({ count, dim = false }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20"
          fill={i < count ? "#FBBF24" : (dim ? "#3a3a3c" : "#D1D5DB")}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function ReviewCard({ name, photo, text, stars, date, isLocalGuide }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      background: "#1c1c1e", border: "0.5px solid #2e2e30", borderRadius: 14,
      padding: 16, display: "flex", flexDirection: "column", gap: 9, flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img src={photo} alt={name} width={36} height={36}
            style={{ borderRadius: "50%", objectFit: "cover", display: "block" }}
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "flex"; }}
          />
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2c2c3e", color: "#818cf8", fontSize: 12, fontWeight: 500, display: "none", alignItems: "center", justifyContent: "center" }}>
            {initials}
          </div>
          <div style={{ position: "absolute", bottom: -3, right: -3, width: 15, height: 15, borderRadius: "50%", background: "#1c1c1e", border: "0.5px solid #2e2e30", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GoogleIcon size={10} />
          </div>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#f0f0f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            {isLocalGuide && <span style={{ fontSize: 10, fontWeight: 500, color: "#60a5fa", background: "#1e3a5f", borderRadius: 4, padding: "1px 5px" }}>Guide local</span>}
            <span style={{ fontSize: 11, color: "#6e6e73" }}>{date}</span>
          </div>
        </div>
      </div>
      <Stars count={stars} dim />
      <p style={{ fontSize: 12, lineHeight: 1.65, color: "#a1a1a6", margin: 0, display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {text}
      </p>
    </div>
  );
}

function MarqueeCol({ items, reverse = false, duration = "40s" }) {
  const doubled = [...items, ...items];
  return (
    <div className="rm-col">
      <div className={reverse ? "rm-track-up" : "rm-track-down"} style={{ "--dur": duration }}>
        {doubled.map((r, i) => <ReviewCard key={i} {...r} />)}
      </div>
    </div>
  );
}

const reviews = [
  { name: "Kevin Yilmaz", photo: "https://lh3.googleusercontent.com/a/ACg8ocIX8Zz2h2zx5NUtPPJ_xhoZ5G6azzJScQnIerIoHJZYNtFeaw=s400-c-rp-mo-br100", text: "Problème de boite auto DSG 7 sur Seat Ateca 2016, Azeem très professionnel et très réactif. Lui et son équipe ont réparé la boite en moins de 72H, tout en expliquant d'où venait le problème et ce qui a été remplacé.", stars: 5, date: "il y a 11 heures", isLocalGuide: false },
  { name: "Aissa Benazza", photo: "https://lh3.googleusercontent.com/a-/ALV-UjXFSMcTj2NnYMGYH2pv31KVkN-gElV2B-wz07tFFDRErSMT4zV7=s400-c-rp-mo-br100", text: "Vidange boîte auto sur ma FORD MONDEO HYBRIDE — travail propre, il respecte ses RDV. À la fin il fait un tour de contrôle muni de sa tablette. Un grand respect à Azeem !", stars: 5, date: "il y a une semaine", isLocalGuide: false },
  { name: "Ach Ken", photo: "https://lh3.googleusercontent.com/a-/ALV-UjWnjJU43iLfeShgtTcoHUmXB_3sPj8XC5QKMeoWvkK7qP4vMfea=s400-c-rp-mo-br100", text: "Embrayage changé en une journée — Golf 7 boîte auto double embrayage. Merci beaucoup Azeem : sérieux, bon travail, professionnel. Le prix raisonnable.", stars: 5, date: "il y a 3 semaines", isLocalGuide: false },
  { name: "Soukaina Laradi", photo: "https://lh3.googleusercontent.com/a/ACg8ocLNCslmKlri4visBH574cjTIl_U2_yE3X88Fz9phM5wjH53zg=s400-c-rp-mo-br100", text: "Le meilleur de la boîte auto, vraiment rien à dire — aussi efficace que rapide. Je recommande !", stars: 5, date: "il y a 3 semaines", isLocalGuide: false },
  { name: "Nadir Abbar", photo: "https://lh3.googleusercontent.com/a/ACg8ocKvGOhPBP7I9lM1q8uFFojPOQypDLUBDVGGk1x2-xR2bsfnrQ=s400-c-rp-mo-br100", text: "Personne sérieuse et honnête. Il a refait ma boîte de vitesse 7G tronic à neuf sur mon CL500 en quelques jours. Vraiment impeccable. Je recommande particulièrement Azeem pour toute prestation sur boîte automatique.", stars: 5, date: "il y a un mois", isLocalGuide: false },
  { name: "TABET Belaid Djallel", photo: "https://lh3.googleusercontent.com/a-/ALV-UjVk-iq7YvD-CvmNkPEZoZM0a3eCFew86lbm4xYYoAETD5Hxhh28rQ=s400-c-rp-mo-ba3-br100", text: "Excellent garage. J'y ai fait la courroie de distribution et plusieurs vidanges de boîte — le travail a toujours été impeccable. Équipe sérieuse, professionnelle et transparente, avec de bonnes explications et des délais respectés.", stars: 5, date: "il y a un mois", isLocalGuide: true },
  { name: "Birtan Bucak", photo: "https://lh3.googleusercontent.com/a/ACg8ocKkh7tgiAmQmFK-WP4Vx1DWa1AFJHJUSFlGwMyu7d_XzmZ9fqo=s400-c-rp-mo-br100", text: "Véhicule livré en panne et déjà prêt le lendemain. Très satisfait de la prise en charge et de l'accueil — garage très honnête, j'y retournerai les yeux fermés.", stars: 5, date: "il y a un mois", isLocalGuide: false },
  { name: "Sousa Luis", photo: "https://lh3.googleusercontent.com/a/ACg8ocJ8fRNtuJTAOyhpszbDJigPt3orwj4dyY_AitdC70STGMAsYw=s400-c-rp-mo-br100", text: "Boîte auto classe A donnait des à-coups. Azeem a fait la vidange avec tous les filtres et le passage valise. Nickel — boîte très souple et vraiment professionnels. Merci Azeem !!!", stars: 5, date: "il y a 3 semaines", isLocalGuide: false },
  { name: "BlacKaminari 92", photo: "https://lh3.googleusercontent.com/a-/ALV-UjXbIrHq8kSdUKxvl2WNKkPDBrhAJNi248ZM3FuBTPXouamMmUg=s400-c-rp-mo-br100", text: "Rien à dire ! Excellent service ! Je suis venu pour un changement de plaquettes de freins, Azeem nous a tout expliqué et a fait un super travail. Je vous le recommande !", stars: 5, date: "il y a un an", isLocalGuide: false },
  { name: "Pascal Benkemoun", photo: "https://lh3.googleusercontent.com/a/ACg8ocLzUOaQKgCIABgipq0OhX1gOXwCj0la9qZEzEYXbSG-QsKuEg=s400-c-rp-mo-br100", text: "Excellente adresse. Service très pro et très sympa ! La cerise sur le gâteau : le patron m'a envoyé une vidéo pour me montrer les pièces neuves mises sur ma voiture. J'y retournerai les yeux fermés !", stars: 5, date: "il y a un an", isLocalGuide: false },
  { name: "Yahya ABIDA", photo: "https://lh3.googleusercontent.com/a/ACg8ocJvluAZY9YuRMgV4ItIR6qHYc704o9mx8vs97EwzndCi5EQZg=s400-c-rp-mo-br100", text: "Très bon accueil et grand professionnalisme. Je recommande à 100%.", stars: 5, date: "il y a un an", isLocalGuide: false },
  { name: "Jacques MOUVEAUX", photo: "https://lh3.googleusercontent.com/a-/ALV-UjWLSL_2_ptSlEXN5d3KIFDorYcN6qjgWgq6ErijgzhRGBEPP831=s400-c-rp-mo-br100", text: "Pas possible de contacter sur internet pour avoir un prix et par téléphone il ne répond pas — dommage pour les recommander.", stars: 4, date: "il y a 11 heures", isLocalGuide: false },
];

// Column configs per breakpoint
const allColumns = [
  { items: reviews.slice(0, 4),  reverse: false, duration: "33s" },
  { items: reviews.slice(3, 7),  reverse: true,  duration: "41s" },
  { items: reviews.slice(6, 10), reverse: false, duration: "37s" },
  { items: reviews.slice(8, 12), reverse: true,  duration: "45s" },
  { items: reviews.slice(2, 6),  reverse: false, duration: "39s" },
];

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

export default function ReviewsMarquee() {
  const width = useBreakpoint();

  // Responsive column count & 3D transform
  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 768;

  const colCount = isMobile ? 2 : isTablet ? 3 : 5;
  const columns = allColumns.slice(0, colCount);

  const transform = isMobile
    ? "rotateX(14deg) rotateY(-4deg) rotateZ(5deg) translateY(-20px)"
    : isTablet
    ? "rotateX(18deg) rotateY(-6deg) rotateZ(6deg) translateY(-30px)"
    : "rotateX(22deg) rotateY(-8deg) rotateZ(8deg) translateY(-40px)";

  const gridHeight = isMobile ? 420 : isTablet ? 480 : 560;
  const titleSize = isMobile ? 26 : isTablet ? 30 : 38;
  const sectionPadding = isMobile ? "40px 0" : "64px 0";
  const headerMargin = isMobile ? 32 : 48;

  return (
    <div style={{
      background: "#0a0a0b",
      width: "100%",
      padding: sectionPadding,
      fontFamily: "system-ui, -apple-system, sans-serif",
      boxSizing: "border-box",
      overflowX: "hidden",
    }}>
      <style>{STYLES}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: headerMargin, padding: "0 16px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#1c1c1e", border: "0.5px solid #2e2e30",
          borderRadius: 999, padding: "6px 16px",
          fontSize: 12, color: "#8e8e93", marginBottom: 18,
        }}>
          <GoogleIcon size={14} />
          Avis Google vérifiés
        </div>
        <h2 style={{
          fontSize: titleSize,
          fontWeight: 500,
          color: "#f5f5f7",
          letterSpacing: "-0.5px",
          margin: "0 0 14px",
          lineHeight: 1.2,
        }}>
          Ce que nos clients disent
        </h2>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Stars count={5} dim />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#f5f5f7" }}>4.9</span>
          <span style={{ fontSize: 13, color: "#6e6e73" }}>· 241 avis</span>
        </div>
      </div>

      {/* Marquee grid */}
      <div style={{
        position: "relative",
        width: "100%",
        height: gridHeight,
        overflow: "hidden",
        perspective: "900px",
      }}>
        <div
          className="rm-grid"
          style={{ transform }}
        >
          {columns.map((col, i) => <MarqueeCol key={i} {...col} />)}
        </div>

        {/* Fade masks */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to bottom,#0a0a0b,transparent)", pointerEvents: "none", zIndex: 10 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top,#0a0a0b,transparent)", pointerEvents: "none", zIndex: 10 }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "10%", background: "linear-gradient(to right,#0a0a0b,transparent)", pointerEvents: "none", zIndex: 10 }} />
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "10%", background: "linear-gradient(to left,#0a0a0b,transparent)", pointerEvents: "none", zIndex: 10 }} />
      </div>
    </div>
  );
}