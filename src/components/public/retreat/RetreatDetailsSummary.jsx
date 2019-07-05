import React from 'react';
import { Card } from 'antd';

const RetreatDetailsSummary = ({item}) => (
 <div>
    <Card title={'Name:  ' + item.name }>
      <p>{item.description}</p>
    </Card>    
</div>
);

export default RetreatDetailsSummary;