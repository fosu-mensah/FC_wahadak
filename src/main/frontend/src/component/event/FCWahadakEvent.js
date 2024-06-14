import React, { Fragment, useEffect, useState } from 'react';
import { fetchFCWahadakEvents } from '../../services/eventService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';

const FCWahadakEvent = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const loadEvents = async (page) => {
        const data = await fetchFCWahadakEvents(page, pageSize);
        setEvents(data.events);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        loadEvents(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Button
                    key={i}
                    color={i === currentPage ? 'primary' : 'secondary'}
                    onClick={() => handlePageChange(i)}
                    className="mx-1"
                >
                    {i}
                </Button>
            );
        }
        return pages;
    };

    return (
        <Fragment>
            <Breadcrumb parent="Event" title="FC Wahadak Event" />
            <Container fluid={true}>
                <Row>
                    {events.map(event => (
                        <Col sm="12" xl="6" key={event.event_id}>
                            <Card>
                                <CardHeader className="bg-primary">
                                    <h5>{event.event_title}</h5>
                                </CardHeader>
                                <CardBody>
                                    <img
                                        src={`${process.env.PUBLIC_URL}${event.event_img_url}`}
                                        alt={event.event_title}
                                        className="img-fluid"
                                        style={{ width: '100%', height: 'auto', marginBottom: '15px' }}
                                    />
                                    <p className="text-muted">이벤트 기간 : {event.event_date_start} - {event.event_date_end}</p>
                                </CardBody>
                                <CardFooter>
                                    <a href={event.event_url} className="btn btn-primary">이벤트 바로가기</a>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        {renderPagination()}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default FCWahadakEvent;