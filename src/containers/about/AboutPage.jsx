import React from 'react';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import {userActions, itemActions, commonActions} from '../../store/action'
import './style.css'
import AppFooter from '../../components/common/AppFooter';
import SimpleHeader from '../../components/public/SimpleHeader';

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }  

    componentDidMount() {
        this.props.resetLogin();
        // fetch countries for retrites
        this.props.fetchCountries();
    }

    render() { 
        const {retreatByCountries} = this.props;       
        return (
            <React.Fragment>
                <SimpleHeader/>
                <div className="container content">
                    <h3>About Us</h3>
                    <div className="row">
                        <div className="col-md-3">
                            Each of you is perfect the way you are... and you can use a little improvement.
                            Shunryu Suzuki
                        </div>
                        <div className="col-md-9">
                            The global community of spiritual practitioners is growing and we are gathering here on Retreat Guru. Retreat Guru connects teachers, students, and retreat organizations together. In a nutshell we make it easier to find teachers and go on retreat.

                            Retreat Guru grew out of our former company Blue Mandala. Founded in 1998, Blue Mandala built websites and web services for spiritual retreat organizations and teachers.
                        </div>
                    </div>
                </div>

                <AppFooter title="@2019 Retreat In Mind Inc." 
                           countries={retreatByCountries}/>

            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {    
    ...itemActions, 
    ...commonActions, 
    ...userActions
};

function mapStateToProps(state) {
    return {
      isLoggedIn: state.users.isLoggedIn,
      retreatByCountries: state.items.retreatByCountries,
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(AboutPage));
