import React from 'react';
import PropTypes from 'prop-types'

const Section = ({description}) => (
 <div>{`${description}`}</div>
);

Section.propTypes = {
    description: PropTypes.string.isRequired
}

export default Section;