import CheckboxList from './CheckboxList'
import RadioList from './RadioList'
import Image from './Image'
import _ from 'underscore'

const components = _.indexBy([
  CheckboxList,
  RadioList,
  Image
], 'name')

export default components