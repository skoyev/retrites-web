import React from 'react';
import { Translate } from "react-localize-redux";
import '../../style/AddRetreatePage.css';
import { Link } from 'react-router-dom';
import { itemActions } from '../../../store/action';
import Retrite from '../../../components/private/Retrite';
import { connect } from 'react-redux';

class AddRetreatePage extends React.Component {

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
        const data = new FormData(e.target);
        console.log(data)
        const { add } = this.props;

        const retrite = {
            name : data.get('name'), 
            description : data.get('description'),
            price : data.get('price'),
            currency : data.get('currency'),
            picture : data.get('picture'),
            location : data.get('location')
        };

        add(retrite);
    }

    handleChange(event) {
    }

    render() {      
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        
        return (
            <Retrite onCreateRetrite={this.handleSubmit}></Retrite>
        );
    }

} 

const mapDispatchToProps = {    
    ...itemActions
};  

export default connect(null, mapDispatchToProps)(AddRetreatePage);
