import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { PublicHeader, 
         PublicSearchSingle,
         Section, 
         ItemList} from '../../components/public';
import AppFooter from '../../components/common/AppFooter';

import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import {connect} from "react-redux";
import {fetch} from '../../store/action/index';
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
            menuItems : [
                'public.menu.retrite',
                'public.menu.flights',
                'public.menu.hotels',
                'public.menu.cars',
                'public.menu.cruises',
                'public.menu.groups'
            ],
            retreatTypes : [
                {id:1, typelink: 'items/yoga', name:'label.yoga', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176466/medium-wide/Yoga.jpg'},
                {id:2, typelink: 'items/plantmedicine', name:'label.plantmedicine', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/images/4314/medium-wide/ayahuasca-crop.jpg'},
                {id:3, typelink: 'items/meditation', name:'label.meditation', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176464/medium-wide/Meditation.jpg'},                
                {id:4, typelink: 'items/nutrition', name:'label.nutrition', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176465/medium-wide/Nutrition.jpg'},                                
                {id:5, typelink: 'items/artscreativitymovement', name:'label.artscreativitymovement', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/228634/medium-wide/iStock-821832920.jpg'},                                
                {id:6, typelink: 'items/adventure', name:'label.adventure', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176462/medium-wide/Adventure.jpg'},
                {id:7, typelink: 'items/massage', name:'label.massage', picture:'https://d3i11hp0zpbt87.cloudfront.net/media/W1siZiIsIjIwMTcvMDgvMjIvOGhxejd3bGFpdV9UaGlua3N0b2NrUGhvdG9zXzYzNjU2NTY2Ni5qcGciXSxbInAiLCJ0aHVtYiIsIjEyNDB4NjQwIyJdXQ?basename=Healing+Through+Massage&sha=4df29a0539e84518'},
                {id:8, typelink: 'items/cleansing', name:'label.cleansing', picture:'https://cdn.shopify.com/s/files/1/0795/1583/products/celery-detox_573568f0-3fc9-4041-9b25-e08ee392d743.jpg?v=1545264084'}                                
            ],
            retreatByCountries : [
                {id:1, name:'label.bali', picture:'https://retreat.guru/images/locations/bali-temple-medium-wide.jpg'},
                {id:2, name:'label.india', picture:'https://retreat.guru/images/locations/india-temple-arch-medium-wide.jpg'},
                {id:3, name:'label.mexico', picture:'https://retreat.guru/images/locations/mexico-beach-medium-wide.jpg'},                
                {id:4, name:'label.costarica', picture:'https://retreat.guru/images/locations/costa-rica-statue-medium-wide.jpg'},                                
                {id:5, name:'label.peru', picture:'https://retreat.guru/images/locations/peru-machu-picchu-medium-wide.jpg'},                                
                {id:6, name:'label.california', picture:'https://retreat.guru/images/locations/california-yosemite-medium-wide.jpg'},
                {id:7, name:'label.spain', picture:'https://inews.co.uk/wp-content/uploads/2019/06/shutterstock_712575202.jpg'},                                
                {id:8, name:'label.tibet', picture:'http://airtreks-wpengine.netdna-ssl.com/wp-content/uploads/tibetrestrictedtravel-e1472199850587.jpg'}                                
            ],
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
        this.props.fetch()
            .then(() => window.scrollTo(0, 0))               
    }

    search = () => {
        console.log('Data');
    }

    render() {
        const { retreatTypes, retreatByCountries, 
                retreatByTypeTitle,
                retreatByTypeDescription,
                popularRetreatTitle,
                popularRetreatDescription,
                retreatByCountriesTitle,
                retreatByCountriesDescription,
                ourVisionTitle, ourVisionDescription } = this.state;
        const { items } = this.props;
        const shouldHideLoadMore = true;
        //console.log(items);
        return (
            <div>                
                {/* Home Header Section */}
                <PublicHeader/>

                {/* Slider/Search Section */}
                <PublicSearchSingle title="Find Retreates For Any Season"
                                    search={this.search}/>                 

                <div className="container">
                    {/* Retreat By Type Section */}
                    <ItemList className="margin-top-bottom-50" 
                            items={retreatTypes}
                            title={retreatByTypeTitle}
                            description={retreatByTypeDescription}
                            shouldHideLoadMore={shouldHideLoadMore} 
                            numItemsPerRow={4}/>

                    {/* Our Vision Section */}
                    <Section description={ourVisionDescription} title={ourVisionTitle}/>

                    {/* Popular Retreats */}
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
    console.log(state)
    return {
      items: state.items.items,
      //shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, {fetch})(HomePage));