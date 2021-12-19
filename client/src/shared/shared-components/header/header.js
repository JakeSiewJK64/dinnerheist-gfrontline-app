import { Button } from "@material-ui/core";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import gfTitle from "../../../img/gfTitle.png";
import "./header.css";
import HeaderMenu from "./headerMenu";

export const AppHeader = ({ username, userrole, setAuth }) => {
  return (
    <div className="w-100">
      <Flex justifySpaceBetween>
        <Link to="/heroes" className="logo">
          <Flex row justifyCenter>
            <img src={gfTitle} className="logo-config" alt="logo" />
          </Flex>
        </Link>
        <Flex className="me-5">
          {header_routes.map((x) => {
            if (x.role === undefined) {
              return (
                <Link
                  className="m-2 p-2 link-style"
                  to={x.route}
                  key={header_routes.indexOf(x)}
                >
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else if (
              x.role !== undefined &&
              x.role.includes("administrator") &&
              userrole === "administrator"
            ) {
              return (
                <Link
                  className="m-2 p-2 link-style"
                  to={x.route}
                  key={header_routes.indexOf(x)}
                >
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else {
              return <div key={"null"}></div>;
            }
          })}
          <HeaderMenu name={username} role={userrole} setAuth={setAuth} />
        </Flex>
      </Flex>
    </div>
  );
};
