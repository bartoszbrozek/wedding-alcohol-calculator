<template>
  <div class="container">
    <h1>Wedding Alcohol Calculator</h1>
    
    <form @submit.prevent="calculateQuantities">
      <div class="form-section">
        <h2>Guest Information</h2>
        <div class="form-group">
          <label for="alcoholicBeerDrinkers">Number of Alcoholic Beer Drinkers:</label>
          <input type="number" id="alcoholicBeerDrinkers" v-model.number="guestInfo.alcoholicBeerDrinkers" required min="0">
        </div>
        <div class="form-group">
          <label for="nonAlcoholicBeerDrinkers">Number of Non-Alcoholic Beer Drinkers:</label>
          <input type="number" id="nonAlcoholicBeerDrinkers" v-model.number="guestInfo.nonAlcoholicBeerDrinkers" required min="0">
        </div>
        <div class="form-group">
          <label for="alcoholicDrinkers">Number of Alcoholic Drink Drinkers:</label>
          <input type="number" id="alcoholicDrinkers" v-model.number="guestInfo.alcoholicDrinkers" required min="0">
        </div>
        <div class="form-group">
          <label for="nonAlcoholicDrinkers">Number of Non-Alcoholic Drink Drinkers:</label>
          <input type="number" id="nonAlcoholicDrinkers" v-model.number="guestInfo.nonAlcoholicDrinkers" required min="0">
        </div>
      </div>

      <div class="form-section">
        <h2>Average Consumption (ml per person)</h2>
        <div class="form-group">
          <label for="alcoholicBeerPerPerson">Alcoholic Beer:</label>
          <input type="number" id="alcoholicBeerPerPerson" v-model.number="consumption.alcoholicBeerPerPerson" required min="0">
        </div>
        <div class="form-group">
          <label for="nonAlcoholicBeerPerPerson">Non-Alcoholic Beer:</label>
          <input type="number" id="nonAlcoholicBeerPerPerson" v-model.number="consumption.nonAlcoholicBeerPerPerson" required min="0">
        </div>
        <div class="form-group">
          <label for="alcoholicDrinksPerPerson">Alcoholic Drinks:</label>
          <input type="number" id="alcoholicDrinksPerPerson" v-model.number="consumption.alcoholicDrinksPerPerson" required min="0">
        </div>
        <div class="form-group">
          <label for="nonAlcoholicDrinksPerPerson">Non-Alcoholic Drinks:</label>
          <input type="number" id="nonAlcoholicDrinksPerPerson" v-model.number="consumption.nonAlcoholicDrinksPerPerson" required min="0">
        </div>
      </div>

      <div class="form-section">
        <h2>Alcohol Types</h2>
        <div v-for="(alcohol, index) in alcoholTypes" :key="'alcohol-' + index" class="alcohol-type">
          <select v-model="alcohol.category" class="alcohol-category">
            <option v-for="option in categoryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <input type="text" v-model="alcohol.name" placeholder="Name (e.g., Tyskie)" class="alcohol-name">
          <input type="number" v-model.number="alcohol.volume" placeholder="Volume (ml)" class="alcohol-volume">
          <button type="button" class="remove-btn" @click="removeAlcoholType(index)">Remove</button>
        </div>
        <button type="button" @click="addAlcoholType" class="add-btn">Add Alcohol Type</button>
      </div>

      <div class="form-section">
        <h2>Drink Types</h2>
        <div v-for="(drink, index) in drinkTypes" :key="'drink-' + index" class="drink-type">
          <input type="text" v-model="drink.name" placeholder="Name (e.g., Whisky Sour)" class="drink-name">
          <div class="drink-ingredients">
            <div v-for="(ingredient, ingIndex) in drink.ingredients" :key="'ingredient-' + ingIndex" class="drink-ingredient">
              <select v-model="ingredient.alcohol" class="alcohol-select">
                <option v-for="alcohol in nonBeerAlcoholTypes" :key="alcohol.name" :value="alcohol.name">
                  {{ alcohol.name }} ({{ alcohol.volume }}ml)
                </option>
              </select>
              <input type="number" v-model.number="ingredient.volume" placeholder="Volume (ml)" class="ingredient-volume">
              <button type="button" class="remove-btn" @click="removeIngredient(index, ingIndex)">Remove</button>
            </div>
            <button type="button" @click="addIngredient(index)" class="add-ingredient-btn">Add Ingredient</button>
          </div>
          <button type="button" class="remove-btn" @click="removeDrinkType(index)">Remove</button>
        </div>
        <button type="button" @click="addDrinkType" class="add-btn">Add Drink Type</button>
      </div>

      <button type="submit" class="calculate-btn">Calculate</button>
    </form>

    <div v-if="showResults" class="results">
      <h2>Recommended Quantities</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Quantity</th>
            <th>Total Volume (ml)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in results" :key="index">
            <td>{{ result.type }}</td>
            <td>{{ result.quantity }}</td>
            <td>{{ result.totalVolume }} ml</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const guestInfo = reactive({
  alcoholicBeerDrinkers: 50,
  nonAlcoholicBeerDrinkers: 25,
  alcoholicDrinkers: 80,
  nonAlcoholicDrinkers: 30
})

