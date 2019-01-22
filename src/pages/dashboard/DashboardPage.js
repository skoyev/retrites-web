import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PrivateHeader from '../../components/PrivateHeader';
import {Footer} from '../../components/Footer';

export class DashboardPage extends React.Component {
    render() {
        //const { user, users } = this.props;
        return (
            <Container>
                <Row>
                    <PrivateHeader></PrivateHeader>
                </Row>
                <Row>
                    Dashboard
                </Row>
                <Row>
                    <Footer></Footer>
                </Row>
            </Container>
        )
    }
}