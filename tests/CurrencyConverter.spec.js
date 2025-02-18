import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import CurrencyConverter from '../src/components/CurrencyConverter.vue'; // Adjust the path if needed

// Mock the axios call to avoid network requests during the test
vi.mock('axios', () => ({
  get: vi.fn().mockResolvedValue({
    data: {
      rates: {
        USD: 1.1,  // Example exchange rate
        EUR: 1,
        JPY: 130
      }
    }
  })
}));

describe('CurrencyConverter', () => {
  it('should convert the currency correctly when the Convert button is pressed', async () => {
    const wrapper = mount(CurrencyConverter);

    // Set the input values (amount, fromCurrency, and toCurrency)
    await wrapper.setData({ amount: 10, fromCurrency: 'EUR', toCurrency: 'USD' });

    // Find and click the "Convert" button
    const button = wrapper.find('button');
    await button.trigger('click');

    // Check if the converted amount is correctly displayed
    const convertedAmount = wrapper.find('p');
    expect(convertedAmount.text()).toContain('Converted Amount: 11.00 USD');  // 10 * 1.1 = 11
  });
});
