import React from 'react';
import PrivateHeader from '../../components/private/PrivateHeader';
import { Row, Layout, Icon, Modal, Drawer, Steps } from 'antd';
import '../style/DashboardPage.css';
import DashboardMenu from '../../components/private/DashboardMenu';
import {Aminity, Leads, Report, Dashboard} from '../../components/private';
import AmenityWizard from '../../components/private/wizard';
import Step1Item from '../../components/private/wizard/steps/step1';
import Step2Item from '../../components/private/wizard/steps/step2';
import Step3Item from '../../components/private/wizard/steps/step3';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {itemActions, leadsActions, reportActions, userActions, commonActions} from '../../store/action'
import {pageConstants} from '../../constants';
import './index.css'
import moment from 'moment';
import { history } from '../../helpers';

const { Header, Content, Sider, Footer } = Layout;

const UserSettings = props => {    
    return (
        <React.Fragment>
            <div><Button type="link" onClick={props.handleHome}>Home</Button></div>
            <div><Button type="link" onClick={props.handleLogout}>Logout</Button></div>
        </React.Fragment>
    )
}

class DashboardPage extends React.Component {

    constructor(props, context){
        super(props); 
        
        //this.step1ItemRef = React.createRef();
        
        this.state = {
            itemType: 'retrite',
            collapsed: false,
            createItemWizardStep: 0,
            // Modal windows
            createEditCustomerModalVisible: false,
            deleteItemModalVisible: false,
            deleteLeadModalVisible: false,
            viewLeadModalVisible: false,

            isRightMenuVisible: false,
            selectedCategory: '',
            selectedSubCategory: '',
            lead: {},
            createUpdaItem: {},

            createItemSteps: [
                {
                    title: 'Details',
                    content: React.createElement(
                                Form.create({ name: 'step1Item' })( Step1Item ), 
                                {
                                    handleItemChange: this.handleCreateItemChange,
                                    handleCategoryClick: this.handleCreateItemDropdownChange,
                                    handleSubCategoryClick: this.handleCreateItemDropdownChange,
                                }),
                },
                {
                    title: 'Address',
                    content: React.createElement(
                        Form.create({ name: 'step2Item' })( Step2Item ), 
                        {
                            handleItemChange: this.handleCreateItemChange,
                            handleCountryClick: this.handleCreateItemDropdownChange
                        }),
                },
                {
                    title: 'Teachers',
                    content: <Step3Item/>,
                },
                {
                    title: 'Payment',
                    content: <Step3Item/>,
                },
                {
                    title: 'Schedule',
                    content: <Step3Item/>,
                },
                {
                    title: 'Photo',
                    content: <Step3Item/>,
                }
            ],

            createEditItem: {},
            selectedContentName: 'dashboard',
            
            menuContentCmps: [
                //{name:'view-amentities', component: Aminity, params: {items: items, handleAminityDetails: this.handleAminityDetails, shouldUpdateChild:this.shouldUpdateChild, ref:this.child}},
                {name:pageConstants.AMENITY_CONTENT}, {name:pageConstants.LEADS_CONTENT}, {name:pageConstants.STATISTIC_CONTENT},{name:pageConstants.DASHBOARD_CONTENT}
            ]    
        }
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.handleAminityDetails = this.handleAminityDetails.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);        
        this.handleItemDeleteModalOk = this.handleItemDeleteModalOk.bind(this);        
        this.handleItemDeleteModalCancel = this.handleItemDeleteModalCancel.bind(this);        

        this.handleAminityDelete = this.handleAminityDelete.bind(this);        