const consumption = reactive({
  alcoholicBeerPerPerson: 1000,
  nonAlcoholicBeerPerPerson: 500,
  alcoholicDrinksPerPerson: 3,
  nonAlcoholicDrinksPerPerson: 1
})

const alcoholTypes = ref([{
  name: '',
  volume: null,
  category: 'alcoholic_beer' // Options: alcoholic_beer, non_alcoholic_beer, alcoholic_drink, non_alcoholic_drink
}])

const drinkTypes = ref([{
  name: '',
  ingredients: [{ alcohol: '', volume: null }]
}])

const showResults = ref(false)
const results = ref([])

const categoryOptions = [
  { value: 'alcoholic_beer', label: 'Alcoholic Beer' },
  { value: 'non_alcoholic_beer', label: 'Non-Alcoholic Beer' },
  { value: 'alcoholic_drink', label: 'Alcoholic Drink' },
  { value: 'non_alcoholic_drink', label: 'Non-Alcoholic Drink' }
]

// Add computed property to filter out beer types
const nonBeerAlcoholTypes = computed(() => {
  return alcoholTypes.value.filter(alcohol => 
    alcohol.category !== 'alcoholic_beer' && 
    alcohol.category !== 'non_alcoholic_beer' &&
    alcohol.name && 
    alcohol.volume
  )
})

function addAlcoholType() {
  alcoholTypes.value.push({
    name: '',
    volume: null,
    category: 'alcoholic_beer'
  })
}

function removeAlcoholType(index) {
  alcoholTypes.value.splice(index, 1)
}

function addDrinkType() {
  drinkTypes.value.push({
    name: '',
    ingredients: [{ alcohol: '', volume: null }]
  })
}

function removeDrinkType(index) {
  drinkTypes.value.splice(index, 1)
}

function addIngredient(drinkIndex) {
  drinkTypes.value[drinkIndex].ingredients.push({
    alcohol: '',
    volume: null
  })
}

function removeIngredient(drinkIndex, ingredientIndex) {
  drinkTypes.value[drinkIndex].ingredients.splice(ingredientIndex, 1)
}

function calculateQuantities() {
  const newResults = []
  const alcoholQuantities = new Map() // Track total quantities needed for each alcohol type

  // Calculate beer quantities
  const totalAlcoholicBeerVolume = guestInfo.alcoholicBeerDrinkers * consumption.alcoholicBeerPerPerson
  const totalNonAlcoholicBeerVolume = guestInfo.nonAlcoholicBeerDrinkers * consumption.nonAlcoholicBeerPerPerson

  // Get alcohol types by category
  const alcoholicBeers = alcoholTypes.value.filter(a => a.category === 'alcoholic_beer' && a.name && a.volume)
  const nonAlcoholicBeers = alcoholTypes.value.filter(a => a.category === 'non_alcoholic_beer' && a.name && a.volume)
  const alcoholicDrinks = alcoholTypes.value.filter(a => a.category === 'alcoholic_drink' && a.name && a.volume)
  const nonAlcoholicDrinks = alcoholTypes.value.filter(a => a.category === 'non_alcoholic_drink' && a.name && a.volume)

  if (totalAlcoholicBeerVolume > 0 && alcoholicBeers.length > 0) {
    const volumePerType = totalAlcoholicBeerVolume / alcoholicBeers.length
    alcoholicBeers.forEach(alcohol => {
      const quantity = Math.ceil(volumePerType / alcohol.volume)
      alcoholQuantities.set(alcohol.name, {
        quantity,
        totalVolume: quantity * alcohol.volume,
        category: 'Alcoholic Beer'
      })
    })
  }

  if (totalNonAlcoholicBeerVolume > 0 && nonAlcoholicBeers.length > 0) {
    const volumePerType = totalNonAlcoholicBeerVolume / nonAlcoholicBeers.length
    nonAlcoholicBeers.forEach(alcohol => {
      const quantity = Math.ceil(volumePerType / alcohol.volume)
      alcoholQuantities.set(alcohol.name, {
        quantity,
        totalVolume: quantity * alcohol.volume,
        category: 'Non-Alcoholic Beer'
      })
    })
  }

  // Calculate drink quantities
  const totalAlcoholicDrinks = guestInfo.alcoholicDrinkers * consumption.alcoholicDrinksPerPerson
  const totalNonAlcoholicDrinks = guestInfo.nonAlcoholicDrinkers * consumption.nonAlcoholicDrinksPerPerson

  if (totalAlcoholicDrinks > 0) {
    // Handle custom drinks
    const validDrinkTypes = drinkTypes.value.filter(drink => 
      drink.name && 
      drink.ingredients.length > 0 && 
      drink.ingredients.every(ing => ing.alcohol && ing.volume)
    )

    if (validDrinkTypes.length > 0) {
      // Calculate total drinks needed
      const drinksPerType = Math.ceil(totalAlcoholicDrinks / validDrinkTypes.length)
      
      validDrinkTypes.forEach(drink => {
        // Calculate ingredients needed for this drink type
        drink.ingredients.forEach(ingredient => {
          const alcoholType = alcoholTypes.value.find(a => a.name === ingredient.alcohol)
          if (alcoholType) {
            const totalIngredientVolume = drinksPerType * ingredient.volume
            const ingredientQuantity = Math.ceil(totalIngredientVolume / alcoholType.volume)
            
            // Add or update the quantity for this alcohol type
            const existing = alcoholQuantities.get(alcoholType.name)
            if (existing) {
              existing.quantity += ingredientQuantity
              existing.totalVolume += ingredientQuantity * alcoholType.volume
            } else {
              alcoholQuantities.set(alcoholType.name, {
                quantity: ingredientQuantity,
                totalVolume: ingredientQuantity * alcoholType.volume,
                category: 'Alcoholic Drink'
              })
            }
          }
        })
      })
    } else if (alcoholicDrinks.length > 0) {
      // Handle direct alcoholic drinks only if no custom drinks are defined
      const drinksPerType = Math.ceil(totalAlcoholicDrinks / alcoholicDrinks.length)
      alcoholicDrinks.forEach(alcohol => {
        const totalVolume = drinksPerType * 50 // Assuming 50ml per drink as standard
        const quantity = Math.ceil(totalVolume / alcohol.volume)
        alcoholQuantities.set(alcohol.name, {
          quantity,
          totalVolume: quantity * alcohol.volume,
          category: 'Alcoholic Drink'
        })
      })
    }
  }

  if (totalNonAlcoholicDrinks > 0 && nonAlcoholicDrinks.length > 0) {
    const drinksPerType = Math.ceil(totalNonAlcoholicDrinks / nonAlcoholicDrinks.length)
    nonAlcoholicDrinks.forEach(alcohol => {
      const totalVolume = drinksPerType * 250 // Assuming 250ml per non-alcoholic drink as standard
      const quantity = Math.ceil(totalVolume / alcohol.volume)
      alcoholQuantities.set(alcohol.name, {
        quantity,
        totalVolume: quantity * alcohol.volume,
        category: 'Non-Alcoholic Drink'
      })
    })
  }

  // Convert the map to results array
  alcoholQuantities.forEach((value, key) => {
    newResults.push({
      type: `${value.category} - ${key}`,
      quantity: value.quantity,
      totalVolume: value.totalVolume
    })
  })

  results.value = newResults
  showResults.value = true
}

