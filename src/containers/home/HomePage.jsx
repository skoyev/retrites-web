import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PublicHeader from '../../components/public/PublicHeader';
import PublicTopMenu from '../../components/public/PublicTopMenu';
import PublicSearch from '../../components/public/PublicSearch';
import ItemList from '../../components/public/ItemList';
import NewsLetter from '../../components/public/NewsLetter';
import SocialMedia from '../../components/public/SocialMedia';
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
            ]
        }
    }

    componentDidMount() {
        this.props.fetch()
    }

    render() {
        const { menuItems } = this.state;
        const { items } = this.props;
        //console.log(items);
        return (
            <div>                
                <PublicHeader/>
                <PublicTopMenu name="PublicTopMenu"/>
                <Translate>{({ translate }) =>
                    <PublicSearch 
                        name={translate('public.slider.slider1')}
                        menuItems={menuItems}>
                    </PublicSearch>}
                </Translate>
                <ItemList className="margin-top-bottom-50" 
                          items={items}
                          numItemsPerRow={4}/>
                <NewsLetter name="NewsLetter"/>
                <SocialMedia name="SocialMedia"/>
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