        this.handleLeadDelete = this.handleLeadDelete.bind(this);        
        this.handleLeadEdit = this.handleLeadEdit.bind(this);        
        this.handleCreateItemNext = this.handleCreateItemNext.bind(this);        
        this.handleCreateItemDone = this.handleCreateItemDone.bind(this);        
    } 

    handleCreateItemChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleCreateItemDropdownChange = (e) => {
        this.setState({[e.item.props.name]:e.item.props.data[e.key]})
    }
    
    loadData() {
        const { user } = this.props;
        const { selectedContentName } = this.state;

        if(!user){
            console.warn('User is null...')
            return;
        }
        
        switch(selectedContentName){
            case pageConstants.AMENITY_CONTENT:
                // load all user amentities        
                this.props.fetchUserAmenities(user.id);   
                break;
            case pageConstants.LEADS_CONTENT:
                // load leads
                this.props.fetchLeads(user.id);
                break;
            case pageConstants.STATISTIC_CONTENT:
                 // load dashboard total report summary
                //this.props.fetchReportSummary(user.id);
                break;
            case pageConstants.DASHBOARD_CONTENT:
                this.props.fetchSummary(user.id)
                break;

        }   
    }
    
    componentDidMount() {
        const {user} = this.props;        

        if(!user){
            console.warn('User is null...')
            return;
        }

        // load summary data for the dashboard (amenities, leads, reports)
        this.props.fetchSummary(user.id)
    }    

    handleAminityDetails = (item) => {
        this.setState({
            createEditItemModalVisible: true,
            createEditItem: item,
            itemDescription: item.description,
            itemName: item.name,
            itemTitle: item.title,
            selectedCountry: item.country ? item.country : '',
            selectedCategory: item.category ? item.category : '',
            selectedSubCategory: item.subCategory ? item.subCategory : ''
        })

        this.props.addIntoStoreSelectedItem(item);
    }

    handleLeadEdit = (lead) => {
        this.setState({
            viewLeadModalVisible: true,
            lead: lead
        });
    }
    
    handleLeadDelete = (lead) => {
        this.setState({
            deleteLeadModalVisible: true,
            lead: lead
        });
    }

    handleLeadDeleteOk = () => {
        this.setState({deleteLeadModalVisible: false});
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    
    handleClickMenu = (e) => {
        let foundCmd = this.state.menuContentCmps.find(
            c => (e.key.length > 1 && c.name.trim() === e.key.trim())
        );
            
        if(foundCmd) {  
            //let cmp = React.createElement(foundCmd.component, foundCmd.params);
            this.setState({selectedContentName: foundCmd.name}, () => this.loadData());
            //this.setState({content: foundCmd.component});            
        } else {
            console.log('Error - component does not registered');
        }
    }

    handleItemChange = (event) => {
        let {createEditItem} = this.state;
        createEditItem[[event.target.name]] = event.target.value;
        this.setState({createEditItem:createEditItem})
    }

    renderSwitchPage(){
        const { selectedContentName } = this.state;
        const {items, leads, summaryItem, summaryLeads, summaryReports} = this.props; 

        switch(selectedContentName){
            case pageConstants.AMENITY_CONTENT:
                return ([
                    <Aminity items={items} 
                             numItemsPerRow={6}
                             handleAminityDetails={this.handleAminityDetails} 
                             handleAminityDelete={this.handleAminityDelete} 
                             ref={this.child}/>
                ]);
            case pageConstants.LEADS_CONTENT:
                return ([
                    <Leads items={leads} 
                           handleLeadDelete={this.handleLeadDelete} 
                           handleLeadEdit={this.handleLeadEdit}/>
                ]);
            case pageConstants.STATISTIC_CONTENT:
                return ([
                    <Report/>
                ]);
            case pageConstants.DASHBOARD_CONTENT:
                return ([
                    <Dashboard key="dashboard"
                               amentities={summaryItem}
                               leads={summaryLeads}
                               reports={summaryReports}/>
                ]);
            default:
                return ([
                    <Dashboard/>
                ]);
        }
    }

    handleAminityDelete(item) {
        this.setState({
            createEditItem:item,
            deleteItemModalVisible: true,
        });
    }

    handleItemDeleteModalCancel() {  
        this.setState({
            deleteItemModalVisible: false,
        });
    }

    handleItemDeleteModalOk() {
        this.setState({
            deleteItemModalVisible: false,
        });

        const { createEditItem } = this.state;

        if(createEditItem){
            this.props.deleteItem(createEditItem.id)
                .then(() => this.props.fetchUserAmenities(this.props.user.id))
        } else {
            console.log('Selected item id is null');
        }
    }

    handleLeadViewModalOk = () => {
        this.setState({
            viewLeadModalVisible: false,
        });
    }

    handleLeadViewModalCancel = () => {
        this.setState({
            viewLeadModalVisible: false,
        });        
    }

    handleLeadDeleteModalOk = () => {
        this.setState({
            deleteLeadModalVisible: false,
        });      
        
        const { lead } = this.state;

        if(lead){
            this.props.deleteLead(lead.id)                
        } else {
            console.log('Selected lead is null');
        }        
    }

    handleLeadDeleteModalCancel = () => {
        this.setState({
            deleteLeadModalVisible: false,
        });        
    }

    handleRightMenuOpenClose = () => {
        this.setState(prevState => ({isRightMenuVisible: !prevState.isRightMenuVisible}))
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.setState({ logedOut: true });
        this.props.logout();
    }

    handleHome = (e) => {
        history.push('/home');
    }

    handleCreateItemNext = () => {
        this.setState((prevState, props) => ({
            createItemWizardStep: prevState.createItemWizardStep + 1
        }));        
    }

    handleCreateItemPrevious = () => {
        this.setState((prevState, props) => ({
            createItemWizardStep: prevState.createItemWizardStep - 1
        }));        
    }

    handleCreateItemCancel = () => {
        this.setState({createEditItemModalVisible: false, createItemWizardStep: 0})
    }

    handleCreateItemDone = () => {
        const{itemName, itemDescription, itemPrice, selectedCategory, 
              selectedSubCategory, itemTitle, createEditItem, selectedCountry,
              itemAddress} = this.state;
        this.setState({createEditItemModalVisible: false, createItemWizardStep: 0})

        if( !itemName || !itemDescription || !itemTitle ||
                !selectedCategory || !selectedSubCategory || !itemAddress){
            console.warn('Create a new Item error...');
            this.setState({createItemError: 'Validation error'})
            return;
        }

        const item = {id:createEditItem ? createEditItem.id : 0, 
                      name:itemName, description: itemDescription, 
                      price: 10, title: itemTitle, subCategoryId: selectedSubCategory.id, 
                      categoryId: selectedCategory.id, countryId: selectedCountry.id,
                      country: selectedCountry, 
                      subCategory: selectedSubCategory, category: selectedCategory,
                      userId: this.props.user.id, address: itemAddress, 
                      currency: 'USD', duration: 2, 
                      metaData: '{}', startDate: '2019-08-03', locationName: 'Toronto', 
                      allActivities: "{'startFromDate':'2019-12-03'}", 
                      picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'};

        if(createEditItem.id && createEditItem.id > 0){
            this.props.updateItem(item);
        } else {
            this.props.createItem(item);
        }
    }

    render() {
        const { createEditItem, lead, createItemWizardStep, createItemSteps: createItemTotalSteps } = this.state;
        //const { TextArea } = Input;        

        return (
            <Layout style={{height:'100%'}}>
                <Sider style={{marginRight: 5}}>
                    <DashboardMenu handleClickMenu = {this.handleClickMenu}/>
                </Sider>

                <Layout>
                    <Header style={{backgroundColor:'#c5c4c4', marginBottom:10}}>
                        <PrivateHeader handleMenu={this.handleRightMenuOpenClose} user={this.props.user}/>
                    </Header>

                    <Content className="ant-layout-content-override" style={{overflowY:'scroll'}}>
                        {this.renderSwitchPage()}
                    </Content>

                    <Footer style={{backgroundColor:'#c5c4c4', marginTop:10}}>
                        Retriete Copyrights 2020.
                    </Footer>
                </Layout>

                {/* Create  Amenity Wizard */}
                {createItemTotalSteps &&
                    <Modal title={(createEditItem && createEditItem.name) ? "Modify Retreat" : "Create Retreat"}
                        visible={this.state.createEditItemModalVisible}
                        width={950}
                        onCancel={this.handleCreateItemCancel}
                        footer={[
                                <Button key="cancel" onClick={this.handleCreateItemCancel}>Cancel</Button>,
                                <Button style={createItemWizardStep == 0 ? {display:'none'} : {}} key="back" onClick={this.handleCreateItemPrevious}>Previous</Button>,
                                <Button style={createItemWizardStep == (createItemTotalSteps.length - 1) ? {display:'none'} : {}} key="next" type="primary" onClick={this.handleCreateItemNext}>Next</Button>,
                                <Button style={createItemWizardStep == (createItemTotalSteps.length - 1) ? {} : {display:'none'}} key="done" type="primary" onClick={this.handleCreateItemDone}>Done</Button>
                            ]}> 
                            <AmenityWizard step={createItemWizardStep} 
                                           steps={createItemTotalSteps}/>
                    </Modal>
                }

                {/* Dashboard Delete Aminity Modal Window */}
                <Modal
                        title="Delete Retreat"
                        visible={this.state.deleteItemModalVisible}
                        onOk={this.handleItemDeleteModalOk}
                        onCancel={this.handleItemDeleteModalCancel}>                    
                    <p>Would you like to delete {createEditItem.name}</p>
                </Modal>   

                {/* Dashboard Delete Lead Modal Window */}
                <Modal
                        title="Delete Lead"
                        visible={this.state.deleteLeadModalVisible}
                        onOk={this.handleLeadDeleteModalOk}
                        onCancel={this.handleLeadDeleteModalCancel}>                    
                    <p>Would you like to delete item with name: <b>{lead.name}</b></p>
                </Modal>   

                {/* Dashboard View Details Lead Modal Window */}
                <Modal
                        title="View Lead Details"
                        visible={this.state.viewLeadModalVisible}
                        footer={[
                            <Row>
                                <Button key="cancel-button" onClick={this.handleLeadViewModalCancel} htmlType="button">
                                    OK
                                </Button>
                            </Row>
                        ]}
>                    
                    <p>Lead Name: <b>{lead.name}</b></p>
                    <p>Lead Email: <b>{lead.emailAddress}</b></p>
                    <p>Message Status: <b>{lead.status}</b></p>
                    <p>Posted Date: <b>{moment(lead.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</b></p>
                    <p>Message Details: <b>{lead.details}</b></p>
                </Modal> 

                <Drawer title="User Settings"
                        placement="right"
                        closable={true}
                        className="user-setting"
                        onClose={this.handleRightMenuOpenClose}
                        visible={this.state.isRightMenuVisible}>
                    <UserSettings handleHome={this.handleHome}
                                  handleLogout={this.handleLogout}/>
                </Drawer>  
            </Layout>
        )
    }
}

const mapDispatchToProps = {    
    ...itemActions,
    ...leadsActions,
    ...reportActions,
    ...userActions,
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
        user : JSON.parse(sessionStorage.getItem('user')),
        items: [...state.items.items],
        leads: [...state.leads.leads ? state.leads.leads : []],
        summaryReports: state.summary.reportSummary,
        summaryLeads: state.summary.leadSummary,
        summaryItem: state.summary.itemSummary,
        categories: [...state.common.categories],
        subCategories: [...state.common.subCategories]
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
