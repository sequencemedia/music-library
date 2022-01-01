import chokidar from 'chokidar'

import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import normalise from '#music-library/common/normalise'

const {
  library: {
    tracks: {
      toM3U: parseToM3U
    }
  }
} = musicLibraryParser

const log = debug('@sequencemedia/music-library:tracks')
const error = debug('@sequencemedia/music-library:tracks:error')

export function toM3U (jar, xml, destination) {
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
    chokidar.watch(x)
      .on('all', (t, p) => {
        log(`Event "${t}" for "${p}"`)
      })
      .on('ready', () => (
        parseToM3U(j, x, d)
      ))
      .on('change', () => (
        parseToM3U(j, x, d)
      ))
      .on('error', ({ message }) => {
        error(`Error in watcher: "${message}"`)
      })
  )
}

export * as transform from '#music-library/watch/library/tracks/transform'
