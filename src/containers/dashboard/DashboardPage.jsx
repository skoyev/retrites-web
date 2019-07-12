import React from 'react';
import PrivateHeader from '../../components/private/PrivateHeader';
import AppFooter from '../../components/common/AppFooter';
import { Row, Layout, Menu, Icon, Breadcrumb } from 'antd';
import '../style/DashboardPage.css';
import DashboardMenu from '../../components/private/DashboardMenu';

const { Header, Content, Sider, Footer } = Layout;

export class DashboardPage extends React.Component {
    state = {
        collapsed: false,
    };
    
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        //const { user, users } = this.props;
        return (
            <Layout style={{height:'100%'}}>
                <Sider style={{marginRight: 5}}>
                    <DashboardMenu></DashboardMenu>
                </Sider>

                <Layout>
                    <Header style={{backgroundColor:'#c5c4c4', marginBottom:10}}>
                        <PrivateHeader></PrivateHeader>
                    </Header>

                    <Content>
                        Content
                    </Content>

                    <Footer style={{backgroundColor:'#c5c4c4', marginTop:10}}>
                        Retriete Copyrights 2019.
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}