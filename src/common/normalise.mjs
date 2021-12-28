import {
  homedir
} from 'os'

import {
  resolve
} from 'path'

const normalise = (p = '') => resolve(String(p).trim().replace(/^~/, homedir()))

export default normalise
