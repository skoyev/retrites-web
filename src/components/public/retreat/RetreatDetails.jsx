import React from 'react';
import { Tabs, Row, Col } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

const RetreatDetails = ({item}) => (
 <Row>
     <Tabs onChange={callback} type="card">
        <TabPane tab="Details" key="1">
            <div>Name: {item ? item.name : ''}</div>
            <div>Description: {item ? item.description : ''}</div>
        </TabPane>

        <TabPane tab="Location" key="2">
            <div>Country: {item ? item.country.name : ''}</div>
            <div>Address: {item ? item.address : ''}</div>
            <div>City: {item ? item.city : ''}</div>
        </TabPane>

        <TabPane tab="Facilitators" key="3">
            {
                item.facilitators.map(f => 
                    <React.Fragment>
                        <Row>
                            <Col span={4}>Name:</Col>
                            <Col span={12}>{f.name}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>Description:</Col>
                            <Col span={12}>{f.description}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>Photo:</Col>
                            <Col span={16}><img src={f.picture}/></Col>
                        </Row>
                    </React.Fragment>
                )
            }
        </TabPane>

        <TabPane tab="Schedule" key="4">
            {
                item.events.map(e => 
                    <React.Fragment key={`event-${e.id}`}>
                        <Row className="line-height">
                            <Col span={4}>Start Date:</Col>
                            <Col span={4}>{moment(e.from).format('YYYY-MM-DD')}</Col>
                            <Col span={4}>End Date:</Col>
                            <Col span={4}>{moment(e.to).format('YYYY-MM-DD')}</Col>
                            <Col span={4}>Duration</Col>
                            <Col span={4}>{`${e.duration} days`}</Col>
                        </Row>
                        <Row className="line-height"> 
                            <Col span={4}>Price:</Col>
                            <Col span={4}>{e.price}$</Col>
                            <Col span={4}>Currency</Col>
                            <Col span={4}>{e.currency}</Col>
                        </Row>
                        <Row className="line-height">
                            <Col span={4}>Description:</Col>
                            <Col span={10}>{e.description}</Col>
                        </Row>
                    </React.Fragment>
                )
            }
        </TabPane>

        <TabPane tab="Accomodation" key="5">
            Accomodation
        </TabPane>
    </Tabs>
</Row>
);

export default RetreatDetails;