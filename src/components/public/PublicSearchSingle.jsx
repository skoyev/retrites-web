import React from 'react';
import './style/PublicSearch.css'
import { Translate } from "react-localize-redux";
import { Icon, Button, Input, DatePicker, Select } from "antd";
import "antd/dist/antd.css";

class PublicSearchSingle extends React.Component {

    constructor(props) {
        super(props);
    }

    handleItemClick = (e) => {
        e.preventDefault()
        //let value = e.target.getAttribute('data-value').split('.').join('')
        //this.setState({ clickedItemName: e.target.getAttribute('data-value') })
    }

    render() {
        //let {name, menuItems} = this.props;
        const Search = Input.Search;
        const InputGroup = Input.Group;
        const Option = Select.Option;
        const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

        return (
        <div className="slider-section">
            <section className="search-witget" role="navigation">        
                <div className="tab-content search-witget-content"> 
                    <h3>Find Retreates For Any Season</h3>
                    <InputGroup compact>
                        <Input style={{ width: '40%', height: '35px' }} placeholder="Where would you like to go ?"/>
                        <RangePicker style={{ width: '30%', marginLeft: '5px', height: '35px' }} onChange={console.log()} />
                        <Button style={{ marginLeft: '5px', borderRadius: '5px', height: '35px' }} type="primary" icon="search">Search</Button>
                    </InputGroup>                                   
                </div>        
            </section>
        </div>        
        )
    }
}

export default PublicSearchSingle;