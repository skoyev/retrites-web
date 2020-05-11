import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, Icon } from 'antd';
import { DatePicker } from 'antd';
import { Translate } from "react-localize-redux";

const { RangePicker } = DatePicker;

const Dashboard = ({amentities, leads, reports}) => {
    let size = 'default';
    return (
        <div>
            <Row>
                <h3 style={{textAlign:'center'}}>Your Latest Activities</h3>
            </Row>
            <Row style={{marginTop:40}} type="flex">
                <span style={{margin:'5px'}}>Date Range:</span> <RangePicker size={size} />
            </Row>

            <Row style={{marginTop:60}} type="flex">
                <Col span={7}>
                    <Card title="Amenities" 
                          actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                          style={{textAlign:'center'}}>
                          {/*actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon onClick={()=>console.log('')} type="delete" />]}>*/}
                           {amentities && amentities.map((amentity, index) => (
                                <Row key={index}>
                                    <Col span={15} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.${amentity.name}`)}</span>}</Translate>
                                    </Col>
                                    <Col span={8}>              
                                        {amentity.value}
                                    </Col>
                                </Row>                        
                            ))}
                    </Card>                            
                </Col>

                <Col span={7} offset={1}>
                    <Card title="Leads" 
                          actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                          style={{textAlign:'center'}}>
                            {leads && leads.map((lead, index) => (
                                <Row key={index}>
                                    <Col span={15} style={{textAlign:'left'}}>              
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.${lead.name}`)}</span>}</Translate>
                                    </Col>
                                    <Col span={8}>              
                                        {lead.value}
                                    </Col>
                                </Row>                        
                            ))}
                    </Card>                            
                </Col>

                <Col span={7} offset={1}>
                    <Card title="Reports"
                          actions={[<Icon type="setting" />, <Icon type="edit" />]} 
                          style={{textAlign:'center'}}>
                            {reports && reports.map((report, index) => (
                                <Row key={index}>
                                    <Col span={15} style={{textAlign:'left'}}>    
                                        <Translate>{({ translate }) =><span style={{fontWeight:'bold'}}>{translate(`dashboard.${report.name}`)}</span>}</Translate>          
                                    </Col>
                                    <Col span={8}>              
                                        {report.value}
                                    </Col>
                                </Row>                        
                          ))}
                    </Card>                            
                </Col>
            </Row>
        </div>
    )
}

Dashboard.propTypes = {  
    amentities: PropTypes.array.isRequired,  
    leads: PropTypes.array.isRequired,  
    reports: PropTypes.array.isRequired,  
}

export default Dashboard;