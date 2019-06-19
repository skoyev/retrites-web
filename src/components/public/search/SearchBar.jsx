import React from 'react';
import '../style/SearchBar.css'
import { Row, Button } from 'antd';

const SearchBar = () => {

    return (
        <Row style={{padding:'12px', borderTop:'1px solid #c3c2c2', borderBottom:'1px solid #c3c2c2', backgroundColor:'#ffffff'}}>
            <div style={{width: '80px', display: 'inline', marginRight: '10px'}}>
                <Button>Dates</Button>
            </div>
            <div style={{width: '80px', display: 'inline'}}>
                <Button>Price</Button>
            </div>
        </Row>
    )
}

export default SearchBar;