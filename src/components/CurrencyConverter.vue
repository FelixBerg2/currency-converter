<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const amount = ref(1);
const fromCurrency = ref("EUR");
const toCurrency = ref("USD");
const exchangeRates = ref({});
const convertedAmount = ref(null);

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/EUR");
    exchangeRates.value = response.data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
};

const convertCurrency = () => {
  if (!exchangeRates.value[toCurrency.value]) return;
  convertedAmount.value = (amount.value * exchangeRates.value[toCurrency.value]).toFixed(2);
};

// Fetch rates when component mounts
onMounted(fetchExchangeRates);
</script>

<template>
  <div>
    <h2>Currency Converter</h2>

    <!-- Amount Input -->
    <input v-model="amount" type="number" placeholder="Enter amount" />

    <!-- From Currency Dropdown -->
    <select v-model="fromCurrency">
      <option v-for="currency in Object.keys(exchangeRates)" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>

    <!-- To Currency Dropdown -->
    <select v-model="toCurrency">
      <option v-for="currency in Object.keys(exchangeRates)" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>

    <button @click="convertCurrency">Convert</button>

    <!-- Display Converted Amount -->
    <div v-if="convertedAmount !== null">
      Converted Amount: {{ convertedAmount }} {{ toCurrency }}
    </div>
  </div>
</template>