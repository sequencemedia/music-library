import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import {
  DEFAULT_ERROR_MESSAGE
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
  error(message)
}

export async function toJSON (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return (
      await transformToJSON(j, x)
    )
  } catch (e) {
    handleError(e)
  }
}

export async function toJS (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return (
      await transformToJS(j, x)
    )
  } catch (e) {
    handleError(e)
  }
}

export async function toES (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return (
      await transformToES(j, x)
    )
  } catch (e) {
    handleError(e)
  }
}
