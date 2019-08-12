import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Card, Icon } from 'antd';

const Dashboard = ({}) => {

    return (
        <div>
            <Row style={{marginTop:100}} type="flex">
                <Col span={7}>
                    <Card title="Amentities" 
                          style={{textAlign:'center'}}
                          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon onClick={()=>console.log('')} type="delete" />]}>
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Amentities Total
                            </Col>
                            <Col span={8}>              
                                10
                            </Col>
                          </Row>                        
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Last Requested Amentity
                            </Col>
                            <Col span={8}>              
                                Test Name
                            </Col>
                          </Row>                        
                    </Card>                            
                </Col>

                <Col span={7} offset={1}>
                    <Card title="Leads" 
                          style={{textAlign:'center'}}
                          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon onClick={()=>console.log('')} type="delete" />]}>
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Total Leads
                            </Col>
                            <Col span={8}>              
                                4
                            </Col>
                          </Row>                        
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Last Requested Leads
                            </Col>
                            <Col span={8}>              
                                10/10/2018
                            </Col>
                          </Row>                        
                    </Card>                            
                </Col>

                <Col span={7} offset={1}>
                    <Card title="Reports" 
                          style={{textAlign:'center'}}
                          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon onClick={()=>console.log('')} type="delete" />]}>
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Reports By Date
                            </Col>
                            <Col span={8}>              
                                4
                            </Col>
                          </Row>                        
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Number of visitis
                            </Col>
                            <Col span={8}>              
                                39
                            </Col>
                          </Row>                        
                          <Row>
                            <Col span={15} style={{textAlign:'left'}}>              
                                Last visiti
                            </Col>
                            <Col span={8}>              
                                3/4/2018
                            </Col>
                          </Row>                        
                    </Card>                            
                </Col>
            </Row>
        </div>
    )
}

Dashboard.propTypes = {    
}

export default Dashboard;