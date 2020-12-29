import React from 'react';
import Title from './title'
import Socials from './socials'
import { Col, Row, Container } from 'react-bootstrap';


function Home() {
    return (
        <div className="App-body">
            <div className="App-welcome">
                <Container className="App-center">
                    <Row className="justify-content-md-left">
                        <Col sm={{ span: 12 }} md={{ span: 10, offset: 2 }} lg={{ span: 9, offset: 3 }}>
                            <Title />
                            <Socials />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Home;