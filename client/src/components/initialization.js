import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

function Initialization() {
    return (
        <div className="App-body">
            <div className="App-welcome">
                <Container className="App-center">
                    <Row className="justify-content-md-left">
                        <Col sm={{ span: 12 }} md={{ span: 10, offset: 2 }} lg={{ span: 9, offset: 3 }}>
                            <h1>Loading...</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Initialization;