import React from 'react';
import PrivateHeader from '../../components/private/PrivateHeader';
import AppFooter from '../../components/common/AppFooter';
import { Row, Layout, Menu, Icon, Breadcrumb } from 'antd';
import '../style/DashboardPage.css';
import DashboardMenu from '../../components/private/DashboardMenu';
import {Aminity, Leads, Report} from '../../components/private';

const { Header, Content, Sider, Footer } = Layout;

export default class DashboardPage extends React.Component {

    constructor(props, context){
        super(props);
        this.state = {
            collapsed: false,
            content: "",
            menuContentCmps: [
                {name:'view-amentities', component: Aminity},
                {name:'view-leads', component: Leads},
                {name:'report-statistic', component: Report}
            ]    
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
    }    
    
    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleClickMenu = (e) => {
        let foundCmd = this.state.menuContentCmps.find(
            c => (e.key.length > 1 && c.name.trim() === e.key.trim())
        );
            
        if(foundCmd) {  
            let cmp = React.createElement(foundCmd.component);
            this.setState({content: cmp});
        } else {
            console.log('Error - component does not registered');
        }
    }

    render() {
        const { content } = this.state;
        return (
            <Layout style={{height:'100%'}}>
                <Sider style={{marginRight: 5}}>
                    <DashboardMenu handleClickMenu = {this.handleClickMenu}/>
                </Sider>

                <Layout>
                    <Header style={{backgroundColor:'#c5c4c4', marginBottom:10}}>
                        <PrivateHeader></PrivateHeader>
                    </Header>

                    <Content className="ant-layout-content-override">
                        <React.Fragment>
                            {content}
                        </React.Fragment>                        
                    </Content>

                    <Footer style={{backgroundColor:'#c5c4c4', marginTop:10}}>
                        Retriete Copyrights 2019.
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}