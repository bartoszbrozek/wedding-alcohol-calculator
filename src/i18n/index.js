import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    app: {
      title: 'Wedding Alcohol Calculator',
      guestInfo: 'Guest Information',
      consumption: 'Average Consumption (ml per person)',
      alcoholTypes: 'Alcohol Types',
      drinkTypes: 'Drink Types',
      results: 'Recommended Quantities',
      warning: 'Please fill in all required fields with valid values to see the results.',
      calculate: 'Calculate',
      addType: 'Add Type',
      addDrink: 'Add Drink',
      addIngredient: 'Add Ingredient',
      type: 'Type',
      quantity: 'Quantity',
      totalVolume: 'Total Volume (ml)',
      fields: {
        alcoholicBeerDrinkers: 'Alcoholic Beer Drinkers',
        nonAlcoholicBeerDrinkers: 'Non-Alcoholic Beer Drinkers',
        alcoholicDrinkers: 'Alcoholic Drink Drinkers',
        nonAlcoholicDrinkers: 'Non-Alcoholic Drink Drinkers',
        alcoholicBeer: 'Alcoholic Beer',
        nonAlcoholicBeer: 'Non-Alcoholic Beer',
        alcoholicDrinks: 'Alcoholic Drinks',
        nonAlcoholicDrinks: 'Non-Alcoholic Drinks',
        category: 'Category',
        name: 'Name',
        volume: 'Volume (ml)',
        drinkName: 'Drink Name',
        alcohol: 'Alcohol'
      },
      categories: {
        alcoholicBeer: 'Alcoholic Beer',
        nonAlcoholicBeer: 'Non-Alcoholic Beer',
        alcoholicDrink: 'Alcoholic Drink',
        nonAlcoholicDrink: 'Non-Alcoholic Drink'
      }
    }
  },
  pl: {
    app: {
      title: 'Kalkulator Alkoholu na Wesele',
      guestInfo: 'Informacje o Gościach',
      consumption: 'Średnie Spożycie (ml na osobę)',
      alcoholTypes: 'Rodzaje Alkoholu',
      drinkTypes: 'Rodzaje Drinków',
      results: 'Zalecane Ilości',
      warning: 'Proszę wypełnić wszystkie wymagane pola prawidłowymi wartościami, aby zobaczyć wyniki.',
      calculate: 'Oblicz',
      addType: 'Dodaj Rodzaj',
      addDrink: 'Dodaj Drink',
      addIngredient: 'Dodaj Składnik',
      type: 'Rodzaj',
      quantity: 'Ilość',
      totalVolume: 'Całkowita Objętość (ml)',
      fields: {
        alcoholicBeerDrinkers: 'Pijący Piwo Alkoholowe',
        nonAlcoholicBeerDrinkers: 'Pijący Piwo Bezalkoholowe',
        alcoholicDrinkers: 'Pijący Drinki Alkoholowe',
        nonAlcoholicDrinkers: 'Pijący Drinki Bezalkoholowe',
        alcoholicBeer: 'Piwo Alkoholowe',
        nonAlcoholicBeer: 'Piwo Bezalkoholowe',
        alcoholicDrinks: 'Drinki Alkoholowe',
        nonAlcoholicDrinks: 'Drinki Bezalkoholowe',
        category: 'Kategoria',
        name: 'Nazwa',
        volume: 'Objętość (ml)',
        drinkName: 'Nazwa Drinka',
        alcohol: 'Alkohol'
      },
      categories: {
        alcoholicBeer: 'Piwo Alkoholowe',
        nonAlcoholicBeer: 'Piwo Bezalkoholowe',
        alcoholicDrink: 'Drink Alkoholowy',
        nonAlcoholicDrink: 'Drink Bezalkoholowy'
      }
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.split('-')[0] || 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n 