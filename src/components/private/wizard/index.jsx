import React from 'react';
import PropTypes from 'prop-types'
import { Row, Steps } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';

const { Step } = Steps;

const AmenityWizard = props => {
    const {step, steps} = props;
    return (
        <React.Fragment>
            <Steps current={step}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {steps[step].content}
            </div>
        </React.Fragment>
    )
}

AmenityWizard.propTypes = {    
};

const mapDispatchToProps = {    
}; 

export default withLocalize(connect(null, mapDispatchToProps)(AmenityWizard));