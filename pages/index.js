import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class Index extends React.Component {
  static async getInitialProps() {
    const types = ['adjective', 'noun', 'verb'];
    const words = await Promise.all(types.map(Index.getWord));
    console.log('words =', words);
    return { words };
  }

  static async getWord(partOfSpeech) {
    const url = 'https://wordsapiv1.p.mashape.com/words/?random=true';
    const opts = {
      headers: { 'X-RapidAPI-Key': process.env.RAPID_API_KEY },
    };
    const response = await fetch(`${url}&partOfSpeech=${partOfSpeech}`, opts);
    const { word, results: definitions } = await response.json();
    const { definition } = definitions.find(def => (
      def.partOfSpeech === partOfSpeech
    ));
    return { word, definition };
  }

  static composeNew() {
    return <Link href="/compose"><button>compose story</button></Link>;
  }

  constructor() {
    super();
    this.state = { activeDefinition: null };
  }

  render() {
    console.log(this.state);
    const { words } = this.props;
    return (
      <div>
        <style jsx>
          {`
            ul {
              display: flex;
              font-family: "Courier";
              align-items: center;
              justify-content: center;
              padding-top: 100px;
            }

            li {
              list-style: none;
              padding: 0px 10px 0px;
              font-size: 40px;
              font-weight: 600;
            }

            li:hover {
              color:red;
            }

            .active {
              display: flex;
            }
            .hidden {
              display: none;
            }
            .word-definition-container {
              padding-left: 200px;
              padding-right: 200px;
            }
            .word-definition {
              font-size: 18px;
            }
          `}
        </style>
        <ul>
          {words.map(({ word }, i) => (
            <li
              key={word}
              onMouseLeave={() => this.setState({ activeDefinition: null })}
              onMouseEnter={() => this.setState({ activeDefinition: i })}
            >
              {`${word}.`}
            </li>
          ))}
        </ul>
        <ul className="word-definition-container">
          {words.map(({ definition }, i) => (
            <li
              key={definition}
              className={`word-definition ${this.state.activeDefinition === i ? 'active' : 'hidden'}`}
            >
              {`${definition}.`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Index.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string, definition: PropTypes.string
  })),
};

Index.defaultProps = {
  words: [],
};

export default Index;
