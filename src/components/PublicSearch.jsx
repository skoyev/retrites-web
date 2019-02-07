import React from 'react';
import './style/PublicSearch.css'
import { Translate } from "react-localize-redux";

const PublicSearch = ({name, menuItems}) => (
 <div className="slider-section">
    <h2>{name}</h2>
    <section className="navbar search-witget" role="navigation">
        <nav className="navbar navbar-light">
            {menuItems.map((item, index) =>                
                <Translate>{({ translate }) =>
                    <a className="nav-link" key={index} href="#">{translate(`${item}`)}</a>}
                </Translate>
            )}
        </nav>
    </section>
</div>
);

export default PublicSearch;