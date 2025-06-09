<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <v-card class="mx-auto" max-width="1000" elevation="2">
          <v-card-title class="text-h4 text-center py-4">
            <v-img
              src="/wedding-alcohol-calculator/assets/favicon.svg"
              max-width="50"
              class="mx-auto mb-2"
            ></v-img>
            {{ $t('app.title') }}
            <div class="d-flex align-center">
              <v-btn
                color="primary"
                variant="text"
                size="small"
                prepend-icon="mdi-delete"
                @click="confirmClearForm"
                class="me-2"
              >
                {{ $t('app.clearForm') }}
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                size="small"
                prepend-icon="mdi-dice-multiple"
                @click="showRandomizeDialog = true"
                class="me-2"
              >
                {{ $t('app.randomize') }}
              </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="toggleLanguage"
              >
                {{ currentLanguage.toUpperCase() }}
              </v-btn>
            </div>
          </v-card-title>

          <v-dialog v-model="showClearDialog" max-width="400">
            <v-card>
              <v-card-title class="text-h5">
                {{ $t('app.clearFormTitle') }}
              </v-card-title>
              <v-card-text>
                {{ $t('app.clearFormMessage') }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey-darken-1"
                  variant="text"
                  @click="showClearDialog = false"
                >
                  {{ $t('app.cancel') }}
                </v-btn>
                <v-btn
                  color="error"
                  variant="text"
                  @click="clearForm"
                >
                  {{ $t('app.clear') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="showRandomizeDialog" max-width="400">
            <v-card>
              <v-card-title class="text-h5">
                {{ $t('app.randomizeTitle') }}
              </v-card-title>
              <v-card-text>
                {{ $t('app.randomizeMessage') }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey-darken-1"
                  variant="text"
                  @click="showRandomizeDialog = false"
                >
                  {{ $t('app.cancel') }}
                </v-btn>
                <v-btn
                  color="primary"
                  variant="text"
                  @click="confirmRandomize"
                >
                  {{ $t('app.randomize') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

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
              <v-card-title class="text-subtitle-1 font-weight-bold bg-secondary text-white d-flex justify-space-between align-center">
                {{ $t('app.results') }}
                <div>
                  <v-btn
                    color="white"
                    variant="text"
                    size="small"
                    prepend-icon="mdi-file-excel"
                    @click="exportToExcel"
                    class="me-2"
                  >
                    {{ $t('app.export') }}
                  </v-btn>
                  <v-btn
                    color="white"
                    variant="text"
                    size="small"
                    prepend-icon="mdi-printer"
                    @click="printResults"
                  >
                    {{ $t('app.print') }}
                  </v-btn>
                </div>
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
    <v-footer app class="bg-grey-lighten-3">
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          <span class="text-caption">Created by bb</span>
        </v-col>
      </v-row>
    </v-footer>

    <!-- Print template -->
    <div v-show="false" ref="printTemplate">
      <div class="print-header">
        <h1>{{ $t('app.title') }}</h1>
        <p>{{ new Date().toLocaleDateString() }}</p>
      </div>

      <div class="print-section">
        <h2>{{ $t('app.guestInfo') }}</h2>
        <table>
          <tr>
            <td>{{ $t('app.fields.alcoholicBeerDrinkers') }}:</td>
            <td>{{ guestInfo.alcoholicBeerDrinkers }}</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.nonAlcoholicBeerDrinkers') }}:</td>
            <td>{{ guestInfo.nonAlcoholicBeerDrinkers }}</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.alcoholicDrinkers') }}:</td>
            <td>{{ guestInfo.alcoholicDrinkers }}</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.nonAlcoholicDrinkers') }}:</td>
            <td>{{ guestInfo.nonAlcoholicDrinkers }}</td>
          </tr>
        </table>
      </div>

      <div class="print-section">
        <h2>{{ $t('app.consumption') }}</h2>
        <table>
          <tr>
            <td>{{ $t('app.fields.alcoholicBeer') }}:</td>
            <td>{{ consumption.alcoholicBeerPerPerson }} ml</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.nonAlcoholicBeer') }}:</td>
            <td>{{ consumption.nonAlcoholicBeerPerPerson }} ml</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.alcoholicDrinks') }}:</td>
            <td>{{ consumption.alcoholicDrinksPerPerson }}</td>
          </tr>
          <tr>
            <td>{{ $t('app.fields.nonAlcoholicDrinks') }}:</td>
            <td>{{ consumption.nonAlcoholicDrinksPerPerson }}</td>
          </tr>
        </table>
      </div>

      <div class="print-section">
        <h2>{{ $t('app.alcoholTypes') }}</h2>
        <table>
          <thead>
            <tr>
              <th>{{ $t('app.fields.category') }}</th>
              <th>{{ $t('app.fields.name') }}</th>
              <th>{{ $t('app.fields.volume') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alcohol, index) in alcoholTypes" :key="'alcohol-' + index">
              <td>{{ t(`app.categories.${alcohol.category}`) }}</td>
              <td>{{ alcohol.name }}</td>
              <td>{{ alcohol.volume }} ml</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="print-section">
        <h2>{{ $t('app.drinkTypes') }}</h2>
        <div v-for="(drink, index) in drinkTypes" :key="'drink-' + index" class="print-drink">
          <h3>{{ drink.name }}</h3>
          <table>
            <thead>
              <tr>
                <th>{{ $t('app.fields.alcohol') }}</th>
                <th>{{ $t('app.fields.volume') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ingredient, ingIndex) in drink.ingredients" :key="'ingredient-' + ingIndex">
                <td>{{ ingredient.alcohol }}</td>
                <td>{{ ingredient.volume }} ml</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="print-section">
        <h2>{{ $t('app.results') }}</h2>
        <table>
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
        </table>
      </div>
    </div>
  </v-app>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const { t, locale } = useI18n()

const currentLanguage = ref(locale.value)

function toggleLanguage() {
  const newLocale = currentLanguage.value === 'en' ? 'pl' : 'en'
  locale.value = newLocale
  currentLanguage.value = newLocale
  localStorage.setItem('preferredLanguage', newLocale)
}

// Load preferred language on mount
onMounted(() => {
  const savedLanguage = localStorage.getItem('preferredLanguage')
  if (savedLanguage) {
    locale.value = savedLanguage
    currentLanguage.value = savedLanguage
  }
})

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
  category: 'alcoholicBeer'
}])

const drinkTypes = ref([{
  name: '',
  ingredients: [{ alcohol: '', volume: null }]
}])

const showResults = ref(false)
const results = ref([])

const categoryOptions = computed(() => [
  { value: 'alcoholicBeer', label: t('app.categories.alcoholicBeer') },
  { value: 'nonAlcoholicBeer', label: t('app.categories.nonAlcoholicBeer') },
  { value: 'alcoholicDrink', label: t('app.categories.alcoholicDrink') },
  { value: 'nonAlcoholicDrink', label: t('app.categories.nonAlcoholicDrink') }
])

// Add computed property to filter out beer types
const nonBeerAlcoholTypes = computed(() => {
  return alcoholTypes.value.filter(alcohol => 
    alcohol.category !== 'alcoholicBeer' && 
    alcohol.category !== 'nonAlcoholicBeer' &&
    alcohol.name && 
    alcohol.volume
  )
})

function addAlcoholType() {
  alcoholTypes.value.push({
    name: '',
    volume: null,
    category: 'alcoholicBeer'
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
  const alcoholicBeers = alcoholTypes.value.filter(a => a.category === 'alcoholicBeer' && a.name && a.volume)
  const nonAlcoholicBeers = alcoholTypes.value.filter(a => a.category === 'nonAlcoholicBeer' && a.name && a.volume)
  const alcoholicDrinks = alcoholTypes.value.filter(a => a.category === 'alcoholicDrink' && a.name && a.volume)
  const nonAlcoholicDrinks = alcoholTypes.value.filter(a => a.category === 'nonAlcoholicDrink' && a.name && a.volume)

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

  // Handle custom drinks
  const validDrinkTypes = drinkTypes.value.filter(drink => 
    drink.name && 
    drink.ingredients.length > 0 && 
    drink.ingredients.every(ing => ing.alcohol && ing.volume)
  )

  if (validDrinkTypes.length > 0) {
    // Calculate total drinks needed
    const alcoholicDrinksPerType = totalAlcoholicDrinks / validDrinkTypes.length
    const nonAlcoholicDrinksPerType = totalNonAlcoholicDrinks / validDrinkTypes.length
    
    validDrinkTypes.forEach(drink => {
      // Calculate ingredients needed for this drink type
      drink.ingredients.forEach(ingredient => {
        const alcoholType = alcoholTypes.value.find(a => a.name === ingredient.alcohol)
        if (alcoholType) {
          let totalIngredientVolume = 0
          
          // For alcoholic ingredients, use alcoholic drinkers
          if (alcoholType.category === 'alcoholicDrink') {
            totalIngredientVolume = alcoholicDrinksPerType * ingredient.volume
          }
          // For non-alcoholic ingredients in mixed drinks, only use alcoholic drinkers
          else if (alcoholType.category === 'nonAlcoholicDrink') {
            // If this is part of a mixed drink (has both alcoholic and non-alcoholic ingredients)
            const isMixedDrink = drink.ingredients.some(ing => {
              const ingType = alcoholTypes.value.find(a => a.name === ing.alcohol)
              return ingType && ingType.category === 'alcoholicDrink'
            })
            
            if (isMixedDrink) {
              // For mixed drinks, only count non-alcoholic ingredients for alcoholic drinkers
              totalIngredientVolume = alcoholicDrinksPerType * ingredient.volume
            } else {
              // For pure non-alcoholic drinks, count for both types of drinkers
              totalIngredientVolume = (alcoholicDrinksPerType + nonAlcoholicDrinksPerType) * ingredient.volume
            }
          }
          
          if (totalIngredientVolume > 0) {
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
                category: alcoholType.category === 'nonAlcoholicDrink' ? 'Non-Alcoholic Drink' : 'Alcoholic Drink'
              })
            }
          }
        }
      })
    })
  } else {
    // Handle direct drinks only if no custom drinks are defined
    if (totalAlcoholicDrinks > 0 && alcoholicDrinks.length > 0) {
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

const printTemplate = ref(null)

function exportToExcel() {
  // Prepare data for export
  const data = [
    // Guest Information
    [{ [t('app.guestInfo')]: '' }],
    [t('app.fields.alcoholicBeerDrinkers'), guestInfo.alcoholicBeerDrinkers],
    [t('app.fields.nonAlcoholicBeerDrinkers'), guestInfo.nonAlcoholicBeerDrinkers],
    [t('app.fields.alcoholicDrinkers'), guestInfo.alcoholicDrinkers],
    [t('app.fields.nonAlcoholicDrinkers'), guestInfo.nonAlcoholicDrinkers],
    [], // Empty row

    // Consumption
    [{ [t('app.consumption')]: '' }],
    [t('app.fields.alcoholicBeer'), `${consumption.alcoholicBeerPerPerson} ml`],
    [t('app.fields.nonAlcoholicBeer'), `${consumption.nonAlcoholicBeerPerPerson} ml`],
    [t('app.fields.alcoholicDrinks'), consumption.alcoholicDrinksPerPerson],
    [t('app.fields.nonAlcoholicDrinks'), consumption.nonAlcoholicDrinksPerPerson],
    [], // Empty row

    // Alcohol Types
    [{ [t('app.alcoholTypes')]: '' }],
    [t('app.fields.category'), t('app.fields.name'), t('app.fields.volume')],
    ...alcoholTypes.value.map(alcohol => [
      t(`app.categories.${alcohol.category}`),
      alcohol.name,
      `${alcohol.volume} ml`
    ]),
    [], // Empty row

    // Drink Types
    [{ [t('app.drinkTypes')]: '' }],
    ...drinkTypes.value.flatMap(drink => [
      [{ [drink.name]: '' }],
      [t('app.fields.alcohol'), t('app.fields.volume')],
      ...drink.ingredients.map(ing => [ing.alcohol, `${ing.volume} ml`]),
      [] // Empty row after each drink
    ]),

    // Results
    [{ [t('app.results')]: '' }],
    [t('app.type'), t('app.quantity'), t('app.totalVolume')],
    ...results.value.map(result => [
      result.type,
      result.quantity,
      `${result.totalVolume} ml`
    ])
  ]

  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(data)

  // Create workbook
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Wedding Calculator')

  // Generate Excel file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  
  // Save file
  saveAs(blob, `wedding-calculator-${new Date().toISOString().split('T')[0]}.xlsx`)
}

function printResults() {
  const printWindow = window.open('', '_blank')
  const printContent = printTemplate.value.innerHTML

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${t('app.title')}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
          }
          .print-header {
            text-align: center;
            margin-bottom: 30px;
          }
          .print-section {
            margin-bottom: 30px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          h2 {
            font-size: 20px;
            margin-bottom: 15px;
            color: #1976d2;
          }
          h3 {
            font-size: 16px;
            margin: 15px 0;
            color: #424242;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .print-drink {
            margin-bottom: 20px;
          }
          @media print {
            body {
              margin: 0;
              padding: 20px;
            }
            .print-section {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
}

const showClearDialog = ref(false)
const showRandomizeDialog = ref(false)

function confirmClearForm() {
  showClearDialog.value = true
}

function clearForm() {
  // Reset guest info
  Object.keys(guestInfo).forEach(key => {
    guestInfo[key] = null
  })

  // Reset consumption
  Object.keys(consumption).forEach(key => {
    consumption[key] = null
  })

  // Reset alcohol types
  alcoholTypes.value = [{
    name: '',
    volume: null,
    category: 'alcoholicBeer'
  }]

  // Reset drink types
  drinkTypes.value = [{
    name: '',
    ingredients: [{ alcohol: '', volume: null }]
  }]

  // Clear results
  results.value = []
  showResults.value = false

  // Close dialog
  showClearDialog.value = false

  // Clear saved data
  localStorage.removeItem('weddingCalculatorData')
}

function confirmRandomize() {
  showRandomizeDialog.value = false
  randomizeForm()
}

function randomizeForm() {
  // Random guest info (realistic numbers)
  guestInfo.alcoholicBeerDrinkers = Math.floor(Math.random() * 30) + 30 // 30-60
  guestInfo.nonAlcoholicBeerDrinkers = Math.floor(Math.random() * 20) + 10 // 10-30
  guestInfo.alcoholicDrinkers = Math.floor(Math.random() * 40) + 60 // 60-100
  guestInfo.nonAlcoholicDrinkers = Math.floor(Math.random() * 20) + 20 // 20-40

  // Random consumption (realistic numbers)
  consumption.alcoholicBeerPerPerson = Math.floor(Math.random() * 500) + 500 // 500-1000ml
  consumption.nonAlcoholicBeerPerPerson = Math.floor(Math.random() * 300) + 200 // 200-500ml
  consumption.alcoholicDrinksPerPerson = Math.floor(Math.random() * 2) + 2 // 2-4 drinks
  consumption.nonAlcoholicDrinksPerPerson = Math.floor(Math.random() * 2) + 1 // 1-3 drinks

  // Random alcohol types
  const beerTypes = [
    { name: 'Lager', volume: 500 },
    { name: 'Pilsner', volume: 500 },
    { name: 'Wheat Beer', volume: 500 },
    { name: 'IPA', volume: 500 },
    { name: 'Stout', volume: 500 }
  ]

  const nonAlcoholicBeerTypes = [
    { name: 'Non-Alcoholic Lager', volume: 500 },
    { name: 'Non-Alcoholic Pilsner', volume: 500 },
    { name: 'Non-Alcoholic Wheat Beer', volume: 500 }
  ]

  const spiritTypes = [
    { name: 'Vodka', volume: 700 },
    { name: 'Whiskey', volume: 700 },
    { name: 'Rum', volume: 700 },
    { name: 'Gin', volume: 700 },
    { name: 'Tequila', volume: 700 }
  ]

  const nonAlcoholicTypes = [
    { name: 'Cola', volume: 1000 },
    { name: 'Lemonade', volume: 1000 },
    { name: 'Orange Juice', volume: 1000 },
    { name: 'Sparkling Water', volume: 1000 }
  ]

  // Randomly select 2-3 types from each category
  alcoholTypes.value = [
    ...beerTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2).map(type => ({
      ...type,
      category: 'alcoholicBeer'
    })),
    ...nonAlcoholicBeerTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1).map(type => ({
      ...type,
      category: 'nonAlcoholicBeer'
    })),
    ...spiritTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2).map(type => ({
      ...type,
      category: 'alcoholicDrink'
    })),
    ...nonAlcoholicTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2).map(type => ({
      ...type,
      category: 'nonAlcoholicDrink'
    }))
  ]

  // Random drink types
  const drinkNames = [
    'Mojito',
    'Margarita',
    'Old Fashioned',
    'Gin & Tonic',
    'Vodka & Orange',
    'Rum & Cola',
    'Whiskey Sour',
    'Tequila Sunrise'
  ]

  // Create 2-4 random drinks
  const numDrinks = Math.floor(Math.random() * 3) + 2
  drinkTypes.value = Array(numDrinks).fill(null).map(() => {
    const drinkName = drinkNames[Math.floor(Math.random() * drinkNames.length)]
    const numIngredients = Math.floor(Math.random() * 2) + 2 // 2-3 ingredients per drink
    
    return {
      name: drinkName,
      ingredients: Array(numIngredients).fill(null).map(() => {
        const availableAlcohols = alcoholTypes.value.filter(a => 
          a.category === 'alcoholicDrink' || a.category === 'nonAlcoholicDrink'
        )
        const randomAlcohol = availableAlcohols[Math.floor(Math.random() * availableAlcohols.length)]
        
        return {
          alcohol: randomAlcohol.name,
          volume: Math.floor(Math.random() * 50) + 30 // 30-80ml per ingredient
        }
      })
    }
  })

  // Trigger calculation
  calculateQuantities()
}

// Add after the existing watch function:
watch(
  alcoholTypes,
  (newTypes) => {
    // Get current alcohol names
    const currentAlcoholNames = newTypes.map(type => type.name)

    // Update drink types to remove ingredients with removed alcohols
    drinkTypes.value = drinkTypes.value.map(drink => {
      // Filter out ingredients that reference non-existent alcohols
      const validIngredients = drink.ingredients.filter(ing => 
        currentAlcoholNames.includes(ing.alcohol)
      )

      return {
        ...drink,
        ingredients: validIngredients
      }
    })
  },
  { deep: true }
)
</script>
