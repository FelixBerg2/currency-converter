<<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const amount = ref(1); // Default value is now 1
const fromCurrency = ref("EUR");
const toCurrency = ref("USD");
const exchangeRates = ref({});
const convertedAmount = ref(null);
const errorMessage = ref("");

const fetchExchangeRates = async () => {
  try {
    const response = await axios.get("https://api.exchangerate-api.com/v4/latest/EUR");
    exchangeRates.value = response.data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    errorMessage.value = "Failed to load exchange rates.";
  }
};

const isFormValid = computed(() => {
  return amount.value > 0 && exchangeRates.value[toCurrency.value];
});

watch(amount, (newVal) => {
  if (!newVal || newVal <= 0) {
    errorMessage.value = "Please enter a valid amount greater than 0.";
  } else {
    errorMessage.value = "";
  }
});

const convertCurrency = () => {
  if (!isFormValid.value) return;

  const fromRate = exchangeRates.value[fromCurrency.value];
  const toRate = exchangeRates.value[toCurrency.value];

  const conversionRate = toRate / fromRate;

  convertedAmount.value = (amount.value * conversionRate).toFixed(2);
};

onMounted(fetchExchangeRates);
</script>

<template>
  <div class="converter">
    <input v-model.number="amount" type="number" min="0" />

    <select v-model="fromCurrency">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>

    <span>to</span>

    <select v-model="toCurrency">
      <option value="EUR">EUR</option>
      <option value="USD">USD</option>
      <option value="JPY">JPY</option>
    </select>

    <p v-if="fromCurrency && toCurrency">
      1 {{ fromCurrency }} = {{ (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4) }} {{ toCurrency }}
    </p>

    <button :disabled="!isFormValid" @click="convertCurrency">Convert</button>

    <!-- Reserve space for the error message -->
    <p class="error-placeholder">{{ errorMessage || " " }}</p>

    <p v-if="convertedAmount !== null">Converted Amount: {{ convertedAmount }} {{ toCurrency }}</p>
  </div>
</template>

<style>
.converter {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

input, select, button {
  padding: 10px;
  font-size: 16px;
}

.error-placeholder {
  min-height: 20px; /* Reserves space for the error message */
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>