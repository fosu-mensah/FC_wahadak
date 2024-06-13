import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsDetail } from '../../services/newsService';
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

function NewsDetail() {
    const { newsId } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    useEffect(() => {
        const loadNewsDetail = async () => {
            const data = await fetchNewsDetail(newsId);
            setNewsDetail(data);
        };

        loadNewsDetail();
    }, [newsId]);

    if (!newsDetail) {
        return <div>Loading...</div>;
    }

    // news_img_url 필드를 배열 형태로 파싱
    const imageUrls = JSON.parse(newsDetail.news_img_url);
    const contentSegments = newsDetail.news_content.split('\n').filter(Boolean); // 본문 내용을 줄바꿈 기준으로 나누고 빈 줄 제거

    // 5줄씩 나누기
    const segmentGroups = [];
    for (let i = 0; i < contentSegments.length; i += 5) {
        segmentGroups.push(contentSegments.slice(i, i + 5));
    }

    return (
        <Container fluid={true} className="mt-3">
            <Breadcrumb parent="News / Domestic" title="국내 실축 뉴스" />
            <Row className="justify-content-center">
                <Card>
                    <CardHeader className="b-t-primary border-3 text-center">
                        <h5>{newsDetail.news_title}</h5>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="12">
                                {segmentGroups.map((group, index) => (
                                    <div key={index} className="mb-4">
                                        {imageUrls[index] && (
                                            <img
                                                src={imageUrls[index]}
                                                alt={`News detail ${index + 1}`}
                                                style={{ display: 'block', margin: '0 auto' }}
                                            />
                                        )}
                                        {group.map((line, idx) => (
                                            <p key={idx} style={{ fontSize: '1.10rem', marginTop: idx === 0 ? '1.5rem' : '0', textAlign: 'left' }}>{line}</p>
                                        ))}
                                    </div>
                                ))}
                                <div style={{ fontSize: '1rem', color: '#6c757d', textAlign: 'left' }}>
                                    {`${newsDetail.media_name} ${new Date(newsDetail.news_reg_date).toLocaleDateString('en-CA').replace(/\//g, '.')}`}
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    );
}

export default NewsDetail;