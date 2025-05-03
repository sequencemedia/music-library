import chokidar from 'chokidar'

import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_FUNC
} from '#music-library/common'

import normalise from '#music-library/common/normalise'

const {
  library: {
    playlists: {
      transform: {
        toJSON: transformToJSON,
        toJS: transformToJS,
        toES: transformToES
      }
    }
  }
} = musicLibraryParser

const log = debug('@sequencemedia/music-library:transform')
const error = debug('@sequencemedia/music-library:transform:error')

log('`music-library` is awake')

function handleError ({
  message = DEFAULT_ERROR_MESSAGE
} = {}) {
  error(`Error in watcher. The message was "${message}"`)
}

export function toJSON (jar, xml, func = DEFAULT_FUNC) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x, { awaitWriteFinish: true })
      .on('ready', async function handleReady () {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('change', async function handleChange () {
        func(
          await transformToJSON(j, x)
        )
      })
      .on('error', handleError)
  )
}

export function toJS (jar, xml, func = DEFAULT_FUNC) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x, { awaitWriteFinish: true })
      .on('ready', async function handleReady () {
        func(
          await transformToJS(j, x)
        )
      })
      .on('change', async function handleChange () {
        func(
          await transformToJS(j, x)
        )
      })
      .on('error', handleError)
  )
}

export function toES (jar, xml, func = DEFAULT_FUNC) {
  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  return (
    chokidar.watch(x, { awaitWriteFinish: true })
      .on('ready', async function handleReady () {
        func(
          await transformToES(j, x)
        )
      })
      .on('change', async function handleChange () {
        func(
          await transformToES(j, x)
        )
      })
      .on('error', handleError)
  )
}
