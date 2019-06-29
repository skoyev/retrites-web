import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { itemActions } from '../../store/action';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import RetreatDetails from '../../components/public/retreat/RetreatDetails';
import RetreatBreadcrumb from '../../components/public/retreat/RetreatBreadcrumb';
import RetreatPhotoAlbum from '../../components/public/retreat/RetreatPhotoAlbum';
import RetreatDetailsSummary from '../../components/public/retreat/RetreatDetailsSummary';
import RetreatBookSection from '../../components/public/retreat/RetreatBookSection';
import { history } from '../../helpers';
import { Layout, Button } from 'antd';
import Header from 'antd/lib/calendar/Header';
import SearchHeader from '../../components/public/search/SearchHeader';
import '../style/RetreateDetailPage.css'

class RetreateDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onBack = this.onBack.bind(this);
    }  
    
    componentDidMount() {
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

    render() {      
        let {match : {params}, location : {search}} = this.props;
        //console.log(params.itemID);
        let category = search.split('=')[1];

        const { item  } = this.props;
        const { Header, Footer, Sider, Content } = Layout;
        
        return (
            <div>
                <Layout style={{background:'none'}}>
                    <Header className="sticky" style={{zIndex:10, backgroundColor:'#ffffff'}}>
                        <SearchHeader title="Retriete In Mind"></SearchHeader>
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
                        <RetreatPhotoAlbum item={item}></RetreatPhotoAlbum>
                        <RetreatDetails item={item}></RetreatDetails>
                        <RetreatBookSection item={item}></RetreatBookSection>
                        <RetreatDetailsSummary item={item}></RetreatDetailsSummary>                        
                    </Content>
                </Layout> 
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...itemActions
};  

function mapStateToProps(state) {
    console.log(state)
    return {
      item: state.items.item
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));