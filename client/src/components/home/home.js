import logo from "../../img/logo.svg";
import "./home.css";
import React, { Fragment } from "react";
import LogoutFunction from "../../shared/shared-components/logout/logout";
import Flex from "@react-css/flex";

const Home = ({ setAuth, username }) => {
  return (
    <Fragment>
      <div className="character-container">
        <img src="https://iopwiki.com/images/3/30/UMP45_costume4.png" />
      </div>
      <div className="base-background">
        <div className="home-menu-container">
          <Flex
            column
            gap={10}
            className="home-menu-container-item"
            style={{ right: "0" }}
          >
            <Flex row className="subcontainer-item">
              <div>
                <h2>Cafe</h2>
              </div>
            </Flex>
            <Flex row gap={5} className="subcontainer-item">
              <div>
                <h2>Research</h2>
              </div>
              <div>
                <h2>Factory</h2>
              </div>
            </Flex>
            <Flex className="w-100">
              <Flex
                rowReverse
                gap={5}
                className="subcontainer-item-bottom"
                style={{ width: "27rem" }}
              >
                <div>
                  <h2>Battle</h2>
                </div>
                <div>
                  <h2>Formation</h2>
                </div>
                <div>
                  <h2>H</h2>
                </div>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
