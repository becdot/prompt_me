import React from 'react';
import PropTypes from 'prop-types';

import { SlideDown } from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';

export default function WordAccordion({ open, children }) {
  return (
    <SlideDown className="wordaccordion">
      {open ? children : null}
    </SlideDown>
  );
}

WordAccordion.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node),
};

WordAccordion.defaultProps = {
  open: false,
  children: [],
};
