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

export class HomePage extends React.Component {
    render() {
        //const { user, users } = this.props;
        return (
            <div>
                <PublicHeader></PublicHeader>
                <PublicTopMenu name="PublicTopMenu"></PublicTopMenu>
                <PublicSearch name="PublicSearch"></PublicSearch>
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