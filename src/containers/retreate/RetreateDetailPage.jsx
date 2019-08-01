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

class RetreateDetailPage extends React.Component {

    constructor(props, state) {
        super(props);

        this.state = {
            visible: false,
            formEmail: '',
            formName: '',
            formDetails: '',
            formDescription: ''
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
    }  
    
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

    handleChange(event) {
    }

    onBack(event){
        let {match : {params}, location : {search}} = this.props;
        let category = search.split('=')[1];

        event.preventDefault();
        console.log('onBack');
        history.push('/items/' + category);
    }

    handleSearch(e){

    }

    handleOk = e => {
        this.setState({
          visible: false,
        });   

        const {formEmail, formName, formDescription} = this.state;
        
        this.props.createLead(formName, formEmail, formDescription);

        this.props.history.push(`/home`);
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

    render() {      
        let {match : {params}, location : {search}} = this.props;
        let category = search.split('=')[1];

        const { item  } = this.props;

        if(!item) {
            return null;
        }

        const { Header, Footer, Sider, Content } = Layout;
        
        return (
            <div>
                <Layout style={{background:'none'}}>
                    <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                        <SearchHeader title="Retriete In Mind"
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
                            <Col span={8} offset={1}>
                                <Row style={{marginBottom: '20px'}}>
                                    <RetreatDetailsSummary item={item}></RetreatDetailsSummary>                        
                                </Row>
                                <Row>
                                    <RetreatBookSection item={item}
                                                        handleFormEmailChange={this.handleFormEmailChange}
                                                        handleFormNameChange={this.handleFormNameChange}                                    
                                                        handleSubmitBookNow={this.handleSubmitBookNow}
                                                        handleFormDescriptionChange={this.handleFormDescriptionChange}>
                                    </RetreatBookSection>
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
    console.log(state)
    return {
      item: state.items.item
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));