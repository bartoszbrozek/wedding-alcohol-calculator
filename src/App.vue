<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <v-card class="mx-auto" max-width="1000" elevation="2">
          <v-card-title class="text-h4 text-center py-6 bg-primary text-white d-flex justify-space-between align-center">
            {{ $t('app.title') }}
            <v-btn
              color="white"
              variant="text"
              @click="toggleLanguage"
            >
              {{ currentLanguage.toUpperCase() }}
            </v-btn>
          </v-card-title>

          <v-card-text class="pa-6">
            <v-form @submit.prevent="calculateQuantities" v-model="isFormValid">
              <v-card class="mb-6" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold bg-primary text-white">
                  {{ $t('app.guestInfo') }}
                </v-card-title>
                <v-card-text class="pt-4">
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.alcoholicBeerDrinkers"
                        :label="$t('app.fields.alcoholicBeerDrinkers')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.nonAlcoholicBeerDrinkers"
                        :label="$t('app.fields.nonAlcoholicBeerDrinkers')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.alcoholicDrinkers"
                        :label="$t('app.fields.alcoholicDrinkers')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="guestInfo.nonAlcoholicDrinkers"
                        :label="$t('app.fields.nonAlcoholicDrinkers')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-6" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold bg-primary text-white">
                  {{ $t('app.consumption') }}
                </v-card-title>
                <v-card-text class="pt-4">
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.alcoholicBeerPerPerson"
                        :label="$t('app.fields.alcoholicBeer')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.nonAlcoholicBeerPerPerson"
                        :label="$t('app.fields.nonAlcoholicBeer')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.alcoholicDrinksPerPerson"
                        :label="$t('app.fields.alcoholicDrinks')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model.number="consumption.nonAlcoholicDrinksPerPerson"
                        :label="$t('app.fields.nonAlcoholicDrinks')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-6" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold bg-primary text-white d-flex justify-space-between align-center">
                  {{ $t('app.alcoholTypes') }}
                  <v-btn
                    color="white"
                    @click="addAlcoholType"
                    variant="text"
                    size="small"
                    prepend-icon="mdi-plus"
                  >
                    {{ $t('app.addType') }}
                  </v-btn>
                </v-card-title>
                <v-card-text class="pt-4">
                  <v-row v-for="(alcohol, index) in alcoholTypes" :key="'alcohol-' + index" class="mb-2">
                    <v-col cols="12" sm="3">
                      <v-select
                        v-model="alcohol.category"
                        :items="categoryOptions"
                        item-title="label"
                        item-value="value"
                        :label="$t('app.fields.category')"
                        :rules="[rules.required]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="alcohol.name"
                        :label="$t('app.fields.name')"
                        :rules="[rules.required]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                      <v-text-field
                        v-model.number="alcohol.volume"
                        :label="$t('app.fields.volume')"
                        type="number"
                        :rules="[rules.required, rules.positive]"
                        required
                        density="compact"
                        hide-details="auto"
                        bg-color="grey-lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" class="d-flex align-center">
                      <v-btn
                        color="error"
                        icon
                        @click="removeAlcoholType(index)"
                        :disabled="alcoholTypes.length === 1"
                        variant="text"
                        size="small"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-6" elevation="1">
                <v-card-title class="text-subtitle-1 font-weight-bold bg-primary text-white d-flex justify-space-between align-center">
                  {{ $t('app.drinkTypes') }}
                  <v-btn
                    color="white"
                    @click="addDrinkType"
                    variant="text"
                    size="small"
                    prepend-icon="mdi-plus"
                  >
                    {{ $t('app.addDrink') }}
                  </v-btn>
                </v-card-title>
                <v-card-text class="pt-4">
                  <v-card
                    v-for="(drink, index) in drinkTypes"
                    :key="'drink-' + index"
                    class="mb-4"
                    elevation="0"
                    bg-color="grey-lighten-4"
                  >
                    <v-card-text class="pa-0">
                      <v-row>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="drink.name"
                            :label="$t('app.fields.drinkName')"
                            :rules="[rules.required]"
                            required
                            density="compact"
                            hide-details="auto"
                            bg-color="white"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="2" class="d-flex align-center">
                          <v-btn
                            color="error"
                            icon
                            @click="removeDrinkType(index)"
                            variant="text"
                            size="small"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-card
                        v-for="(ingredient, ingIndex) in drink.ingredients"
                        :key="'ingredient-' + ingIndex"
                        class="mb-2"
                        elevation="0"
                        bg-color="white"
                      >
                        <v-card-text class="pa-0 pt-2">
                          <v-row>
                            <v-col cols="12" sm="5">
                              <v-select
                                v-model="ingredient.alcohol"
                                :items="nonBeerAlcoholTypes"
                                item-title="name"
                                item-value="name"
                                :label="$t('app.fields.alcohol')"
                                :rules="[rules.required]"
                                required
                                density="compact"
                                hide-details="auto"
                                bg-color="grey-lighten-4"
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
                                :label="$t('app.fields.volume')"
                                type="number"
                                :rules="[rules.required, rules.positive]"
                                required
                                density="compact"
                                hide-details="auto"
                                bg-color="grey-lighten-4"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" class="d-flex align-center">
                              <v-btn
                                color="error"
                                icon
                                @click="removeIngredient(index, ingIndex)"
                                :disabled="drink.ingredients.length === 1"
                                variant="text"
                                size="small"
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
                        variant="text"
                        size="small"
                        prepend-icon="mdi-plus"
                      >
                        {{ $t('app.addIngredient') }}
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>

          <v-card-text v-if="!isFormValid" class="pa-6">
            <v-alert
              type="warning"
              variant="tonal"
              class="mb-0"
            >
              <template v-slot:prepend>
                <v-icon>mdi-alert</v-icon>
              </template>
              {{ $t('app.warning') }}
            </v-alert>
          </v-card-text>

          <v-card-text v-if="isFormValid && results.length > 0" class="pa-6">
            <v-card elevation="1">
              <v-card-title class="text-subtitle-1 font-weight-bold bg-secondary text-white">
                {{ $t('app.results') }}
              </v-card-title>
              <v-card-text class="pt-4">
                <v-table density="compact" bg-color="grey-lighten-4">
                  <thead>
                    <tr>
                      <th>{{ $t('app.type') }}</th>
                      <th>{{ $t('app.quantity') }}</th>
                      <th>{{ $t('app.totalVolume') }}</th>
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
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentLanguage = computed(() => locale.value)

