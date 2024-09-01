import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import normalise from '#music-library/common/normalise'

const {
  library: {
    toM3U: parseToM3U
  }
} = musicLibraryParser

const log = debug('@sequencemedia/music-library')
const error = debug('@sequencemedia/music-library:error')

log('`music-library` is awake')

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
  } catch ({ message }) {
    error(message)
  }
}

export * as tracks from '#music-library/library/tracks'
export * as playlists from '#music-library/library/playlists'
export * as transform from '#music-library/library/transform'
