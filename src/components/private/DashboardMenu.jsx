import React from 'react';
import PropTypes from 'prop-types'
import { Row, Layout, Menu, Icon, Breadcrumb } from 'antd';

const { SubMenu } = Menu;

const DashboardMenu = ({handleClickMenu}) => {

    return (
        <div>
            <Row>
                <div style={{marginTop:10}}>
                    <h4>Retrites</h4>
                </div>                        
            </Row>

            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', backgroundColor: 'inherit' }}>

                <SubMenu
                    key="Amentities"
                    title={
                        <span>
                            <Icon type="user" />
                            Amentities
                        </span>
                    }>
                    <Menu.Item key="1">View Amentities</Menu.Item>
                </SubMenu>

                <SubMenu
                    key="leads"
                    title={
                    <span>
                        <Icon type="laptop" />
                        Amentity Leads
                    </span>
                    }
                >
                    <Menu.Item key="5">View Leads</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="report"
                    title={
                    <span>
                        <Icon type="notification" />
                        Reports
                    </span>
                    }>
                    <Menu.Item key="9">Statistics/Activity</Menu.Item>
                </SubMenu>
                </Menu>
        </div>
    )
}

DashboardMenu.propTypes = {
    handleClickMenu: PropTypes.func.isRequired
}

export default DashboardMenu;
