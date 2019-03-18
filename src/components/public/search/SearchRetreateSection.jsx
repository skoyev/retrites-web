import React from 'react';
import { Translate } from "react-localize-redux";
import '../style/SearchRetreateSection.css'

const SearchRetreateSection = ({name}) => (
 <div>
     <form name="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
            <input type="text" placeholder="Destination" className="form-control" name="destination"></input>
        </div>
        <div className="form-group">
            <input type="text" placeholder="To" className="form-control" name="to"></input>
        </div>
        <div className="form-group row">
            <div className="col-sm-6">
                <input type="text" placeholder="Depart" className="form-control" name="depart"></input>
            </div>
            <div className="col-sm-6">
                <input type="text" placeholder="Duration" className="form-control" name="duration"></input>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-6">
                <input type="text" placeholder="Room #" className="form-control" name="roomnum"></input>
            </div>
            <div className="col-sm-6">
                <input type="text" placeholder="Guests" className="form-control" name="guests"></input>
            </div>
        </div>
        <div className="form-group row padding-15">
            <Translate>
                {({ translate }) =>
                    <button className="btn btn-primary" onClick={this.handleSearch}>{translate('button.search')}</button>
                }
            </Translate>
        </div>
     </form>
 </div>
);

export default SearchRetreateSection;