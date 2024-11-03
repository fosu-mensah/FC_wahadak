# ⚽AWS Cloud Fundamentals - FC wahadak

이 프로젝트는 한국의 최대 규모 온라인 게임 기업인 넥슨의 스포츠 게임인 FC Online의 선수 데이터를 활용하여, 선수 검색 및 비교, 팀스쿼드 제작을
위한 웹 서비스입니다. 저희 팀은 서로의 취미와 관심사를 공유하는 과정에서 FC Online 게임을 좋아하는 공통점을 발견했습니다. FC Online을 하며 느꼈던 
아쉬운 점들을 해결하기 위해, AWS Cloud를 활용한 FC Online 게임 도우미 웹 프로젝트를 만들게 되었습니다.

## 🗓️개발 기간

- 시작일: 2024.04.19
- 종료일: 2024.06.25

## 👨‍💻개발자 소개 및 역할 분담

저희는 서경대학교 소프트웨어학과 학생으로, "서경 SW전문 인재양성 교육"의 팀 프로젝트 파트너로 만나게 되었습니다.
기능별로 작업 분량을 나누어, 기획/디자인, 데이터 수집, 백앤드, 프론트앤드 작업 등을 각각 실시하였습니다.

- 🧒**김영재**
- 👦**이은학**

## 💻개발 환경

- 운영 체제: Windows 11, macOS
- IDE: IntelliJ IDEA
- 기타 도구: Postman, Swaager

## ⚙️사용기술 및 라이브러리

- 언어:
    - Python (BeautifulSoup, Selenium)
    - Java (Spring Boot)
    - JavaScript (React)
- 프론트엔드:
    - SCSS
    - JavaScript
    - React
- 백앤드
    - java (Spring Boot, Spring Security, MyBatis)
    - Python (데이터 크롤링)
- 데이터베이스
    - MySQL (AWS RDS 연동)
- DevOps 및 클라우드 서비스:
    - AWS (EC2, S3, CloudFront, WAF, EFS, Route 53, RDS, Lambda, API Gateway, CloudWatch, DynamoDB, EventBridge)
    - Jenkins (CI/CD)
- 기타 도구
    - Git Bash / GitHub (버전 관리 및 협업)
    - PuTTY (EC2 인스턴스 접속)
    - JWT (인증)
    - Google OAuth2 (소셜 로그인)
    - SSL 인증서

## 📌프로젝트 상세내용 및 기능 설명

- 회원가입, 로그인/로그아웃 기능:
    - Spring Boot의 Spring Security와 Jwt 토큰을 활용한 일반적인 이메일 회원가입, 로그인/로그아웃 방식과 Google OAuth2를 이용한 소셜 로그인 방식을 구현하였습니다.

- 선수 검색 기능:
    - Python의 BeautifulSoup과 Selenium을 사용하여 약 30000명의 선수 데이터를 AWS RDS와 연동되어 있는 MySQL 데이터베이스에 넣은 후, MyBatis를 활용하여 데이터를 다루어 구현하였습니다. 선수 스탯, 클럽 경력,급여,선수 특성, 주발, 오버롤 등 상세 스탯 정보가 보여지고 강화 단계에 따른 오버롤 변화도 구현하였습니다.

- 스쿼드 메이커 기능:
    - 자신이 사용하고 싶은 선수들을 자신이 원하는 포메이션을 적용하여 원하는 위치에 가상으로 스쿼드를 구성할 수 있도록 구현하였습니다. FC Online의 급여 시스템도 적용하여, 급여 초과 시 경고 문구가 안내됩니다. 또한 로그인 한 사용자만 기능을 이용할 수 있게 하       여, 로그인 한 사용자가 만든 스쿼드들이 목록으로 표시됩니다.

- 특정 선수 이적 시장 갱신 시간 텔레그램 알림 서비스:
    - AWS Lambda를 이용한 기능입니다. API Gateway, Cloud Watch, Event Bridge, Amazon DynamoDB의 AWS 서비스들을 람다 함수와 연결하여 구현하였습니다. 사용자가 알람을 받고 싶은 선수 옆의 버튼을 누르면 제가 만든 텔레그램 봇과의 채팅방으로 연결되고, 사용자        가 /setalarm '특정 선수' 를 입력하면 알람이 설정되었다는 문구와 함께 알람이 설정됩니다. API Gateway는 람다함수와 연결되어있습니다. 그리고 이 API Gateway의 End Point를 이용해 텔레그램 웹 훅에 등록을 해놓은 상태입니다. 사용자가 /setalarm "특정선          수" 를 입력하면, 텔레그램 봇이 이 명령을 API Gateway의 엔드 포인트로 전송합니다. API Gateway와 연결된 람다 함수는 요청 본문에서 사용자의 명령과 챗 ID를 추출합니다. 그리고 람다 함수는 DynamoDB 테이블 PlayerAlarms에 사용자의 알람 설정을 저장하고,
       사용자에게 알람이 설정되었다는 메세지를 보냅니다. 이후, 두번째 람다 함수와 연결되어 있는 EventBridge는 정기적으로 두번째 람다 함수를 1분마다 트러거하고,
       트리거된 두번째 람다 함수는 현재 시간을 한국 표준시로 가져와 현재 시간과 10분 후의 시간을 계산하여 임계 시간을 설정합니다. 그리고 DynamoDB 테이블에서 모든 알람 설정을 가져와 각각의 선수들의 갱신 시간을 현재시간과 비교합니다. 비교하여 알람을 발송한
       경우, 다음 갱신 시간을 계산하고 DynamoDB에 업데이트합니다. (현재 이 기능은 AWS 비용 문제로 중지하였습니다.)

- 커뮤니티 기능:
    - 기본적인 게시판 CRUD, 댓글 CRUD, 게시물/댓글 좋아요 기능을 구현하였습니다. 또한 카테고리를 나누어 사용자들이 게시물을 작성할 때 목적에 맞게 올릴 수 있도록 하였습니다.

- 뉴스 목록 기능:
    - 마찬가지로 Python의 BeautifulSoup과 Selenium을 사용하여, 국내/해외 축구 기사, FourFourTwo 독점 기사를 크롤링하여 데이터화 한 후, 사용자들에게 보여지도록 구현하였습니다.

- FC Online 이벤트 목록 기능:
    - 마찬가지로 Python의 BeautifulSoup과 Selenium을 사용하여, 현재 진행중인 FC Online 게임의 이벤트들을 사용자들이 확인할 수 있고, 버튼을 누르면 해당 이벤트 페이지로 넘어갈 수 있도록 하였습니다.           

## 📃프로젝트 아키텍처

![프로젝트 아키텍처 다이어그램](./김영재,이은학_AWS_Cloud_Fundamentals_시스템구성도.png)

## 🔗데이터 수집 출처

- [FC Online 관련 데이터](https://fconline.nexon.com/main/index)
- [해외 축구 뉴스 데이터](https://www.fourfourtwo.com/)
- [국내 축구 뉴스 데이터](https://www.besteleven.com/)

## 🛠️버전 및 업데이트

계속 업데이트 할 예정입니다.!