// Add a function to save data
function saveData() {
  const data = {
    guestInfo: { ...guestInfo },
    consumption: { ...consumption },
    alcoholTypes: alcoholTypes.value,
    drinkTypes: drinkTypes.value
  }
  localStorage.setItem('weddingCalculatorData', JSON.stringify(data))
}

// Add a function to load data
function loadData() {
  const savedData = localStorage.getItem('weddingCalculatorData')
  if (savedData) {
    try {
      const data = JSON.parse(savedData)
      Object.assign(guestInfo, data.guestInfo)
      Object.assign(consumption, data.consumption)
      alcoholTypes.value = data.alcoholTypes
      drinkTypes.value = data.drinkTypes
    } catch (error) {
      console.error('Error loading saved data:', error)
    }
  }
}

// Watch for changes in all reactive data
watch(
  [guestInfo, consumption, alcoholTypes, drinkTypes],
  () => {
    saveData()
  },
  { deep: true }
)

// Load data when component is mounted
onMounted(() => {
  loadData()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.form-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input[type="number"],
input[type="text"],
select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 45px;
}

input[type="number"]:focus,
input[type="text"]:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}

.remove-btn {
  background-color: #e74c3c;
  padding: 0.3rem 0.7rem;
  font-size: 0.9rem;
}

.remove-btn:hover {
  background-color: #c0392b;
}

.calculate-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  margin-top: 1rem;
  background-color: #2ecc71;
}

.calculate-btn:hover {
  background-color: #27ae60;
}

.alcohol-type,
.drink-type {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.alcohol-type input,
.drink-type input {
  flex: 1;
  min-width: 200px;
}

.alcohol-category {
  min-width: 200px;
}

.alcohol-name {
  min-width: 250px;
}

.alcohol-volume {
  min-width: 150px;
}

.drink-ingredients {
  margin: 1rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  flex: 1;
}

.drink-ingredient {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.drink-ingredient:last-child {
  margin-bottom: 0;
}

.drink-ingredient select {
  min-width: 250px;
}

.drink-ingredient input {
  min-width: 150px;
}

.add-btn {
  width: 100%;
  margin-top: 1rem;
}

.add-ingredient-btn {
  background-color: #2ecc71;
  margin-right: 0.5rem;
}

.add-ingredient-btn:hover {
  background-color: #27ae60;
}

.results {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
}

tr:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .container {
    margin: 1rem auto;
  }
  
  .alcohol-type,
  .drink-type,
  .drink-ingredient {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .alcohol-type input,
  .drink-type input,
  .drink-ingredient select,
  .drink-ingredient input {
    width: 100%;
    min-width: 100%;
  }
}
</style> 