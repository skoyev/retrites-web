import React from 'react';
import { Translate } from "react-localize-redux";
import './style/PublicTopMenu.css'

const style = {
    width: '100%'
};

const PublicTopMenu = ({name}) => (  
 <section role="navigation" className="navbar nav-top-bg">    
    <nav className="navbar navbar-light" style={style}>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.retrite")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.flights")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.hotels")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.cars")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.cruises")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.groups")}</a>}</Translate>
        <Translate>{({ translate }) =><a className="nav-link" href="#">{translate("public.menu.deals")}</a>}</Translate>
    </nav>
 </section>
);

export default PublicTopMenu;