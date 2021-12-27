import debug from 'debug'

import * as musicLibraryParser from '@sequencemedia/music-library-parser'

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

const error = debug('@sequencemedia/music-library:transform:error')

export async function toJSON (jar, xml) {
  try {
    const j = jar
      ? normalise(jar)
      : jar

    const x = xml
      ? normalise(xml)
      : xml

    return await transformToJSON(j, x)
  } catch ({ message }) {
    error(message)
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

    return await transformToJS(j, x)
  } catch ({ message }) {
    error(message)
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

    return await transformToES(j, x)
  } catch ({ message }) {
    error(message)
  }
}
