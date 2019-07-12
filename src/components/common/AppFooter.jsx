import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const AppFooter = ({text}) => {
    return (
        <div className="row offset-10 footer">
            <div className="col-md-3">
                <h4 className="text-center">Retreate In Mind</h4>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">About Us</Link></li>
                    <li><Link to="/">Terms & Privacy</Link></li>
                </ul>
            </div>
            <div className="col-md-3">
                <h4 className="text-center">Top Locations</h4>
                <ul>
                    <li><Link to="/">Bali</Link></li>
                    <li><Link to="/">India</Link></li>
                    <li><Link to="/">Mexico</Link></li>
                    <li><Link to="/">Costa Rico</Link></li>
                    <li><Link to="/">Peru</Link></li>
                    <li><Link to="/">California</Link></li>
                </ul>
            </div>
            <div className="col-md-3">
                <h4 className="text-center">For Retreat Leaders</h4>
                <ul>
                    <li><Link to="/">Add a Retreate Into Listing</Link></li>
                </ul>
            </div>
            <div className="col-md-3">
                <h4 className="text-center">Join Us On</h4>
                <ul>
                    <li><Link to="/">Facebook</Link></li>
                    <li><Link to="/">Twitter</Link></li>
                    <li><Link to="/">Instagram</Link></li>
                </ul>
            </div>
        </div>
    )
}

AppFooter.propTypes = {
    text: PropTypes.string.isRequired
}


export default AppFooter;