import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
} from "reactstrap";
const Avatars = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Avatars" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Sizing</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="avatars">
                      <div className="avatar">
                        <Media
                          body
                          className="img-100 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-90 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-80 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-70 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-60 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-50 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-40 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-30 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-20 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Status Indicator</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="avatars">
                      <div className="avatar">
                        <Media
                          body
                          className="img-100 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-100 bg-success"> </div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-90 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-90"></div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-80 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-80 bg-success"></div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-70 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-70"></div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-60 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-60 bg-success"></div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-50 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-50"> </div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-40 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-40"></div>
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-30 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                        <div className="status status-30"></div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Initials</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="avatars">
                      <div className="avatar">
                        <Media
                          body
                          className="img-100 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-90 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-80 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-70 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-60 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-50 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-40 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-30 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-20 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-10 rounded-circle"
                          src={require("../../assets/images/user/16.png")}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6 xl-100 box-col-12">
              <Card>
                <CardHeader>
                  <h5>Shape</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="avatars">
                      <div className="avatar">
                        <Media
                          body
                          className="img-100 b-r-8"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-90 b-r-30"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-80 b-r-35"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-70 rounded-circle"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-60 b-r-25"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar">
                        <Media
                          body
                          className="img-50 b-r-15"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="6 xl-100 box-col-12">
              <Card>
                <CardHeader>
                  <h5>Ratio</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="avatars">
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-100"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-90"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-80"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-70"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-60"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                      <div className="avatar ratio1">
                        <Media
                          body
                          className="b-r-8 height-50"
                          src={require("../../assets/images/user/10.jpg")}
                          alt="#"
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Groups</h5>
                </CardHeader>
                <CardBody>
                  <div className="avatar-showcase">
                    <div className="customers d-inline-block avatar-group">
                      <ul>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-70 rounded-circle"
                            src={require("../../assets/images/user/3.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-70 rounded-circle"
                            src={require("../../assets/images/user/8.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-70 rounded-circle"
                            src={require("../../assets/images/user/10.jpg")}
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="customers d-inline-block avatar-group">
                      <ul>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-50 rounded-circle"
                            src={require("../../assets/images/user/3.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-50 rounded-circle"
                            src={require("../../assets/images/user/8.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-50 rounded-circle"
                            src={require("../../assets/images/user/10.jpg")}
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="customers d-inline-block avatar-group">
                      <ul>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-40 rounded-circle"
                            src={require("../../assets/images/user/3.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-40 rounded-circle"
                            src={require("../../assets/images/user/8.jpg")}
                            alt=""
                          />
                        </li>
                        <li className="d-inline-block">
                          <Media
                            body
                            className="img-40 rounded-circle"
                            src={require("../../assets/images/user/10.jpg")}
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Avatars;
