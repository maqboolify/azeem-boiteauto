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
        <Route path="/pieces/calculateurs" element={<Calculators />} />
        <Route path="/pieces/boites" element={<TransmissionsAutomatiques />} />
        <Route path="/articles" element={<ItemPage />} />
        <Route path="/services/diagnostic"element={<DiagnosticPage />} />
        <Route path="/tarifs"element={<TarifPage />} />
        <Route path="/services/vidange"element={<VidangePage />} />
        <Route path="/services/reparation"element={<ReparationPage />} />
        <Route path="/services/montage"element={<MontagePage />} />
        <Route path="/services/mecatronique"element={<MecatroniquePage />} />
        <Route path="/pieces/mecatroniques"element={<MechatronicsPage />} />
        <Route path="/ressources/type-de-bva"element={<TypeDeBVAPage />} />
        <Route path="/ressources/faq"element={<FaqPage />} />
        <Route path="/pieces/manuelles"element={<GearboxCatalog />} />



        {/* Add more pages like this */}
        {/* <Route path="/services" element={<Services />} /> */}
      </Routes>
    </>
  )
}

export default App