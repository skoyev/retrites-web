import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Table, Button } from 'antd';
import { commonActions, itemActions, reportActions } from '../../../store/action';
import './index.css'
import { connect } from 'react-redux';
import { Translate } from "react-localize-redux";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell,
  } from 'recharts';

  /*
const data = [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];*/

const Report = props => {                      
    useEffect(()=> {
      props.fetchTotalPageVisists();
      props.fetchTotalPageRequests();
    }, []);

    let {totalPageVisists, totalPageRequests} = props

    return (
        <>
            <Row>
                <Col span={12}>              
                    <h3 style={{textAlign:'center'}}>Montly Total Page Visits</h3>
                    <LineChart
                        width={500}
                        height={300}
                        data={totalPageVisists}
                        style={{margin:'auto'}}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            { /* <Line type="monotone" dataKey="date" stroke="#8884d8" activeDot={{ r: 8 }} /> */ }
                            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                    </LineChart> 
                </Col>  
                
                <Col span={12}>              
                    <h3 style={{textAlign:'center'}}>Monthly Total Page Requests</h3>
                    <BarChart
                        width={500}
                        height={300}
                        data={totalPageRequests}
                        margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                        }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                            {/*
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />*/}
                    </BarChart>
                </Col>         
            </Row>
        </>
        )
}

const mapDispatchToProps = { 
    ...reportActions
}; 

function mapStateToProps(state) {
    return {
        totalPageVisists: state.report.totalPageVisists,
        totalPageRequests: state.report.totalPageRequests,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
