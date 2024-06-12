import React, { Fragment, useEffect, useState } from 'react';
import { fetchNewsByCategory } from '../../services/newsService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";

function DomesticNews() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수를 확인하기 위한 상태
    const pageSize = 10;

    const loadNews = async (page) => {
        const data = await fetchNewsByCategory('domestic', page, pageSize);
        setNews(data.articles);
        setTotalPages(Math.ceil(data.totalCount / pageSize)); // 총 페이지 수를 계산하여 설정
        window.scrollTo(0, 0); // 상태 업데이트 후 스크롤 이동
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
            <Breadcrumb parent="News / Domestic" title="국내 뉴스" />
            <Container fluid={true} className="mt-3">
                {news.map(item => (
                    <Row key={item.news_id} className="mb-4">
                        <Card>
                            <CardHeader className="b-t-primary border-3">
                                <h5>{item.news_title}</h5>
                            </CardHeader>
                            <CardBody>
                                <Row noGutters className="align-items-center">
                                    <Col md="6">
                                        <img src={item.news_thumb_url} alt={item.news_title} className="img-fluid" style={{ width: '80%', height: 'auto' }} />
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

export default DomesticNews;