<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card class="mx-auto" max-width="1200">
          <v-card-title class="text-h4 text-center py-4">
            Wedding Alcohol Calculator
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="calculateQuantities" v-model="isFormValid">
              <v-card class="mb-4">
                <v-card-title>Guest Information</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.alcoholicBeerDrinkers"
                        label="Number of Alcoholic Beer Drinkers"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.nonAlcoholicBeerDrinkers"
                        label="Number of Non-Alcoholic Beer Drinkers"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.alcoholicDrinkers"
                        label="Number of Alcoholic Drink Drinkers"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.nonAlcoholicDrinkers"
                        label="Number of Non-Alcoholic Drink Drinkers"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-4">
                <v-card-title>Average Consumption (ml per person)</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.alcoholicBeerPerPerson"
                        label="Alcoholic Beer"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.nonAlcoholicBeerPerPerson"
                        label="Non-Alcoholic Beer"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.alcoholicDrinksPerPerson"
                        label="Alcoholic Drinks"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.nonAlcoholicDrinksPerPerson"
                        label="Non-Alcoholic Drinks"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-4">
                <v-card-title>Alcohol Types</v-card-title>
                <v-card-text>
                  <v-row v-for="(alcohol, index) in alcoholTypes" :key="'alcohol-' + index">
                    <v-col cols="12" sm="3">
                      <v-select
                        v-model="alcohol.category"
                        :items="categoryOptions"
                        item-title="label"
                        item-value="value"
                        label="Category"
                        :rules="[rules.required]"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="alcohol.name"
                        label="Name"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model.number="alcohol.volume"
                        label="Volume (ml)"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" class="d-flex align-center">
                      <v-btn
                        color="error"
                        icon
                        @click="removeAlcoholType(index)"
                        :disabled="alcoholTypes.length === 1"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn
                    color="primary"
                    @click="addAlcoholType"
                    class="mt-2"
                  >
                    Add Alcohol Type
                  </v-btn>
                </v-card-text>
              </v-card>

              <v-card class="mb-4">
                <v-card-title>Drink Types</v-card-title>
                <v-card-text>
                  <v-card
                    v-for="(drink, index) in drinkTypes"
                    :key="'drink-' + index"
                    class="mb-4"
                    variant="outlined"
                  >
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="drink.name"
                            label="Drink Name"
                            :rules="[rules.required]"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" class="d-flex align-center">
                          <v-btn
                            color="error"
                            icon
                            @click="removeDrinkType(index)"
                            :disabled="drinkTypes.length === 1"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-card
                        v-for="(ingredient, ingIndex) in drink.ingredients"
                        :key="'ingredient-' + ingIndex"
                        class="mb-2"
                        variant="outlined"
                      >
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="5">
                              <v-select
                                v-model="ingredient.alcohol"
                                :items="nonBeerAlcoholTypes"
                                item-title="name"
                                item-value="name"
                                label="Alcohol"
                                :rules="[rules.required]"
                                required
                              >
                                <template v-slot:item="{ props, item }">
                                  <v-list-item v-bind="props">
                                    <v-list-item-title>
                                      {{ item.raw.name }} ({{ item.raw.volume }}ml)
                                    </v-list-item-title>
                                  </v-list-item>
                                </template>
                              </v-select>
                            </v-col>
                            <v-col cols="12" sm="5">
                              <v-text-field
                                v-model.number="ingredient.volume"
                                label="Volume (ml)"
                                type="number"
                                :rules="[rules.required, rules.positive]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="d-flex align-center">
                              <v-btn
                                color="error"
                                icon
                                @click="removeIngredient(index, ingIndex)"
                                :disabled="drink.ingredients.length === 1"
                              >
                                <v-icon>mdi-delete</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>

                      <v-btn
                        color="primary"
                        @click="addIngredient(index)"
                        class="mt-2"
                      >
                        Add Ingredient
                      </v-btn>
                    </v-card-text>
                  </v-card>

                  <v-btn
                    color="primary"
                    @click="addDrinkType"
                    class="mt-2"
                  >
                    Add Drink Type
                  </v-btn>
                </v-card-text>
              </v-card>

              <v-btn
                color="primary"
                type="submit"
                block
                :disabled="!isFormValid"
                class="mt-4"
              >
                Calculate
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-text v-if="showResults">
            <v-card>
              <v-card-title>Recommended Quantities</v-card-title>
              <v-card-text>
                <v-table>
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
                </v-table>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const isFormValid = ref(false)

const rules = {
  required: v => !!v || 'This field is required',
  positive: v => v > 0 || 'Value must be greater than 0'
}

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