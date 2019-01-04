/* eslint-disable react/no-array-index-key */
import React from 'react'
import { string, bool } from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classNames from 'classnames'

import { partitionLine, classifyWords } from '../lib/utils'
import { DEFAULT_OPTIONS } from '../lib/consts'

import './Line.css'

/**
 * Line Component.
 * Renders the various aspects of a single line.
 * @param {String} gurmukhi The Gurmukhi of the line to render.
 * @param {String} punjabiTranslation The Punjabi translation of the line to render.
 * @param {String} englishTranslation The English translation of the line to render.
 * @param {String} transliteration The English transliteration of the line to render.
 * @param {String} spacing The justify content value for spacing between the lines.
 * @param {Boolean} larivaarGurbani Whether Gurbani should be continuous or not.
 * @param {Boolean} larivaarAssist If `larivaarGurbani`, whether alternate words should be coloured.
 * @param {Boolean} vishraamColors Enables colors for vishraams.
 * @param {Boolean} vishraamTransliterationColors Enables colors for vishraams in transliteration.
 * @param {Boolean} vishraamCharacters Enables display of vishraam characters.
 * @param {Boolean} vishraamLight Enables colors for light vishraams.
 * @param {Boolean} vishraamMedium Enables colors for medium vishraams.
 * @param {Boolean} vishraamHeavy Enables colors for heavy vishraams.
 * @param {Boolean} splitOnVishraam If the line is too long, split it on the vishraam word.
 * @param {Boolean} simpleGraphics Disables transitions and other intensive effects.
 */
const Line = ( {
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
} ) => (
  <div
    className={classNames( {
      assist: larivaar && larivaarAssist,
      light: vishraams && vishraamLight,
      medium: vishraams && vishraamMedium,
      heavy: vishraams && vishraamHeavy,
      vishraams,
      larivaar,
      simple,
  }, 'line' )}
    style={{ justifyContent: spacing }}
  >
    <p className="gurmukhi">
      {partitionLine( gurmukhi )
        .map( ( line, lineIndex ) => (
          <span key={lineIndex} className={classNames( { partition } )}>
            {line.map( ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span> )}
          </span>
        ) )}
    </p>
    <TransitionGroup appear exit={false} component={null}>
      {englishTranslation &&
      <CSSTransition key={englishTranslation} classNames="fade" timeout={0}>
        <p className="english translation">{englishTranslation}</p>
      </CSSTransition>}
      {punjabiTranslation &&
      <CSSTransition key={punjabiTranslation} classNames="fade" timeout={0}>
        <p className="punjabi translation">{punjabiTranslation}</p>
      </CSSTransition>}
      {transliteration &&
      <CSSTransition key={`${transliteration}`} classNames="fade" timeout={0}>
        <p className={classNames( { vishraams: vishraams && vishraamTransliterationColors }, 'transliteration' )}>{
          classifyWords( transliteration )
          .map( ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span> )
        }
        </p>
      </CSSTransition>}
    </TransitionGroup>
  </div>
)

Line.propTypes = {
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
  englishTranslation: null,
  punjabiTranslation: null,
  transliteration: null,
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
