import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class Index extends React.Component {
  static async getInitialProps() {
    const url = 'https://wordsapiv1.p.mashape.com/words/?random=true';
    const options = {
      headers: { 'X-RapidAPI-Key': process.env.RAPID_API_KEY },
    };
    const response = await Promise.all([
      fetch(`${url}&partOfSpeech=adjective`, options),
      fetch(`${url}&partOfSpeech=noun`, options),
      fetch(`${url}&partOfSpeech=verb`, options)
    ]);
    const json = await Promise.all(response.map(res => res.json()));
    console.log('json =', json);
    return { words: json.map(definition => definition.word) };
  }

  render() {
    const { words } = this.props;
    return (
      <div>
        <h1>prompt me</h1>
        <ul>{words.map(word => <li key={word}>{word}</li>)}</ul>
        <Link href="/compose"><button>compose story</button></Link>
      </div>
    );
  }
}

Index.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
};

Index.defaultProps = {
  words: [],
};

export default Index;
