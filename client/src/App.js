import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// components
import Home from "./components/home/home";
import Users from "./components/users/users";
import Login from "./components/security/login/login";
import UserProfile from "./components/users/userProfile";
import UserSettings from "./components/settings/settings";
import HeroFullPage from "./components/heroes/hero-fullpage/hero-fullpage";
import Heroes from "./components/heroes/heroes";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppHeader } from "./shared/shared-components/header/header";
import LoadingSpinner from "./shared/shared-components/loadingSpinner/loadingSpinner";
import Footer from "./footer";
import AddHero from "./components/heroes/manage-hero/manage-hero";
import { MissingPage } from "./components/page-not-found/page-not-found";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/auth/verify", {
        method: "POST",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await res.json();
      if (parseRes) {
        setIsLoading(false);
      }
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {}
  };

  const getProfile = async () => {
    try {
      const response = await fetch("/auth/userprofile", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
      setRole(parseRes.role_name);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    getProfile();
    checkAuthenticated();
  });

  return isLoading ? (
    <div style={{ marginTop: "25vh" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <Fragment>
      <header>
        <ToastContainer />
        <AppHeader username={name} userrole={role} setAuth={setAuth} />
      </header>
      <section>
        <Switch>
          <Route
            exact
            path="/users"
            render={(props) =>
              isAuthenticated && role === "administrator" ? (
                <Users {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/profile"
            render={(props) =>
              isAuthenticated ? (
                <UserProfile {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/settings"
            render={(props) =>
              isAuthenticated ? (
                <UserSettings {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/authentication/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/heroes" render={(props) => <Heroes />} />
          <Route
            exact
            path="/hero/:id"
            render={(props) => <HeroFullPage {...props} />}
          />
          <Route
            exact
            path="/manage-hero"
            render={(props) =>
              isAuthenticated ? (
                <AddHero {...props} setAuth={setAuth} username={name} />
              ) : (
                <Redirect to="/authentication/login" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={(props) => (
              <Home {...props} setAuth={setAuth} username={name} />
            )}
          />
          <Route exact path="*" render={(props) => <MissingPage />} />
        </Switch>
      </section>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  );
}
export default App;
