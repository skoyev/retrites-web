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
            toDate: null
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
    }

    componentDidMount() {
        this.loadItems()
    }

    handleMoreItems() {
        console.log('handleMoreItems')
        this.loadItems();
    }

    loadItems() {
        const {itemType} = this.props.match.params;
        const {recordsPerPage, searchText, priceFrom, priceTo, fromDate, toDate} = this.state
        const { items } = this.props;

        let fromDateFormatted = fromDate ? new Date(fromDate) : '';
        let fromDateFormattedDate = fromDate ? fromDateFormatted.getFullYear() + "/" + (fromDateFormatted.getMonth() + 1) + "/" + fromDateFormatted.getDate() : '';

        let toDateFormatted = toDate ? new Date(toDate) : '';
        let toDateFormattedDate = toDate ? toDateFormatted.getFullYear() + "/" + (toDateFormatted.getMonth() + 1) + "/" + toDateFormatted.getDate() : '';

        this.props.findByType(itemType, 
                              recordsPerPage, 
                              (searchText === '') ? items.length : 0, searchText,
                              (priceFrom && priceFrom > 0) ? priceFrom : '',
                              (priceTo && priceTo > 0) ? priceTo : '',
                              fromDate ? fromDateFormattedDate : '',
                              toDate ? toDateFormattedDate : '')                

        this.setState({totalRecordsLoaded : items.length + recordsPerPage})
    }

    handleSearch = event => {
        if(this.timeout){
            clearTimeout(this.timeout);
        }

        const text = event.target.value;
        
        this.timeout = setTimeout((e)=> {
            this.setState({searchText: text});
            console.log(this.state.searchText);
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

    onDateRangeChange(value) {
        if(value && value.length == 2){
            this.setState({fromDate:value[0].toDate(), toDate:value[1].toDate()})
        } else {
            this.setState({fromDate:null, toDate:null})
        }       
    }

    render() {
        const { Header, Footer, Sider, Content } = Layout;
        const { itemType } = this.props.match.params;
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
                               onDateRangeChange={this.onDateRangeChange}/>
                </Header>                
                <Content>
                    <ItemList items={items} 
                              category={itemType}
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
      items: state.items.items
    };
}

const mapDispatchToProps = {    
    ...itemActions
};
  
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(SearchResultPage));