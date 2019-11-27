import React from 'react';
import { userActions } from '../../store/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withLocalize, Translate } from "react-localize-redux";
import { Row, Layout } from "antd";
import { SearchHeader, SearchResultListing, ItemList } from "../../components/public";
import { SearchBar } from "../../components/public/search";
import '../style/SearchResultPage.css';
import {itemActions} from '../../store/action'
import { constants } from 'fs';
import globalTranslations from "../../translations/global.json";
import { renderToStaticMarkup } from "react-dom/server";
import { history } from '../../helpers';

class SearchResultPage extends React.Component {

    constructor(props) {
        super(props);
        this.timeout =  null;
        this.state = {
            totalRecordsLoaded: 0,
            recordsPerPage: 10,
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
            name: ''
        }

        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup },
        });        

        this.handleMoreItems = this.handleMoreItems.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);

        this.handlePriceFromChange = this.handlePriceFromChange.bind(this);
        this.handlePriceToChange = this.handlePriceToChange.bind(this);
        this.onDateRangeChange = this.onDateRangeChange.bind(this);        
        this.handleBack = this.handleBack.bind(this);        
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search)

        const subCategoryId = urlParams.get('subCategoryId');
        const duration  = urlParams.get('duration');
        const startDate = urlParams.get('startDate');
        const name      = urlParams.get('name');  
        const countryId = urlParams.get('countryId');          
        
        this.setState({ subCategoryId: subCategoryId, 
                        duration: duration, 
                        startDate: startDate, 
                        countryId: countryId, 
                        name: name }, 
                    () => this.loadItems());                
    }

    handleMoreItems() {        
        this.loadItems();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nextPageName &&
            nextProps.nextPageName === 'home'){
            history.push('/home');    
        }
    } 

    loadItems() {
        const { items } = this.props;
        const { subCategoryId, duration, 
                startDate, name, countryId,
                recordsPerPage } = this.state;

        this.props.search(subCategoryId, duration, name, startDate);                        

        //const urlParams = new URLSearchParams(this.props.location.search)
        //const {category} = this.props.match.params;
        //const subCategoryId = urlParams.get('subCategoryId');

        /*
        const {recordsPerPage, searchText, priceFrom, priceTo, fromDate, toDate} = this.state
        const { items } = this.props;

        let fromDateFormatted = fromDate ? new Date(fromDate) : '';
        let fromDateFormattedDate = fromDate ? fromDateFormatted.getFullYear() + "/" + (fromDateFormatted.getMonth() + 1) + "/" + fromDateFormatted.getDate() : '';

        let toDateFormatted = toDate ? new Date(toDate) : '';
        let toDateFormattedDate = toDate ? toDateFormatted.getFullYear() + "/" + (toDateFormatted.getMonth() + 1) + "/" + toDateFormatted.getDate() : '';

        this.props.findBySubCategory(subCategoryId, 
                              recordsPerPage, 
                              (searchText === '') ? items.length : 0, searchText,
                              (priceFrom && priceFrom > 0) ? priceFrom : '',
                              (priceTo && priceTo > 0) ? priceTo : '',
                              fromDate ? fromDateFormattedDate : '',
                              toDate ? toDateFormattedDate : '')
                    .then(() => window.scrollTo(0, 0))               
        */

        this.setState({totalRecordsLoaded : items.length + recordsPerPage})
    }

    handleSearch = event => {
        if(this.timeout){
            clearTimeout(this.timeout);
        }

        const text = event.target.value;
        
        this.timeout = setTimeout((e)=> {
            this.setState({searchText: text});
            //console.log(this.state.searchText);
            this.loadItems();
        }, this.state.delay);          
    };

    handleSubmitSearch (event) {        
        this.loadItems();
        event.preventDefault();
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

    render() {
        const { Header, Footer, Sider, Content } = Layout;
        const { items } = this.props;
        const { numItemsPerRow } = this.state;
        const shouldHideLoadMore = false;

        return (
         <div className="search">
             <Layout style={{background:'none'}}>
                <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                    <SearchHeader title="Reatreat In Mind" handleSearch={this.handleSearch}/>
                    <SearchBar handleSubmitSearch={this.handleSubmitSearch}
                               handlePriceFromChange={this.handlePriceFromChange}
                               handlePriceToChange={this.handlePriceToChange}
                               onDateRangeChange={this.onDateRangeChange}
                               handleBack={this.handleBack}/>
                </Header>                
                <Content>
                    <ItemList items={items} 
                              shouldHideLoadMore={shouldHideLoadMore} 
                              numItemsPerRow={numItemsPerRow}
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
      nextPageName: state.items.pageName      
    };
}

const mapDispatchToProps = {    
    ...itemActions
};
  
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SearchResultPage));