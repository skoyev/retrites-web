import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'antd';

const RetreatBreadcrumb = ({onBack, buttonName}) => (
    <div className="breadcrumb">                
        <Button onClick={onBack}>{buttonName}</Button>
    </div>
);

RetreatBreadcrumb.propTypes = {
    onBack: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired
}

export default RetreatBreadcrumb;