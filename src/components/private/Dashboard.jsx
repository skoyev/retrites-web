import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, DatePicker, Icon } from 'antd';
import { Translate } from "react-localize-redux";
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../store/action';
import { commonConstants } from '../../constants';

const reportWitget = (reports) => (
    <>
        {
            reports &&  
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
        }
    </>
)

const dealsWitget = (deals) => (
    <>
        { deals && deals.length > 0 &&
                <Card title="Deals" 
                    actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                    style={{textAlign:'center'}}>
                        {deals && deals.map((deal, index) => (
                            <Fragment key={index}>
                                <Row key={index}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.name`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12} style={{textAlign:'left', marginLeft: '-14px'}}>              
                                        <Link to={`${commonConstants.ITEM_PAGE_LINK}/${deal.id}`} className="btn btn-link d-inline">{deal.name}</Link>
                                    </Col>
                                </Row>  

                                <Row key={'deal - ' + index}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.date`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        {deal.date}
                                    </Col>
                                </Row> 

                                <Row key={'deal1 - ' + index} style={{borderBottom: '1px solid #dacfcf'}}>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.price`)}</span>}</Translate>
                                    </Col>
                                    <Col span={12} style={{textAlign:'left'}}>              
                                        {deal.price}
                                    </Col>
                                </Row> 
                            </Fragment>                       
                        ))}
                </Card>                            
        }
    </>    
)

const amenityWitget = (amenities) => (
    <>
        { amenities && amenities.lastCreated &&
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
        }
    </>
)

const Dashboard = props => {
    useEffect(()=> {
        if(props.user)
            props.fetchSummary(props.user.id);        
    }, []);

    const {amenities, deals, reports} = props;

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
                <Col span={8} offset={3}>
                    {amenityWitget(amenities)}
                </Col>

                <Col span={8} offset={3}>
                    {reportWitget(reports)}
                </Col>

                <Col span={8} offset={8}>
                    {dealsWitget(deals)}
                </Col>                
                
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
