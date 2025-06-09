import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import { createI18n } from 'vue-i18n'
import messages from '../i18n'

// Create i18n instance for testing
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

describe('Wedding Calculator', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [i18n]
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
      expect(results[0].type).toContain('Test Beer')
      expect(results[0].quantity).toBe(100) // 50 people * 1000ml / 500ml per bottle
      expect(results[0].totalVolume).toBe(50000) // 50 people * 1000ml
    })

    it('distributes beer consumption across multiple types', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 100
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 1000
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        {
          name: 'Beer A',
          volume: 500,
          category: 'alcoholicBeer'
        },
        {
          name: 'Beer B',
          volume: 330,
          category: 'alcoholicBeer'
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(2)
      
      // Each beer type should get 50% of the total consumption
      const beerA = results.find(r => r.type.includes('Beer A'))
      const beerB = results.find(r => r.type.includes('Beer B'))
      
      expect(beerA.quantity).toBe(100) // 50 people * 1000ml / 500ml per bottle
      expect(beerB.quantity).toBe(152) // 50 people * 1000ml / 330ml per bottle
    })
  })

  describe('Drink Calculations', () => {
    it('calculates correct quantities for alcoholic drinks', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 50
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 3
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        {
          name: 'Vodka',
          volume: 700,
          category: 'alcoholicDrink'
        }
      ]

      wrapper.vm.drinkTypes = [
        {
          name: 'Vodka Shot',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            }
          ]
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      
      // 50 people * 3 drinks * 50ml per drink / 700ml per bottle
      const expectedBottles = Math.ceil((50 * 3 * 50) / 700)
      expect(results[0].quantity).toBe(expectedBottles)
    })

    it('handles multiple ingredients in drinks', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 20
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 2
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        {
          name: 'Vodka',
          volume: 700,
          category: 'alcoholicDrink'
        },
        {
          name: 'Orange Juice',
          volume: 1000,
          category: 'nonAlcoholicDrink'
        }
      ]

      wrapper.vm.drinkTypes = [
        {
          name: 'Screwdriver',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            },
            {
              alcohol: 'Orange Juice',
              volume: 150
            }
          ]
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(2)
      
      const vodka = results.find(r => r.type.includes('Vodka'))
      const juice = results.find(r => r.type.includes('Orange Juice'))
      
      // 20 people * 2 drinks * 50ml vodka per drink / 700ml per bottle
      expect(vodka.quantity).toBe(Math.ceil((20 * 2 * 50) / 700))
      // 20 people * 2 drinks * 150ml juice per drink / 1000ml per bottle
      expect(juice.quantity).toBe(Math.ceil((20 * 2 * 150) / 1000))
    })
  })

  describe('Mixed Consumption', () => {
    it('calculates correct quantities for mixed consumption', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 30
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 20
      wrapper.vm.guestInfo.alcoholicDrinkers = 40
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 10

      wrapper.vm.consumption.alcoholicBeerPerPerson = 1000
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 500
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 2
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 1

      wrapper.vm.alcoholTypes = [
        {
          name: 'Beer',
          volume: 500,
          category: 'alcoholicBeer'
        },
        {
          name: 'Non-Alcoholic Beer',
          volume: 500,
          category: 'nonAlcoholicBeer'
        },
        {
          name: 'Vodka',
          volume: 700,
          category: 'alcoholicDrink'
        },
        {
          name: 'Cola',
          volume: 1000,
          category: 'nonAlcoholicDrink'
        }
      ]

      wrapper.vm.drinkTypes = [
        {
          name: 'Vodka Cola',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            },
            {
              alcohol: 'Cola',
              volume: 150
            }
          ]
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(4)

      const beer = results.find(r => r.type.includes('Beer'))
      const nonAlcBeer = results.find(r => r.type.includes('Non-Alcoholic Beer'))
      const vodka = results.find(r => r.type.includes('Vodka'))
      const cola = results.find(r => r.type.includes('Cola'))

      // 30 people * 1000ml / 500ml per bottle
      expect(beer.quantity).toBe(60)
      // 20 people * 500ml / 500ml per bottle
      expect(nonAlcBeer.quantity).toBe(20)
      // 40 people * 2 drinks * 50ml / 700ml per bottle
      expect(vodka.quantity).toBe(Math.ceil((40 * 2 * 50) / 700))
      // 40 people * 2 drinks * 150ml / 1000ml per bottle
      expect(cola.quantity).toBe(Math.ceil((40 * 2 * 150) / 1000))
    })
  })

  describe('Form Validation', () => {
    it('validates required fields', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = null
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = null
      wrapper.vm.guestInfo.alcoholicDrinkers = null
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = null

      expect(wrapper.vm.isFormValid).toBe(false)
    })

    it('validates positive numbers', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = -1
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      expect(wrapper.vm.isFormValid).toBe(false)
    })
  })

  describe('Simple Scenarios', () => {
    it('calculates single beer type for one person', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 1
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 500
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Test Beer',
        volume: 500,
        category: 'alcoholicBeer'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].quantity).toBe(1)
      expect(results[0].totalVolume).toBe(500)
    })

    it('calculates single non-alcoholic drink for one person', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 1

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 1

      wrapper.vm.alcoholTypes = [{
        name: 'Cola',
        volume: 1000,
        category: 'nonAlcoholicDrink'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].quantity).toBe(1)
      expect(results[0].totalVolume).toBe(250) // Standard non-alcoholic drink volume (250ml)
    })
  })

  describe('Complex Drink Scenarios', () => {
    it('calculates quantities for a complex cocktail with multiple ingredients', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 10
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 2
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        {
          name: 'Vodka',
          volume: 700,
          category: 'alcoholicDrink'
        },
        {
          name: 'Orange Juice',
          volume: 1000,
          category: 'nonAlcoholicDrink'
        },
        {
          name: 'Cranberry Juice',
          volume: 1000,
          category: 'nonAlcoholicDrink'
        }
      ]

      wrapper.vm.drinkTypes = [
        {
          name: 'Sea Breeze',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            },
            {
              alcohol: 'Cranberry Juice',
              volume: 100
            },
            {
              alcohol: 'Orange Juice',
              volume: 50
            }
          ]
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(3)
      
      const vodka = results.find(r => r.type.includes('Vodka'))
      const cranberry = results.find(r => r.type.includes('Cranberry'))
      const orange = results.find(r => r.type.includes('Orange'))

      // 10 people * 2 drinks * 50ml / 700ml per bottle
      expect(vodka.quantity).toBe(Math.ceil((10 * 2 * 50) / 700))
      // 10 people * 2 drinks * 100ml / 1000ml per bottle
      expect(cranberry.quantity).toBe(Math.ceil((10 * 2 * 100) / 1000))
      // 10 people * 2 drinks * 50ml / 1000ml per bottle
      expect(orange.quantity).toBe(Math.ceil((10 * 2 * 50) / 1000))
    })

    it('handles multiple drink types with shared ingredients', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 20
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 3
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [
        {
          name: 'Vodka',
          volume: 700,
          category: 'alcoholicDrink'
        },
        {
          name: 'Orange Juice',
          volume: 1000,
          category: 'nonAlcoholicDrink'
        }
      ]

      wrapper.vm.drinkTypes = [
        {
          name: 'Screwdriver',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            },
            {
              alcohol: 'Orange Juice',
              volume: 150
            }
          ]
        },
        {
          name: 'Vodka Orange',
          ingredients: [
            {
              alcohol: 'Vodka',
              volume: 50
            },
            {
              alcohol: 'Orange Juice',
              volume: 100
            }
          ]
        }
      ]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(2)
      
      const vodka = results.find(r => r.type.includes('Vodka'))
      const orange = results.find(r => r.type.includes('Orange'))

      // Total vodka needed: 20 people * 3 drinks * 50ml = 3000ml
      // 3000ml / 700ml per bottle = 4.29 bottles, rounded up to 5
      expect(vodka.quantity).toBe(5)
      // Total orange juice needed: 20 people * 3 drinks * ((150ml + 100ml) / 2) = 7500ml
      // 7500ml / 1000ml per bottle = 7.5 bottles, rounded up to 8
      expect(orange.quantity).toBe(8)
    })
  })

  describe('Edge Cases', () => {
    it('handles zero consumption correctly', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Test Beer',
        volume: 500,
        category: 'alcoholicBeer'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(0)
    })

    it('handles very small bottle sizes', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 1
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 100
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Mini Beer',
        volume: 50,
        category: 'alcoholicBeer'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].quantity).toBe(2) // 100ml / 50ml = 2 bottles
    })

    it('handles very large consumption values', async () => {
      wrapper.vm.guestInfo.alcoholicBeerDrinkers = 100
      wrapper.vm.guestInfo.nonAlcoholicBeerDrinkers = 0
      wrapper.vm.guestInfo.alcoholicDrinkers = 0
      wrapper.vm.guestInfo.nonAlcoholicDrinkers = 0

      wrapper.vm.consumption.alcoholicBeerPerPerson = 5000
      wrapper.vm.consumption.nonAlcoholicBeerPerPerson = 0
      wrapper.vm.consumption.alcoholicDrinksPerPerson = 0
      wrapper.vm.consumption.nonAlcoholicDrinksPerPerson = 0

      wrapper.vm.alcoholTypes = [{
        name: 'Large Beer',
        volume: 500,
        category: 'alcoholicBeer'
      }]

      await wrapper.vm.calculateQuantities()

      const results = wrapper.vm.results
      expect(results).toHaveLength(1)
      expect(results[0].quantity).toBe(1000) // 100 people * 5000ml / 500ml = 1000 bottles
    })
  })
}) 