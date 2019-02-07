import React from 'react';
import { Translate } from "react-localize-redux";
import '../../../components/style/AddRetreatePage.css';
import { Link } from 'react-router-dom';

export class AddRetreatePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleSubmit(e) {
        e.preventDefault();
    }

    handleChange(event) {
    }

    render() {      
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center new-retreate">
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body">
                                <Translate>{({ translate }) =><h2>{translate("header.newretrite")}</h2>}</Translate>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <Translate>{({ translate }) =><label htmlFor="name">{translate("label.name")}</label>}</Translate>
                                        <input type="text" class="form-control" name="name"></input>
                                    </div>
                                    <div class="form-group">
                                        <Translate>{({ translate }) =><label htmlFor="details">{translate("label.details")}</label>}</Translate>
                                        <textarea type="text" class="form-control" name="details"></textarea>
                                    </div>                                
                                    <div className="form-group">
                                        <Translate>{({ translate }) =><button className="btn btn-primary">{translate("button.create")}</button>}</Translate>
                                        <Link to="/" className="btn btn-link">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 