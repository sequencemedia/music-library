import debug from 'debug'

import * as musicLibraryParser from '@sequencemedia/music-library-parser'

import normalise from '#music-library/common/normalise'

const {
  library: {
    tracks: {
      toM3U: parseToM3U
    }
  }
} = musicLibraryParser

const error = debug('@sequencemedia/music-library:error')

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

    return await parseToM3U(j, x, d)
  } catch ({ message }) {
    error(message)
  }
}

export * as transform from './transform'
