import React from 'react';
import { Row, Col } from 'antd';
import './index.css';
import '../../../public/style/PublicSearch.css'
import { SearchBar } from '../../../public/search';

const HomeSearchSection = props => {
    return (
        <React.Fragment>
            <Row>
                {/* Slider/Search Section */}
                <SearchBar title="Find Wellness Amenity For Any Season" handleSearch={props.handleSearch}/>                 
            </Row>
        </React.Fragment>
    )
}

export default HomeSearchSection;