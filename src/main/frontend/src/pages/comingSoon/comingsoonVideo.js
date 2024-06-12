import React from "react";
import CountdownComponent from "./CountdownData";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import comingsoon from "../../assets/images/other-images/coming-soon-bg.jpg";
import authVideo from "../../assets/video/auth-bg.mp4";
import logo from "../../assets/images/logo/logo1.png";

const ComingsoonVideo = () => {
  return (
      <>
        <div className="page-wrapper">
          {/* <!-- Page Body Start--> */}
          <Container fluid={true} className="p-0">
            <div className="comingsoon auth-bg-video">
              <video
                  id="bgvid"
                  poster={comingsoon}
                  playsInline
                  autoPlay
                  muted
                  loop
              >
                <source src={authVideo} type="video/mp4" />
              </video>
              <div className="comingsoon-inner text-center">
                <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                  <img src={logo} alt="Logo" />
                </Link>
                <h5>WE ARE COMING SOON</h5>
                <div className="countdown" id="clockdiv">
                  <CountdownComponent />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
  );
};

export default ComingsoonVideo;
