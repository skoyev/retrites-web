import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { itemActions, leadsActions } from '../../store/action';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import RetreatDetails from '../../components/public/retreat/RetreatDetails';
import RetreatBreadcrumb from '../../components/public/retreat/RetreatBreadcrumb';
import RetreatPhotoAlbum from '../../components/public/retreat/RetreatPhotoAlbum';
import RetreatDetailsSummary from '../../components/public/retreat/RetreatDetailsSummary';
import RetreatBookSection from '../../components/public/retreat/RetreatBookSection';
import { history } from '../../helpers';
import { Layout, Button, Row, Col, Modal } from 'antd';
import Header from 'antd/lib/calendar/Header';
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
            formEmail: '',
            formName: '',
            formDetails: '',
            formDescription: '',
            back: 'home',
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
        
        this.handleChange = this.handleChange.bind(this);
        this.onBack = this.onBack.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmitBookNow = this.handleSubmitBookNow.bind(this);
        this.handleFormEmailChange = this.handleFormEmailChange.bind(this);
        this.handleFormNameChange = this.handleFormNameChange.bind(this);
        this.handleFormDescriptionChange = this.handleFormDescriptionChange.bind(this);
        this.handleOk = this.handleOk.bind(this);        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);        
    }  
    
    /**
    componentWillMount() {
        let {match : {params}} = this.props;
        let itemID = params.itemID;

        const { fetchByID } = this.props;
        if(itemID){
            fetchByID(itemID);
        } else {
            console.log('Item ID is null');
        }
    }
    */

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

    }

    handleChange(event) {
    }

    onBack(event){
        let {back} = this.state;
        event.preventDefault();
        if(back){
            history.push(`/${atob(back)}`);
        }
    }

    handleSearch(e){

    }

    handleOk = e => {
        const {isCaptchaValid} = this.state;

        if(!isCaptchaValid) {
            this.setState({error: 'Captcha is invalid'})
            return;
        }

        this.setState({
          visible: false,
        });   

        const { item } = this.props;
        const {formEmail, formName, formDescription} = this.state;

        if(!formName || !formEmail || !formDescription) {
            this.setState({error: 'Some Data Inputs Are Missing.'})
            return;
        }
        
        this.props.createLead(item.id, formName, formEmail, formDescription);

        this.props.history.push(`/home`);

        window.recaptchaRef.current.reset();
    };
    
    handleCancel = e => {
        this.setState({
          visible: false,
        });
    };    

    handleSubmitBookNow(e) {
        e.preventDefault();

        this.setState({
            visible: true
        });
    }

    handleFormEmailChange(e) {
        this.setState({
            formEmail: e.target.value
        });
    }

    handleFormDescriptionChange(e) {
        this.setState({
            formDescription: e.target.value
        });
    }

    handleFormNameChange(e) {
        this.setState({
            formName: e.target.value
        });
    }

    handleLogoutClick = () => {

    }

    captchaOnChange = () => {
        this.setState({isCaptchaValid: true})
    }

    render() {      
        const { item, isLoggedInRes } = this.props;
        const { isCaptchaValid } = this.state;

        if(!item) {
            return <div>Item details is loading...</div>;
        }

        const { Header, Footer, Sider, Content } = Layout;
        
        return (
            <div>
                <Layout style={{background:'none'}}>
                    <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                        <SearchHeader title="Retriete Your Mind"
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
                    <Content className="top">
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
                                <Row>
                                    <RetreatBookSection item={item}
                                                        handleFormEmailChange={this.handleFormEmailChange}
                                                        handleFormNameChange={this.handleFormNameChange}                                    
                                                        handleSubmitBookNow={this.handleSubmitBookNow}
                                                        handleCaptchaOnChange={this.captchaOnChange}
                                                        isActiveBookNow={isCaptchaValid}
                                                        handleFormDescriptionChange={this.handleFormDescriptionChange}/>
                                </Row>   
                            </Col>
                        </Row>                        
                    </Content>
                </Layout> 

                <Modal title="Request Retreate Availability Details"
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <p>Thank you for booking request for the {item.name}</p>
                    <p>We will get back to you withing 48 hours!</p>
                    <p>Retreate Management Team.</p>
                </Modal>
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...itemActions,
    ...leadsActions
};  

function mapStateToProps(state) {
    return {
      item: state.items.item,
      isLoggedInRes: state.users.isLoggedIn
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));