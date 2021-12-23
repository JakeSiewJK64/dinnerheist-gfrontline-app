import Flex from "@react-css/flex";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./header.css";
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import LogoutFunction from "../../../shared/shared-components/logout/logout";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import { headerProfileMenuOptions } from "../../constants";

const HeaderMenu = ({ name, role, setAuth }) => {
  const [achorEl, setAnchorEl] = useState(false);
  const open = Boolean(achorEl);
  const handleClick = () => {
    setAnchorEl(!achorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mt-3">
      {achorEl ? (
        <div open={open} onClose={handleClose} onClick={handleClose}>
          <div className="card-body menu-card m-2 p-2 shadow rounded">
            {name !== undefined && role !== undefined ? (
              <Flex column className="mx-auto mt-4" alignItemsCenter>
                <Avatar />
                <p>{name}</p>
                <span className="rounded-pill text-white p-2 bg-primary m-auto">
                  {role}
                </span>
                <div className="mt-3">
                  <Divider />
                  {headerProfileMenuOptions.map((a, b) => {
                    return (
                      <Link to={a.url} key={b}>
                        <Button variant="text" className="item">
                          <ListItemIcon>{a.icon}</ListItemIcon>
                          {a.title}
                        </Button>
                      </Link>
                    );
                  })}
                  <Divider className="m-2" />
                  <Link to="/authentication/login">
                    <Button
                      variant="text"
                      onClick={(x) => LogoutFunction({ setAuth })}
                      className="item"
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </Button>
                  </Link>
                </div>
              </Flex>
            ) : (
              <Flex>
                <Link to="/authentication/login">
                  <Button variant="outlined" className="item">
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Login
                  </Button>
                </Link>
              </Flex>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {name !== undefined && role !== null ? (
        <Tooltip title="Account settings" className="mt-1">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant="outlined" className="mt-2 ">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/authentication/login"
          >
            Login
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeaderMenu;
