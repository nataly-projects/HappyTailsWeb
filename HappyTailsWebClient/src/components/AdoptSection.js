import React, {useState} from 'react';
import CategoryList from '../components/CategoryListComponent';
import PetList from './PetList';
import CategoryDetailsPage from '../pages/CategoryDetailsPage';
import FiltersComponent from './FiltersComponent';
import '../styles/AdoptSection.css';

const AdoptSection = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredPets, setFilteredPets] = useState([]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBackButtonClick = () => {
        setFilteredPets([]);
      };

    return (
        <div className='adop-section-container'>
        
            {selectedCategory ? (
                <CategoryDetailsPage 
                categoryName={selectedCategory.name} 
                setSelectedCategory={setSelectedCategory}
                 />
            ) : (
                // <>
                // <h1>HELP US HELP THEM!</h1>
                // <h2>Adopt a FurEver friend!</h2>
                // <h3>You can find your new pet friend by categories or by the filters</h3>
                // < FiltersComponent handleFilter={handleFilter}/>
                //  <CategoryList 
                //     handleCategoryClick={handleCategoryClick}
                // /> 
                // </>
                <>
                {filteredPets.length > 0 ? (
                    <>
                    <button onClick={handleBackButtonClick}>Back</button>
                    <PetList pets={filteredPets} />
                    </>
                ) : (
                    <>
                    <h1>HELP US HELP THEM!</h1>
                    <h2>Adopt a FurEver friend!</h2>
                    <h3>You can find your new pet friend by categories or by the filters</h3>
                    < FiltersComponent setFilteredPets={setFilteredPets}/>
                    <CategoryList handleCategoryClick={handleCategoryClick} />
                    </>
                )}
                </>         
            )}
           

        </div>
    );
};

export default AdoptSection;