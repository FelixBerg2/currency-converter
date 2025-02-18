import { mount } from '@vue/test-utils'
import CurrencyConverter from '../src/components/CurrencyConverter.vue'
import axios from 'axios'

// Mock axios module
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        rates: {
          USD: 1.1,
          EUR: 1,
          JPY: 130,
        }
      }
    })
  }
}))

describe('CurrencyConverter', () => {
  it('should convert the currency correctly when the Convert button is pressed', async () => {
    const wrapper = mount(CurrencyConverter)


    wrapper.vm.amount = 10
    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain("EURUSDJPYtoEURUSDJPY 1 EUR = 1.1000 USDConvert")
  })
})
