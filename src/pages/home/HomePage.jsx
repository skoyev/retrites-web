import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PublicHeader from '../../components/PublicHeader';
import PublicTopMenu from '../../components/PublicTopMenu';
import PublicSearch from '../../components/PublicSearch';
import BestDeals from '../../components/BestDeals';
import NewsLetter from '../../components/NewsLetter';
import SpecialOffer from '../../components/SpecialOffer';
import PopularPlaces from '../../components/PopularPlaces';
import SocialMedia from '../../components/SocialMedia';
import {Footer} from '../../components/Footer';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize, Translate } from "react-localize-redux";
import globalTranslations from "../../translations/global.json";
import LanguageToggle from '../../components/LanguageToggle';

class HomePage extends React.Component {

    constructor(props){
        super(props);
        this.props.initialize({
            languages: [
                {name : "English", code: "en"},
                {name : "French", code: "fr"}
            ],
            translation: globalTranslations,
            options: { renderToStaticMarkup }
        });

        this.state = {
            menuItems : [
                'public.menu.retrite',
                'public.menu.flights',
                'public.menu.hotels',
                'public.menu.cars',
                'public.menu.cruises',
                'public.menu.groups'
            ]
        }
    }

    render() {
        const { menuItems } = this.state;
        return (
            <div>                
                <PublicHeader></PublicHeader>
                <PublicTopMenu name="PublicTopMenu"></PublicTopMenu>
                <Translate>{({ translate }) =>
                    <PublicSearch 
                        name={translate('public.slider.slider1')}
                        menuItems={menuItems}>
                    </PublicSearch>}
                </Translate>
                <BestDeals name="BestDeals"></BestDeals>
                <NewsLetter name="NewsLetter"></NewsLetter>
                <SpecialOffer name="SpecialOffer"></SpecialOffer>
                <PopularPlaces name="PopularPlaces"></PopularPlaces>
                <SocialMedia name="SocialMedia"></SocialMedia>
                <Footer></Footer>
            </div>
        )
    }
}

export default withLocalize(HomePage);