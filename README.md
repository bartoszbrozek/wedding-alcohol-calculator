# Wedding Drink Calculator

A comprehensive web application for calculating the perfect amount of drinks needed for a wedding or any large event. Plan your alcoholic and non-alcoholic beverages with precision.

## Features

- Calculate quantities for different types of drinks:
  - Alcoholic beer
  - Non-alcoholic beer
  - Alcoholic drinks (spirits, cocktails)
  - Non-alcoholic drinks
- Support for custom drink recipes with multiple ingredients
- Automatic calculation of bottle quantities based on standard sizes
- Export results to Excel
- Print-friendly results
- Multi-language support (English and Polish)
- Responsive design for all devices
- SEO optimized

## Technologies Used

- Vue 3
- Vuetify 3
- Vue I18n for internationalization
- Vitest for testing
- Vue Test Utils
- XLSX for Excel export
- FileSaver for file downloads

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wedding-drink-calculator.git
cd wedding-drink-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Testing

The project uses Vitest for testing. Run the tests with:

```bash
npm run test
# or
yarn test
```

### Test Categories

1. **Beer Calculations**
   - Alcoholic beer quantity calculations
   - Distribution across multiple beer types

2. **Drink Calculations**
   - Alcoholic drink quantities
   - Multiple ingredients in drinks

3. **Mixed Consumption**
   - Combined beer and drink calculations
   - Mixed alcoholic and non-alcoholic consumption

4. **Simple Scenarios**
   - Single drink type calculations
   - Basic use cases

5. **Complex Drink Scenarios**
   - Complex cocktails with multiple ingredients
   - Multiple drink types with shared ingredients

6. **Edge Cases**
   - Zero consumption
   - Very small bottle sizes
   - Very large consumption values

7. **Form Validation**
   - Required fields
   - Positive number validation

## Usage

1. Enter the number of guests in each category:
   - Alcoholic beer drinkers
   - Non-alcoholic beer drinkers
   - Alcoholic drink consumers
   - Non-alcoholic drink consumers

2. Set consumption per person:
   - Beer consumption (ml)
   - Number of drinks per person

3. Add alcohol types:
   - Name
   - Volume
   - Category (alcoholic/non-alcoholic beer, alcoholic/non-alcoholic drink)

4. Create custom drinks (optional):
   - Name
   - Ingredients with volumes

5. Calculate quantities:
   - View results in the table
   - Export to Excel
   - Print results

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

- bb

## Acknowledgments

- Vuetify for the beautiful UI components
- Vue.js team for the amazing framework
- All contributors and users of the application 