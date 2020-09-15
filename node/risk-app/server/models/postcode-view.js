const { errorSummaryTitle } = require('../helpers')

class PostcodeViewModel {
  constructor (postcode, errorMessage) {
    this.postcodeInput = {
      label: {
        text: 'Enter a postcode'
      },
      id: 'postcode',
      value: postcode,
      name: 'postcode',
      classes: 'govuk-input--width-10',
      hint: {
        text: 'for example, WA4 1AB'
      }
    }

    if (errorMessage) {
      this.postcodeInput.errorMessage = {
        text: errorMessage
      }

      this.errorSummary = {
        titleText: errorSummaryTitle,
        errorList: [
          {
            text: errorMessage,
            href: '#postcode'
          }
        ]
      }
    }
  }
}

module.exports = PostcodeViewModel
