import calculatePasswordStrength from '../src/score-password'

describe('calculatePasswordStrength', () => {
  describe('Rejected cases', () => {
    let password: string
    let passwordTwo: string

    test('short password (less than 8 chars) is rejected', () => {
      password = 'abcdefg'

      expect(calculatePasswordStrength(password)).toBe('Rejected!')
    })

    test('password with only numbers is rejected if even over minimum length (8)', () => {
      password = '123456789'

      expect(calculatePasswordStrength(password)).toBe('Rejected!')
    })

    test('password of less than 12 chars and not of mixed case is rejected', () => {
      password = 'asdfghjklzx'
      passwordTwo = 'ASDFGHJKLZX'

      expect(calculatePasswordStrength(password)).toBe('Rejected!')
      expect(calculatePasswordStrength(passwordTwo)).toBe('Rejected!')
    })
  })
  describe('strong and very strong cases', () => {
    let password: string
    let passwordTwo: string

   test('shorter complex password will be classified as "Strong!"', () => {
     password = 'qwERTY!123'
     expect(calculatePasswordStrength(password)).toBe('Strong!')
   })

    test('longer complex password will be classified as "Very strong!"', () => {
      password = 'qwERTY!12345'
      expect(calculatePasswordStrength(password)).toBe('Very strong!')
    })
  })
  describe('medium cases', () => {
    let password: string
    let passwordTwo: string

    test('shorter less complex password will be classified as "Medium!"', () => {
      password = 'qwERTY123'
      passwordTwo = 'qwERTY!@£'
      expect(calculatePasswordStrength(password)).toBe('Medium!')
      expect(calculatePasswordStrength(passwordTwo)).toBe('Medium!')
    })
  })
  describe('weak cases', () => {
    let password: string

    test('shorter simple password will be classified as "Weak!"', () => {
      password = 'qwERTYUI'
      expect(calculatePasswordStrength(password)).toBe('Weak!')
    })
  })
})
