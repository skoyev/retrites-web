import React from 'react';
import PropTypes from 'prop-types';

const RetreatPhotoAlbum = ({item}) => (
 <div style={{paddingBottom:'20px', borderBottom: '1px solid #c3c1c1'}}>
    <img src={item ? item.picture : ''}/>
</div>
);

RetreatPhotoAlbum.propTypes = {
    item: PropTypes.object.isRequired
}

export default RetreatPhotoAlbum;