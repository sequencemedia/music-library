#!/usr/bin/env node

import 'dotenv/config'

import debug from 'debug'

import {
  readFile
} from 'fs/promises'

import psList from 'ps-list'

import commander from 'commander'

import * as watch from '#music-library/watch'

console.log(watch)

const {
  library,
  library: {
    tracks,
    playlists
  }
} = watch

const NAME = 'ml.App'
process.title = NAME

async function app () {
  const PACKAGE = JSON.parse(await readFile('./package.json'))

  const {
    name
  } = PACKAGE

  /**
   *  Permit only one instance of the application
   */
  try {
    const a = (await psList())
      .filter(({ name }) => name === NAME)

    if (a.length > 1) {
      const {
        pid: PID
      } = process

      const {
        pid
      } = a.find(({ pid }) => pid !== PID)

      const log = debug('music-library:process:log')

      log(`Killing application "${name}" in process ${pid}.`)

      process.kill(pid)
    }
  } catch ({ message }) {
    const error = debug('music-library:process:error')

    error(message)
    return
  }

  const log = debug('music-library:log')

  const {
    pid,
    argv,
    env: {
      JAR,
      XML,
      DESTINATION
    }
  } = process

  log(`Starting application "${name}" in process ${pid}.`)

  const {
    version
  } = PACKAGE

  commander
    .version(version)
    .option('-j, --jar [jar]', 'Path to Saxon PE/EE JAR')
    .option('-x, --xml [xml]', 'Path to iTunes Library XML')
    .option('-d, --destination [destination]', 'Destination path for M3Us')
    .option('-t, --tracks', 'Parse all tracks')
    .option('-p, --playlists', 'Parse all playlists')
    .parse(argv)

  const {
    jar = JAR,
    xml = XML,
    destination = DESTINATION,
    tracks: t = false,
    playlists: p = false
  } = commander.opts()

  const l = (
    (t && p) || (!t && !p)
  )

  if (l) {
    log(`Application "${name}" in process ${pid} watching Library.`)

    log({ jar, xml, destination })

    return (
      library
        .toM3U(jar, xml, destination)
    )
  } else {
    if (t) {
      log(`Application "${name}" in process ${pid} watching Tracks.`)

      return (
        tracks
          .toM3U(jar, xml, destination)
      )
    }

    if (p) {
      log(`Application "${name}" in process ${pid} watching Playlists.`)

      return (
        playlists
          .toM3U(jar, xml, destination)
      )
    }
  }
}

export default app()
