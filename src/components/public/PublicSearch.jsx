import React from 'react';
import './style/PublicSearch.css'
import { Translate } from "react-localize-redux";
import SearchRetreateSection from "./search/SearchRetreateSection";
import SearchFlightSection from "./search/SearchFlightSection";
import SearchHotelsSection from "./search/SearchHotelsSection";
import SearchCarsSection from "./search/SearchCarsSection";
import SearchCruisesSection from "./search/SearchCruisesSection";
import SearchGroupsSection from "./search/SearchGroupsSection";

const SEARCH_WITGET_COMPONENTS = {
    publicmenuretrite: <SearchRetreateSection name="SearchRetreateSection" />,
    publicmenuflights: <SearchFlightSection name="SearchFlightSection" />,
    publicmenuhotels:  <SearchHotelsSection name="SearchHotelsSection" />,
    publicmenucars:    <SearchCarsSection name="SearchCarsSection" />,
    publicmenucruises: <SearchCruisesSection name="SearchCruisesSection" />,
    publicmenugroups:  <SearchGroupsSection name="SearchGroupsSection" />,
}

class PublicSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: this.props.menuItems[0]
        };
    }

    handleItemClick = (e) => {
        e.preventDefault()
        //let value = e.target.getAttribute('data-value').split('.').join('')
        this.setState({ clickedItemName: e.target.getAttribute('data-value') })
    }

    render() {
        let {name, menuItems} = this.props;
        return (
        <div className="slider-section">
            <h2>{name}</h2>
            <section className="search-witget" role="navigation">
                <nav className="nav nav-tabs" role="tablist">
                    {menuItems.map((item, index) =>                
                        <Translate>{({ translate }) =>
                            <li className="nav-item">
                                <a className={`nav-link ${this.state.clickedItemName == item ? 'active' : ''}`} key={index} 
                                                        role="tab" 
                                                        data-toggle="tab"
                                                        data-value={item}
                                                        onClick={this.handleItemClick}
                                                        href={`#${item}`}>
                                    {translate(`${item}`)}
                                </a>
                            </li>
                            }
                        </Translate>
                    )}
                </nav>
        
                <div className="tab-content search-witget-content">
                    {menuItems.map((item, index) =>  
                        <div role="tabpanel" 
                            className={`tab-pane search-witget-content-tab fade in ${this.state.clickedItemName == item ? 'active show' : ''}`} 
                            id={`${item}`}>                            
                            {SEARCH_WITGET_COMPONENTS[item.split('.').join('')]}
                        </div>
                    )}              
                </div>        
            </section>
        </div>        
        )
    }
}

export default PublicSearch;