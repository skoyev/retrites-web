import React from 'react';
import { PublicHeader,          
         Section, 
         ItemList} from '../../components/public';
import {SearchBar} from '../../components/public/search';         
import {CategoryList, Loading, SubscriptionModal, CategoryWithTitleList} from '../../components/common'
import AppFooter from '../../components/common/AppFooter';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import {connect} from "react-redux";
import {itemActions, userActions, commonActions} from '../../store/action/index'
import { history, validateEmail } from '../../helpers';
import '../style/HomePage.css'
import {pageConstants, commonConstants} from '../../constants';
import { Form, notification } from 'antd';
import IdleTimer from 'react-idle-timer';
import HomeSearchSection from '../../components/common/section/HomeSearchSection';
import moment from 'moment';

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
            showTopSearch: false,
            selectedSubcategory: 'Retreat Type',    
            selectedSubcategoryId: 0,      
            selectedCategoryId: 0,      
            retreatByTypeTitle: 'Find Your Activity By Type',
            retreatByTypeDescription: 'Find Out More About Our Amazing Retreats',
            //popularRetreatTitle: 'Our Popular Destinations',
            popularRetreatTitle: 'Popular Destinations',
            //popularRetreatDescription: 'Find Best Places For Yourself',
            retreatByCountriesTitle: 'Explore Sacred World',
            retreatByCountriesDescription: '',
            selectedDurationValue: '',
            selectedCountryId: '',
            itemName: '',
            selectedStartDate: '',
            selectedItemId: 0,
            ourVisionTitle: 'Our Vision',
            isLoggedInRes: this.props.isLoggedInRes,
            shouldShowSubscriptionModal: false,
            subscriptionName: '',
            subscriptionEmail: '',
            selectedCategoryList: [],
            showSuccessMessage: false,
            invalidEmail: false,
            isCaptchaValid: false,
            polularItemCount: 4,
            ourVisionDescription: 'We believe human beings are innately wise, strong and kind. This wisdom, although not always experienced, is always present. Going on retreat is a beautiful way to reconnect to our basic sanity and health. Our aspiration at Retreat Your Mind is to inspire people to experience authentic retreats and reconnect with their innate wisdom, strength and kindness.'
        }

        this.idleTimer = null
        this.handleOnAction = this.handleOnAction.bind(this)
        this.handleOnActive = this.handleOnActive.bind(this)
        this.handleOnIdle   = this.handleOnIdle.bind(this)

        this.handleRetreatCategoryClick = this.handleRetreatCategoryClick.bind(this);
        this.handleCountrySelectClick = this.handleCountrySelectClick.bind(this);
        this.handleCountrySelectClickNoRedirect = this.handleCountrySelectClickNoRedirect.bind(this);
        this.handleSubscribeClick = this.handleSubscribeClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this);
        this.handleSubscriptionCancel = this.handleSubscriptionCancel.bind(this);
        this.handleSubscriptionSubmit = this.handleSubscriptionSubmit.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.showIdleNotification = this.showIdleNotification.bind(this);
        this.captchaOnChange = this.captchaOnChange.bind(this);
        this.hasSubscriptionInSession = this.hasSubscriptionInSession.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleOnAction (event) {
        //console.log('user did something', event)
    }
     
    handleOnActive (event) {
        //console.log('user is active', event)
        //console.log('time remaining', this.idleTimer.getRemainingTime())
    }
    
    handleOnIdle (event) {
        //console.log('user is idle', event)
        //console.log('last active', this.idleTimer.getLastActiveTime())

        // show warning and log user out.
        this.showIdleNotification();        
    }   
    
    showIdleNotification() {
        const args = {
            message: 'Idle Timeout',
            description:`You have been away. We will log you out for your security!`,
            duration: 5,
            onClose: () => {this.props.logout()}
        };
        notification.open(args);
    }

    componentDidMount() {
        const {polularItemCount} = this.state;
        // fetch popular
        this.props.fetchPopularRedirectLoginIfNoData(polularItemCount)
            .then(() => window.scrollTo(0, 0))   

        // fetch countries
        this.props.fetchCountries();

        // check if user logged in
        // check user subscription - prompt window option.
        this.props.isLoggedIn()
            .catch(err => 
                !this.hasSubscriptionInSession() ? 
                    setTimeout(()=>this.setState({shouldShowSubscriptionModal:true}), commonConstants.SUBSCRIBE_TIMEOUT_SEC) : '' )

        window.addEventListener("scroll", this.handleScroll, false);
    }

    handleScroll(e) {
        let el = document.getElementById('main-header'); 
        let el2 = document.getElementsByClassName('slider-section1')[0];

        if(!el || !el2) return;

        if (document.documentElement.scrollTop > 50 ) {
            el.classList.add("fixed");
            el2.classList.add("top-space");
            this.setState({showTopSearch:true})
        } else {
            el.classList.remove("fixed");
            el2.classList.remove("top-space");
            this.setState({showTopSearch:false})
        }
    }

    hasSubscriptionInSession() {
        return sessionStorage.getItem(commonConstants.SUBSCRIPTION_VALUE) != undefined;
    }

    componentDidUpdate() {
        if(this.state.shouldShowSubscriptionModal && 
                !sessionStorage.getItem(commonConstants.SUBSCRIPTION_VALUE)){
            sessionStorage.setItem(commonConstants.SUBSCRIPTION_VALUE, moment().format())
        }
    }

    search = ({id:countryID}, {id:selectedCategoryId}, {id:selectedSubcategoryId}, selectedStartDate, selectedDuration, itemName = '') => {
        this.setState({
                    selectedCountryId: countryID ? countryID : '', 
                    selectedStartDate: selectedStartDate ? selectedStartDate : '',
                    selectedSubcategoryId: selectedSubcategoryId ? selectedSubcategoryId: '',
                    selectedDurationValue: selectedDuration ? selectedDuration : '',
                    selectedCategoryId: selectedCategoryId ? selectedCategoryId : '',
                    itemName: itemName || ''
                }, 
                () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.SEARCH)
        });            
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nextPageName){
            if( nextProps.nextPageName === pageConstants.SEARCH ){
                const {selectedSubcategoryId, 
                    selectedCategoryId,
                    selectedDurationValue,
                    selectedStartDate, 
                    selectedCountryId,
                    itemName } = this.state;     
                //let param = `/items?subCategoryId=${selectedSubcategoryId}&duration=${selectedDurationValue}&startDate=${selectedStartDate}&countryId=${selectedCountryId}&categoryId=${selectedCategoryId}&name=${itemName}`;

                let param = `/items?`;

                if(selectedSubcategoryId)
                    param += `subCategoryId=${selectedSubcategoryId}`
                if(selectedDurationValue)
                    param += `&duration=${selectedDurationValue}`
                if(selectedStartDate)
                    param += `&startDate=${selectedStartDate}`
                if(selectedCountryId)
                    param += `&countryId=${selectedCountryId}`
                if(selectedCategoryId)
                    param += `&categoryId=${selectedCategoryId}`
                if(itemName)
                    param += `&name=${itemName}`

                history.push(param);        
            } else if( nextProps.nextPageName === pageConstants.DETAILS ) {
                const {selectedItemId} = this.state;  
                const encrData = btoa(`${pageConstants.HOME}`);   
                let param = `/item/${selectedItemId}?back=${encrData}`;
                history.push(param);        
            } else if (nextProps.nextPageName === pageConstants.LOGIN) {
                history.push('/login');        
            }
        }

        this.setState({isLoggedInRes : nextProps.isLoggedInRes})
    } 

    handleRetreatCategoryClick = (id) => {        
        this.setState({selectedCategoryId: id}, () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.SEARCH)
        });            
    }

    handleCountrySelectClick = (id) => {        
        const today = new Date().toISOString().slice(0, 10)
        this.setState(
            {
                selectedCountryId: id, 
                selectedStartDate: today,
                selectedStartDate: today,
            }, 
            () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.SEARCH)
        });            
    }

    handleCountrySelectClickNoRedirect = (id) => {
        this.setState({selectedCountryId: id.key, selectedCountry: this.props.retreatByCountries.find(c => c.id === id.key).type});
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

    handleSearchClick = (name) => {
        this.search({},{},{},'','', name);
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
        const {categories} = this.props;

        if(!isCaptchaValid) {
            console.log('Invalid captcha');
            return;
        }

        if(!selectedCategoryList || selectedCategoryList.length === 0){
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

        //const catIds = retreatTypes.filter(r => selectedCategoryList.includes(r.name)).map(r => r.id);
        const catIds = categories.filter(r => selectedCategoryList.includes(r.name)).map(r => r.id);
        this.props.userSubscribe({email:subscriptionEmail, name:subscriptionName, catIds:catIds})
            .then(() => {
               form.resetFields();
               window.recaptchaRef.current.reset();
               this.setState({shouldShowSubscriptionModal:false, 
                   subscriptionName: '', 
                   subscriptionEmail: '',
                   showSuccessMessage: false,
                   invalidEmail: false,
                   selectedCategoryList: []});  
                this.showNotification();                                            
            })
    }

    showNotification = () => {
        const args = {
            message: 'Subscription',
            description:`You have been subscribed successfully!`,
            duration: 4,
        };
        notification.open(args);
    };    

    extractRetriteTypes = types => {
        return types.map(t => t.name);
    }

    captchaOnChange = () => {
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
                isLoggedInRes, shouldShowSubscriptionModal,
                selectedCategoryList, showSuccessMessage, 
                isCaptchaValid, showTopSearch } = this.state;
        const { items, retreatByCountries, categories, countries, SubscriptionWrapper } = this.props;
        const shouldHideLoadMore = true;
        
        if ( !items || items.length === 0 ) {
            console.warn('There is no items has been found. Please check items collection!!!')
            //return <Loading text={'Loading...'}/>;
        }        

        const subscriptionCategoryList = categories && categories.length > 1 ? this.extractRetriteTypes(categories) : [];
        return (
            <React.Fragment>
                {
                    isLoggedInRes &&
                    <IdleTimer
                        ref={ref => { this.idleTimer = ref }}
                        //timeout={1000 * 60 * 15}
                        timeout={1000 * 60 * commonConstants.IDLE_TIME_MIN}
                        onActive={this.handleOnActive}
                        onIdle={this.handleOnIdle}
                        onAction={this.handleOnAction}
                        debounce={250}/>
                }

                <div className="slider-section">
                    {/* Home Header Section */}
                    <PublicHeader isLoggedInRes={isLoggedInRes}
                                  showTopSearch={showTopSearch}
                                  handleSubscribeClick={this.handleSubscribeClick}
                                  handleSearchClick={this.handleSearchClick}
                                  handleLogoutClick={this.handleLogoutClick}/>

                    {/* Slider/Search Section */}
                    <HomeSearchSection handleSearch={this.search}/>
                </div>

                <div className="container">
                    {/* Types Section */}
                    <CategoryList className="margin-top-bottom-50" 
                                  items={categories}
                                  title={retreatByTypeTitle}
                                  numItemsPerRow={4}
                                  type="subCategoryId"
                                  handleCategoryClick={this.handleRetreatCategoryClick}/>

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
                                  items={countries}
                                  title={retreatByCountriesTitle}
                                  numItemsPerRow={4}
                                  type="countryId"
                                  handleCategoryClick={this.handleCountrySelectClick}
                                  description={retreatByCountriesDescription}/>
                </div>

                <AppFooter title="@2020 Retreat In Mind Inc." 
                           countries={countries}/>

                {/* User Subscription */}
                <SubscriptionWrapper title={'Subscription'}
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
      //retreatTypes: state.items.retriteTypes,
      categories: state.common.categories,
      countries: state.common.countries,
      nextPageName: state.items.pageName,      
      isLoggedInRes: state.users.isLoggedIn,
      isMaintenMode: state.common.isMaintenMode,
      SubscriptionWrapper: Form.create({ name: 'subscription' })( SubscriptionModal )
      //shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions, 
    ...userActions,
    ...commonActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(HomePage));