import React from 'react';

const style = {
    width: '100%'
};

const PublicTopMenu = ({name}) => (  
 <section role="navigation" class="navbar">
    <nav class="navbar navbar-light bg-light" style={style}>
        <a class="nav-link" href="#">Retreates</a>
        <a class="nav-link" href="#">Flights</a>
        <a class="nav-link" href="#">Hotels</a>
        <a class="nav-link" href="#">Cars</a>
        <a class="nav-link" href="#">Cruises</a>
        <a class="nav-link" href="#">Groups</a>
        <a class="nav-link" href="#">Deals</a>
    </nav>
 </section>
);

export default PublicTopMenu;