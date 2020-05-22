import React from 'react';
import { Menu } from 'antd';
import CategoryList from './CategoryList';
import Loading from './Loading';
import Loader from './loader/Loader';
import SubscriptionModal from './SubscriptionModal';

export {
	Loading,
	Loader,
	CategoryList,
	SubscriptionModal,
	typeMenu
}

const typeMenu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
        </Menu>  
    )
}
