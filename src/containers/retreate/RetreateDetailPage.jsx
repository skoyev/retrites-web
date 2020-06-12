import React from 'react';
import { Translate } from "react-localize-redux";
import { itemActions, userActions, messageActions } from '../../store/action';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import RetreatDetails from '../../components/public/retreat/RetreatDetails';
import RetreatBreadcrumb from '../../components/public/retreat/RetreatBreadcrumb';
import RetreatPhotoAlbum from '../../components/public/retreat/RetreatPhotoAlbum';
import RetreatDetailsSummary from '../../components/public/retreat/RetreatDetailsSummary';
import RetreatBookSection from '../../components/public/retreat/RetreatBookSection';
import { history, validateEmail } from '../../helpers';
import { Layout, notification, Row, Col, Modal } from 'antd';
import SearchHeader from '../../components/public/search/SearchHeader';
import '../style/RetreateDetailPage.css';
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../../translations/global.json";

window.recaptchaRef = React.createRef();
class RetreateDetailPage extends React.Component {

    constructor(props, state) {
        super(props);

        this.state = {
            visible: false,
            formDetails: '',
            formDescription: '',
            back: 'home',
            error: '',
            isCaptchaValid: false
        };        

        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });   
        
        this.onBack = this.onBack.bind(this);
        this.handleSubmitBookNow = this.handleSubmitBookNow.bind(this);
        this.handleFormDescriptionChange = this.handleFormDescriptionChange.bind(this);
        this.handleOk = this.handleOk.bind(this);        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);        
    }  
    
    openNotification = () => {
        const {item} = this.props;
        const args = {
            message: 'Retreat Request',
            description:
                `Thank you for booking request for the ${item.name}. We will get back to you withing 48 hours!`,
            duration: 4,
        };
        notification.open(args);
    };    

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const back = urlParams.get('back');        
        this.setState({ back: back}); 

        let {match : {params}} = this.props;
        let itemID = params.itemID;

        const { fetchByID } = this.props;
        if(itemID && (typeof parseInt(itemID) === "number")){
            fetchByID(parseInt(itemID));
        } else {
            console.log('Item ID is null');
        }

        // check if user logged in
        this.props.isLoggedIn();

        window.scrollTo(0, 0);
    }

    onBack(event){
        let {back} = this.state;
        event.preventDefault();
        if(back){
            history.push(`/${atob(back)}`);
        }
    }

    handleOk = e => {
    };
    
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };    

    handleSubmitBookNow(e) {
        e.preventDefault();

        /*
        this.setState({
            visible: true
        });
        */

       const {isCaptchaValid} = this.state;

       if(!isCaptchaValid) {
           this.setState({error: 'Captcha is invalid'})
           return;
       }

       const { item } = this.props;
       const {formDescription} = this.state;

       if(!formDescription) {
           this.setState({error: 'Some Data Inputs Are Missing.'})
           return;
       }
       
       this.props.createMessageGroupAndMessage(item.id, formDescription);   
       
       this.openNotification();

       setTimeout(()=> {
        this.props.history.push(`/home`);
       },3000);

       window.recaptchaRef.current.reset();
       this.setState({error: ''});
    }

    handleFormDescriptionChange(e) {
        this.setState({
            formDescription: e.target.value
        });
    }

    handleLogoutClick = (e) => {
        this.props.logout();
        e.preventDefault();
        //console.log('handleLogoutClick');
    }

    captchaOnChange = () => {
        this.setState({isCaptchaValid: true})
    }

    render() {      
        const { item, isLoggedInRes, user } = this.props;
        const { isCaptchaValid, error } = this.state;

        if(!item) {
            return <div>Item details is loading...</div>;
        }

        const { Header, Footer, Sider, Content } = Layout;
        
        return (
            <div>
                <Layout style={{background:'none'}}>
                    <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                        <SearchHeader title="Retreat Your Mind"
                                      shouldShowSearchInput={false}
                                      isLoggedIn={isLoggedInRes}
                                      handleLogoutClick={this.handleLogoutClick}
                                      handleSearch={this.handleSearch}
                        ></SearchHeader>
                        <Translate>
                        {
                            ({ translate }) =>
                            <RetreatBreadcrumb item={item}
                                               buttonName={translate("label.goback")}
                                               onBack={this.onBack}>                            
                            </RetreatBreadcrumb>
                        }
                        </Translate>
                    </Header>                
                    <Content className="detail-content">
                        <Row>
                            <Col span={14}>
                                <Row>
                                    <RetreatPhotoAlbum item={item}></RetreatPhotoAlbum>
                                </Row>                                
                                <Row>
                                    <RetreatDetails item={item}></RetreatDetails>
                                </Row>
                            </Col>
                            <Col span={9} offset={1}>
                                <Row style={{marginBottom: '20px'}}>
                                    <RetreatDetailsSummary item={item}></RetreatDetailsSummary>                        
                                </Row>
                                {
                                    user 
                                        &&
                                    (user.roleId == 1)
                                        &&
                                    <Row>
                                        <RetreatBookSection item={item}
                                                            isLoggedInRes={this.props.isLoggedInRes}
                                                            handleSubmitBookNow={this.handleSubmitBookNow}
                                                            handleCaptchaOnChange={this.captchaOnChange}
                                                            isActiveBookNow={isCaptchaValid}
                                                            error={error}
                                                            generalMessage="Please Login in order to submit your request."
                                                            handleFormDescriptionChange={this.handleFormDescriptionChange}/>
                                    </Row> 
                                }  
                            </Col>
                        </Row>                        
                    </Content>
                </Layout> 

                <Modal title="Request Retreate Availability Details"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <p>Thank you for booking request for the {item.name}</p>
                    <p>We will get back to you shortly!</p>
                    <p>Please Login and check under Messages our response/communication!</p>
                    <p>Retreate Management Team.</p>
                </Modal>
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...itemActions,
    ...userActions,
    ...messageActions
};  

function mapStateToProps(state) {
    return {
      user : JSON.parse(sessionStorage.getItem('user')),  
      item : state.items.item,
      isLoggedInRes: state.users.isLoggedIn
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));