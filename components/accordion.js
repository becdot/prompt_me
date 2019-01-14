import React from 'react';
import PropTypes from 'prop-types';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

export default function Accordion({ open, children }) {
  return (
    <SlideDown className="wordaccordion">
      {open ? children : null}
    </SlideDown>
  );
}

Accordion.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
};

Accordion.defaultProps = {
  open: false,
  children: [],
};
