#!/usr/bin/env node

import 'dotenv/config'

import {
  readFile
} from 'fs/promises'

import {
  Command
} from 'commander'

import debug from '#debug'

import {
  DEFAULT_ERROR_MESSAGE
} from '#music-library/common'

import * as watch from '#music-library/watch'

const {
  library,
  library: {
    tracks,
    playlists
  }
} = watch

const log = debug('@sequencemedia/music-library')

log('`music-library` is awake')

const commander = new Command()

async function app () {
  const PACKAGE = JSON.parse(await readFile('./package.json', 'utf8'))

  const {
    name
  } = PACKAGE

  const {
    pid,
    argv,
    env: {
      TRACKS = false,
      PLAYLISTS = false
    }
  } = process

  log(`Starting application "${name}" in process ${pid}.`)

  const {
    version
  } = PACKAGE

  try {
    commander
      .version(version)
      .exitOverride()
      .requiredOption('-j, --jar [jar]', 'Path to Saxon PE/EE JAR')
      .requiredOption('-x, --xml [xml]', 'Path to iTunes Library XML')
      .requiredOption('-d, --destination [destination]', 'Destination path for M3Us')
      .option('-t, --tracks', 'Parse all tracks')
      .option('-p, --playlists', 'Parse all playlists')
      .parse(argv)
  } catch (e) {
    const {
      code
    } = e

    const error = debug('@sequencemedia/music-library:commander:error')

    if (code !== 'commander.missingMandatoryOptionValue') error(e)

    error(`Halting application "${name}" in process ${pid}.`)
    return
  }

  const {
    jar,
    xml,
    destination,
    tracks: t = TRACKS,
    playlists: p = PLAYLISTS
  } = commander.opts()

  log({
    jar,
    xml,
    destination
  })

  try {
    const l = (
      (t && p) || (!t && !p)
    )

    if (l) {
      log(`Application "${name}" in process ${pid} watching Library.`)

      library.toM3U(jar, xml, destination)
    } else {
      if (t) {
        log(`Application "${name}" in process ${pid} watching Tracks.`)

        tracks.toM3U(jar, xml, destination)
      } else {
        if (p) {
          log(`Application "${name}" in process ${pid} watching Playlists.`)

          playlists.toM3U(jar, xml, destination)
        }
      }
    }
  } catch ({
    message = DEFAULT_ERROR_MESSAGE
  }) {
    const error = debug('@sequencemedia/music-library:error')

    error(message)
  }
}

export default app()
