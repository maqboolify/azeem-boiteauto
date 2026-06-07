import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
// ─── FAQ DATA ────────────────────────────────────────────────────────────────
// Replace the question/answer text below with your own content.
// Each item has: id, category, question, answer
const FAQ_ITEMS = [
  {
    id: 1,
    category: "Vidange",
    question: "Comment vidanger sa boîte de vitesses automatique ?",
    answer:
      "Pour vidanger une boîte de vitesses automatique, il faut suivre un protocole précis. Utilisez un outil de diagnostic connecté sur une prise OBD pour vérifier l'état de l'huile et détecter la présence éventuelle de limaille. Une fois l'huile usagée évacuée et remplacée par de l'huile neuve, il est souvent nécessaire de réinitialiser les valeurs auto-adaptatives du calculateur ou TCM (Transmission Control Module). Cette réinitialisation est cruciale pour optimiser les performances de la boîte de vitesses et supprimer les à-coups entre les positions N (Neutre) et D (Drive).",
  },
  {
    id: 2,
    category: "Vidange",
    question: "À quelle fréquence faut-il vidanger sa boîte de vitesses ?",
    answer:
      "Il est conseillé de vidanger votre boîte de vitesses automatique tous les 60 000 à 80 000 km. Cependant, pour les boîtes à double embrayage à sec, telles que la DSG7 de Volkswagen et la DC4 (EDC) de Renault, la vidange peut être effectuée jusqu'à 100 000 km. Pour obtenir des recommandations précises, il est préférable de consulter un spécialiste ou de se référer aux directives spécifiques de la marque et du modèle de votre véhicule.",
  },
  {
    id: 3,
    category: "Huile",
    question: "Quel type d'huile utiliser pour ma boîte de vitesses ?",
    answer:
      "Le choix de l'huile dépend du type de boîte de vitesses et de l'âge du véhicule. Utilisez de l'huile multi-ATF pour les boîtes à convertisseur de couple des véhicules moyennement anciens. Pour les véhicules récents équipés de boîtes à convertisseur de couple, préférez l'ATF6. Pour les boîtes à variation continue (CVT), utilisez de l'huile multi-CVT. Pour les véhicules équipés de doubles embrayages, utilisez de l'huile DCTF. La Multi-HF est utilisée pour les boîtes robotisées.",
  },
  {
    id: 4,
    category: "Utilisation",
    question: "Est-il préférable de laisser en D ou de mettre en P lors d'un arrêt au stop ?",
    answer:
      "Il est conseillé de laisser votre boîte automatique en position D lors des courts arrêts, comme aux feux rouges ou aux stops, pour éviter l'usure prématurée des composants. Laisser la boîte en D maintient une pression d'huile constante dans le système de transmission, évitant les à-coups et les sollicitations excessives des composants internes. Passer fréquemment de D à P peut provoquer une usure prématurée du mécanisme de verrouillage et des solénoïdes.",
  },
  {
    id: 5,
    category: "DSG",
    question: "Les boîtes DSG sont-elles fiables ?",
    answer:
      "Oui, les boîtes DSG (Direct Shift Gearbox) sont réputées pour leur fiabilité et leurs performances. Elles offrent des changements de vitesses rapides et fluides, surtout les modèles à double embrayage mouillé. Ces boîtes représentent l'avenir en matière de confort de conduite, grâce à la présence de « synchro » entre chaque vitesse, ce qui permet de ne pas sentir les vitesses passer.",
  },
  {
    id: 6,
    category: "DSG",
    question: "Quelle est la différence entre un double embrayage à sec et mouillé ?",
    answer:
      "Un double embrayage à sec n'est pas immergé dans l'huile, ce qui le rend plus simple et moins coûteux à produire, mais peut entraîner une usure plus rapide. On le trouve sur des véhicules comme les Renault Captur, Clio, Scénic, Mégane, et sur les DSG7 du groupe Volkswagen. Le double embrayage mouillé est immergé dans de l'huile, offrant une meilleure dissipation de la chaleur et une plus grande durabilité. Il est utilisé sur les Mercedes Classe B et A, les véhicules Volkswagen, les Fiat 500X et 500L, ainsi que les Audi.",
  },
  {
    id: 7,
    category: "Vidange",
    question: "Est-ce qu'une vidange peut supprimer les à-coups ?",
    answer:
      "Oui, une vidange peut supprimer les à-coups, surtout s'ils sont faibles. En renouvelant l'huile, vous éliminez les impuretés qui perturbent le fonctionnement des composants internes, rétablissant ainsi une pression optimale. De plus, une réinitialisation des valeurs auto-adaptatives (ou reset) peut encore améliorer la fluidité et réduire les à-coups.",
  },
  {
    id: 8,
    category: "Vidange",
    question: "Quelle est la différence entre la méthode flushing et gravité ?",
    answer:
      "Le flushing consiste en un rinçage total de la boîte, remplaçant presque toute l'huile, et est particulièrement efficace pour les boîtes de vitesses à convertisseur de couple hydraulique. En revanche, la méthode par gravité ne vidange que 50 à 70 % de l'huile présente, laissant une partie de l'huile usagée dans le système. Pour le flushing, on se connecte directement au radiateur ou au refroidisseur de la boîte de vitesses automatique.",
  },
  {
    id: 9,
    category: "Vidange",
    question: "Est-ce qu'une vidange peut endommager ma boîte de vitesses ?",
    answer:
      "Non, une vidange bien réalisée n'endommage pas la partie mécanique de la boîte de vitesses. Cependant, elle doit être effectuée avec précaution pour éviter des problèmes dans le bloc de contrôle hydraulique, notamment le valve body. Une mauvaise vidange peut déplacer des particules ou des dépôts, provoquant des obstructions et affectant le passage des vitesses.",
  },
  {
    id: 10,
    category: "Entretien",
    question: "Pourquoi faire la vidange de sa boîte automatique ?",
    answer:
      "Vidanger régulièrement votre boîte de vitesses prolonge sa durée de vie, améliore les performances et évite des coûts de remplacement élevés. L'huile se dégrade avec le temps, accumulant des impuretés qui peuvent endommager les composants internes. Certains modèles ont des crépines internes, remplaçables uniquement lors d'une réfection complète, tandis que d'autres possèdent des crépines externes et des joints de carter à remplacer à chaque vidange.",
  },
  {
    id: 11,
    category: "Diagnostic",
    question: "Comment expliquer la présence de limaille dans l'huile ?",
    answer:
      "La présence de limaille dans l'huile de votre boîte de vitesses est principalement due à l'usure des disques de friction qui libèrent de minuscules fragments de métal. Ces résidus métalliques se mélangent à l'huile et peuvent s'accumuler au fil du temps. Pour les boîtes avec un carter, un aimant placé sur le carter permet de capter et d'évaluer la quantité de limaille présente, facilitant ainsi l'entretien et la prévention de dommages supplémentaires.",
  },
  {
    id: 12,
    category: "Diagnostic",
    question: "Que signifie la présence d'antigel (liquide refroidissement) dans l'huile ?",
    answer:
      "La présence d'antigel dans l'huile de la boîte de vitesses indique une fuite au niveau du refroidisseur. Le liquide de refroidissement se mélange à l'huile, modifiant sa consistance et sa couleur. Cela est très mauvais pour la boîte de vitesses, car une huile diluée par l'antigel perd ses propriétés de lubrification et de refroidissement, entraînant une surchauffe et des dommages graves aux composants internes.",
  },
  {
    id: 13,
    category: "Entretien",
    question: "Est-il vrai que certaines BVA ne se vidangent jamais ?",
    answer:
      "En pratique, toutes les boîtes de vitesses doivent être vidangées. Même les huiles dites 'long life' doivent être remplacées périodiquement pour maintenir leurs propriétés. Bien que certains manuels, comme ceux des boîtes ZF 6HP, aient pu indiquer qu'elles n'avaient pas besoin de vidange, cette affirmation n'est jamais très claire. Vidanger entre 60 000 et 80 000 km est tout à fait raisonnable et logique pour garantir une performance optimale.",
  },
  {
    id: 14,
    category: "Diagnostic",
    question: "J'ai une fuite : huile de boîte de vitesses ou huile moteur ?",
    answer:
      "Les huiles de boîtes de vitesses peuvent être rouges, jaunes ou vertes. Si votre huile de boîte est jaune, elle peut ressembler à l'huile moteur. Pour déterminer l'origine de la fuite, examinez la couleur de l'huile et l'emplacement de la fuite sous la voiture. L'huile de boîte de vitesses se trouve généralement près de la transmission, tandis que l'huile moteur est située plus à l'avant, sous le bloc moteur.",
  },
  {
    id: 15,
    category: "Huile",
    question: "Quel type d'huile utiliser pour ma boîte de vitesses automatique ?",
    answer:
      "Le choix de l'huile pour votre boîte de vitesses automatique est important : il faut utiliser soit de l'huile homologuée soit l'huile du constructeur. Le type d'huile doit correspondre au type spécifique de boîte de vitesses de votre véhicule, qu'il s'agisse de CVT, de double embrayage à sec, de convertisseur de couple ou de boîtes robotisées. Les huiles homologuées respectent des normes strictes, garantissant une lubrification adéquate et la protection des composants internes.",
  },
];

