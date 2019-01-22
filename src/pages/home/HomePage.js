import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PublicHeader from '../../components/PublicHeader';
import {Footer} from '../../components/Footer';

export class HomePage extends React.Component {
    render() {
        //const { user, users } = this.props;
        return (
            <div>
                <PublicHeader></PublicHeader>
                <div className="col-md-6 col-md-offset-3">
                    Home
                </div>
                <Footer></Footer>
            </div>
        )
    }
}