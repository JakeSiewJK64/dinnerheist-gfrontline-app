import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Flex } from "@react-css/flex";
import { Card } from "@material-ui/core";
import logo from "../../../img/griffin_logo.png";
import "./login.css";

const Login = ({ setAuth }) => {
  // setting default state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // set default credentials
  const { email, password } = inputs;

  // declare onchange function
  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    // todo: implement login api
    e.preventDefault();
    try {
      // declare application body
      const body = {
        email,
        password,
      };

      const response = await fetch("/auth/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Login Complete!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <div className="w-100">
        <Card
          className={
            (window.innerWidth > 1000 ? "w-50" : "w-75") + " m-auto mt-5"
          }
          elevation={12}
        >
          <Flex column alignItemsCenter>
            <img
              draggable="false"
              src={logo}
              className={
                (window.innerWidth > 1000 ? "w-50" : "w-100") + " spin-logo"
              }
              alt="logo"
            />
            <h2 className="m-2 text-center" style={{ fontFamily: "serif" }}>
              Welcome commander.
            </h2>
          </Flex>
          <Flex className="p-2" justifyCenter alignItemsCenter>
            <form onSubmit={onSubmitForm}>
              <Flex column alignItemsCenter>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="form-control my-3"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  className="form-control my-3"
                  placeholder="Enter Password"
                />
                <button className="btn btn-warning btn-block">Login</button>
              </Flex>
            </form>
          </Flex>
        </Card>
      </div>
    </Fragment>
  );
};

export default Login;
