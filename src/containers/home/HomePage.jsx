import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { PublicHeader, 
         PublicSearchSingle,
         Section, 
         ItemList} from '../../components/public';
import Footer from '../../components/common/Footer';

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
                {id:1, name:'public.label.yoga', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176466/medium-wide/Yoga.jpg'},
                {id:2, name:'public.label.plantmedicine', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/images/4314/medium-wide/ayahuasca-crop.jpg'},
                {id:3, name:'public.label.meditation', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176464/medium-wide/Meditation.jpg'},                
                {id:4, name:'public.label.nutrition', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176465/medium-wide/Nutrition.jpg'},                                
                {id:5, name:'public.label.artscreativitymovement', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/228634/medium-wide/iStock-821832920.jpg'},                                
                {id:6, name:'public.label.adventure', picture:'https://s3-us-west-2.amazonaws.com/prod.retreat.guru/assets/categories/176462/medium-wide/Adventure.jpg'}                                
            ],
            retreatByCountries : [
                {id:1, name:'public.label.bali', picture:'https://retreat.guru/images/locations/bali-temple-medium-wide.jpg'},
                {id:2, name:'public.label.india', picture:'https://retreat.guru/images/locations/india-temple-arch-medium-wide.jpg'},
                {id:3, name:'public.label.mexico', picture:'https://retreat.guru/images/locations/mexico-beach-medium-wide.jpg'},                
                {id:4, name:'public.label.costarica', picture:'https://retreat.guru/images/locations/costa-rica-statue-medium-wide.jpg'},                                
                {id:5, name:'public.label.peru', picture:'https://retreat.guru/images/locations/peru-machu-picchu-medium-wide.jpg'},                                
                {id:6, name:'public.label.california', picture:'https://retreat.guru/images/locations/california-yosemite-medium-wide.jpg'}                                
            ],
            ourVisionDescription : 'Our Vision Description'
        }
    }

    componentDidMount() {
        this.props.fetch()
    }

    render() {
        const { retreatTypes, retreatByCountries, ourVisionDescription } = this.state;
        const { items } = this.props;
        //console.log(items);
        return (
            <div>                
                {/* Home Header Section */}
                <PublicHeader/>
                {/*
                <Translate>{({ translate }) =>
                    <PublicSearch 
                        name={translate('public.slider.slider1')}
                        menuItems={menuItems}>
                    </PublicSearch>}
                    <PublicSearchSingle></PublicSearchSingle>
                </Translate>
                */}

                {/* Slider/Search Section */}
                <PublicSearchSingle/>                 

                {/* Retreat By Type Section */}
                <ItemList className="margin-top-bottom-50" 
                          items={retreatTypes}
                          type="Retreat By Type"
                          numItemsPerRow={3}/>

                {/* Our Vision Section */}
                <Section description={ourVisionDescription} />

                {/* Popular Retreats */}
                <ItemList className="margin-top-bottom-50" 
                          items={items}
                          type="Popular Retreat Centers"
                          numItemsPerRow={4}/>

                {/* Retreat By Countries Section */}
                <ItemList className="margin-top-bottom-50" 
                          items={retreatByCountries}
                          headerText="Retreat By Countries"
                          numItemsPerRow={3}/>

                <Footer text="Footer Text"/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
      items: state.items.items,
      shouldReloadItems: state.items.shouldReloadItems
    };
}

const mapDispatchToProps = {    
    ...itemActions
};

//export default withLocalize(HomePage);
export default withLocalize(connect(mapStateToProps, {fetch})(HomePage));