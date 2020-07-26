import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, DatePicker, Icon } from 'antd';
//import Icon from '@ant-design/icons';
import { Translate } from "react-localize-redux";
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../store/action';

const { RangePicker } = DatePicker;

const reportWitget = (reports) => (
    <>
        {
            reports &&
            <Col span={8} offset={1}>
                <Card title="Reports"
                    actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                    style={{textAlign:'center'}}>
                    <Row>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.totalVisits`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={12} style={{textAlign:'left'}}>
                            {reports.totalVisits}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.totalRequests`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={12} style={{textAlign:'left'}}>
                            {reports.totalRequests}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={16} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.lastRequestedDate`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={8} style={{textAlign:'left'}}>
                            {reports.lastRequestedDate}
                        </Col>
                    </Row>
                    
                </Card>                            
            </Col>
}
    </>
)

const dealsWitget = (deals) => (
    <>
        { deals &&
            <Col span={8} offset={3}>
                <Card title="Deals" 
                    actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                    style={{textAlign:'center'}}>
                        {deals && deals.map((deal, index) => (
                            <>
                                <Row key={index}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.name`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12}>              
                                        {deal.name}
                                    </Col>
                                </Row>  

                                <Row key={'deal - ' + index}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.date`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12}>              
                                        {deal.date}
                                    </Col>
                                </Row> 

                                <Row key={'deal1 - ' + index} style={{'border-bottom': '1px solid #dacfcf'}}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.price`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12}>              
                                        {deal.price}
                                    </Col>
                                </Row> 
                            </>                       
                        ))}
                </Card>                            
            </Col>
        }
    </>    
)

const amenityWitget = (amenities) => (
    <>
        { amenities && amenities.lastCreated &&
            <Col span={8}>
                <Card title="Amenities" 
                    actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                    style={{textAlign:'center'}}>
                    <Row>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.total`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={12} style={{textAlign:'left'}}>
                            {amenities.total}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.last_created`)}</span>}</Translate>                                    
                        </Col>                                
                    </Row>
                    <Row>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.name`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={12} style={{textAlign:'left'}}>
                            {amenities.lastCreated.name}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} style={{textAlign:'left'}}>
                            <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.date`)}</span>}</Translate>                                    
                        </Col>
                        <Col span={12} style={{textAlign:'left'}}>
                            {amenities.lastCreated.date}
                        </Col>
                    </Row>
                </Card>                            
            </Col>
        }
    </>
)

const Dashboard = props => {
    useEffect(()=> {
        if(props.user)
            props.fetchSummary(props.user.id);        
    }, []);

    const {amenities, deals, reports} = props;
    let size = 'default';
    return (
        <>
            <Row>
                <h3 style={{textAlign:'center'}}>Your Latest Activities</h3>
            </Row>

            {/*
            <Row style={{marginTop:40}} type="flex">
                <span style={{margin:'5px'}}>Date Range:</span> <RangePicker size={size} />
            </Row>
            */}

            <Row style={{marginTop:60}} type="flex">
                {amenityWitget(amenities)}
                {reportWitget(reports)}
                {dealsWitget(deals)}
            </Row>
        </>
    )
}

Dashboard.propTypes = {  
}

const mapDispatchToProps = {    
    ...commonActions
};

function mapStateToProps(state) {
    return {
        user : JSON.parse(sessionStorage.getItem('user')),
        reports: state.summary.summary.reports,
        amenities: state.summary.summary.amenities,
        deals: state.summary.summary.deals
    }
}

//export default Dashboard;
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
