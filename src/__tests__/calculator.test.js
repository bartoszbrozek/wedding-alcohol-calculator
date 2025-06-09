import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
// import { createI18n } from 'vue-i18n' // Commented out
// import messages from '../i18n' // Commented out

// Create i18n instance for testing // Commented out
// const i18n = createI18n({
//   legacy: false,
//   locale: 'en',
//   messages
// })

describe('Wedding Calculator', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        // plugins: [i18n] // Commented out
      }
    })
  })

  describe('Beer Calculations', () => {
    it('calculates correct quantities for alcoholic beer', async () => {
      // Set up test data
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 50
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 1000
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Test Beer',
        volume: 500,
        category: 'alcoholicBeer'
      }]

      // Trigger calculation
      await wrapper.vm.calculateQuantities()

      // Check results
      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].type).toBe('Piwo alkoholowe - Test Beer') // Hardcoded to Polish
      expect(results[0].quantity).toBe(100) // 50 people * 1000ml / 500ml per bottle
      expect(results[0].totalVolume).toBe(50000) // 50 people * 1000ml
    })

    it('calculates correct quantities for non-alcoholic beer', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 50
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 500
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Non-Alcoholic Test Beer',
        volume: 330,
        category: 'nonAlcoholicBeer'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].type).toBe('Piwo bezalkoholowe - Non-Alcoholic Test Beer') // Hardcoded to Polish
      expect(results[0].quantity).toBe(76) // Math.ceil(50 * 500 / 330)
      expect(results[0].totalVolume).toBe(25000) // 50 * 500
    })
  })

  describe('Drink Calculations', () => {
    it('calculates correct quantities for alcoholic drinks (direct)', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 50
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 2
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Vodka',
        volume: 700,
        category: 'alcoholicDrink'
      }]

      // No custom drink types, so it should fall back to direct drinks
      wrapper.vm.drinkTypes = []

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].type).toBe('Drink alkoholowy - Vodka') // Hardcoded to Polish
      expect(results[0].quantity).toBe(8) // Math.ceil(50 people * 2 drinks * 50ml/drink / 700ml/bottle)
      expect(results[0].totalVolume).toBe(5000) // 50 people * 2 drinks * 50ml/drink
    })

    it('calculates correct quantities for non-alcoholic drinks (direct)', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 50

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 2

      wrapper.vm.alcoholTypes = [{
        name: 'Orange Juice',
        volume: 1000,
        category: 'nonAlcoholicDrink'
      }]

      wrapper.vm.drinkTypes = []

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].type).toBe('Drink bezalkoholowy - Orange Juice') // Hardcoded to Polish
      expect(results[0].quantity).toBe(3) // Math.ceil(50 people * 2 drinks * 250ml/drink / 1000ml/bottle)
      expect(results[0].totalVolume).toBe(25000) // 50 people * 2 drinks * 250ml/drink
    })

    it('calculates correct quantities for custom alcoholic drinks', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 50
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 2
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        { name: 'Vodka', volume: 700, category: 'alcoholicDrink' },
        { name: 'Cola', volume: 1000, category: 'nonAlcoholicDrink' }
      ]

      wrapper.vm.drinkTypes = [{
        name: 'Vodka & Cola',
        ingredients: [
          { alcohol: 'Vodka', volume: 50 },
          { alcohol: 'Cola', volume: 150 }
        ]
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(2)
      const vodkaResult = results.find(r => r.type === 'Drink alkoholowy - Vodka') // Hardcoded to Polish
      const colaResult = results.find(r => r.type === 'Drink bezalkoholowy - Cola') // Hardcoded to Polish

      expect(vodkaResult.quantity).toBe(8) // Math.ceil(50 * 2 * 50 / 700)
      expect(vodkaResult.totalVolume).toBe(5000)
      expect(colaResult.quantity).toBe(15) // Math.ceil(50 * 2 * 150 / 1000)
      expect(colaResult.totalVolume).toBe(15000)
    })

    it('calculates correct quantities for custom non-alcoholic drinks', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 50

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 2

      wrapper.vm.alcoholTypes = [
        { name: 'Orange Juice', volume: 1000, category: 'nonAlcoholicDrink' },
        { name: 'Sparkling Water', volume: 1000, category: 'nonAlcoholicDrink' }
      ]

      wrapper.vm.drinkTypes = [{
        name: 'Orange Spritzer',
        ingredients: [
          { alcohol: 'Orange Juice', volume: 100 },
          { alcohol: 'Sparkling Water', volume: 150 }
        ]
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(2)
      const orangeJuiceResult = results.find(r => r.type === 'Drink bezalkoholowy - Orange Juice') // Hardcoded to Polish
      const sparklingWaterResult = results.find(r => r.type === 'Drink bezalkoholowy - Sparkling Water') // Hardcoded to Polish

      // Adjusting expected quantities based on new logic (only non-alcoholic drinkers)
      expect(orangeJuiceResult.quantity).toBe(10) // Math.ceil(50 * 2 * 100 / 1000)
      expect(orangeJuiceResult.totalVolume).toBe(10000)
      expect(sparklingWaterResult.quantity).toBe(15) // Math.ceil(50 * 2 * 150 / 1000)
      expect(sparklingWaterResult.totalVolume).toBe(15000)
    })
  })

  describe('Form Validation', () => {
    it('validates required fields', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = null
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.v-text-field__details').text()).toBe('Pole wymagane') // Hardcoded to Polish
    })

    it('validates positive values', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.v-text-field__details').text()).toBe('Wartość musi być większa od 0') // Hardcoded to Polish
    })
  })

  describe('Form Actions', () => {
    it('clears the form data', async () => {
      // Set some data
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 10
      wrapper.vm.alcoholTypes = [{ name: 'Test Beer', volume: 500, category: 'alcoholicBeer' }]

      await wrapper.vm.$nextTick()
      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBe(10)
      expect(wrapper.vm.alcoholTypes).toHaveLength(1)

      // Confirm and clear
      wrapper.vm.confirmClearForm()
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.showClearDialog).toBe(true)

      await wrapper.find('.v-btn--error').trigger('click') // Click 'Wyczyść' button
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBeNull()
      expect(wrapper.vm.alcoholTypes).toHaveLength(1) // Initial empty state
      expect(wrapper.vm.alcoholTypes[0].name).toBe('')
      expect(wrapper.vm.showClearDialog).toBe(false)
    })

    it('randomizes form data', async () => {
      // Check initial state (should be default non-randomized)
      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBe(50)
      expect(wrapper.vm.alcoholTypes).toHaveLength(1)

      // Trigger randomize via dialog
      await wrapper.find('.mdi-dice-multiple').trigger('click') // Click 'Losuj' button
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.showRandomizeDialog).toBe(true)

      await wrapper.find('.v-btn--primary').trigger('click') // Click 'Losuj' button in dialog
      await wrapper.vm.$nextTick()

      // Assert that values have changed from initial state and are within expected ranges
      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).not.toBe(50)
      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBeGreaterThanOrEqual(30)
      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBeLessThanOrEqual(60)
      expect(wrapper.vm.alcoholTypes.length).toBeGreaterThan(0) // Should have randomized types
      expect(wrapper.vm.showRandomizeDialog).toBe(false)
    })
  })

  describe('Data Persistence', () => {
    it('loads data from local storage on mount', async () => {
      const testData = {
        guestInfo: {
          alcoholicBeerDrinkers: 10,
          nonAlcoholicBeerDrinkers: 5,
          alcoholicDrinkers: 15,
          nonAlcoholicDrinkers: 8
        },
        consumption: {
          alcoholicBeerPerPerson: 500,
          nonAlcoholicBeerPerPerson: 200,
          alcoholicDrinksPerPerson: 1,
          nonAlcoholicDrinksPerPerson: 1
        },
        alcoholTypes: [{
          name: 'Saved Beer',
          volume: 500,
          category: 'alcoholicBeer'
        }],
        drinkTypes: [{
          name: 'Saved Drink',
          ingredients: [{ alcohol: 'Vodka', volume: 50 }]
        }]
      }
      localStorage.setItem('weddingCalculatorData', JSON.stringify(testData))

      // Re-mount the component to trigger loadData
      wrapper = mount(App, {
        global: {
          // plugins: [i18n] // Commented out
        }
      })

      await wrapper.vm.$nextTick()

      expect(wrapper.vm.guestInfo.alcoholicBeerDrinkers).toBe(10)
      expect(wrapper.vm.alcoholTypes[0].name).toBe('Saved Beer')
    })

    it('saves data to local storage on changes', async () => {
      // Change some data
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 99
      await wrapper.vm.$nextTick()

      const savedData = JSON.parse(localStorage.getItem('weddingCalculatorData'))
      expect(savedData.guestInfo.alcoholicBeerDrinkers).toBe(99)
    })
  })
}) 