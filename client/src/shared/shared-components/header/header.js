import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import gfTitle from "../../../img/gfTitle.png";
import "./header.css";
import HeaderMenu from "./headerMenu";
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

export const AppHeader = ({ username, userrole, setAuth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [headerRoutes] = useState([
    {
      title: "Guns",
      route: "/heroes",
    },
    {
      title: "Settings",
      route: "/settings",
    },
  ]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-100" style={{ backgroundColor: "#222f3e" }}>
      <Flex justifySpaceBetween>
        <Link to="/" className="logo">
          <Flex row justifyCenter>
            <img src={gfTitle} className="logo-config" alt="logo" />
          </Flex>
        </Link>
        <Flex className="me-5 header-buttons w-100" rowReverse>
          <HeaderMenu name={username} role={userrole} setAuth={setAuth} />
          {window.innerWidth > 1000 ? (
            <div className="mt-4">
              {header_routes.map((x, i) => {
                if (x.role === undefined) {
                  return (
                    <Link
                      className="mt-3 p-2 link-style"
                      to={x.route}
                      key={x.id}
                    >
                      <Button variant="outlined">
                        <span className="link-style">{x.title}</span>
                      </Button>
                    </Link>
                  );
                } else if (
                  x.role !== undefined &&
                  userrole === "administrator"
                ) {
                  return (
                    <Link
                      className="mt-3 p-2 link-style"
                      to={x.route}
                      key={x.id}
                    >
                      <Button variant="outlined">
                        <span className="link-style">{x.title}</span>
                      </Button>
                    </Link>
                  );
                } else {
                  return <div key={i + x.id}></div>;
                }
              })}
            </div>
          ) : (
            <div>
              <IconButton
                id="header-menu"
                onClick={handleClick}
                className="mt-4"
              >
                <Icon path={mdiMenu} size={1} />
              </IconButton>
              <Menu
                id="header-menu"
                anchorEl={anchorEl}
                onClose={handleClose}
                open={open}
              >
                {headerRoutes.map((x) => {
                  return (
                    <MenuItem onClick={handleClose} key={x.title}>
                      <Link
                        style={{ textDecoration: "none" }}
                        className="text-black"
                        to={x.route}
                      >
                        {x.title}
                      </Link>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  );
};
