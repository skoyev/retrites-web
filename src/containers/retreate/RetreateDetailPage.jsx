import React from 'react';
import { Translate } from "react-localize-redux";
import { Link } from 'react-router-dom';
import { itemActions } from '../../store/action';
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import RetreatDetailHeader from '../../components/common/RetreatDetailHeader';
import RetreatDetails from '../../components/public/retreat/RetreatDetails';
import RetreatBookSection from '../../components/public/retreat/RetreatBookSection';
import { history } from '../../helpers';

class RetreateDetailPage extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }  
    
    componentDidMount() {
        let {match : {params}} = this.props;
        let itemID = params.itemID;
        const { fetchByID } = this.props;
        if(itemID){
            fetchByID(itemID);
        } else {
            console.log('Item ID is null');
        }
    }

    handleChange(event) {
    }

    onBack(event){
        event.preventDefault();
        history.push('/');
    }

    render() {      
        let {match : {params}} = this.props;
        console.log(params.itemID);

        const { item  } = this.props;
        //const { user, submitted } = this.state;
        
        return (
            <div>
                <RetreatDetailHeader text="Header"></RetreatDetailHeader>
                <div className="row">
                    <div className="col-md-8">
                        <RetreatDetails item={item}></RetreatDetails>
                    </div>
                    <div className="col-md-4">
                        <RetreatBookSection item={item}></RetreatBookSection>
                    </div>
                </div>
                <div className="row">
                    <Translate>
                        {({ translate }) =>
                            <button type="button" class="btn btn-outline-info" onClick={this.onBack}>{translate('button.go-back')}</button>
                        }
                    </Translate>
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
      item: state.items.item
    };
}

//export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage));
export default connect(mapStateToProps, mapDispatchToProps)(RetreateDetailPage);