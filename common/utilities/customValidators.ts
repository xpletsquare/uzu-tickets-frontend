import validator from 'validator'

export class CustomValidators {
  static isValidString(value: string) {
    return value.length > 0
  }

  static isValidNumber(value: string) {
    return validator.isNumeric(value + '', { no_symbols: true })
  }

  static isFloat(value: string) {
    return validator.isFloat(value + '')
  }

  static isBoolean(value: string) {
    return validator.isBoolean(value + '')
  }

  static isValidWalletId(value: string) {
    return validator.isNumeric(value) && value.length === 11;
  }

}
