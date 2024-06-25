import React, { useState, useCallback, useLayoutEffect, useEffect } from "react";
import { Row, Col, Form } from "reactstrap";
import { MENUITEMS } from "../sidebar/menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../../api/apiClient";
import { handleLogout, getUserInfo } from "../../../services/authService";
import { FaSignInAlt, FaSignOutAlt, FaSmile } from 'react-icons/fa';

const Header = (props) => {
    const history = useNavigate();
    const location = useLocation();
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const [searchValue, setsearchValue] = useState("");
    const [spinner, setspinner] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const width = useWindowSize();
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
    const [userData, setUserData] = useState(null);

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setsearchValue("");
            setSearchResult([]);
        }
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const fetchUserInfo = async () => {
                try {
                    const userInfo = await getUserInfo();
                    setUserData(userInfo);
                } catch (error) {
                    console.error("Failed to fetch user info:", error);
                    setIsLoggedIn(false);
                }
            };
            fetchUserInfo();
        }
    }, [location.search]);

    useEffect(() => {
        console.log("isLoggedIn 상태:", isLoggedIn);
        console.log("userData 상태:", userData);
    }, [isLoggedIn, userData]);

    useEffect(() => {
        window.addEventListener("keydown", escFunction);
        return () => {
            window.removeEventListener("keydown", escFunction);
        };
    }, [escFunction]);

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth]);
            }
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
        }, []);
        return size;
    }

    const fetchPlayers = async (keyword) => {
        if (keyword && keyword.length > 0) {
            setspinner(true);
            try {
                console.log("Sending request to /players/search/main with pname:", keyword);
                const response = await apiClient.post("/players/search/main", { pname: keyword });
                console.log(response);
                if (response.status === 200) {
                    const players = response.data.map(player => ({
                        ...player,
                        "시즌 URL": player["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', 'assets/images/seasons/')
                    }));
                    setSearchResult(players);
                } else {
                    setSearchResult([]);
                }
                setspinner(false);
            } catch (error) {
                console.error('Error fetching player data:', error);
                setSearchResult([]);
                setspinner(false);
            }
        } else {
            setSearchResult([]);
        }
    };

    const handleSearchKeyword = (keyword) => {
        setsearchValue(keyword);
        if (keyword.length === 0) {
            setSearchResult([]); // 입력 필드가 비어 있을 때 검색 결과 초기화
        } else {
            fetchPlayers(keyword);
        }
    };

    const handlePlayerClick = () => {
        setSearchResult([]); // 검색 결과 초기화하여 목록 창 닫기
    };

    const logout = () => {
        handleLogout();
        setIsLoggedIn(false);
        setUserData(null);
        alert("로그아웃 성공");
        history(`${process.env.PUBLIC_URL}`); // 로그아웃 후 /signin 페이지로 리디렉션
    };

    const redirectToLogin = () => {
        history(`${process.env.PUBLIC_URL}/signin`);
    };

    return (
        <div className="page-main-header">
            <div className="main-header-right">
                <div className="main-header-left text-center">
                    <div className="logo-wrapper">
                        <Link to={`${process.env.PUBLIC_URL}`}>
                            <img
                                src={require("../../../assets/images/logo/logo1.png")}
                                alt="FC Wahadak Logo"
                                style={{
                                    width: '100px',
                                    height: '95px',
                                    transition: 'transform 1s ease-in-out'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'rotate(360deg)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg)'}
                            />
                        </Link>
                    </div>
                </div>
                <div className="mobile-sidebar">
                    <div className="media-body text-end switch-sm">
                        <label className="switch ms-3">
                        </label>
                    </div>
                </div>
                <div className="nav-right col pull-right right-menu">
                    <ul className="nav-menus">
                        <li>
                            <Form className="form-inline search-form" action="#javascript" method="get">
                                <div className="form-group">
                                    <div className="Typeahead Typeahead--twitterUsers">
                                        <div className="u-posRelative">
                                            <input className="Typeahead-input form-control-plaintext" id="demo-input" type="text"
                                                   placeholder="선수를 검색하세요...!" value={searchValue}
                                                   onChange={(e) => handleSearchKeyword(e.target.value)}
                                                   autoComplete={"off"} />
                                            <div className={`spinner-border Typeahead-spinner ${spinner === true ? "show" : ""}`}
                                                 role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="d-sm-none mobile-search">
                                            </span>
                                        </div>
                                        <div className={`Typeahead-menu custom-scrollbar ${searchResult.length > 0 ? "is-open" : ""}`} id="search-outer" style={{ width: "424px" }}>
                                            {searchResult && searchResult.length > 0 ? searchResult.map((data, index) => (
                                                <div className="ProfileCard u-cf" key={index}>
                                                    <div className="ProfileCard-avatar"
                                                         style={{ width: '50px', height: '50px' }}>
                                                        <img
                                                            src={`${data["이미지 URL"]}`}
                                                            alt={data["선수이름"]}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div className="ProfileCard-details">
                                                        <div className="ProfileCard-realName">
                                                            <Link
                                                                to={`${process.env.PUBLIC_URL}/player/${data.pid}`}
                                                                className="realname"
                                                                onClick={handlePlayerClick} // 클릭 시 검색 결과 초기화
                                                            >
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/${data["시즌 URL"]}`}
                                                                    alt={data["시즌"]}
                                                                    style={{ marginTop: '-2px' }}
                                                                /> {data["선수이름"]}
                                                            </Link>
                                                        </div>
                                                        <div className="ProfileCard-description">
                                                            급여: {data["급여"]} - {data["포지션 스탯"] ?
                                                            Object.entries(data["포지션 스탯"]).map(([key, value], index) => (
                                                                <span key={key}>
                                                                        {key}: {value}
                                                                    {index < Object.entries(data["포지션 스탯"]).length - 1 ? ' ' : ''}
                                                                    </span>
                                                            ))
                                                            : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : <div className="EmptyMessage">No players found.</div>}
                                        </div>
                                        <div className="Typeahead-menu empty-menu">
                                            <div className="tt-dataset tt-dataset-0">
                                                <div className="EmptyMessage">Opps!! There are no result found.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </li>
                        {isLoggedIn && userData && (
                            <li className="nav-item">
                                <span className="nav-link">
                                    {userData.nickname}님! 환영합니다! <FaSmile style={{ color: 'purple', fontSize: '24px' }} />
                                </span>
                            </li>
                        )}
                        <li className="nav-item">
                            {isLoggedIn ? (
                                <button className="btn btn-link" onClick={logout} style={{ color: 'purple', textDecoration: 'none' }}>
                                    <FaSignOutAlt style={{ color: 'purple', fontSize: '24px' }} /> Logout
                                </button>
                            ) : (
                                <button className="btn btn-link" onClick={redirectToLogin} style={{ color: 'purple', textDecoration: 'none' }}>
                                    Login <FaSignInAlt style={{ color: 'purple', fontSize: '24px' }} />
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;