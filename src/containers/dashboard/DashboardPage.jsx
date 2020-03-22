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
import Step4Item from '../../components/private/wizard/steps/step4';
import Step5Item from '../../components/private/wizard/steps/step5';
import Step6Item from '../../components/private/wizard/steps/step6';
import Step7Item from '../../components/private/wizard/steps/step7';
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
            isValidNext: false,

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
                                    onRef:ref => (this.step1Item = ref)
                                })
                },
                {
                    title: 'Address',
                    content: React.createElement(
                        Form.create({ name: 'step2Item' })( Step2Item ), 
                        {
                            onRef:ref => (this.step2Item = ref)
                        }),
                },
                {
                    title: 'Documents',
                    content: React.createElement(
                        Form.create({ name: 'step3Item' })( Step3Item ), 
                        {
                            onRef:ref => (this.step3Item = ref)
                        })
                },
                {
                    title: 'Facilitators',
                    content: React.createElement(
                        Form.create({ name: 'step4Item' })( Step4Item ), 
                        {
                            onRef:ref => (this.step4Item = ref)
                        })
                },
                {
                    title: 'Payment',
                    content: React.createElement(
                        Form.create({ name: 'step5Item' })( Step5Item ), 
                        {
                            onRef:ref => (this.step5Item = ref)
                        })
                },
                {
                    title: 'Schedule',
                    content: React.createElement(
                        Form.create({ name: 'step6Item' })( Step6Item ), 
                        {
                            onRef:ref => (this.step6Item = ref)
                        })
                },
                {
                    title: 'Photo',
                    content: React.createElement(
                        Form.create({ name: 'step7Item' })( Step7Item ), 
                        {
                            onRef:ref => (this.step7Item = ref)
                        })
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
        this.handleCreateItemCancel = this.handleCreateItemCancel.bind(this);        
    } 

    handleCreateItemChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
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

    componentDidUpdate(prevProps) {
        // step validator
        if (this.props.isNextStepValid !== prevProps.isNextStepValid){ 
            this.setState({isValidNext : this.props.isNextStepValid})
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
        createEditItem[event.target.name] = event.target.value;
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
        
        // save into store temp data
    }

    handleCreateItemPrevious = () => {
        this.setState((prevState, props) => ({
            createItemWizardStep: prevState.createItemWizardStep - 1
        }));        
    }

    handleCreateItemCancel = () => {
        this.setState({createEditItemModalVisible: false, 
                       createItemWizardStep: 0, 
                       isValidNext: false})
        // clear all steps in store
        this.props.addIntoStoreSelectedItem({});

        // clear steps
        if(this.step1Item){
            this.step1Item.cancel();
        }

        if(this.step2Item){
            this.step2Item.cancel();
        }

        if(this.step3Item){
            this.step3Item.cancel();
        }

        if(this.step4Item){
            this.step4Item.cancel();
        }

        if(this.step5Item){
            this.step5Item.cancel();
        }

        if(this.step6Item){
            this.step6Item.cancel();
        }

        if(this.step7Item){
            this.step7Item.cancel();
        }

    }

    handleCreateItemDone = () => {
        const {user, selectedItem} = this.props;

        this.setState({createEditItemModalVisible: false, createItemWizardStep: 0})

        if( !selectedItem.name || !selectedItem.description || !selectedItem.title){
            console.warn('Create a new Item error...');
            this.setState({createItemError: 'Validation error'})
            return;
        }

        /*
        const item = {id:selectedItem.id ? selectedItem.id : 0, 
                      name:selectedItem.name, description: selectedItem.description, 
                      price: selectedItem.price, title: selectedItem.title, subCategoryId: selectedItem.subCategory.id, 
                      categoryId: selectedItem.category.id, 
                      countryId: selectedItem.country.id, country: selectedItem.country,     // country
                      docName: selectedItem.docName, docPicture: selectedItem.docPicture, docDetails: selectedItem.docDetails,   // documents 
                      //facilitators:[{name: '', typeId: 1, picture: '', description: ''}],    // fascilitators
                      facilitators: selectedItem.fascilitators,    // fascilitators
                      subCategory: selectedItem.subCategory, category: selectedItem.category,
                      userId: this.props.user.id, address: selectedItem.address, 
                      currency: selectedItem.currency, duration: selectedItem.duration, 
                      metaData: '{}', startDate: selectedItem.startDate, city: selectedItem.city, 
                      allActivities: "{'startFromDate':'2019-12-03'}", 
                      picture: selectedItem.picture};
                      //picture: 'https://s3.us-west-2.amazonaws.com/prod.retreat.guru/images/142873/medium/24993175_690266684496339_7094769312054478290_n.jpg'};
        */

        const itemFormData = new FormData();
        itemFormData.append('id', selectedItem.id ? selectedItem.id : 0);
        itemFormData.append('name', selectedItem.name);
        itemFormData.append('description', selectedItem.description);
        itemFormData.append('price', selectedItem.price);
        itemFormData.append('title', selectedItem.title);
        itemFormData.append('subCategoryId', selectedItem.subCategory.id);
        itemFormData.append('categoryId', selectedItem.category.id);
        itemFormData.append('countryId', selectedItem.country.id);
        itemFormData.append('document', JSON.stringify(selectedItem.document));
        itemFormData.append('docPicture', selectedItem.document.picture);
        if(selectedItem.facilitators && selectedItem.facilitators.length > 0){
            itemFormData.append('fascilitatorPicture', selectedItem.facilitators[0].picture);
        }
        itemFormData.append('facilitators', JSON.stringify(selectedItem.facilitators));
        itemFormData.append('userId', this.props.user.id);
        itemFormData.append('currency', selectedItem.currency);
        itemFormData.append('duration', selectedItem.duration);
        itemFormData.append('startDate', selectedItem.startDate);
        itemFormData.append('city', selectedItem.city);
        itemFormData.append('picture', selectedItem.picture);
        itemFormData.append('address', selectedItem.address);
        itemFormData.append('metaData', '{}');

        if(selectedItem.id && selectedItem.id > 0){
            this.props.updateItem(itemFormData);
        } else {
            this.props.createItem(itemFormData, user.id);
        }

        // clear all steps in store
        this.props.addIntoStoreSelectedItem({});

        this.setState({isValidNext: false})
    }

    render() {
        const { createEditItem, lead, createItemWizardStep, createItemSteps: createItemTotalSteps, isValidNext } = this.state;
        //const { TextArea } = Input;        
        const {selectedItem} = this.props;

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
                    <Modal title={(selectedItem && selectedItem.id) ? "Modify Retreat" : "Create Retreat"}
                        visible={this.state.createEditItemModalVisible}
                        width={950}
                        onCancel={this.handleCreateItemCancel}
                        footer={[
                                <Button key="cancel" onClick={this.handleCreateItemCancel}>Cancel</Button>,
                                <Button style={createItemWizardStep == 0 ? {display:'none'} : {}} key="back" onClick={this.handleCreateItemPrevious}>Previous</Button>,
                                <Button disabled={!isValidNext} style={createItemWizardStep == (createItemTotalSteps.length - 1) ? {display:'none'} : {}} key="next" type="primary" onClick={this.handleCreateItemNext}>Next</Button>,
                                <Button style={createItemWizardStep == (createItemTotalSteps.length - 1) ? {} : {display:'none'}} disabled={!isValidNext} key="done" type="primary" onClick={this.handleCreateItemDone}>Done</Button>
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
        subCategories: [...state.common.subCategories],
        selectedItem: state.common.selectedItem,
        isNextStepValid: state.common.isNextStepValid
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
