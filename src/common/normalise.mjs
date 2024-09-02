import {
  homedir
} from 'os'

import {
  resolve
} from 'path'

export default function normalise (p = '') {
  return (
    resolve(String(p).trim().replace(/^~/, homedir()))
  )
}
