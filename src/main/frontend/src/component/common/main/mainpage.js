import React, { Fragment } from 'react';
import Breadcrumb from "../breadcrumb/breadcrumb";
import './MainPage.css';
import PostList from '../../common/main/PostList';
import LeagueRanking from '../../common/main/LeagueRanking';

const MainPage = () => {
    return (
        <Fragment>
            <Breadcrumb parent="MainPage" title="FC wahadak" />
            <div className="main-page-container">
                <div className="banner-container">
                    <img src={`${process.env.PUBLIC_URL}/assets/images/MainImage/fc_wahadak_image.png`} alt="FC Wahadak" className="banner-image" />
                </div>
                <div className="content-container">
                    <div className="post-list-container">
                        <PostList />
                    </div>
                    <div className="league-ranking-container">
                        <LeagueRanking />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default MainPage;