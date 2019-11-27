import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { PublicHeader, 
         PublicSearchSingle,
         Section, 
         ItemList} from '../../components/public';
import {CategoryList} from '../../components/common'
import AppFooter from '../../components/common/AppFooter';

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import {connect} from "react-redux";
import {itemActions, pageActions} from '../../store/action/index'
import { history } from '../../helpers';
import '../style/HomePage.css'

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
            selectedDurationValue: '',
            selectedStartDate: '',
            selectedInputSearchBy: '',
            selectedStartDate: '',
            ourVisionTitle: 'Our Vision',
            ourVisionDescription: 'We believe human beings are innately wise, strong and kind. This wisdom, although not always experienced, is always present. Going on retreat is a beautiful way to reconnect to our basic sanity and health. Our aspiration at Retreat Your Mind is to inspire people to experience authentic retreats and reconnect with their innate wisdom, strength and kindness.'
        }

        this.handleDurationClick = this.handleDurationClick.bind(this);
        this.handleInputSearchBy = this.handleInputSearchBy.bind(this);
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleRetreatCategoryClick = this.handleRetreatCategoryClick.bind(this);
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
        if(nextProps.nextPageName &&
            nextProps.nextPageName === 'search'){
            const {selectedSubcategoryId, 
                selectedDurationValue,
                selectedInputSearchBy,
                selectedStartDate } = this.state;     
            let param = `/items?subCategoryId=${selectedSubcategoryId}&duration=${selectedDurationValue}&name=${selectedInputSearchBy}&startDate=${selectedStartDate}`;
            history.push(param);    
        }
    } 

    handleRetreatCategoryClick = (id) => {        
        if(id){
            this.setState({selectedSubcategoryId: id}, () => {
                this.props.clearItemsAndNavigateToPage('search')
            });            
        }
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
                selectedDuration } = this.state;
        const { items, retreatByCountries, retreatTypes } = this.props;
        const shouldHideLoadMore = true;
        return (
            <div>                
                {/* Home Header Section */}
                <PublicHeader shouldShowAdd={true}/>

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
                                    length={searchLength}/>                 

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
                            numItemsPerRow={4}/>

                    {/* Retreat By Countries Section */}
                    <CategoryList className="margin-top-bottom-50" 
                                  items={retreatByCountries}
                                  title={retreatByCountriesTitle}
                                  numItemsPerRow={4}
                                  type="countryId"
                                  description={retreatByCountriesDescription}/>
                </div>

                <AppFooter text="Footer Text"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      items: state.items.items,
      retreatByCountries: state.items.retreatByCountries,
      retreatTypes: state.items.retriteTypes,
      nextPageName: state.items.pageName      
      //shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(HomePage));