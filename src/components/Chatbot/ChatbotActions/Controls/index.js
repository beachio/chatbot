import Input from './Input'
import Button from './Button'
import Select from './Select'
import _ from 'underscore'

const components = _.indexBy([
  Input,
  Button,
  Select
], 'name')

export default components