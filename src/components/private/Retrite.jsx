import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const Retrite = ({onCreateRetrite}) => (
    <div className="container">
        <div className="row justify-content-center align-items-center new-retreate">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <Translate>{({ translate }) =><h2>{translate("header.newretrite")}</h2>}</Translate>
                        <form onSubmit={onCreateRetrite}>
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="name">{translate("label.name")}</label>}</Translate>
                                <input type="text" className="form-control" name="name"></input>
                            </div>
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="description">{translate("label.description")}</label>}</Translate>
                                <textarea type="text" className="form-control" name="description"></textarea>
                            </div>                                
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="price">{translate("label.price")}</label>}</Translate>
                                <input type="number" className="form-control" name="price"></input>
                            </div>
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="currency">{translate("label.currency")}</label>}</Translate>
                                <input type="text" className="form-control" name="currency"></input>
                            </div>
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="picture">{translate("label.picture")}</label>}</Translate>
                                <input type="text" className="form-control" name="picture"></input>
                            </div>
                            <div className="form-group">
                                <Translate>{({ translate }) =><label htmlFor="location">{translate("label.location")}</label>}</Translate>
                                <input type="text" className="form-control" name="location"></input>
                            </div>
                            <div className="form-group">
                                <Translate>{({ translate }) =><button className="btn btn-primary">{translate("button.create")}</button>}</Translate>
                                <Translate>{({ translate }) =><Link to="/" className="btn btn-link">{translate("button.cancel")}</Link>}</Translate>
                            </div>                        
                        </form>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Retrite.propTypes = {
    onCreateRetrite: PropTypes.func.isRequired
}

export default Retrite;