import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import Characters from "../Characters/Characters";
import NoPageFound from "../NoPageFound/NoPageFound";
import { fetchService } from "../../Services/Services";
import Footer from "../Footer/Footer";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../TermsOfService/TermsOfService";

function App() {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const fetchCharacters = async () => {
    try {
      const charactersData = await fetchService.getAllCharacters();
      setCharacters(
        charactersData.sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (error) {
      console.error("Error fetching characters:", error);

      navigate("/404");
    }
  };
  useEffect(() => {
    if (characters.length === 0) {
      fetchCharacters();
    }
  }, [characters]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Characters characters={characters} />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
