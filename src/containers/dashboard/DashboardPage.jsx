import React from 'react';
import PrivateHeader from '../../components/private/PrivateHeader';
import { Row, Layout, Icon, Modal, Drawer, Steps, Col, notification } from 'antd';
import '../style/DashboardPage.css';
import DashboardMenu from '../../components/private/DashboardMenu';
import {Aminity, Leads, Report, Dashboard, Message, MessageDetails, Users, AdminAminity} from '../../components/private';
import AmenityWizard from '../../components/private/wizard';
import Step1Item from '../../components/private/wizard/steps/step1';
import Step2Item from '../../components/private/wizard/steps/step2';
import Step3Item from '../../components/private/wizard/steps/step3';
import Step4Item from '../../components/private/wizard/steps/step4';
import Step5Item from '../../components/private/wizard/steps/step5';
import Step6Item from '../../components/private/wizard/steps/step6';
import Step7Item from '../../components/private/wizard/steps/step7';
import IdleTimer from 'react-idle-timer';
import { Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {itemActions, reportActions, userActions, commonActions, messageActions} from '../../store/action'
import {pageConstants, commonConstants} from '../../constants';
import './index.css'
import moment from 'moment';
import { history, getUserRoleMenuLinks } from '../../helpers';
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/global.json";
import { commonService } from '../../services';
import BillingProduct from '../../components/private/billing/product/BillingProduct';
import BillingProductSuccess from '../../components/private/billing/success/BillingProductSuccess';
import BillingProductFailed from '../../components/private/billing/failed/BillingProductFailed';
import { Translate } from "react-localize-redux";

const { Header, Content, Sider, Footer } = Layout;

const UserSettings = props => {    
    return (
        <React.Fragment>
            <div><Button type="link" onClick={props.handleHome}>Home</Button></div>
            {
                props.user && props.user.roleId == 2 // OWNER
                &&
                <div><Button type="link" onClick={props.handleBilling}>Billing</Button></div>
            }            
            <div><Button type="link" onClick={props.handleLogout}>Logout</Button></div>
        </React.Fragment>
    )
}

export const BILLING_CONTENT_NAME = {
    BILLING:         'BILLING',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILED:  'PAYMENT_FAILED'
};

class DashboardPage extends React.Component {

    constructor(props, context){
        super(props); 

        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });        
        
        //this.step1ItemRef = React.createRef();
        
        this.state = {
            billingShouldShowProduct: true,
            deleteGrpMsgCfrmModalVisible: false,
            msgGrpId: 0,
            msgGrpRecipientName: '',
            billingProductId: '',
            billingContentName: BILLING_CONTENT_NAME.BILLING,
            itemType: 'retrite',
            collapsed: false,
            createItemWizardStep: 0,
            messageId: 0,
            messagePageNum: 0,
            isBillingCheckout: false,
            // Modal windows
            createEditCustomerModalVisible: false,
            deleteItemModalVisible: false,
            deleteLeadModalVisible: false,
            viewLeadModalVisible: false,
            isValidNext: false,

            isRightMenuVisible: false,
            isBillingModalVisible: false,
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
                    title: 'Schedule',
                    content: React.createElement(
                        Form.create({ name: 'step5Item' })( Step5Item ), 
                        {
                            onRef:ref => (this.step5Item = ref)
                        })
                },
                {
                    title: 'Accomodation',
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
                {name:pageConstants.MESSAGE_CONTENT}, 
                {name:pageConstants.AMENITY_CONTENT}, 
                {name:pageConstants.ADMIN_AMENITY_CONTENT}, 
                {name:pageConstants.LEADS_CONTENT}, 
                {name:pageConstants.STATISTIC_CONTENT},
                {name:pageConstants.DASHBOARD_CONTENT},
                {name:pageConstants.USER_CONTENT}
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
        
        this.idleTimer = null
        this.handleOnAction = this.handleOnAction.bind(this)
        this.handleOnActive = this.handleOnActive.bind(this)
        this.handleOnIdle   = this.handleOnIdle.bind(this)
    } 

    handleOnAction (event) {
        //console.log('user did something', event)
    }
     
    handleOnActive (event) {
        console.log('user is active', event)
        console.log('time remaining', this.idleTimer.getRemainingTime())
    }
    
    handleOnIdle (event) {
        //console.log('user is idle', event)
        //console.log('last active', this.idleTimer.getLastActiveTime())

        // show warning and log user out.
        this.showNotification();        
    }    

    handleCreateItemChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }
    
    loadData() {
        const { user } = this.props;
        const { selectedContentName, messageId } = this.state;

        if(!user){
            console.warn('User is null...')
            return;
        }
        
        switch(selectedContentName){
            case pageConstants.MESSAGE_DETAILS_CONTENT:
                // load user mesages        
                //this.props.fetchUserAmenities(user.id);   
                break;
            case pageConstants.AMENITY_CONTENT:
                // load all user amentities        
                this.props.fetchUserAmenities(user.id);   
                break;
            case pageConstants.ADMIN_AMENITY_CONTENT:
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
                //this.props.fetchSummary(user.id)
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
        const [first] = getUserRoleMenuLinks();

        this.setState({selectedContentName:first.index});

        this.props.isLoggedIn()
            .then((res) => res ? this.loadInitData() : history.push('/home'), error => history.push('/home'));        
    }   
    
    loadInitData = () => {
        const {user} = this.props;

        if(!user){
            console.warn('User is null...')
            return;
        }

        // load summary data for the dashboard (amenities, leads, reports)
        //this.props.fetchSummary(user.id);
        this.props.loadRemoteStripe();    
        // check url params: billing pop-up
        const urlParams = new URLSearchParams(this.props.location.search)
        const billing  = urlParams.get('billing');        
        const checkout = urlParams.get('checkout');        
        if(billing && checkout){
            this.setState({isBillingModalVisible : billing, 
                           isBillingCheckout: true,
                           isValidBillingForm: true,
                           billingContentName : checkout == 'true' ? 
                                    BILLING_CONTENT_NAME.PAYMENT_SUCCESS : 
                                    BILLING_CONTENT_NAME.PAYMENT_FAILED});
        }
    }

    handleAminityDetails = (item) => {
        this.setState({ createEditItemModalVisible: true })
        
        if(item.id) {
            // fetch by id aminity
            this.props.fetchByID(item.id).then(({data:{item:item}}) => this.props.addIntoStoreSelectedItem(item));
        } else {
            this.props.addIntoStoreSelectedItem(item);
        }
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
            c => (e.length > 1 && c.name.trim() === e.trim())
        );
            
        if(foundCmd) {  
            //let cmp = React.createElement(foundCmd.component, foundCmd.params);
            this.setState({selectedContentName: foundCmd.name}, () => this.loadData());
            //this.setState({content: foundCmd.component});            
        } else {
            console.log('Error - component does not registered');
        }
    }

    showNotification = () => {
        const args = {
            message: 'Idle Timeout',
            description:`You have been away. We will log you out for your security!`,
            duration: 5,
            onClose: () => {this.props.logout()}
        };
        notification.open(args);
    };    

    handleItemChange = (event) => {
        let {createEditItem} = this.state;
        createEditItem[event.target.name] = event.target.value;
        this.setState({createEditItem:createEditItem})
    }

    handleViewMessage = (val) => {
        this.setState({
            selectedContentName: pageConstants.MESSAGE_DETAILS_CONTENT, 
            messageId: val.id, 
            pageNum: val.pageNum,
            messageRecipient: val.recipient,
            itemID: val.itemID
        })
    }

    handleDeleteMessage = (msgGrpId, recipientName) => {
        this.setState({deleteGrpMsgCfrmModalVisible : true, msgGrpId: msgGrpId, msgGrpRecipientName:recipientName});
    }

    backToMessageFromDetails = () => {
        this.setState({selectedContentName: pageConstants.MESSAGE_CONTENT})
    }

    renderSwitchPage(){
        const { selectedContentName, messageId, pageNum, messageRecipient, itemID } = this.state;
        const {items, leads} = this.props; 

        switch(selectedContentName){
            case pageConstants.USER_CONTENT:
                return ([
                    <Users key="users"/>
                ]);
            case pageConstants.MESSAGE_DETAILS_CONTENT:
                return ([
                    <MessageDetails 
                             recipient={messageRecipient}
                             messageGroupId={messageId}
                             itemID={itemID}
                             backToMessageFromDetails={this.backToMessageFromDetails}
                             key="message-details"/>
                ]);
            case pageConstants.MESSAGE_CONTENT:
                return ([
                    <Message ref={this.child} 
                             handleViewMessage={this.handleViewMessage}
                             handleDeleteMessage={this.handleDeleteMessage}
                             messagePageNum={pageNum}
                             key="message"/>
                ]);
            case pageConstants.AMENITY_CONTENT:
                return ([
                    <Aminity items={items} 
                             key="aminity"
                             numItemsPerRow={4}
                             handleAminityDetails={this.handleAminityDetails} 
                             handleAminityDelete={this.handleAminityDelete} 
                             ref={this.child}/>
                ]);
            case pageConstants.ADMIN_AMENITY_CONTENT:
                return ([
                    <AdminAminity key="admin-aminity"
                                  ref={this.child}/>
                ]);
            case pageConstants.LEADS_CONTENT:
                return ([
                    <Leads items={leads} 
                           key="leads"
                           handleLeadDelete={this.handleLeadDelete} 
                           handleLeadEdit={this.handleLeadEdit}/>
                ]);
            case pageConstants.STATISTIC_CONTENT:
                return ([
                    <Report key="report"/>
                ]);
            case pageConstants.DASHBOARD_CONTENT:
                return ([
                    <Dashboard key="dashboard"/>
                ]);
            default:
                return ([
                    <Dashboard key="dashboard-default"/>
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

    handleBillingModalOk = async () => {
        let {billingProductId} = this.state;

        if(billingProductId && billingProductId.length > 0){
            const response  = await commonService.createCheckoutSession(1, billingProductId);
            const { error } = this.props.stripe.redirectToCheckout({  sessionId: response.data.data });
            if (error) {
                console.warn(error);
            }    
        }        
    }

    handleBillingModalCancel = () => {        
        this.setState({ isBillingModalVisible: false });
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

    handleBilling = async (e) => {
        this.handleRightMenuOpenClose();
        // create session and redirect to payment screen
        this.setState(prevState => ({isBillingModalVisible: !prevState.isBillingModalVisible}));        
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
        /*
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
        */
    }

    handleCreateItemDone = () => {
        const {user, selectedItem, isSelectedItemChanged} = this.props;

        this.setState({createEditItemModalVisible: false, createItemWizardStep: 0})

        if( !selectedItem.name || !selectedItem.description || !selectedItem.title){
            console.warn('Create a new Item error...');
            this.setState({createItemError: 'Validation error'})
            return;
        }

        // check if item update - fileds not changed - don't trigger back end call.
        if(selectedItem && selectedItem.id && !isSelectedItemChanged){
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
        itemFormData.append('accomodation', JSON.stringify(selectedItem.accomodation));
        itemFormData.append('accPicture', selectedItem.accomodation.picture);
        itemFormData.append('userId', this.props.user.id);
        itemFormData.append('events', JSON.stringify(selectedItem.events));
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

    getBillingContent = (name) => {
        let res = <BillingProduct {...this.props} setBillingProduct={this.setBillingProduct}/>
        switch(name) {
            case BILLING_CONTENT_NAME.PAYMENT_SUCCESS:
                res = <BillingProductSuccess {...this.props}/>
                break;
            case BILLING_CONTENT_NAME.PAYMENT_FAILED:
                res = <BillingProductFailed {...this.props}/>
                break;
        }

        return res;
    }

    setBillingProduct = (billingProductSysId) => {
        this.setState({billingProductId: billingProductSysId});
    }

    handleDeleteGrpMsgCfrmModalVisiblelOk = () => {
        let {msgGrpId} = this.state;        
        if(msgGrpId && msgGrpId > 0)
            this.props.deleteMessageGroup(msgGrpId)
                      .then(_ => { 
                          this.props.fetchMessageGroups();
                          this.setState({deleteGrpMsgCfrmModalVisible : false, msgGrpRecipientName: '', msgGrpId: 0});
                        }, error => {
                            console.error('handleDeleteGrpMsgCfrmModalVisiblelOk !!!');
                        });        
    }

    handleDeleteGrpMsgCfrmModalVisiblelCancel = () => {
        this.setState({deleteGrpMsgCfrmModalVisible : false});
    }

    render() {
        const { createEditItem, lead, createItemWizardStep, 
                createItemSteps: createItemTotalSteps, 
                isValidNext, billingShouldShowProduct, 
                billingContentName, isBillingCheckout,
                msgGrpRecipientName } = this.state;
        //const { TextArea } = Input;        
        const {selectedItem, user, isValidBillingForm} = this.props;

        let billingContent = '';
        if(billingShouldShowProduct) {
            billingContent = this.getBillingContent(billingContentName);
        }

        return (
            <>
                <IdleTimer
                    ref={ref => { this.idleTimer = ref }}
                    //timeout={1000 * 60 * 15}
                    timeout={1000 * 60 * commonConstants.IDLE_TIME_MIN}
                    onActive={this.handleOnActive}
                    onIdle={this.handleOnIdle}
                    onAction={this.handleOnAction}
                    debounce={250}/>

                <Layout style={{height:'100%', overflowY: 'hidden'}}>
                    <Sider style={{marginRight: 5}}>
                        <DashboardMenu handleClickMenu = {this.handleClickMenu} user={user}/>
                    </Sider>

                    <Layout>
                        <Header style={{backgroundColor:'#c5c4c4', marginBottom:10}}>
                            <PrivateHeader handleMenu={this.handleRightMenuOpenClose} user={this.props.user}/>
                        </Header>

                        <Content className="ant-layout-content-override" style={{overflowY:'scroll'}}>
                            {user && this.renderSwitchPage()}
                        </Content>

                        <Footer style={{backgroundColor:'#c5c4c4', marginTop:10}}>
                            Retriete Copyrights 2020.
                        </Footer>
                    </Layout>

                    {/* Create  Amenity Wizard */}
                    {createItemTotalSteps &&
                        <Modal title={(selectedItem && selectedItem.id) ? "Modify Retreat" : "Create Retreat"}
                            visible={this.state.createEditItemModalVisible}
                            width={1150}
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

                    {/* Dashboard Delete Group Message Modal Window */}
                    <Modal
                            title="Delete Lead"
                            visible={this.state.deleteGrpMsgCfrmModalVisible}
                            onOk={this.handleDeleteGrpMsgCfrmModalVisiblelOk}
                            onCancel={this.handleDeleteGrpMsgCfrmModalVisiblelCancel}>                    
                            <Translate>
                                {({ translate }) =>
                                    <p>{`${translate('messages.delete-message-group')} for recipient - ${msgGrpRecipientName} ?`}</p>}
                            </Translate>
                    </Modal>   

                    {/* Dashboard View Details Lead Modal Window */}
                    <Modal
                            title="View Lead Details"
                            key="leadsDetailsModal1"
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

                    {/*  Confirm Delete Message Group */}
                    <Modal
                            title="Confirm Delete Message Group"
                            key="deleteMessageGroup"
                            visible={this.state.viewDeleteMessageGroup}
                            footer={[
                                <Row>
                                    <Col span={4}>
                                        <Button key="cancel-button" onClick={this.handleLeadViewModalCancel} htmlType="button">OK</Button>
                                    </Col>                                
                                    <Col span={4}>
                                        <Button key="cancel-button" onClick={this.handleLeadViewModalCancel} htmlType="button">OK</Button>
                                    </Col>
                                </Row>
                            ]}>                    
                        <p>W</p>
                    </Modal>

                    {/* Dashboard View Details Lead Modal Window */}
                    <Modal
                            title="View Lead Details"
                            key="leadsDetailsModal"
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

                    {/* Dashboard Billing Modal Window */}
                    <Modal
                            title={'Retreat Billing'}
                            visible={this.state.isBillingModalVisible}
                            footer={[
                                <Row>
                                    {
                                        !isBillingCheckout &&
                                        <Col span={4}>                                    
                                            <Button key="cancel-button" onClick={this.handleBillingModalCancel} htmlType="button">
                                                Cancel
                                            </Button>
                                        </Col>
                                    }
                                    <Col span={4}>
                                        <Button disabled={isValidBillingForm} key="cancel-button" onClick={isBillingCheckout ? this.handleBillingModalCancel : this.handleBillingModalOk} htmlType="button">
                                            {isBillingCheckout ? 'Close' : 'Buy'}
                                        </Button>
                                    </Col>
                                </Row>
                            ]}>
                        {billingContent}
                    </Modal>   

                    <Drawer title="User Settings"
                            placement="right"
                            closable={true}
                            className="user-setting"
                            onClose={this.handleRightMenuOpenClose}
                            visible={this.state.isRightMenuVisible}>
                        <UserSettings handleHome={this.handleHome}
                                    {...this.props}
                                    handleBilling={this.handleBilling}
                                    handleLogout={this.handleLogout}/>
                    </Drawer>  
                </Layout>
            </>
        )
    }
}

const mapDispatchToProps = {    
    ...itemActions,
    ...reportActions,
    ...userActions,
    ...commonActions,
    ...messageActions
}; 

function mapStateToProps(state) {
    return {
        user : JSON.parse(sessionStorage.getItem('user')),
        items: [...state.items.items],
        leads: [],
        billingForm: state.common.billingForm,
        isValidBillingForm: state.common.isValidBillingForm,
        categories: [...state.common.categories],
        subCategories: [...state.common.subCategories],
        selectedItem: state.common.selectedItem,
        isSelectedItemChanged: state.common.isSelectedItemChanged,
        isNextStepValid: state.common.isNextStepValid,
        isValidToken : state.users.isLoggedIn,
        stripe: state.common.stripe
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
