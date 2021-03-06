import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import "./style/AppFooter.css";
import { Translate } from "react-localize-redux";

const AppFooter = ({title, countries}) => {
    return (
        <React.Fragment>
            <div className="footer">
                <div className="row offset-10">
                    <div className="col-md-3">
                        <h4 className="text-center">Retreate In Mind</h4>
                        <ul>                            
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4 className="text-center">Top Locations</h4>
                        <ul>
                            {countries.map((c, index) => 
                                <li key={index}>
                                    <Translate>
                                        {({ translate }) =>                                                
                                        <Link to={`/items?subCategoryId=0&duration=&name=&startDate=&countryId=${c.id}`}>{translate(`label.${c.name.toLowerCase()}`)}</Link>}                                                 
                                    </Translate>     
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4 className="text-center">For Retreat Leaders</h4>
                        <ul>
                            <li><Link to="/add">Add a Retreate</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h4 className="text-center">Social Networks</h4>
                        <ul>
                            <li><a target="_blank" href="https://www.facebook.com/retreatyourmind">Facebook</a></li>
                            <li><a target="_blank" href="https://www.instagram.com/retreatmind/">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <div className="row offset-10 gray">
                    <h4 className="vertical-space" style={{margin:'auto', marginTop:50}}>{title}</h4>
                </div>
            </div>
        </React.Fragment>
    )
}

AppFooter.propTypes = {
    title: PropTypes.string.isRequired,
    countries: PropTypes.array.isRequired
}


export default AppFooter;