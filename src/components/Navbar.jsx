import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// ─── Icons (inline SVGs to avoid dependency) ──────────────────────────────────
const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671C19.369,9.312,19.378,9.597,19.378,12s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31C14.688,19.369,14.403,19.378,12,19.378s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3z M12,7.378c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9.4l5.3 2.6-5.3 2.5z" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2" />
    <path d="M19 17h2a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
    <rect x="5" y="5" width="14" height="14" rx="3" />
    <circle cx="8.5" cy="17" r="1.5" />
    <circle cx="15.5" cy="17" r="1.5" />
    <path d="M5 9h14" />
  </svg>
);

// ─── Navigation Data ──────────────────────────────────────────────────────────
const navLinks = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      {
        title: "Nos services",
        items: [
          { label: "Diagnostic", href: "/services/diagnostic" },
          { label: "Réparation boîte automatique", href: "/services/reparation" },
          { label: "Vidange huile BVA", href: "/services/vidange" },
          { label: "Montage BVA", href: "/services/montage" },
          { label: "Mécatronique", href: "/services/mecatronique" },
        ],
      },
    ],
  },
  {
    label: "Pièces",
    href: "#",
    children: [
      {
        title: "Composants",
        items: [
          
          { label: "Boîtes manuelles", href: "/pieces/manuelles" },
          { label: "Boîtes automatiques", href: "/pieces/boites" },
          { label: "Calculateurs", href: "/pieces/calculateurs" },
          { label: "Mécatroniques", href: "/pieces/mecatroniques" },
        ],
      },
    ],
  },
  { label: "Tarifs", href: "/tarifs" },
  {
    label: "Ressources",
    href: "#",
    children: [
      {
        title: "Guides & Aide",
        items: [
          { label: "Articles", href: "/articles" },
          { label: "FAQ", href: "/ressources/faq" },
          { label: "Types de BVA", href: "/ressources/type-de-bva" },
        ],
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

// ─── Car Brands Data (for search) ────────────────────────────────────────────
const carBrands = [
  {
    id: 1,
    brand: "Audi",
    image: "https://www.topgear.com/sites/default/files/2024/06/1%20Audi%20R8%20GT%20review.jpg",
    href: "/articles/",
  },
  {
    id: 2,
    brand: "BMW",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    href: "/articles/",
  },
  {
    id: 3,
    brand: "Volkswagen",
    image: "https://images.caradisiac.com/logos/5/4/4/7/245447/S0-quel-volkswagen-t-roc-choisir-166795.jpg",
    href: "/articles/",
  },
  {
    id: 4,
    brand: "SEAT",
    image: "https://www.seat.fr/content/dam/countries/fr/seat-website/seat-cars/new-cars-vehicles/single-image-newest-models/new-seat-tarraco-suv-7-seater-accessories-hero-image.jpg",
    href: "/articles/",
  },
  {
    id: 5,
    brand: "Peugeot",
    image: "https://www.topgear.com/sites/default/files/cars-car/image/2024/11/Hybrid5008_2024_EXT27.jpg",
    href: "/articles/",
  },
  {
    id: 6,
    brand: "Citroën",
    image: "https://wallpapers.com/images/featured/citroen-7lr1n6h99gjv58z6.jpg",
    href: "/articles/",
  },
  {
    id: 7,
    brand: "Renault",
    image: "https://car-images.bauersecure.com/wp-images/12770/renault-clio-2026-20.jpg",
    href: "/articles/",
  },
  {
    id: 8,
    brand: "Porsche",
    image: "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/image_1290x726/dam/pnr/2024/Products/992-II/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg/jcr:content/0840_nevada_coupe_u-crane_AKOS0607_edit_V03-sky.jpg",
    href: "/articles/",
  },
  {
    id: 9,
    brand: "Jaguar",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Jaguar_XJ_vs._Jetman_-_World-First_Desert_Drag_Race_%2822928441043%29_%28cropped%29.jpg",
    href: "/articles/",
  },
];

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="hidden md:flex bg-[#111111] border-b border-white/10 h-[44px] items-center px-6 justify-between">
      <div className="flex items-center gap-4">
        {[
          { icon: <FacebookIcon />, href: "#", label: "Facebook" },
          { icon: <InstagramIcon />, href: "#", label: "Instagram" },
          { icon: <TwitterIcon />, href: "#", label: "Twitter" },
          { icon: <YoutubeIcon />, href: "#", label: "YouTube" },
        ].map(({ icon, href, label }) => (
          <Link
            key={label}
            to={href}
            aria-label={label}
            className="text-white/50 hover:text-white transition-colors duration-200"
          >
            {icon}
          </Link>
        ))}
        <span className="w-px h-4 bg-white/10 mx-1" />
        <Link
          to="tel:+33664412376"
          className="flex items-center gap-2 text-white/60 hover:text-white text-[11px] uppercase tracking-widest font-medium transition-colors duration-200"
        >
          <PhoneIcon />
          HOTLINE : +33 6 64 41 23 76
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 text-white/60 hover:text-white text-[11px] uppercase tracking-widest font-medium transition-colors duration-200">
          <UserIcon />
          Mon compte
        </button>
        <button className="relative flex items-center gap-2 text-white/60 hover:text-white text-[11px] uppercase tracking-widest font-medium transition-colors duration-200">
          <HeartIcon />
          Favoris
          <span className="absolute -top-2 -right-3 bg-[#db0000] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold leading-none">
            0
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────
function MegaMenu({ columns }) {
  const hasImage = columns[columns.length - 1]?.image;
  const textCols = hasImage ? columns.slice(0, -1) : columns;
  const imageSrc = hasImage ? columns[columns.length - 1].image : null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] min-w-[680px] z-50 border-t-2 border-[#db0000]">
      <div className={`grid gap-0 ${imageSrc ? "grid-cols-4" : `grid-cols-${textCols.length}`}`}>
        {textCols.map((col, i) => (
          <div key={i} className="p-7 border-r border-gray-100 last:border-r-0">
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#db0000] mb-4">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-[16px] font-medium text-[#444] hover:text-[#db0000] hover:pl-1 transition-all duration-150 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-150 text-[#db0000]">
                      <ChevronRightIcon />
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {imageSrc && (
          <div className="relative overflow-hidden">
            <img src={imageSrc} alt="menu" className="w-full h-full object-cover min-h-[200px]" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Desktop Nav Item ─────────────────────────────────────────────────────────
function NavItem({ link, isSticky }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <li
      ref={ref}
      className="relative flex items-center h-full"
      onMouseEnter={() => link.children && setOpen(true)}
      onMouseLeave={() => link.children && setOpen(false)}
    >
      <Link
        to={link.href}
        className={`relative flex items-center gap-1.5 h-full px-4 xl:px-5 text-[16px] font-[800] uppercase tracking-[0.12em] transition-colors duration-200
          ${isSticky ? "text-[#222]" : "text-[#222]"}
          hover:text-[#db0000]
          after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-[#db0000] after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 after:origin-left
        `}
      >
        {link.label}
        {link.children && (
          <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-[#db0000]`}>
            <ChevronDownIcon />
          </span>
        )}
      </Link>
      {link.children && open && <MegaMenu columns={link.children} />}
    </li>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[900] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-[320px] bg-white z-[950] shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-[#111] border-b border-white/10">
          <span className="text-white font-black text-xl tracking-tight">BAP PARIS</span>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded px-4 py-3">
            <SearchIcon />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {navLinks.map((link, i) => (
            <div key={i} className="border-b border-gray-100">
              <button
                onClick={() => link.children ? setExpanded(expanded === i ? null : i) : (window.location.href = link.href)}
                className="w-full flex items-center justify-between px-5 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#222] hover:text-[#db0000] transition-colors"
              >
                {link.label}
                {link.children && (
                  <span className={`transition-transform duration-200 text-[#db0000] ${expanded === i ? "rotate-180" : ""}`}>
                    <ChevronDownIcon />
                  </span>
                )}
              </button>
              {link.children && expanded === i && (
                <div className="bg-gray-50 pb-3">
                  {link.children.filter((c) => c.items).map((col, ci) => (
                    <div key={ci} className="px-5 pt-3">
                      <p className="text-[10px] uppercase tracking-widest text-[#db0000] font-bold mb-2">{col.title}</p>
                      {col.items.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block py-1.5 text-[13px] text-[#555] hover:text-[#db0000] transition-colors pl-2 border-l-2 border-transparent hover:border-[#db0000]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="px-5 py-5 border-t border-gray-100 bg-gray-50 space-y-2">
          <Link to="tel:++33664412376" className="flex items-center gap-3 text-[13px] text-[#444] hover:text-[#db0000] transition-colors">
            <PhoneIcon /> +33 6 64 41 23 76
          </Link>
          <div className="flex gap-4 pt-2">
            {[FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon].map((Icon, i) => (
              <Link key={i} href="#" className="text-[#999] hover:text-[#db0000] transition-colors">
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Search Overlay (with Car Brand Search) ───────────────────────────────────
function SearchOverlay({ open, onClose }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  // Filter brands based on search query (max 9)
  const filteredBrands = query.trim()
    ? carBrands.filter((b) =>
        b.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 9)
    : carBrands.slice(0, 9); // show all 9 by default

  const hasResults = filteredBrands.length > 0;
  const isSearching = query.trim().length > 0;

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleBrandClick = (href) => {
    onClose();
    window.location.href = href;
  };

  const handleSeeAllCars = () => {
    onClose();
    window.location.href = "/articles";
  };

  return (
    <div
      className={`fixed inset-0 z-[1100] transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className={`absolute top-0 left-0 right-0 bg-white transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"}`}
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}
      >
        {/* Search input row */}
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4 border-b border-gray-100">
          <span className="text-gray-400 shrink-0">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une marque de voiture..."
            className="flex-1 text-[17px] outline-none text-gray-800 placeholder-gray-400 font-light bg-transparent"
          />

          {/* "See all cars" button */}
          <button
            onClick={handleSeeAllCars}
            className="hidden md:flex items-center gap-2 bg-[#db0000] hover:bg-[#b80000] text-white text-[12px] font-bold uppercase tracking-widest px-5 py-2.5 transition-colors duration-200 shrink-0 rounded"
          >
            Voir toutes les voitures
            <ArrowRightIcon />
          </button>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors shrink-0 ml-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Car brand results */}
        <div className="max-w-4xl mx-auto px-6 py-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-semibold">
              {isSearching
                ? `${filteredBrands.length} marque${filteredBrands.length !== 1 ? "s" : ""} trouvée${filteredBrands.length !== 1 ? "s" : ""}`
                : "Toutes les marques"}
            </p>
            {/* Mobile "see all" link */}
            <button
              onClick={handleSeeAllCars}
              className="md:hidden flex items-center gap-1.5 text-[12px] text-[#db0000] font-bold uppercase tracking-wider hover:underline"
            >
              Voir tout <ArrowRightIcon />
            </button>
          </div>

          {/* Brands grid */}
          {hasResults ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-3">
              {filteredBrands.map((brand) => (
                <BrandSearchCard
                  key={brand.id}
                  brand={brand}
                  onClick={() => handleBrandClick(brand.href)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-gray-400">
              <CarIcon />
              <p className="text-[13px]">Aucune marque trouvée pour « {query} »</p>
            </div>
          )}

          {/* Bottom CTA strip */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[12px] text-gray-400">
              {carBrands.length} marques disponibles · Boîtes automatiques
            </p>
            <button
              onClick={handleSeeAllCars}
              className="flex items-center gap-2 text-[12px] text-[#db0000] font-semibold hover:gap-3 transition-all duration-150"
            >
              Explorer toutes les marques <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Brand Search Card (compact, inside search overlay) ───────────────────────
function BrandSearchCard({ brand, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2 p-2 rounded-xl border border-transparent hover:border-[#db0000]/20 hover:bg-red-50/60 transition-all duration-150 group text-left w-full"
      style={{ outline: "none" }}
    >
      {/* Image thumbnail */}
      <div
        className="w-full rounded-lg overflow-hidden"
        style={{ height: 68, background: "#f3f4f6" }}
      >
        {!imgError ? (
          <img
            src={brand.image}
            alt={brand.brand}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <CarIcon />
          </div>
        )}
      </div>

      {/* Brand name */}
      <span
        className="text-[12px] font-semibold text-center leading-tight transition-colors duration-150"
        style={{ color: hovered ? "#db0000" : "#1a1a2e" }}
      >
        {brand.brand}
      </span>
    </button>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-[900] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-[370px] max-w-[95vw] bg-white z-[950] shadow-[-10px_0_40px_rgba(0,0,0,0.12)] transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <CartIcon />
            <span className="text-sm font-bold uppercase tracking-widest text-[#222]">Panier</span>
            <span className="bg-[#db0000] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">0</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
            <CartIcon />
          </div>
          <p className="text-[13px] text-gray-500 font-medium">Votre panier est vide</p>
          <p className="text-[12px] text-gray-400 mt-1">Ajoutez des services ou pièces pour commencer</p>
          <Link
            to="/prestations"
            className="mt-6 inline-block bg-[#111] text-white text-[11px] uppercase tracking-widest font-bold px-6 py-3 hover:bg-[#db0000] transition-colors duration-200"
          >
            Voir les prestations
          </Link>
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 44);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;600;700;800&display=swap');
        * { font-family: 'Bai Jamjuree', sans-serif; }
      `}</style>

      <header
        className={`w-full z-[1000] transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-[0_2px_20px_rgba(0,0,0,0.10)]" : "relative"
        }`}
      >
        <div className="bg-white h-[120px] md:h-[120px]">
          <div className="max-w-[1400px] mx-auto px-5 xl:px-10 h-full flex items-center justify-between gap-4">

            {/* LEFT: Burger (mobile) + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-[#222] hover:text-[#db0000] transition-colors"
                aria-label="Menu"
              >
                <MenuIcon />
              </button>
              <Link to="/" className="flex items-center shrink-0 -my-4">
  <img
    src="/images/logu.png"
    alt="BAP Paris Auto Garage"
    className="h-[110px] md:h-[150px] w-auto object-contain mix-blend-multiply"
  />
</Link>
              {/* <a href="/" className="flex items-center shrink-0 -my-3">
  <img
    src="/images/logo.png"
    alt="BAP Paris Auto Garage"
    className="h-[90px] md:h-[120px] w-auto object-contain mix-blend-multiply"
  />
</a> */}
            </div>

            {/* CENTER: Desktop nav */}
            <nav className="hidden lg:flex items-center h-full flex-1 justify-center">
              <ul className="flex items-center h-full">
                {navLinks.map((link, i) => (
                  <NavItem key={i} link={link} isSticky={isSticky} />
                ))}
              </ul>
            </nav>

            {/* RIGHT: Search + Wishlist + Cart */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-[42px] h-[42px] bg-[#eeeeee] hover:bg-[#db0000] hover:text-white text-[#444] flex items-center justify-center transition-all duration-200 group"
                aria-label="Rechercher"
              >
                <SearchIcon />
              </button>
              <button
                className="relative hidden md:flex w-[42px] h-[42px] items-center justify-center text-white hover:text-[#db0000] transition-colors duration-200"
                aria-label="Favoris"
              >
                
              </button>
            </div>
          </div>
        </div>
      </header>

      {isSticky && <div className="h-[90px]" />}

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}