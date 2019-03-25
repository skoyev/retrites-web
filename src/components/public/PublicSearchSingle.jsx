import React from 'react';
import './style/PublicSearch.css'
import { Translate } from "react-localize-redux";

class PublicSearchSingle extends React.Component {

    constructor(props) {
        super(props);
    }

    handleItemClick = (e) => {
        e.preventDefault()
        //let value = e.target.getAttribute('data-value').split('.').join('')
        //this.setState({ clickedItemName: e.target.getAttribute('data-value') })
    }

    render() {
        //let {name, menuItems} = this.props;
        return (
        <div className="slider-section">
            <h2>Search</h2>
            <section className="search-witget" role="navigation">        
                <div className="tab-content search-witget-content">
                    Content
                </div>        
            </section>
        </div>        
        )
    }
}

export default PublicSearchSingle;