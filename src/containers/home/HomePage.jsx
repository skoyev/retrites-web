import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { PublicHeader, 
         PublicSearchSingle,
         Section, 
         ItemList} from '../../components/public';
import {CategoryList, Loading, SubscriptionModal} from '../../components/common'
import AppFooter from '../../components/common/AppFooter';

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate, getTranslate } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import {connect} from "react-redux";
import {itemActions, pageActions, userActions} from '../../store/action/index'
import { history, isLoggedIn, validateEmail } from '../../helpers';
import '../style/HomePage.css'
import {pageConstants} from '../../constants';
import { Form } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

class HomePage extends React.Component {

    constructor(props, context){
        super(props, context);        
        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });        

        this.state = {
            categoryId: 2,            
            menuItems : [
                'public.menu.retrite',
                'public.menu.flights',
                'public.menu.hotels',
                'public.menu.cars',
                'public.menu.cruises',
                'public.menu.groups'
            ],  
            selectedSubcategory: 'Retreat Type',    
            selectedSubcategoryId: 0,      
            searchLength: ['3', '7', '14', '14>'],
            ourVisionDescription : 'Our Vision Description',
            retreatByTypeTitle: 'Find Retreat By Type',
            retreatByTypeDescription: 'Find Out More About Our Amazing Retreats',
            popularRetreatTitle: 'Our Popular Destinations',
            popularRetreatDescription: 'Find Best Places For Yourself',
            retreatByCountriesTitle: 'Explore our sacred world',
            retreatByCountriesDescription: '',
            selectedDuration: 'Duraion',
            selectedCountry: 'Country',
            selectedDurationValue: '',
            selectedStartDate: '',
            selectedCountryId: '',
            selectedInputSearchBy: '',
            selectedStartDate: '',
            selectedItemId: 0,
            ourVisionTitle: 'Our Vision',
            isLoggedInRes: this.props.isLoggedInRes,
            shouldShowSubscriptionModal: false,
            subscriptionName: 'sss',
            subscriptionEmail: '',
            selectedCategoryList: [],
            showSuccessMessage: false,
            invalidEmail: false,
            isCaptchaValid: false,
            ourVisionDescription: 'We believe human beings are innately wise, strong and kind. This wisdom, although not always experienced, is always present. Going on retreat is a beautiful way to reconnect to our basic sanity and health. Our aspiration at Retreat Your Mind is to inspire people to experience authentic retreats and reconnect with their innate wisdom, strength and kindness.'
        }

        this.handleDurationClick = this.handleDurationClick.bind(this);
        this.handleInputSearchBy = this.handleInputSearchBy.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleRetreatCategoryClick = this.handleRetreatCategoryClick.bind(this);
        this.handleCountrySelectClick = this.handleCountrySelectClick.bind(this);
        this.handleCountrySelectClickNoRedirect = this.handleCountrySelectClickNoRedirect.bind(this);
        this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
        this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this);
        this.handleSubscriptionCancel = this.handleSubscriptionCancel.bind(this);
        this.handleSubscriptionSubmit = this.handleSubscriptionSubmit.bind(this);

        this.captchaOnChange = this.captchaOnChange.bind(this);
    }

    componentDidMount() {
        const {categoryId} = this.state;
        // fetch popular
        this.props.fetch(categoryId)
            .then(() => window.scrollTo(0, 0))   

        // fetch countries for retrites
        this.props.fetchCountries();

        // fetch retreatTypes
        this.props.fetchRetreatSubCategories();

        // check if user logged in
        this.props.isLoggedIn();

        this.SubscriptionWrapper = Form.create({ name: 'subscription' })( SubscriptionModal );        
    }

    componentDidUpdate() {
        let el = document.getElementById('main-header');        
        if(el){      
          window.addEventListener("scroll", function () {
            if (document.documentElement.scrollTop > 50 ) {
              el.classList.add("fixed");
            } else {
              el.classList.remove("fixed");
            }           
          }, false);
        } 
    }

    search = () => {
        this.props.clearItemsAndNavigateToPage('search')
    }

    handleSearchTypeClick = (e) => {
        this.setState({selectedSubcategory:e.item.props.children, selectedSubcategoryId: e.key});        
    }

    handleDurationClick = (e) => {
        this.setState({selectedDuration:e.key, selectedDurationValue: e.key});
    }

    handleInputSearchBy = (e) => {
        this.setState({selectedInputSearchBy: e.target.value});
    }

    handleStartDate = (date, dateString) => {
        this.setState({selectedStartDate: dateString});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nextPageName){
            if( nextProps.nextPageName === pageConstants.SEARCH ){
                const {selectedSubcategoryId, 
                    selectedDurationValue,
                    selectedInputSearchBy,
                    selectedStartDate, 
                    selectedCountryId } = this.state;     
                let param = `/items?subCategoryId=${selectedSubcategoryId}&duration=${selectedDurationValue}&name=${selectedInputSearchBy}&startDate=${selectedStartDate}&countryId=${selectedCountryId}`;
                history.push(param);        
            } else if( nextProps.nextPageName === pageConstants.DETAILS ) {
                const {selectedItemId} = this.state;  
                const encrData = btoa(`${pageConstants.HOME}`);   
                let param = `/item/${selectedItemId}?back=${encrData}`;
                history.push(param);        
            }
        }

        this.setState({isLoggedInRes : nextProps.isLoggedInRes})
    } 

    handleRetreatCategoryClick = (id) => {        
        this.setState({selectedSubcategoryId: id}, () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.SEARCH)
        });            
    }

    handleCountrySelectClick = (id) => {        
        this.setState({selectedCountryId: id}, () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.SEARCH)
        });            
    }

    handleCountrySelectClickNoRedirect = (id) => {
        this.setState({selectedCountryId: id.key, selectedCountry: this.props.retreatByCountries.find(c => c.id == id.key).type});
    }

    handleItemClick = (id) => {
        this.setState({selectedItemId: id}, () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.DETAILS)
        });            
    }

    handleLogoutClick = () => {        
        this.props.logout();
    }

    handleSubscribeClick = () => {
        this.setState({shouldShowSubscriptionModal:true});
    }

    handleSubscriptionChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubscriptionCheckboxChange = checkedList => {
        this.setState({selectedCategoryList:checkedList})
    }

    handleSubscriptionCancel = (form) => {
        form.resetFields();
        window.recaptchaRef.current.reset();
        this.setState({shouldShowSubscriptionModal:false, subscriptionName: '', subscriptionEmail: ''});
    }

    handleSubscriptionSubmit = (form) => {
        const {subscriptionName, subscriptionEmail, selectedCategoryList, isCaptchaValid} = this.state;
        const {retreatTypes} = this.props;

        if(!isCaptchaValid) {
            console.log('Invalid captcha');
            return;
        }

        if(!selectedCategoryList || selectedCategoryList.length == 0){
            console.warn('Please select category.');
            return
        }

        const isValidEmail = validateEmail(subscriptionEmail);

        if(!isValidEmail){
            this.setState({invalidEmail: true})
            console.warn(`Invalid email ${subscriptionEmail}`);
            return;
        }

        this.setState({isCaptchaValid:false})

        const catIds = retreatTypes.filter(r => selectedCategoryList.includes(r.name)).map(r => r.id);
        this.props.userSubscribe({email:subscriptionEmail, name:subscriptionName, catIds:catIds})
            .then(() => {
                this.setState({showSuccessMessage:true}, ()=> {
                    setTimeout(_ => {
                        form.resetFields();
                        window.recaptchaRef.current.reset();
                        this.setState({shouldShowSubscriptionModal:false, 
                            subscriptionName: '', 
                            subscriptionEmail: '',
                            showSuccessMessage: false,
                            invalidEmail: false,
                            selectedCategoryList: []});     
                    }, 4000)
                })                
            })
    }

    extractRetriteTypes = types => {
        return types.map(t => t.name);
    }

    captchaOnChange = () => {
        console.log('captchaOnChange');
        this.setState({isCaptchaValid: true})
    }

    render() {
        const { retreatByTypeTitle,
                retreatByTypeDescription,
                popularRetreatTitle,
                popularRetreatDescription,
                retreatByCountriesTitle,
                retreatByCountriesDescription,
                ourVisionTitle, ourVisionDescription,
                searchLength, selectedSubcategory,
                selectedDuration, selectedCountry, isLoggedInRes,
                shouldShowSubscriptionModal,
                selectedCategoryList, showSuccessMessage, isCaptchaValid } = this.state;
        const { items, retreatByCountries, retreatTypes } = this.props;
        const shouldHideLoadMore = true;

        if ( !items || items.length == 0 ) 
            return <Loading text={'Loading...'}/>;

        const subscriptionCategoryList = retreatTypes && retreatTypes.length > 1 ? this.extractRetriteTypes(retreatTypes) : [];
        
        return (
            <React.Fragment>
                <div className="slider-section">
                    {/* Home Header Section */}
                    <PublicHeader isLoggedInRes={isLoggedInRes}
                                  handleSubscribeClick={this.handleSubscribeClick}
                                  handleLogoutClick={this.handleLogoutClick}/>

                    {/* Slider/Search Section */}
                    <PublicSearchSingle title="Find Retreates For Any Season"
                                        search={this.search}
                                        handleTypeClick={this.handleSearchTypeClick}
                                        handleDurationClick={this.handleDurationClick}
                                        handleInputSearchBy={this.handleInputSearchBy}
                                        handleStartDate={this.handleStartDate}
                                        subCategory={selectedSubcategory}
                                        selectedDuration={selectedDuration}
                                        types={retreatTypes}
                                        selectedCountry = {selectedCountry}
                                        countries = {retreatByCountries}
                                        handleCountryClick = {this.handleCountrySelectClickNoRedirect}
                                        length={searchLength}/>                 
                </div>

                <div className="container">
                    {/* Types Section */}
                    <CategoryList className="margin-top-bottom-50" 
                                  items={retreatTypes}
                                  title={retreatByTypeTitle}
                                  numItemsPerRow={4}
                                  type="subCategoryId"
                                  handleCategoryClick={this.handleRetreatCategoryClick}
                                  description={retreatByTypeDescription}/>

                    {/* Our Vision Section */}
                    <Section description={ourVisionDescription} title={ourVisionTitle}/>

                    {/* Popular Destination (Retrites) */}
                    <ItemList className="margin-top-bottom-50" 
                            items={items}
                            title={popularRetreatTitle}
                            description={popularRetreatDescription}
                            shouldHideLoadMore={shouldHideLoadMore} 
                            handleItemClick={this.handleItemClick} 
                            numItemsPerRow={4}/>

                    {/* Retreat By Countries Section */}
                    <CategoryList className="margin-top-bottom-50" 
                                  items={retreatByCountries}
                                  title={retreatByCountriesTitle}
                                  numItemsPerRow={4}
                                  type="countryId"
                                  handleCategoryClick={this.handleCountrySelectClick}
                                  description={retreatByCountriesDescription}/>
                </div>

                <AppFooter title="@2019 Retreat In Mind Inc." 
                           countries={retreatByCountries}/>

                {/* User Subscription */}
                <this.SubscriptionWrapper title={'Subscription'}
                                   description={'Subscibe To Our Best Deals:'}
                                   captchaOnChange={this.captchaOnChange}
                                   visible={shouldShowSubscriptionModal}
                                   categoryList={subscriptionCategoryList}
                                   selectedCategoryList={selectedCategoryList}
                                   showSuccessMessage={showSuccessMessage}
                                   successMessage={'You have been subscribed successfully!'}
                                   handleSubscriptionCheckboxChange={this.handleSubscriptionCheckboxChange}
                                   handleSubscriptionCancel={this.handleSubscriptionCancel}
                                   handleSubscriptionChange={this.handleSubscriptionChange}
                                   isCaptchaValid={isCaptchaValid}
                                   handleSubscriptionSubmit={this.handleSubscriptionSubmit}/>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      items: state.items.items,
      retreatByCountries: state.items.retreatByCountries,
      retreatTypes: state.items.retriteTypes,
      nextPageName: state.items.pageName,
      isLoggedInRes: state.users.isLoggedIn,
      //shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions, 
    ...userActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(HomePage));