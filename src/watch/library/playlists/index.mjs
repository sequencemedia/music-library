import chokidar from 'chokidar'

import debug from 'debug'

import musicLibraryParser from '@sequencemedia/music-library-parser'

import {
  DEFAULT_ERROR_MESSAGE
} from '#music-library/common'

import normalise from '#music-library/common/normalise'

const {
  library: {
    playlists: {
      toM3U: parseToM3U
    }
  }
} = musicLibraryParser

const log = debug('@sequencemedia/music-library:playlists')
const error = debug('@sequencemedia/music-library:playlists:error')

log('`music-library` is awake')

function handleError ({
  message = DEFAULT_ERROR_MESSAGE
} = {}) {
  error(`Error in watcher. The message was "${message}"`)
}

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
      .on('all', function handleEvent (t, p) {
        log(`Event "${t}" for "${p}"`)
      })
      .on('ready', function handleReady () {
        return (
          parseToM3U(j, x, d)
        )
      })
      .on('change', function handleChange () {
        return (
          parseToM3U(j, x, d)
        )
      })
      .on('error', handleError)
  )
}

export * as transform from '#music-library/watch/library/playlists/transform'
