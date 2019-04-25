import React from 'react';
import PropTypes from 'prop-types'

const Section = ({title, description}) => (
 <div style={{textAlign: 'center', backgroundColor: '#f1f1f1', padding: '20px'}}>
    <h3>{title}</h3>
    <h4>{description}</h4>
</div>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default Section;