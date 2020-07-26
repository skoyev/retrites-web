import React from 'react';
import PropTypes from 'prop-types'
import { Row, Layout, Menu, Breadcrumb, Icon } from 'antd';
import {pageConstants, commonConstants} from '../../constants';
import {isExpiredUser} from '../common/CommonUtil';

const { SubMenu } = Menu;

const buildMenu = (links, handleClickMenu) => 
 <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%', backgroundColor: 'inherit' }}> 
    {
        links.map(l => 
            <Menu.Item key={l.name}
                       onClick={() => handleClickMenu(l.index)}>
                <Icon type={l.type} />{l.name}
            </Menu.Item>  
        )
    }
</Menu>


const getUserMenuByRole = (user, handleClickMenu) => {
    let result = '';
    let isBillingExpired = isExpiredUser(user);

    if(isBillingExpired){
        return buildMenu(commonConstants.EXPIRED_USER_ROLE_MENU, handleClickMenu);
    }

    let role = commonConstants.USER_ROLES.find(r => r.id == user.roleId);
    switch (role.role) {
        case commonConstants.PUBLIC_USER_ROLE: 
          result = buildMenu(commonConstants.PUBLIC_USER_ROLE_MENU, handleClickMenu);
          break;
        case commonConstants.OWNER_USER_ROLE: 
          result = buildMenu(commonConstants.OWNER_USER_ROLE_MENU, handleClickMenu);
          break;
        default:
          result = buildMenu(commonConstants.ADMIN_USER_ROLE_MENU, handleClickMenu);
          break;
    }  
    
    return result;
}

const DashboardMenu = ({handleClickMenu, user}) => {
    return (
        <React.Fragment>
            <Row>
                <div style={{marginTop:10}}>
                    <h4>Retrites</h4>
                </div>                        
            </Row>
            {
                user && getUserMenuByRole(user, handleClickMenu)
            }              
        </React.Fragment>
    )
}

DashboardMenu.propTypes = {
    handleClickMenu: PropTypes.func.isRequired
}

export default DashboardMenu;
