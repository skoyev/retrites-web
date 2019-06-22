import React from 'react';
import { userActions } from '../../store/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { Row, Layout } from "antd";
import { SearchHeader, SearchResultListing, ItemList } from "../../components/public";
import { SearchBar } from "../../components/public/search";
import '../style/SearchResultPage.css';
import {itemActions} from '../../store/action'

class SearchResultPage extends React.Component {

    constructor(props) {
        super(props);
        this.timeout =  null;
        this.state = {
            totalRecordsLoaded: 0,
            recordsPerPage: 10,
            numItemsPerRow: 4,
            searchText: '',
            delay: 1500
        }

        this.handleMoreItems = this.handleMoreItems.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
        const {recordsPerPage, searchText} = this.state
        const { items } = this.props;

        this.props.findByType(itemType, recordsPerPage, 
            (searchText === '') ? items.length : 0, searchText)                

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
                    <SearchBar/>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SearchResultPage);