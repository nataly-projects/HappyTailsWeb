import React from "react";
import InfoGridItem from "../components/InfoGridItem"; 
import infoImage from "../images/tails.png";  
import petNamesIcon from "../images/tag_name.jpg";
import catIcon from "../images/cat.png";
import dogIcon from "../images/dog.png";
import '../styles/ImportantInfoPage.css';


const ImportantInfoPage = () => {
  return (
    <div>
      <div className='info-image'>
        <h2> Information for adopters </h2>
        <img src={infoImage} alt="Info Image" className="image" />
      </div>
      
      <div className="info-grid">
        <InfoGridItem to="/info/pet-names" labelText="Pet Names Idea" imageSrc={petNamesIcon}/>
        <InfoGridItem to="/info/dog-adoption-guide" labelText="Dog Adoption Guide" imageSrc={dogIcon}/>
        <InfoGridItem to="/info/cat-adoption-guide" labelText="Cat Adoption Guide" imageSrc={catIcon}/>
      </div>
    </div>
  );
};

export default ImportantInfoPage;
