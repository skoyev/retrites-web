import React from 'react';

const RetreatDetails = ({item}) => (
 <div>
    <div>Name: {item ? item.name : ''}</div>
    <div>Description: {item ? item.description : ''}</div>
</div>
);

export default RetreatDetails;