const CATEGORIES = ["Tous", ...Array.from(new Set(FAQ_ITEMS.map((f) => f.category)))];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const ChevronIcon = ({ open }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    width="20" height="20" viewBox="0 0 20 20" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </motion.svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
const StatCounter = ({ value, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl font-black text-red-600 tabular-nums">{inView ? value : "0"}</div>
      <div className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-medium">{label}</div>
    </motion.div>
  );
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
const FaqItem = ({ item, index, isOpen, onToggle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? "border-red-500 shadow-lg shadow-red-100"
            : "border-gray-200 hover:border-red-300 hover:shadow-md hover:shadow-red-50"
        }`}
      >
        {/* Question row */}
        <button
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        >
          <div className="flex items-start gap-4 min-w-0">
            {/* Number badge */}
            <span
              className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 transition-colors duration-300 ${
                isOpen ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-red-100 group-hover:text-red-600"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`font-semibold text-[15px] leading-snug transition-colors duration-200 ${isOpen ? "text-red-700" : "text-gray-900"}`}>
              {item.question}
            </span>
          </div>
          <span className={`flex-shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? "text-red-600" : "text-gray-400"}`}>
            <ChevronIcon open={isOpen} />
          </span>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 pb-6 pl-[4.25rem]">
                <div className="w-10 h-px bg-red-200 mb-4" />
                <p className="text-gray-600 text-[14.5px] leading-relaxed">{item.answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── HERO BREADCRUMB ─────────────────────────────────────────────────────────
const HeroBanner = () => (
  <section className="relative overflow-hidden bg-gray-950 py-20">
    {/* Decorative red gradient blob */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-600/20 blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-red-800/10 blur-[80px]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <div className="relative max-w-5xl mx-auto px-6 text-center">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6"
      >
        <span className="hover:text-red-400 cursor-pointer transition-colors">Accueil</span>
        <span className="text-gray-700">/</span>
        <span className="hover:text-red-400 cursor-pointer transition-colors">Ressources</span>
        <span className="text-gray-700">/</span>
        <span className="text-red-400">FAQ</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4"
      >
        Foire aux{" "}
        <span className="relative inline-block">
          <span className="relative z-10 text-red-500">Questions</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="absolute bottom-1 left-0 right-0 h-1 bg-red-600/40 rounded-full z-0"
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="text-gray-400 text-lg max-w-xl mx-auto"
      >
        {/* ← REPLACE: Your subtitle here */}
        Tout ce que vous devez savoir sur l'entretien et la réparation de votre boîte automatique.
      </motion.p>
    </div>
  </section>
);

// ─── CONTACT CTA ─────────────────────────────────────────────────────────────
const ContactCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-red-600 p-10 md:p-14 text-center mx-auto max-w-4xl mt-16"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-red-500/40 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-red-800/40 blur-2xl pointer-events-none" />

      <div className="relative">
        <p className="text-red-200 text-sm uppercase tracking-[0.2em] font-semibold mb-3">
          {/* ← REPLACE: your tagline */}
          Vous n'avez pas trouvé votre réponse ?
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          {/* ← REPLACE: your CTA heading */}
          Contactez nos experts
        </h2>
        <p className="text-red-100 max-w-md mx-auto mb-8 text-[15px] leading-relaxed">
          {/* ← REPLACE: your CTA description */}
          Notre équipe de spécialistes est disponible pour répondre à toutes vos questions sur votre transmission automatique.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-white text-red-600 font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* ← REPLACE: your CTA button label */}
            Nous contacter
          </motion.a>
          <motion.a
            href="tel:XXXXXXXXXX"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-red-800 transition-colors"
          >
            {/* ← REPLACE: your phone number */}
            📞 +33 6 64 41 23 76
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function FaqPage() {
  const [openId, setOpenId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = activeCategory === "Tous" || item.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── HERO ── */}
      <HeroBanner />

      {/* ── STATS STRIP ── */}
      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6 divide-x divide-gray-200">
          <StatCounter value="15" label="Questions répondues" />
          {/* ← REPLACE these stat values with your own */}
          <StatCounter value="5" label="Catégories" />
          <StatCounter value="3" label="Ateliers" />
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="max-w-4xl mx-auto px-6 py-14">

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une question…"
            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-[15px] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
          />
          <AnimatePresence>
            {search && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors text-lg font-bold"
              >
                ×
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              {filtered.map((item, i) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  index={i}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-400"
            >
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-medium">Aucun résultat pour « {search} »</p>
              <p className="text-sm mt-1">Essayez d'autres mots-clés ou contactez-nous directement.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result count */}
        <AnimatePresence>
          {(search || activeCategory !== "Tous") && filtered.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-gray-400 mt-6 text-center"
            >
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <ContactCTA />
      </section>
    </div>
  );
}