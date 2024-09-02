import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import {
  DEFAULT_ERROR_MESSAGE
} from '#music-library/common'

import normalise from '#music-library/common/normalise'

const {
  library: {
    toM3U: parseToM3U
  }
} = musicLibraryParser

const log = debug('@sequencemedia/music-library')
const error = debug('@sequencemedia/music-library:error')

log('`music-library` is awake')

function handleError ({
  message = DEFAULT_ERROR_MESSAGE
} = {}) {
  error(message)
}

export async function toM3U (jar, xml, destination) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    const d = destination
      ? normalise(destination)
      : destination

    return (
      await parseToM3U(j, x, d)
    )
  } catch (e) {
    handleError(e)
  }
}

export * as tracks from '#music-library/library/tracks'
export * as playlists from '#music-library/library/playlists'
export * as transform from '#music-library/library/transform'
