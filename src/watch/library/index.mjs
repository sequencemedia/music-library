import chokidar from 'chokidar'

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

export function toM3U (jar, xml, destination) {
  log('toM3U')

  const j = jar
    ? normalise(jar)
    : jar

  const x = xml
    ? normalise(xml)
    : xml

  const d = destination
    ? normalise(destination)
    : destination

  log({ j, x, d })

  return (
    chokidar.watch(x)
      .on('ready', () => {
        log('ready')

        return (
          parseToM3U(j, x, d)
        )
      })
      .on('change', () => {
        log('change')

        return (
          parseToM3U(j, x, d)
        )
      })
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}

export * as tracks from '#music-library/watch/library/tracks'
export * as playlists from '#music-library/watch/library/playlists'
export * as transform from '#music-library/watch/library/transform'
