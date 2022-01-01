import chokidar from 'chokidar'

import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import normalise from '#music-library/common/normalise'

const {
  library: {
    playlists: {
      toM3U: parseToM3U
    }
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
      .on('all', (t, p) => {
        log(t, p)
      })
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

export * as transform from '#music-library/watch/library/playlists/transform'
