import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { itemActions } from '../../store/action';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import RetreatDetailHeader from '../../components/common/RetreatDetailHeader'

class RetreateDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }  
    
    componentDidMount() {
        let {match : {params}} = this.props;
        let itemID = params.itemID;
        if(itemID){
            this.props.fetchByID(itemID);
        } else {
            console.log('Item ID is null');
        }
    }

    handleChange(event) {
    }

    render() {      
        let {match : {params}} = this.props;
        console.log(params.itemID);
        //const { registering  } = this.props;
        //const { user, submitted } = this.state;
        
        return (
            <div>
                <RetreatDetailHeader text="Header"></RetreatDetailHeader>
                <div className="row">
                    <div className="col-md-8">
                        Col 1
                    </div>
                    <div className="col-md-4">
                        Col 2
                    </div>
                </div>
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...itemActions
};  

function mapStateToProps(state) {
    console.log(state)
    return {
      items: state.items.items,
      shouldReloadItems: state.items.shouldReloadItems
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));


//export default withLocalize(HomePage);
//export default withLocalize(connect(mapStateToProps, {fetch})(HomePage));
