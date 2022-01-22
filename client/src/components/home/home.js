import "./home.css";
import { Link } from "react-router-dom";
import React, { Fragment, useState } from "react";
import Flex from "@react-css/flex";
import Icon from "@mdi/react";
import {
  mdiCoffee,
  mdiCubeOutline,
  mdiFactory,
  mdiGroup,
  mdiMicroscope,
  mdiPlus,
  mdiShield,
} from "@mdi/js";

const Home = ({ setAuth, username }) => {
  const [menuMobile] = useState([
    {
      title: "Cafe",
      icon: mdiCoffee,
    },
    {
      title: "Infirmary",
      icon: mdiPlus,
    },
    {
      title: "Research",
      icon: mdiMicroscope,
    },
    {
      title: "Factory",
      icon: mdiCubeOutline,
    },
  ]);
  return (
    <Fragment>
      <div className="base-background">
        {window.innerWidth > 1000 ? (
          <div>
            <div className="character-container">
              <img
                src="https://iopwiki.com/images/3/30/UMP45_costume4.png"
                alt=""
              />
            </div>
            <div className="home-menu-container">
              <Flex
                column
                gap={10}
                className="home-menu-container-item"
                style={{ right: "0" }}
              >
                <Flex row className="subcontainer-item">
                  <div>
                    <Flex row gap={5}>
                      <Icon path={mdiCubeOutline} size={4} />
                      <h2 className="mt-3">Cafe</h2>
                    </Flex>
                  </div>
                </Flex>
                <Flex row gap={5} className="subcontainer-item">
                  <div>
                    <Flex row gap={5}>
                      <Icon path={mdiMicroscope} size={2} />
                      <h2 className="mt-2">Research</h2>
                    </Flex>
                  </div>
                  <div>
                    <Flex row gap={5}>
                      <Icon path={mdiFactory} size={2} />
                      <h2 className="mt-2">Factory</h2>
                    </Flex>
                  </div>
                </Flex>
                <Flex className="w-100">
                  <Flex
                    rowReverse
                    gap={5}
                    className="subcontainer-item-bottom w-100"
                  >
                    <div>
                      <Flex row gap={5}>
                        <Icon path={mdiPlus} size={2} />
                        <h2 className="mt-2">Infirmary</h2>
                      </Flex>
                    </div>
                    <div>
                      <Link to={"/heroes"}>
                        <Flex row gap={5}>
                          <Icon path={mdiGroup} size={2} />
                          <h2 className="mt-2">Formation</h2>
                        </Flex>
                      </Link>
                    </div>
                    <div>
                      <Flex row gap={5}>
                        <Icon path={mdiShield} size={2} />
                        <h2 className="mt-2">Battle</h2>
                      </Flex>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </div>
        ) : (
          <div className="w-100">
            <Flex
              column
              className=" mt-3 mobile-menu-base"
              gap={10}
              style={{ height: "10rem" }}
            >
              {menuMobile.map((x) => {
                return (
                  <div className="mobile-menu" key={x.title}>
                    <Flex row>
                      <Icon path={x.icon} size={1.5} />
                      <h2>{x.title}</h2>
                    </Flex>
                  </div>
                );
              })}
            </Flex>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
