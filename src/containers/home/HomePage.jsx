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
import {itemActions} from '../../store/action/index'

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
            itemType: 'retrite',
            menuItems : [
                'public.menu.retrite',
                'public.menu.flights',
                'public.menu.hotels',
                'public.menu.cars',
                'public.menu.cruises',
                'public.menu.groups'
            ],
            searchTypes: ['ALL', 'Yoga', 'Meditation'],
            ourVisionDescription : 'Our Vision Description',
            retreatByTypeTitle: 'Find Retreat By Type',
            retreatByTypeDescription: 'Find Out More About Our Amazing Retreats',
            popularRetreatTitle: 'Our Popular Destinations',
            popularRetreatDescription: 'Find Best Places For Yourself',
            retreatByCountriesTitle: 'Explore our sacred world',
            retreatByCountriesDescription: '',
            ourVisionTitle: 'Our Vision',
            ourVisionDescription: 'We believe human beings are innately wise, strong and kind. This wisdom, although not always experienced, is always present. Going on retreat is a beautiful way to reconnect to our basic sanity and health. Our aspiration at Retreat Your Mind is to inspire people to experience authentic retreats and reconnect with their innate wisdom, strength and kindness.'
        }
    }

    componentDidMount() {
        const {itemType} = this.state;
        // fetch popular
        this.props.fetch(itemType)
            .then(() => window.scrollTo(0, 0))               
        // fetch retreatByCountries
        this.props.fetchRetreatByCountries();
        // fetch retreatTypes
        this.props.fetchRetreatTypes();
        // fetch search retreat Types
        this.props.fetchSearchRetreatTypes();
    }

    search = () => {
        console.log('Data');
    }

    handleSearchTypeClick = (e) => {
        console.log(e);
    }

    render() {
        const { retreatByTypeTitle,
                retreatByTypeDescription,
                popularRetreatTitle,
                popularRetreatDescription,
                retreatByCountriesTitle,
                retreatByCountriesDescription,
                ourVisionTitle, ourVisionDescription, searchTypes } = this.state;
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
                                    types={searchTypes}/>                 

                <div className="container">
                    {/* Types Section */}
                    <CategoryList className="margin-top-bottom-50" 
                                  items={retreatTypes}
                                  title={retreatByTypeTitle}
                                  numItemsPerRow={4}
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
                    <ItemList className="margin-top-bottom-50" 
                            items={retreatByCountries}
                            title={retreatByCountriesTitle}
                            description={retreatByCountriesDescription}
                            shouldHideLoadMore={shouldHideLoadMore} 
                            headerText="Retreat By Countries"
                            numItemsPerRow={4}/>
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
      retreatTypes: state.items.retriteTypes
      //shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(HomePage));