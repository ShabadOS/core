/* eslint-disable react/no-array-index-key */
import React from 'react'
import { string, bool } from 'prop-types'
import classNames from 'classnames'

import { partitionLine, classifyWords } from '../lib/utils'
import { DEFAULT_OPTIONS } from '../lib/consts'

import './Line.css'

/**
 * Overlay Line Component.
 * Renders the various aspects of a single line.
 * @param {string} className An optional class name to append.
 * @param {string} gurmukhi The Gurmukhi of the line to render.
 * @param {string} punjabiTranslation The Punjabi translation of the line to render.
 * @param {string} englishTranslation The English translation of the line to render.
 * @param {string} transliteration The English transliteration of the line to render.
 * @param {string} spacing The justify content value for spacing between the lines.
 * @param {boolean} larivaarGurbani Whether Gurbani should be continuous or not.
 * @param {boolean} larivaarAssist If `larivaarGurbani`, whether alternate words should be coloured.
 * @param {boolean} vishraamColors Enables colors for vishraams.
 * @param {boolean} vishraamTransliterationColors Enables colors for vishraams in transliteration.
 * @param {boolean} vishraamCharacters Enables display of vishraam characters.
 * @param {boolean} vishraamLight Enables colors for light vishraams.
 * @param {boolean} vishraamMedium Enables colors for medium vishraams.
 * @param {boolean} vishraamHeavy Enables colors for heavy vishraams.
 * @param {boolean} splitOnVishraam If the line is too long, split it on the vishraam word.
 * @param {boolean} simpleGraphics Disables transitions and other intensive effects.
 */
const Line = ( {
  className,
  gurmukhi,
  punjabiTranslation,
  englishTranslation,
  transliteration,
  spacing,
  larivaarGurbani: larivaar,
  larivaarAssist,
  vishraamColors: vishraams,
  vishraamTransliterationColors,
  vishraamCharacters,
  vishraamLight,
  vishraamMedium,
  vishraamHeavy,
  splitOnVishraam: partition,
  simpleGraphics: simple,
} ) => {
  const line = partitionLine( gurmukhi, !vishraamCharacters )
    .map( ( line, lineIndex ) => (
      <span key={lineIndex} className={classNames( { partition } )}>
        {line.map( ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span> )}
      </span>
    ) )

  return (
    <div
      className={classNames( className, {
      assist: larivaar && larivaarAssist,
      light: vishraams && vishraamLight,
      medium: vishraams && vishraamMedium,
      heavy: vishraams && vishraamHeavy,
      vishraams,
      larivaar,
      simple,
  }, 'overlay-line' )}
      style={{ justifyContent: spacing }}
    >
      <p className="gurmukhi">{line}</p>
      <p className="gurmukhi larivaar">{line}</p>
      <p className="english translation">{englishTranslation}</p>
      <p className="punjabi translation">{punjabiTranslation}</p>
      <p className="english transliteration">{
          classifyWords( transliteration, !vishraamCharacters )
          .map( ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span> )
        }
      </p>
    </div>
  )
}

Line.propTypes = {
  className: string,
  gurmukhi: string.isRequired,
  punjabiTranslation: string,
  englishTranslation: string,
  transliteration: string,
  spacing: string,
  larivaarGurbani: bool,
  larivaarAssist: bool,
  vishraamColors: bool,
  vishraamTransliterationColors: bool,
  vishraamCharacters: bool,
  vishraamLight: bool,
  vishraamMedium: bool,
  vishraamHeavy: bool,
  splitOnVishraam: bool,
  simpleGraphics: bool,
}

const {
  layout: {
    spacing,
    larivaarAssist,
    larivaarGurbani,
    vishraamColors,
    vishraamTransliterationColors,
    vishraamCharacters,
    vishraamHeavy,
    vishraamMedium,
    vishraamLight,
    splitOnVishraam,
  },
  theme: {
    simpleGraphics,
  },
} = DEFAULT_OPTIONS.local

Line.defaultProps = {
  className: null,
  englishTranslation: '',
  punjabiTranslation: '',
  transliteration: '',
  spacing,
  larivaarGurbani,
  larivaarAssist,
  vishraamColors,
  vishraamTransliterationColors,
  vishraamCharacters,
  vishraamHeavy,
  vishraamMedium,
  vishraamLight,
  splitOnVishraam,
  simpleGraphics,
}

export default Line
