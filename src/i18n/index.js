import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    app: {
      title: 'Wedding Alcohol Calculator',
      guestInfo: 'Guest Information',
      consumption: 'Average Consumption',
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
      export: 'Export to Excel',
      print: 'Print',
      clearForm: 'Clear Form',
      clearFormTitle: 'Clear Form',
      clearFormMessage: 'Are you sure you want to clear all form data? This action cannot be undone.',
      clear: 'Clear',
      cancel: 'Cancel',
      randomize: 'Randomize',
      randomizeTitle: 'Randomize Form',
      randomizeMessage: 'Are you sure you want to randomize all form data? This will replace all current values with random ones.',
      fields: {
        alcoholicBeerDrinkers: 'Alcoholic Beer Drinkers',
        nonAlcoholicBeerDrinkers: 'Non-Alcoholic Beer Drinkers',
        alcoholicDrinkers: 'Alcoholic Drink Drinkers',
        nonAlcoholicDrinkers: 'Non-Alcoholic Drink Drinkers',
        alcoholicBeer: 'Alcoholic Beer (ml)',
        nonAlcoholicBeer: 'Non-Alcoholic Beer (ml)',
        alcoholicDrinks: 'Alcoholic Drinks (quantity)',
        nonAlcoholicDrinks: 'Non-Alcoholic Drinks (quantity)',
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
      consumption: 'Średnie Spożycie',
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
      export: 'Eksportuj do Excela',
      print: 'Drukuj',
      clearForm: 'Wyczyść Formularz',
      clearFormTitle: 'Wyczyść Formularz',
      clearFormMessage: 'Czy na pewno chcesz wyczyścić wszystkie dane formularza? Tej operacji nie można cofnąć.',
      clear: 'Wyczyść',
      cancel: 'Anuluj',
      randomize: 'Losuj',
      randomizeTitle: 'Losuj Dane Formularza',
      randomizeMessage: 'Czy na pewno chcesz wylosować wszystkie dane formularza? To zastąpi wszystkie obecne wartości losowymi.',
      fields: {
        alcoholicBeerDrinkers: 'Pijący Piwo Alkoholowe',
        nonAlcoholicBeerDrinkers: 'Pijący Piwo Bezalkoholowe',
        alcoholicDrinkers: 'Pijący Drinki Alkoholowe',
        nonAlcoholicDrinkers: 'Pijący Drinki Bezalkoholowe',
        alcoholicBeer: 'Piwo Alkoholowe (ml)',
        nonAlcoholicBeer: 'Piwo Bezalkoholowe (ml)',
        alcoholicDrinks: 'Drinki Alkoholowe (ilość)',
        nonAlcoholicDrinks: 'Drinki Bezalkoholowe (ilość)',
        category: 'Kategoria',
        name: 'Nazwa',
        volume: 'Objętość (ml)',
        drinkName: 'Nazwa Drinka',
        alcohol: 'Alkohol',
        required: 'Pole wymagane',
        positive: 'Wartość musi być większa od 0'
      },
      categories: {
        alcoholicBeer: 'Piwo alkoholowe',
        nonAlcoholicBeer: 'Piwo bezalkoholowe',
        alcoholicDrink: 'Drink alkoholowy',
        nonAlcoholicDrink: 'Drink bezalkoholowy'
      }
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  runtimeOnly: false,
  globalInjection: true
})

export default i18n 