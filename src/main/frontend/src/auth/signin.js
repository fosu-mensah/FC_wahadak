import React, { useState, useEffect } from "react";
import { Container, Row, Col, CardBody, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { handleLogin, handleSignup, getUserInfo, redirectToGoogleLogin } from "../services/authService";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [userPw, setUserPw] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const history = useNavigate();

  const loginAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await handleLogin({ email, password });
      toast.success("로그인 성공");
      history(`${process.env.PUBLIC_URL}`);
    } catch (error) {
      toast.error("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const signupAuth = async (event) => {
    event.preventDefault();
    if (name && email && userPw && nickname && phone && age) {
      try {
        await handleSignup({
          name,
          email,
          userPw,
          nickname,
          phone,
          age: parseInt(age, 10),
        });
        toast.success("회원가입 성공");
        history(`${process.env.PUBLIC_URL}/signin`);
      } catch (error) {
        toast.error("회원가입 실패");
      }
    } else {
      toast.error("모든 필드를 입력하세요");
    }
  };

  const toggleForm = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = sessionStorage.getItem("token");

      if (token) {
        try {
          const userInfo = await getUserInfo();
          console.log("User info:", userInfo);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      }
    };

    // 구글 로그인 후 URL에 포함된 토큰을 추출하여 세션 스토리지에 저장
    const handleToken = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const email = urlParams.get("email");
      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", email);
        history.replace(`${process.env.PUBLIC_URL}`);
        fetchUserInfo();
      }
    };

    handleToken();
  }, [history]);

  return (
      <div className="page-wrapper">
        <Container fluid={true} className="p-0">
          <div className="authentication-main m-0 only-login">
            <Row>
              <Col md="12">
                <div className="auth-innerright">
                  <div className="authentication-box">
                    <CardBody className="d-flex h-100">
                      <div className="cont text-center b-light">
                        <div className="form sign-in">
                          <Form className="theme-form" onSubmit={loginAuth}>
                            <h4>LOGIN</h4>
                            <h6>Enter your Username and Password</h6>
                            <FormGroup>
                              <Label className="col-form-label pt-0">Your Email</Label>
                              <Input
                                  className="form-control"
                                  type="email"
                                  name="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  placeholder="Email address"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="col-form-label">Password</Label>
                              <Input
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />
                            </FormGroup>
                            <div className="checkbox p-0">
                              <Input id="checkbox1" type="checkbox" />
                              <Label for="checkbox1">Remember me</Label>
                            </div>
                            <FormGroup className="d-flex flex-wrap mt-3 mb-0">
                              {loading ? (
                                  <Button color="primary d-block w-100" disabled={loading}>
                                    LOADING...
                                  </Button>
                              ) : (
                                  <Button color="primary d-block w-100" type="submit">
                                    LOGIN
                                  </Button>
                              )}
                            </FormGroup>
                            <div className="login-divider"></div>
                            <div className="social mt-3">
                              <Button color="social-btn btn-google" onClick={redirectToGoogleLogin}>
                                Google +{" "}
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <div className="sub-cont">
                          <div className="img">
                            <div className="img__text m--up">
                              <h2>New User?</h2>
                              <p>Sign up and discover great amount of new opportunities!</p>
                            </div>
                            <div className="img__text m--in">
                              <h2>One of us?</h2>
                              <p>If you already have an account, just sign in. We've missed you!</p>
                            </div>
                            <div className="img__btn" onClick={toggleForm}>
                              <span className="m--up">Sign up</span>
                              <span className="m--in">Sign in</span>
                            </div>
                          </div>
                          <div className="form sign-up">
                            <Form className="theme-form" onSubmit={signupAuth}>
                              <h4 className="text-center">NEW USER</h4>
                              <h6 className="text-center">Enter your Username and Password For Signup</h6>
                              <Row className="dflex">
                                <Col md="12">
                                  <FormGroup>
                                    <Input
                                        className="btn-pill"
                                        type="text"
                                        placeholder="이름"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="12">
                                  <FormGroup>
                                    <Input
                                        className="btn-pill"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <FormGroup>
                                <Input
                                    className="btn-pill"
                                    type="password"
                                    placeholder="비밀번호"
                                    value={userPw}
                                    onChange={(e) => setUserPw(e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="NickName"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                              </FormGroup>
                              <FormGroup>
                                <Input
                                    className="btn-pill"
                                    type="number"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                              </FormGroup>
                              <Row className="dflex">
                                <Col sm="4">
                                  <Button color="primary" type="submit">
                                    Sign Up
                                  </Button>
                                </Col>
                                <Col sm="8">
                                  <div className="text-start mt-2 m-l-20">
                                    Are you already user?{" "}
                                    <Link to={`${process.env.PUBLIC_URL}/signin`} className="btn-link text-capitalize">
                                      Login
                                    </Link>
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <ToastContainer />
        </Container>
      </div>
  );
};

export default Signin;