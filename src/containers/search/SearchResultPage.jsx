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
        this.state = {
            totalRecordsLoaded: 0,
            recordsPerPage: 10,
            numItemsPerRow: 4
        }

        this.handleMoreItems = this.handleMoreItems.bind(this);
    }

    componentDidMount() {
        this.loadItems()
    }

    handleMoreItems() {
        console.log('handleMoreItems');
        this.setState({'recordsPerPage': 5})
        this.loadItems();
    }

    loadItems() {
        const {itemType} = this.props.match.params;
        const {recordsPerPage, totalRecordsLoaded} = this.state

        this.props.findByType(itemType, recordsPerPage, totalRecordsLoaded)        
        this.setState({totalRecordsLoaded : totalRecordsLoaded + recordsPerPage})
    }
        
    render() {
        const { Header, Footer, Sider, Content } = Layout;
        //const {itemType } = this.props.match.params;
        const { items } = this.props;
        const { numItemsPerRow } = this.state;

        return (
         <div className="search">
             <Layout>
                <Header><SearchHeader/></Header>
                <Content><SearchBar/></Content>
                <Content>
                    <ItemList items={items} 
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