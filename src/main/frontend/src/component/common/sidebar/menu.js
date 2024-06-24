import React from "react";

export const MENUITEMS = [
  {
    title: "선수 검색",
    icon: <img src={`${process.env.PUBLIC_URL}/assets/images/seasons/son.png`} alt="선수 검색"
               style={{width: '60px', height: '60px'}}/>,
    type: "sub",
    path: ``,
    active: true,
    children: [
      { title: "선수 검색", type: "sub" },
      {
        title: "선수 검색",
        type: "link",
        path: `${process.env.PUBLIC_URL}/search`,
      },
      {
        title: "팀컬러 목록",
        type: "link",
        path: `${process.env.PUBLIC_URL}/team-color-list`,
      },
    ],
  },
  {
    title: "스쿼드 메이커",
    icon: <i className="icofont icofont-ui-clip-board"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "스쿼드 메이커", type: "sub" },
      {
        title: "나만의 포메이션 만들기",
        type: "link",
        path: `${process.env.PUBLIC_URL}/squad-maker`,
      },
      {
        title: "스쿼드 목록",
        type: `link`,
        path: `${process.env.PUBLIC_URL}/squad-list`,
      },
    ],
  },
  {
    title: "커뮤니티",
    icon: <i className="icofont icofont-people"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "커뮤니티", type: "sub" },
      {
        title: "자유게시판",
        type: "link",
        path: `${process.env.PUBLIC_URL}/community/자유게시판`,
      },
      {
        title: "선수 자랑",
        type: "link",
        path: `${process.env.PUBLIC_URL}/community/선수 자랑`,
      },
      {
        title: "팀 질문",
        type: "link",
        path: `${process.env.PUBLIC_URL}/community/팀 질문`,
      },
    ],
  },
  {
    title: "실축 근황",
    icon: <span style={{ fontSize: '2em' }}>⚽︎</span>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "뉴스", type: "sub" },
      {
        title: "FourFourTwo 독점 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/442exclusive`,
      },
      {
        title: "해외 실축 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/international`,
      },
      {
        title: "국내 실축 뉴스",
        type: "link",
        path: `${process.env.PUBLIC_URL}/news/domestic`,
      },
    ],
  },
  {
    title: "이벤트",
    icon: <i className="icofont icofont-gift"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "이벤트", type: "sub" },
      {
        title: "FC wahadak 이벤트",
        type: "link",
        path: `${process.env.PUBLIC_URL}/pages/comingsoon-bg-image`,
      },
      {
        title: "FC Online 이벤트",
        type: "link",
        path: `${process.env.PUBLIC_URL}/event/FCOnlineEvnet`,
      },
    ],
  },
  {
    title: "갱신 시간",
    icon: <i className="icofont icofont-ui-clock"></i>,
    type: "sub",
    path: ``,
    active: false,
    children: [
      { title: "갱신 시간", type: "sub" },
      {
        title: "갱신 시간 목록",
        type: "link",
        path: `${process.env.PUBLIC_URL}/refresh-time-list`,
      },
    ],
  },
];