function toggleLanguage() {
  locale.value = locale.value === 'en' ? 'pl' : 'en'
}

const isFormValid = ref(false)

const rules = {
  required: v => !!v || t('app.fields.required'),
  positive: v => v > 0 || t('app.fields.positive')
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
  category: 'alcoholic_beer'
}])

const drinkTypes = ref([{
  name: '',
  ingredients: [{ alcohol: '', volume: null }]
}])

const showResults = ref(false)
const results = ref([])

const categoryOptions = computed(() => [
  { value: 'alcoholic_beer', label: t('app.categories.alcoholicBeer') },
  { value: 'non_alcoholic_beer', label: t('app.categories.nonAlcoholicBeer') },
  { value: 'alcoholic_drink', label: t('app.categories.alcoholicDrink') },
  { value: 'non_alcoholic_drink', label: t('app.categories.nonAlcoholicDrink') }
])

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
      const quantity = volumePerType / alcohol.volume
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
      const quantity = volumePerType / alcohol.volume
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
      const drinksPerType = totalAlcoholicDrinks / validDrinkTypes.length
      
      validDrinkTypes.forEach(drink => {
        // Calculate ingredients needed for this drink type
        drink.ingredients.forEach(ingredient => {
          const alcoholType = alcoholTypes.value.find(a => a.name === ingredient.alcohol)
          if (alcoholType) {
            const totalIngredientVolume = drinksPerType * ingredient.volume
            const ingredientQuantity = totalIngredientVolume / alcoholType.volume
            
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
      const drinksPerType = totalAlcoholicDrinks / alcoholicDrinks.length
      alcoholicDrinks.forEach(alcohol => {
        const totalVolume = drinksPerType * 50 // Assuming 50ml per drink as standard
        const quantity = totalVolume / alcohol.volume
        alcoholQuantities.set(alcohol.name, {
          quantity,
          totalVolume: quantity * alcohol.volume,
          category: 'Alcoholic Drink'
        })
      })
    }
  }

  if (totalNonAlcoholicDrinks > 0 && nonAlcoholicDrinks.length > 0) {
    const drinksPerType = totalNonAlcoholicDrinks / nonAlcoholicDrinks.length
    nonAlcoholicDrinks.forEach(alcohol => {
      const totalVolume = drinksPerType * 250 // Assuming 250ml per non-alcoholic drink as standard
      const quantity = totalVolume / alcohol.volume
      alcoholQuantities.set(alcohol.name, {
        quantity,
        totalVolume: quantity * alcohol.volume,
        category: 'Non-Alcoholic Drink'
      })
    })
  }

  // Convert the map to results array and round up quantities only at the end
  alcoholQuantities.forEach((value, key) => {
    newResults.push({
      type: `${value.category} - ${key}`,
      quantity: Math.ceil(value.quantity),
      totalVolume: Math.ceil(value.totalVolume)
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

// Watch for changes in all reactive data and recalculate
watch(
  [guestInfo, consumption, alcoholTypes, drinkTypes],
  () => {
    saveData()
    if (isFormValid.value) {
      calculateQuantities()
    }
  },
  { deep: true }
)

// Load data when component is mounted
onMounted(() => {
  loadData()
  calculateQuantities()
})
</script>
