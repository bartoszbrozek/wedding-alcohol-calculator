document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weddingForm');
    const addAlcoholTypeBtn = document.getElementById('addAlcoholType');
    const addDrinkTypeBtn = document.getElementById('addDrinkType');
    const alcoholTypesContainer = document.getElementById('alcoholTypes');
    const drinkTypesContainer = document.getElementById('drinkTypes');
    const resultsDiv = document.getElementById('results');
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    // Add event listeners for adding new alcohol and drink types
    addAlcoholTypeBtn.addEventListener('click', () => addNewType('alcohol'));
    addDrinkTypeBtn.addEventListener('click', () => addNewType('drink'));

    // Add event listeners for remove buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateQuantities();
    });

    function addNewType(type) {
        const container = type === 'alcohol' ? alcoholTypesContainer : drinkTypesContainer;
        const div = document.createElement('div');
        div.className = type === 'alcohol' ? 'alcohol-type' : 'drink-type';
        
        if (type === 'alcohol') {
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'alcohol-name';
            nameInput.placeholder = 'Name (e.g., Beer)';
            
            const volumeInput = document.createElement('input');
            volumeInput.type = 'number';
            volumeInput.className = 'alcohol-volume';
            volumeInput.placeholder = 'Volume (ml)';
            volumeInput.value = '500';
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            
            div.appendChild(nameInput);
            div.appendChild(volumeInput);
            div.appendChild(removeBtn);
        } else {
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.className = 'drink-name';
            nameInput.placeholder = 'Name (e.g., Whisky Sour)';
            
            const ingredientsDiv = document.createElement('div');
            ingredientsDiv.className = 'drink-ingredients';
            
            const addIngredientBtn = document.createElement('button');
            addIngredientBtn.type = 'button';
            addIngredientBtn.className = 'add-ingredient-btn';
            addIngredientBtn.textContent = 'Add Ingredient';
            addIngredientBtn.onclick = () => addIngredientToDrink(ingredientsDiv);
            
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = 'Remove';
            
            div.appendChild(nameInput);
            div.appendChild(ingredientsDiv);
            div.appendChild(addIngredientBtn);
            div.appendChild(removeBtn);
            
            // Add first ingredient by default
            addIngredientToDrink(ingredientsDiv);
        }
        
        container.appendChild(div);
    }

    function addIngredientToDrink(container) {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'drink-ingredient';
        
        const alcoholSelect = document.createElement('select');
        alcoholSelect.className = 'alcohol-select';
        
        // Get all alcohol types
        const alcoholTypes = Array.from(document.getElementsByClassName('alcohol-type')).map(type => ({
            name: type.querySelector('.alcohol-name').value || 'Unnamed Alcohol',
            volume: parseInt(type.querySelector('.alcohol-volume').value) || 0
        }));
        
        // Add options to select
        alcoholTypes.forEach(alcohol => {
            const option = document.createElement('option');
            option.value = alcohol.name;
            option.textContent = `${alcohol.name} (${alcohol.volume}ml)`;
            alcoholSelect.appendChild(option);
        });
        
        const volumeInput = document.createElement('input');
        volumeInput.type = 'number';
        volumeInput.className = 'ingredient-volume';
        volumeInput.placeholder = 'Volume (ml)';
        volumeInput.value = '50';
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => ingredientDiv.remove();
        
        ingredientDiv.appendChild(alcoholSelect);
        ingredientDiv.appendChild(volumeInput);
        ingredientDiv.appendChild(removeBtn);
        container.appendChild(ingredientDiv);
    }

    function calculateQuantities() {
        // Get guest information
        const totalGuests = parseInt(document.getElementById('totalGuests').value);
        const alcoholicBeerDrinkers = parseInt(document.getElementById('alcoholicBeerDrinkers').value);
        const nonAlcoholicBeerDrinkers = parseInt(document.getElementById('nonAlcoholicBeerDrinkers').value);
        const alcoholicDrinkers = parseInt(document.getElementById('alcoholicDrinkers').value);
        const nonAlcoholicDrinkers = parseInt(document.getElementById('nonAlcoholicDrinkers').value);

        // Get consumption per person
        const alcoholicBeerPerPerson = parseInt(document.getElementById('alcoholicBeerPerPerson').value);
        const nonAlcoholicBeerPerPerson = parseInt(document.getElementById('nonAlcoholicBeerPerPerson').value);
        const alcoholicDrinksPerPerson = parseInt(document.getElementById('alcoholicDrinksPerPerson').value);
        const nonAlcoholicDrinksPerPerson = parseInt(document.getElementById('nonAlcoholicDrinksPerPerson').value);

        // Calculate total volumes needed
        const totalAlcoholicBeerVolume = alcoholicBeerDrinkers * alcoholicBeerPerPerson;
        const totalNonAlcoholicBeerVolume = nonAlcoholicBeerDrinkers * nonAlcoholicBeerPerPerson;
        const totalAlcoholicDrinksVolume = alcoholicDrinkers * alcoholicDrinksPerPerson;
        const totalNonAlcoholicDrinksVolume = nonAlcoholicDrinkers * nonAlcoholicDrinksPerPerson;

        // Get alcohol types and calculate quantities
        const alcoholTypes = Array.from(document.getElementsByClassName('alcohol-type')).map(type => ({
            name: type.querySelector('.alcohol-name').value || 'Unnamed Alcohol',
            volume: parseInt(type.querySelector('.alcohol-volume').value) || 0
        }));

        // Get drink types and their ingredients
        const drinkTypes = Array.from(document.getElementsByClassName('drink-type')).map(type => {
            const name = type.querySelector('.drink-name').value || 'Unnamed Drink';
            const ingredients = Array.from(type.querySelectorAll('.drink-ingredient')).map(ingredient => ({
                alcohol: ingredient.querySelector('.alcohol-select').value,
                volume: parseInt(ingredient.querySelector('.ingredient-volume').value) || 0
            }));
            return { name, ingredients };
        });

        // Clear previous results
        resultsTable.innerHTML = '';

        // Add results to table
        const results = [
            {
                type: 'Alcoholic Beer',
                totalVolume: totalAlcoholicBeerVolume,
                alcoholTypes: alcoholTypes.filter(a => a.name.toLowerCase().includes('beer'))
            },
            {
                type: 'Non-Alcoholic Beer',
                totalVolume: totalNonAlcoholicBeerVolume,
                alcoholTypes: alcoholTypes.filter(a => a.name.toLowerCase().includes('non-alcoholic'))
            },
            {
                type: 'Alcoholic Drinks',
                totalVolume: totalAlcoholicDrinksVolume,
                drinkTypes: drinkTypes
            },
            {
                type: 'Non-Alcoholic Drinks',
                totalVolume: totalNonAlcoholicDrinksVolume,
                drinkTypes: []
            }
        ];

        results.forEach(result => {
            if (result.totalVolume > 0) {
                // Add main category row
                addTableRow(result.type, 'Total', result.totalVolume);

                // Add specific alcohol types
                if (result.alcoholTypes && result.alcoholTypes.length > 0) {
                    result.alcoholTypes.forEach(alcohol => {
                        const quantity = Math.ceil(result.totalVolume / alcohol.volume);
                        addTableRow(`${result.type} - ${alcohol.name}`, quantity, quantity * alcohol.volume);
                    });
                }

                // Add specific drink types
                if (result.drinkTypes && result.drinkTypes.length > 0) {
                    result.drinkTypes.forEach(drink => {
                        // Calculate total alcohol volume for this drink
                        const totalDrinkVolume = drink.ingredients.reduce((sum, ingredient) => sum + ingredient.volume, 0);
                        const quantity = Math.ceil(result.totalVolume / totalDrinkVolume);
                        
                        // Add row for the drink
                        addTableRow(`${result.type} - ${drink.name}`, quantity, quantity * totalDrinkVolume);
                        
                        // Add rows for each ingredient
                        drink.ingredients.forEach(ingredient => {
                            const alcoholType = alcoholTypes.find(a => a.name === ingredient.alcohol);
                            if (alcoholType) {
                                const ingredientQuantity = Math.ceil((quantity * ingredient.volume) / alcoholType.volume);
                                addTableRow(`  └─ ${ingredient.alcohol}`, ingredientQuantity, ingredientQuantity * alcoholType.volume);
                            }
                        });
                    });
                }
            }
        });

        // Show results
        resultsDiv.classList.remove('hidden');
    }

    function addTableRow(type, quantity, totalVolume) {
        const row = resultsTable.insertRow();
        row.insertCell(0).textContent = type;
        row.insertCell(1).textContent = quantity;
        row.insertCell(2).textContent = `${totalVolume} ml`;
    }
}); 