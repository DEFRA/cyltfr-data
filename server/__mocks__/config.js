import actualConfig from '../config'

const value = { ...actualConfig }

value.performanceLogging = false
value.standAlone = false

value.setConfigOptions = function (newValues) {
  Object.keys(newValues).forEach(function (key) {
    value[key] = newValues[key]
  })
}

export default value
