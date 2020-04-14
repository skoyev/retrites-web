import React from 'react';
import PropTypes from 'prop-types';

const RetreatPhotoAlbum = ({item}) => (
 <div className="image" style={{paddingBottom:'20px'}}>
    <img src={item ? item.picture : ''}/>
</div>
);

RetreatPhotoAlbum.propTypes = {
    item: PropTypes.object.isRequired
}

export default RetreatPhotoAlbum;