import "./heroes.css";
import Flex from "@react-css/flex";
import Heroes_Array from "./gun-array";
import { Tooltip } from "@mui/material";

import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import HeroDetailsDialog from "./hero-dialog/hero-dialog";
import {
  SetHeroes,
  OpenHeroDetailsDialog,
  SetHeroDialogID,
} from "../../redux/actions/heroActions/heroActions";

const Heroes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetHeroes(Heroes_Array));
    dispatch(OpenHeroDetailsDialog(false));
  });

  const handleOpen = (key) => {
    dispatch(OpenHeroDetailsDialog(true));
    dispatch(SetHeroDialogID(key));
  };

  return (
    <div className="w-75 m-auto card mt-5">
      <HeroDetailsDialog />
      <div className="card-body">
        <h2>Guns</h2>
        <Flex flexWrap="wrap" row gap="1rem" justifyCenter>
          {Heroes_Array.map((x) => (
            <Tooltip title={x.name} arrow key={x.key}>
              <div className="hero-profile" onClick={() => handleOpen(x.key)}>
                <img
                  draggable="false"
                  src={x.image_url}
                  className="hero-image"
                />
              </div>
            </Tooltip>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default Heroes;
