import Flex from "@react-css/flex";
import "./settings.css";

import Divider from "@mui/material/Divider/Divider";
import Icon from "@mdi/react";
import { useState } from "react";
import {
  mdiAccount,
  mdiAccountGroup,
  mdiCubeOutline,
  mdiEarth,
  mdiPistol,
} from "@mdi/js";
import { CategoriesDetails } from "./categories-details/categories-details";
import { ManageCountries } from "./countries/manage-countries";
import { ManageFaction } from "./faction/manage-faction";
import { ManageTeam } from "./team-dettings/manage-team";
import { BaseSettings } from "./base-settings/base-settings";
import { UserProfile } from "./account-profile/user-profile";

const UserSettings = () => {
  const [fragmentView, setFragmentView] = useState(null);
  const [activeLink, setActiveLink] = useState("");

  const [menuItems] = useState([
    {
      title: "Account",
      fragmentView: <UserProfile />,
      icon: mdiAccount,
    },
    {
      title: "Categories",
      fragmentView: <CategoriesDetails />,
      icon: mdiPistol,
    },
    {
      title: "Countries",
      fragmentView: <ManageCountries />,
      icon: mdiEarth,
    },
    {
      title: "Factions",
      fragmentView: <ManageFaction />,
      icon: mdiCubeOutline,
    },
    {
      title: "Team",
      fragmentView: <ManageTeam />,
      icon: mdiAccountGroup,
    },
  ]);

  return (
    <Flex row gap={10} className="m-3">
      <div className="w-25 card mb-auto shadow">
        <div
          className="card-body base-settings-menu-item"
          onClick={() => {
            return setFragmentView(<BaseSettings />);
          }}
        >
          Settings
        </div>
        <Divider />
        <Flex column>
          {menuItems.map((x) => (
            <div
              className={
                "card-body settings-menu-list" +
                (x.title === activeLink
                  ? "card-body settings-menu-list active-link"
                  : "card-body settings-menu-list mt-auto")
              }
              onClick={() => {
                setFragmentView(x.fragmentView);
                setActiveLink(x.title);
              }}
              key={x.title}
            >
              <Flex row gap={5}>
                <Icon path={x.icon} size={1} />
                {x.title}
              </Flex>
            </div>
          ))}
        </Flex>
      </div>
      <div className="w-75 card m-auto shadow">
        <div className="card-body flex-fill">
          {fragmentView ? fragmentView : <BaseSettings />}
        </div>
      </div>
    </Flex>
  );
};

export default UserSettings;
