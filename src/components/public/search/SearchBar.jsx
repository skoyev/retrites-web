import React, {useState} from 'react';
import '../style/SearchBar.css'
import { Row, Button, Col, Menu, Icon, Card, DatePicker, Input, Modal } from 'antd';
//import SubMenu from 'antd/lib/menu/SubMenu';
import PropTypes from 'prop-types'

const { SubMenu }  = Menu;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const DatePickerCmp = ({isDatePickerVisible}) => 
    <Modal  visible={isDatePickerVisible}
            title={"Change Date"}
            footer={[
                <Button key="back" onClick={()=>console.log()}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={()=>console.log()}>Save</Button>
            ]}>
            <div>Date Picker</div>
    </Modal>

const SearchBar = props => {
    const { handleSubmitSearch, handlePriceFromChange, 
            handlePriceToChange, onDateRangeChange, 
            handleBack, startDate} = props;
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const handleShowDatePicker = () => {
        setIsDatePickerVisible(true);
    }
    return (
        <React.Fragment>
            <Row className="searchBar" gutter={8}>
                <Col span={2}>
                    <Button onClick={()=>console.log()}>{`Country`}</Button>
                </Col>
                <Col span={2} style={{width:'6.5%'}}>
                    <Button onClick={()=>console.log()}>{`Type`}</Button>
                </Col>
                <Col span={3}>
                    <Button onClick={handleShowDatePicker}>{`Start: ${startDate}`}</Button>
                </Col>
                <Col span={2}>
                    <Button onClick={()=>console.log()}>{`Duration`}</Button>
                </Col>
                <Col span={3}>
                    <Button onClick={()=>console.log()}>{`More Filters...`}</Button>
                </Col>
                {/*
                <Col span={2}>
                    <Button htmlType="submit" style={{marginLeft:15}}>Apply</Button>
                </Col>
                */}
                <Col span={2}>
                    <Button onClick={handleBack}>Back</Button>
                </Col>

                {/*
                <form name="search-form" onSubmit={handleSubmitSearch}>
                    <Row gutter={8}>
                        <Col span={5}>
                            <Button onClick={handleShowDatePicker}>{`Start: ${startDate}`}</Button>
                            <RangePicker onChange={onDateRangeChange}
                                        placeholder={['Start Course', 'End Course']}/>
                        </Col>
                        <Col span={3}>
                            <Input placeholder="Price From" defaultValue="" type="number" onChange={handlePriceFromChange}/>
                        </Col>
                        <Col span={3}>
                            <Input placeholder="Price To" defaultValue="" type="number" onChange={handlePriceToChange}/>
                        </Col>
                    </Row>
                </form>
                */}
            </Row>            
            <DatePickerCmp isDatePickerVisible={isDatePickerVisible}/>
        </React.Fragment>
    )
}

SearchBar.propTypes = {
    handleSubmitSearch: PropTypes.func.isRequired,
    handlePriceFromChange: PropTypes.func.isRequired,
    handlePriceToChange: PropTypes.func.isRequired,
    onDateRangeChange: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
}

export default SearchBar;
