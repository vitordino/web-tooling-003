import { sum, sumTenToArrayItems } from './utils'

describe('basic utils', () => {
	it('should sum 2 parameters together when running `sum` function', () => {
		expect(sum(2, 3)).toBe(5)
		expect(sum(2, 4)).toBe(6)
	})

	it('should sum 10 to each item on the array when using sumTenToArrayItems', () => {
		expect(sumTenToArrayItems([1, 2, 3])).toMatchObject([11, 12, 13])
	})
})
