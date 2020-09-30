import React from 'react';
import { userActions, itemActions, commonActions } from '../../store/action';
import { connect } from 'react-redux'
import { withLocalize, Translate } from "react-localize-redux";
import { Row, Layout } from "antd";
import { SearchHeader, ItemList } from "../../components/public";
import { SearchResultPageBar } from "../../components/public/search";
import '../style/SearchResultPage.css';
import globalTranslations from "../../translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
import { history } from '../../helpers';
import {pageConstants} from '../../constants';
import { Loading } from '../../components/common';
import { ITEM_STATUS } from '../../services';
import moment from 'moment';
class SearchResultPage extends React.Component {

    constructor(props) {
        super(props);
        this.timeout =  null;
        this.state = {
            totalRecordsLoaded: 0,
            recordsPerPage: 9,
            numItemsPerRow: 4,
            searchText: '',
            delay: 1500,
            priceFrom: 0,
            priceTo: 0,
            fromDate: null,
            toDate: null,
            subCategoryId: 0,
            duration: '',
            startDate: '',
            fromPrice: 0,
            toPrice: 0,
            categoryId: 0
        }

        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
        });        

        this.handleMoreItems = this.handleMoreItems.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);

        this.handlePriceFromChange = this.handlePriceFromChange.bind(this);
        this.handlePriceToChange = this.handlePriceToChange.bind(this);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);        
        this.handleBack = this.handleBack.bind(this);        
        this.handleItemClick = this.handleItemClick.bind(this);        
        this.handleLogoutClick = this.handleLogoutClick.bind(this);        
        this.handleCountryClick = this.handleCountryClick.bind(this);        
        this.handleStartDateClick = this.handleStartDateClick.bind(this);        
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search)

        const subCategoryId = urlParams.get('subCategoryId');
        const categoryId    = urlParams.get('categoryId');
        const duration  = urlParams.get('duration');
        const startDate = urlParams.get('startDate');
        const name      = urlParams.get('name');  
        const countryId = urlParams.get('countryId');          
        
        this.setState({ subCategoryId: subCategoryId && subCategoryId > 0 ? subCategoryId : '', 
                        duration: duration, 
                        categoryId: categoryId && categoryId > 0 ? categoryId : '', 
                        startDate: startDate ? startDate : moment().format("YYYY-MM-DD"),
                        countryId: countryId && countryId > 0 ? countryId : '', 
                        searchText: name }, 
                    () => this.loadItems()); 

        // get countries
        //this.props.getCountrieFromStore(); 
        
        setTimeout(()=>window.scrollTo(0, 0),1400);
    }

    handleMoreItems() {        
        this.loadItems();
    }

    handleNameChange = (e) => {
        const text = e.target.value;     
        this.setState({searchText: text}); 

        if(this.timeout){
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout((e)=> {            
            this.loadItems();
        }, this.state.delay);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nextPageName){
            if( nextProps.nextPageName === pageConstants.HOME ){
                history.push(`/${pageConstants.HOME}`);
            } else if(nextProps.nextPageName === pageConstants.DETAILS) {
                var urlParams = new URLSearchParams(window.location.search)
                const {selectedItemId} = this.state;
                const encrData = btoa(`items?${urlParams}`);
                history.push(`/item/${selectedItemId}?back=${encrData}`);
            }
        }
    } 

    loadItems() {
        const { items } = this.props;
        const { subCategoryId, duration, categoryId,
                startDate, searchText, countryId,
                recordsPerPage, fromPrice, toPrice } = this.state;

        const count = items.length + recordsPerPage;
        this.props.search(categoryId, subCategoryId, duration, searchText, startDate, countryId, count, fromPrice, toPrice, ITEM_STATUS.PUBLISHED);
    }

    handleSubmitSearch (searchText, durarion, startDate) {        
        this.setState(
            {duration: durarion, startDate : startDate, searchText:searchText},
            () => this.loadItems());
    }
        
    handlePriceFromChange (event) {
        this.setState({priceFrom:event.target.value})
    }

    handlePriceToChange (event) {
        this.setState({priceTo:event.target.value})
    }

    handleBack(event) {
        //history.push('/home');
        this.props.clearItemsAndNavigateToPage('home')
    }

    onDateRangeChange(value) {
        if(value && value.length == 2){
            this.setState({fromDate:value[0].toDate(), toDate:value[1].toDate()})
        } else {
            this.setState({fromDate:null, toDate:null})
        }       
    }

    handleItemClick = (id) => {
        this.setState({selectedItemId: id}, () => {
            this.props.clearItemsAndNavigateToPage(pageConstants.DETAILS)
        });            
    }

    handleLogoutClick = () => {

    }

    handleCountryClick = (c) => {
        this.setState({countryId: c.key})
    }

    handleTypeClick = (t) => {
        this.setState({subCategoryId: t.key});        
    }

    handleStartDateClick = (date, dateString) => {
        this.setState({startDate: dateString});        
    }

    handleDurationClick = (d) => {
        this.setState({duration: d.key});        
    }

    moreFilterClick = (fromPrice, toPrice) => {
        this.setState(
                {fromPrice: fromPrice, toPrice: toPrice},
                () => this.loadItems()
            );        
    }

    render() {
        const { Header,  Content } = Layout;
        const { items, isLoggedInRes, retreatByCountries} = this.props;
        const { numItemsPerRow } = this.state;
        const shouldHideLoadMore = false;

        if(!retreatByCountries) {
            return <Loading text={'Loading...'}/>;
        }

        return (
         <div className="search">
             <Layout style={{background:'none'}}>
                <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                    <SearchHeader title="Reatreat In Mind" 
                                  handleNameChange={this.handleNameChange} 
                                  isLoggedIn={isLoggedInRes}                                    
                                  shouldShowSearchInput={true}                                
                                  handleLogoutClick={this.handleLogoutClick}/>

                    <SearchResultPageBar 
                                handleSubmitSearch={this.handleSubmitSearch}
                                moreFilterClick={this.moreFilterClick}
                                handleBack={this.handleBack}/>
                </Header>                
                <Content className="search-result-content">
                    <ItemList items={items} 
                              shouldHideLoadMore={shouldHideLoadMore} 
                              numItemsPerRow={numItemsPerRow}
                              handleItemClick={this.handleItemClick} 
                              handleMoreItems={this.handleMoreItems}/>
                </Content>
             </Layout>            
         </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      items: state.items.items,
      nextPageName: state.items.pageName,
      isLoggedInRes: state.users.isLoggedIn, 
      retreatByCountries: state.items.retreatByCountries,
      countries: state.common.countries,  
      durations: state.items.searchLength,  
      totalRecordsLoaded: state.items.items.length   
    };
}

const mapDispatchToProps = {    
    ...itemActions, 
    ...userActions,
    ...commonActions
};
  
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SearchResultPage));