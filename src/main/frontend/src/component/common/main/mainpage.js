import React, {Fragment} from 'react';
import Breadcrumb from "../breadcrumb/breadcrumb";

const MainPage = () => {
    return (
        <Fragment>
            <Breadcrumb parent="MainPage" title="FC wahadak" />
            <div style={{ padding: '20px' }}>
                <h1>Welcome to FC Wahadak!</h1>
                <p>This is your main dashboard area where future content and functionality can be added.</p>
                <p>Explore the app, view player stats, manage your squad, and much more!</p>
            </div>
        </Fragment>
    );
}

export default MainPage;
