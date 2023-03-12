import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchService } from "../../Services/Services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./CharacterDetails.scss";
import Spinner from "../Spinner/Spinner";

function CharacterField(props) {
  const { label, value } = props;
  return (
    <div className="characterField">
      <span className="characterField__label">{label}</span>
      <span className="characterField__value">{value}</span>
      <hr className="characterField__underline" />
    </div>
  );
}

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchService
      .getCharacterById(id)
      .then((data) => setCharacter(data))
      .catch((error) => {
        console.log(error);
        navigate("/404");
      });
  }, [id, navigate]);

  if (!character) {
    return <Spinner />;
  }

  return (
    <div className="characterDetails">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="characterDetails__backIcon"
        />{" "}
        GO BACK
      </button>

      <div className="characterDetails__info">
        <img
          src={character.image}
          alt={character.name}
          className="characterDetails__image"
        />

        <h2 className="characterDetails__name">{character.name}</h2>
        <h6 className="characterDetails__informations">Informations</h6>

        <CharacterField label="Gender" value={character.gender || "unknown"} />
        <CharacterField label="Status" value={character.status || "unknown"} />
        <CharacterField label="Specie" value={character.species || "unknown"} />
        <CharacterField
          label="Origin"
          value={character.origin.name || "unknown"}
        />
        <CharacterField label="Type" value={character.type || "unknown"} />
      </div>
    </div>
  );
}

export default CharacterDetails;
