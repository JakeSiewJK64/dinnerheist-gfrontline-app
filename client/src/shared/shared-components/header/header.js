import { Button } from "@material-ui/core";
import { header_routes } from "../../constants";
import Flex from "@react-css/flex";
import { Link } from "react-router-dom";
import gfTitle from "../../../img/gfTitle.png";
import "./header.css";
import HeaderMenu from "./headerMenu";

export const AppHeader = ({ username, userrole, setAuth }) => {
  return (
    <div className="w-100" style={{ backgroundColor: "#222f3e" }}>
      <Flex justifySpaceBetween>
        <Link to="/heroes" className="logo">
          <Flex row justifyCenter>
            <img src={gfTitle} className="logo-config" alt="logo" />
          </Flex>
        </Link>
        <Flex className="me-5 header-buttons w-100" rowReverse>
          <HeaderMenu name={username} role={userrole} setAuth={setAuth} />
          {header_routes.map((x, i) => {
            if (x.role === undefined) {
              return (
                <Link className="mt-3 p-2 link-style" to={x.route} key={x.id}>
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else if (x.role !== undefined && userrole === "administrator") {
              return (
                <Link className="mt-3 p-2 link-style" to={x.route} key={x.id}>
                  <Button variant="outlined">
                    <span className="link-style">{x.title}</span>
                  </Button>
                </Link>
              );
            } else {
              return <div key={i + x.id}></div>;
            }
          })}
        </Flex>
      </Flex>
    </div>
  );
};
