import React from 'react';
import PrivateHeader from '../../components/private/PrivateHeader';
import AppFooter from '../../components/common/AppFooter';
import { Row, Layout, Menu, Icon, Modal } from 'antd';
import '../style/DashboardPage.css';
import DashboardMenu from '../../components/private/DashboardMenu';
import {Aminity, Leads, Report} from '../../components/private';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {itemActions} from '../../store/action'
import TextArea from 'antd/lib/input/TextArea';
import {pageConstants} from '../../constants';

const { Header, Content, Sider, Footer } = Layout;

class DashboardPage extends React.Component {

    constructor(props, context){
        super(props);    
        
        this.state = {
            collapsed: false,
            createEditItem: {},
            selectedContentName: 'dashboard',
            createEditCustomerModalVisible: false,
            menuContentCmps: [
                //{name:'view-amentities', component: Aminity, params: {items: items, handleAminityDetails: this.handleAminityDetails, shouldUpdateChild:this.shouldUpdateChild, ref:this.child}},
                {name:pageConstants.AMENITY_CONTENT}, {name:pageConstants.LEADS_CONTENT}, {name:pageConstants.STATISTIC_CONTENT}
            ],
            leadsItems:[
                {
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park',
                },
                {
                    key: '4',
                    name: 'Disabled User',
                    age: 99,
                    address: 'Sidney No. 1 Lake Park',
                }              
            ]     
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleAminityDetails = this.handleAminityDetails.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);        
    }   
    
    componentDidMount() {
        //this.props.fetch()
        // load amentities
        // load leads
        this.props.fetch().then( data => {
            this.aminityItems = [...this.props.items]
        });
    }    

    handleAminityDetails = (item) => {
        this.setState({
            createEditItemModalVisible: true,
            createEditItem: item
        })
    }

    
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    handleItemCreateUpdateModalCancel = e => {
        // clear modal window data
        this.setState({
            createEditItemModalVisible: false,
            createEditItem: {}
        });
    };   
    
    handleItemCreateUpdateModalOk = e => {
        // clear modal window data
        this.setState({
            createEditItemModalVisible: false,
            createEditItem: {}
        });

        const { createEditItem } = this.state;
        const { add, fetch } = this.props;
        
        if (createEditItem.name) {
            add(createEditItem).then(() => fetch());
        }        
    };       

    handleClickMenu = (e) => {
        let foundCmd = this.state.menuContentCmps.find(
            c => (e.key.length > 1 && c.name.trim() === e.key.trim())
        );
            
        if(foundCmd) {  
            //let cmp = React.createElement(foundCmd.component, foundCmd.params);
            this.setState({selectedContentName: foundCmd.name});
            //this.setState({content: foundCmd.component});            
        } else {
            console.log('Error - component does not registered');
        }
    }

    handleItemChange = (event) => {
        //this.setState({ [event.target.name]: event.target.value });
        let {createEditItem} = this.state;
        createEditItem[[event.target.name]] = event.target.value;
        this.setState({createEditItem:createEditItem})
    }

    renderSwitchPage(){
        const { selectedContentName, leadsItems } = this.state;
        const {items} = this.props; 

        switch(selectedContentName){
            case pageConstants.AMENITY_CONTENT:
                return ([
                    <Aminity items={items} handleAminityDetails={this.handleAminityDetails} ref={this.child}></Aminity>
                ]);
            case pageConstants.LEADS_CONTENT:
                return ([
                    <Leads items={leadsItems}></Leads>
                ]);
            case pageConstants.STATISTIC_CONTENT:
                return ([
                    <Report></Report>
                ]);
            default:
                return ([
                    <div>Dashboard</div>
                ]);
        }
    }

    render() {
        const { createEditItem } = this.state;

        return (
            <Layout style={{height:'100%'}}>
                <Sider style={{marginRight: 5}}>
                    <DashboardMenu handleClickMenu = {this.handleClickMenu}/>
                </Sider>

                <Layout>
                    <Header style={{backgroundColor:'#c5c4c4', marginBottom:10}}>
                        <PrivateHeader></PrivateHeader>
                    </Header>

                    <Content className="ant-layout-content-override" style={{overflowY:'scroll'}}>
                        {this.renderSwitchPage()}
                    </Content>

                    <Footer style={{backgroundColor:'#c5c4c4', marginTop:10}}>
                        Retriete Copyrights 2019.
                    </Footer>
                </Layout>

                {/* Dashboard Modal Windows */}
                <Modal
                        title={(createEditItem && createEditItem.name) ? "Modify Retreat" : "Create Retreat"}
                        visible={this.state.createEditItemModalVisible}
                        //onOk={this.handleItemCreateUpdateModalOk}
                        //onCancel={this.handleItemCreateUpdateModalCancel}
                        footer={[
                            <Row>
                                <Button key="cancel-button" onClick={this.handleItemCreateUpdateModalCancel} htmlType="button">
                                    Cancel
                                </Button>
                                <Button key="save-button" onClick={this.handleItemCreateUpdateModalOk} htmlType="submit">
                                    Save
                                </Button>
                            </Row>
                        ]}>
                    <p>{createEditItem ? createEditItem.name : ''}</p>

                    <Form id="itemForm" onSubmit={this.handleSubmitItem} className="item-form">
                        <Form.Item label="Retreat Name">
                            <Input type="text" name="name" required value={createEditItem.name} placeholder="Name" onChange={this.handleItemChange}/>                                        
                        </Form.Item>

                        <Form.Item label="Your Email">
                            <Input required name="email" value={createEditItem.email} placeholder="Email" onChange={this.handleItemChange}/>
                        </Form.Item>

                        <Form.Item label="Retreat Description">
                            <TextArea required name="description" value={createEditItem.description} placeholder="Enter booking description" onChange={this.handleItemChange} autosize={{ minRows: 6, maxRows: 10 }} />
                        </Form.Item>

                    </Form>

                </Modal>                

            </Layout>
        )
    }
}

const mapDispatchToProps = {    
    ...itemActions
}; 

function mapStateToProps(state) {
    return {
        items: [...state.items.items]
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
