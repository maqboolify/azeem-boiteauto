import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Contact from './components/Contact'


import { Routes, Route } from 'react-router-dom'
import DiagnosticPage from './components/Diagnosticpage'
import TarifPage from './components/Tarifpage'
import VidangePage from './components/Vidangepage'
import ReparationPage from './components/Reparationpage'
import MontagePage from './components/Montagepage'
import MecatroniquePage from './components/Mecatroniquepage'
import TypeDeBVAPage from './components/TypeDeBVAPage'
import FaqPage from './components/Faqpage'
import Calculators from './components/Calculators'
import TransmissionsAutomatiques from './components/TransmissionsAutomatiques'
import MechatronicsPage from './components/Mechatronicspage'
import ItemPage from './components/ItemPage'
import GearboxCatalog from './components/Gearboxcatalog'
import ImaAicha from './components/ImaAicha'
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Hero />} />
        {/* <Route path="/" element={<ImaAicha />} /> */}
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/pieces/calculateurss" element={<Calculators />} />
        <Route path="/pieces/boitess" element={<TransmissionsAutomatiques />} />
        <Route path="/articless" element={<ItemPage />} />
        <Route path="/services/diagnostics"element={<DiagnosticPage />} />
        <Route path="/tarifss"element={<TarifPage />} />
        <Route path="/services/vidanges"element={<VidangePage />} />
        <Route path="/services/reparations"element={<ReparationPage />} />
        <Route path="/services/montages"element={<MontagePage />} />
        <Route path="/services/mecatroniques"element={<MecatroniquePage />} />
        <Route path="/pieces/mecatroniquess"element={<MechatronicsPage />} />
        <Route path="/ressources/type-de-bvas"element={<TypeDeBVAPage />} />
        <Route path="/ressources/faqs"element={<FaqPage />} />
        <Route path="/pieces/manuelless"element={<GearboxCatalog />} />



        {/* Add more pages like this */}
        {/* <Route path="/services" element={<Services />} /> */}
      </Routes>
    </>
  )
}

export default App