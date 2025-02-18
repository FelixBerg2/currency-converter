
# Currency Converter

A simple currency converter built with **Vue.js**. The app allows users to convert amounts between different currencies with real-time exchange rates fetched from an API.

## Features

- Convert between multiple currencies (e.g., EUR, USD, JPY).
- Real-time exchange rates fetched from **ExchangeRate-API**.
- Input validation and error handling.
- Responsive design for both desktop and mobile.

## Tech Stack

- **Frontend**: Vue.js 3, Vue Composition API
- **API**: ExchangeRate-API (for fetching live exchange rates)
- **Styling**: Basic CSS (Flexbox for layout)

## Setup and Installation

### Prerequisites

Ensure you have **Node.js** and **npm** installed. You can check your versions by running:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/currency-converter.git
cd currency-converter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```


## Running Tests

### 1. Run Tests with Vitest

For running tests, you can use **Vitest**:

```bash
npm run test
```

This will execute your test suite and display the results in the terminal.

## How to Use

1. **Enter Amount**: Input the amount of currency you want to convert.
2. **Select From Currency**: Choose the currency you're converting from.
3. **Select To Currency**: Choose the currency you're converting to.
4. **Click Convert**: Press the **Convert** button to see the result.

### Example

Convert 1 USD to EUR. After clicking the **Convert** button, you'll see the result in the output section.