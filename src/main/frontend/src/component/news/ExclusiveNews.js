import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNewsByCategory } from '../../services/newsService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import './image.css';

function ExclusiveNews() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const loadNews = async (page) => {
        const data = await fetchNewsByCategory('exclusive', page, pageSize);
        setNews(data.articles);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        loadNews(currentPage);
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
            <Breadcrumb parent="News / Exclusive" title="442 독점 뉴스" />
            <Container fluid={true} className="mt-3">
                {news.map(item => (
                    <Row key={item.news_id} className="mb-4">
                        <Card>
                            <CardHeader className="b-t-primary border-3">
                                <Link to={`${process.env.PUBLIC_URL}/news/442exclusive/${item.news_id}`}>
                                    <h5>{item.news_title}</h5>
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Row noGutters className="align-items-center">
                                    <Col md="6">
                                        <img src={item.news_thumb_url} alt={item.news_title} className="img-fluid img-thumbnail" />
                                    </Col>
                                    <Col md="6">
                                        <div style={{ paddingLeft: '10px' }}>
                                            <p style={{ fontSize: '1.10rem', marginBottom: '1.5rem' }}>{item.news_summary}</p>
                                            <div style={{ fontSize: '1rem', color: '#6c757d' }}>
                                                {`${item.media_name} ${new Date(item.news_reg_date).toLocaleDateString('en-CA').replace(/\//g, '.')}`}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Row>
                ))}
                <Row>
                    <Col className="d-flex justify-content-center">
                        {renderPagination()}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default ExclusiveNews;
