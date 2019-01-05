import React from 'react';
import PropTypes from 'prop-types';
// import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Responsive from 'react-responsive';

import Head from '../components/head';
import WordAccordion from '../components/word_accordion';

import './style.css';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;

class Index extends React.Component {
  static async getInitialProps() {
    const types = ['adjective', 'noun', 'verb'];
    const words = await Promise.all(types.map(Index.getWord));
    console.log('words =', words);
    return { words };
  }

  static async getWord(partOfSpeech) {
    const url = 'https://wordsapiv1.p.mashape.com/words/?random=true&frequencyMin=3';
    const opts = {
      headers: { 'X-RapidAPI-Key': process.env.RAPID_API_KEY },
    };
    const response = await fetch(`${url}&partOfSpeech=${partOfSpeech}`, opts);
    const { word, results: definitions } = await response.json();
    const relevantDefinitions = definitions.filter(def => (
      def.partOfSpeech === partOfSpeech
    )).map(def => def.definition);
    return { word, definitions: relevantDefinitions };
  }

  // static composeNew() {
  //   return <Link href="/compose"><button>compose story</button></Link>;
  // }

  static buildDefinition(definition) {
    return (
      <div key={definition} className="word-definition">
        {`${definition}.`}
      </div>
    );
  }

  static buildDefinitions(word, definitions, shouldOpen) {
    return (
      <WordAccordion
        key={`${word}-definition-container}`}
        className="word-definition-container"
        open={shouldOpen}
      >
        {definitions.map(Index.buildDefinition)}
      </WordAccordion>
    );
  }

  constructor() {
    super();
    this.state = { activeWord: null };
    this.buildWordContainer = this.buildWordContainer.bind(this);
  }

  buildWordContainer(wordObj, definitionsIncluded = true) {
    const { word, definitions } = wordObj;
    const { activeWord } = this.state;
    return (
      <div key={`${word}-word-container`} className="word-container">
        <div
          key={word}
          className="word"
          onClick={() => this.setState({ activeWord: word === activeWord ? null : word })}
          // onMouseLeave={() => this.setState({ activeWord: null })}
          // onMouseEnter={() => this.setState({ activeWord: i })}
        >
          {`${word}.`}
        </div>
        { definitionsIncluded ? Index.buildDefinitions(word, definitions, activeWord === word) : null }
      </div>
    );
  }

  render() {
    const { words } = this.props;
    const { activeWord } = this.state;
    return (
      <React.Fragment>
        <Head />
        <div className="header">
          <h1>prompt me</h1>
          <h5>a writing prompt generator</h5>
        </div>
        <div>
          <div className="words-container">
            <div className="words-list">
              <Mobile>
                {words.map(wordObj => this.buildWordContainer(wordObj, true))}
              </Mobile>
              <Tablet>
                {words.map(wordObj => this.buildWordContainer(wordObj, true))}
              </Tablet>
              <Desktop>
                {words.map(wordObj => this.buildWordContainer(wordObj, false))}
              </Desktop>
            </div>
          </div>
          <Desktop>
            <div className="definition-container">
              {words.map(({ word, definitions }) => (
                Index.buildDefinitions(word, definitions, word === activeWord)
              ))}
            </div>
          </Desktop>
        </div>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    definitions: PropTypes.arrayOf(PropTypes.string),
  })),
};

Index.defaultProps = {
  words: [],
};

export default Index;
