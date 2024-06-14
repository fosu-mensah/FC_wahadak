import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import Bookmark from "./bookmark";
import man from "../../../assets/images/dashboard/user.png";
import { AlignCenter, FileText, User, Settings, LogOut, Search, MoreHorizontal } from "react-feather";
import { Row, Col, Form } from "reactstrap";
import { MENUITEMS } from "../sidebar/menu";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../api/apiClient"; // apiClient를 import

const Header = (props) => {
    const history = useNavigate();
    const [profile, setProfile] = useState("");
    const [name, setName] = useState("");
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const [searchValue, setsearchValue] = useState("");
    const [navmenu, setNavmenu] = useState(false);
    const [searchinput, setSearchinput] = useState(false);
    const [spinner, setspinner] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchResultEmpty, setSearchResultEmpty] = useState(false);
    const [sidebar, setSidebar] = useState("iconsidebar-menu");
    const [rightSidebar, setRightSidebar] = useState(true);
    const width = useWindowSize();

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            setsearchValue("");
        }
    }, []);

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

    useEffect(() => {
        if (width <= 991) {
            setSidebar("iconbar-second-close");
            document.querySelector(".iconsidebar-menu").classList.add("iconbar-second-close");
        } else {
            setSidebar("iconsidebar-menu");
            document.querySelector(".iconsidebar-menu").classList.remove("iconbar-second-close");
        }

        setProfile(localStorage.getItem("profileURL") || man);
        setName(localStorage.getItem("Name"));
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction, width]);

    // 순차적으로 API를 호출하는 함수
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
                    setSearchResult(players); // 검색 결과 저장
                } else {
                    setSearchResult([]); // 검색 결과가 없을 경우
                }
                setspinner(false);
            } catch (error) {
                console.error('Error fetching player data:', error);
                setSearchResult([]); // 검색 결과가 없을 경우
                setspinner(false);
            }
        } else {
            setSearchResult([]); // 검색어가 없으면 검색결과 지움
        }
    };

    const handleSearchKeyword = (keyword) => {
        setsearchValue(keyword);
        fetchPlayers(keyword);
    };

    const logOuts = () => {
        localStorage.removeItem("profileURL");
        history(`${process.env.PUBLIC_URL}/login`);
    };

    const addFix = () => {
        setSearchResult(true);
        document.querySelector(".Typeahead-menu").classList.add("is-open");
        document.body.classList.add("offcanvas");
    };

    const removeFix = () => {
        setSearchResult(false);
        setsearchValue("");
        document.querySelector(".Typeahead-menu").classList.remove("is-open");
        document.body.classList.remove("offcanvas");
    };

    const checkSearchResultEmpty = (items) => {
        if (!items.length) {
            setSearchResultEmpty(true);
            document.querySelector(".empty-menu").classList.add("is-open");
        } else {
            setSearchResultEmpty(false);
            document.querySelector(".empty-menu").classList.remove("is-open");
        }
    };

    const openCloseSidebar = (sidebartoggle) => {
        var isOpen = false;

        const mainMenuUl = [...document.querySelector(".iconMenu-bar").children];

        mainMenuUl.map((item) => {
            if (item.classList.value.includes("open")) {
                isOpen = true;
            }
            return item;
        });

        if (sidebartoggle === "iconsidebar-menu") {
            setSidebar("iconbar-second-close");
            document.querySelector(".iconsidebar-menu").classList.remove("iconbar-mainmenu-close");
            document.querySelector(".iconsidebar-menu").classList.add("iconbar-second-close");
        } else if (isOpen && sidebartoggle === "iconbar-second-close") {
            setSidebar("iconsidebar-menu");
            document.querySelector(".iconsidebar-menu").classList.remove("iconbar-second-close");
        } else if (!isOpen && sidebartoggle === "iconbar-second-close") {
            setSidebar("iconsidebar-menu");
            document.querySelector(".iconsidebar-menu").classList.add("iconbar-mainmenu-close");
            document.querySelector(".iconsidebar-menu").classList.remove("iconbar-second-close");
        }
    };

    const showRightSidebar = () => {
        if (rightSidebar) {
            setRightSidebar(!rightSidebar);
            document.querySelector(".right-sidebar").classList.add("show");
        } else {
            setRightSidebar(!rightSidebar);
            document.querySelector(".right-sidebar").classList.remove("show");
        }
    };

    const Navmenuhideandshow = () => {
        if (navmenu) {
            setNavmenu(!navmenu);
            document.querySelector(".nav-menus").classList.add("open");
        } else {
            setNavmenu(!navmenu);
            document.querySelector(".nav-menus").classList.remove("open");
        }
    };

    const openCloseSearch = () => {
        setSearchinput(!searchinput);
        document.querySelector(".Typeahead-input").classList.toggle("open");
        document.querySelector(".Typeahead-menu").classList.toggle("is-open");
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
                                style={{width: '100px', height: '95px'}}
                            />
                        </Link>
                    </div>
                </div>
                <div className="mobile-sidebar">
                    <div className="media-body text-end switch-sm">
                        <label className="switch ms-3">
                            <AlignCenter className="font-primary" onClick={() => openCloseSidebar(sidebar)} />
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
                                                   placeholder="선수 검색 ..." value={searchValue}
                                                   onChange={(e) => handleSearchKeyword(e.target.value)} autoComplete={"off"}/>
                                            <div className={`spinner-border Typeahead-spinner ${spinner === true ? "show" : ""}`}
                                                 role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <span className="d-sm-none mobile-search" onClick={openCloseSearch}>
                                                <Search/>
                                            </span>
                                        </div>
                                        <div className={`Typeahead-menu custom-scrollbar ${searchResult.length > 0 ? "is-open" : ""}`} id="search-outer" style={{width:"424px"}}>
                                            {searchResult && searchResult.length > 0 ? searchResult.map((data, index) => (
                                                <div className="ProfileCard u-cf" key={index}>
                                                    <div className="ProfileCard-avatar"
                                                         style={{width: '50px', height: '50px'}}>
                                                        <img
                                                            src={`${data["이미지 URL"]}`}
                                                            alt={data["선수이름"]}
                                                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                        />
                                                    </div>
                                                    <div className="ProfileCard-details">
                                                        <div className="ProfileCard-realName">
                                                            <Link
                                                                to={`/players/${data.pid}`}
                                                                className="realname"
                                                                onClick={() => {
                                                                    openCloseSearch();
                                                                }}
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

                        <Bookmark/>

                        <li className="onhover-dropdown">
                            <span className="media user-header">
                                <img className={profile === man ? "img-fluid" : "otheruser"} src={profile} alt=""/>
                            </span>
                            <ul className="onhover-show-div profile-dropdown">
                                <li className="gradient-primary">
                                    <h5 className="f-w-600 mb-0">{name}</h5>
                                    <span>Web Designer</span>
                                </li>
                                <li>
                                    <Link to={`${process.env.PUBLIC_URL}/users/user-profile`}>
                                        <User />
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`${process.env.PUBLIC_URL}/users/user-edit`}>
                                        <Settings />
                                        Settings
                                    </Link>
                                </li>
                                <li onClick={logOuts}>
                                    <LogOut />
                                    Logout
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-lg-none mobile-toggle pull-right" onClick={Navmenuhideandshow}>
                        <MoreHorizontal />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
