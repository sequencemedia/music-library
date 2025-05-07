import debug from 'debug'

const {
  env: {
    DEBUG = '@sequencemedia/music-library*'
  }
} = process

if (DEBUG) debug.enable(DEBUG)

export default debug
