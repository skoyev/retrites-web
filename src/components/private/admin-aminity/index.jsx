import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { commonActions } from '../../../store/action';
import './index.css'
import { connect } from 'react-redux';

const AdminAminity = props => {
                      
    useEffect(()=> {
        //props.fetchItemTypes();
    }, []);

    //const [selectedItem, setSelectedItem] = useState('');

    return (
        <>
            <Row>
            AdminAminity
            </Row>
        </>
    )
}

const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAminity);
