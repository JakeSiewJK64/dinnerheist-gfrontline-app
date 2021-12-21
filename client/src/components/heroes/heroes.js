import "./heroes.css";
import Flex from "@react-css/flex";
import Heroes_Array from "./gun-array";
import { Tooltip } from "@mui/material";

import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import HeroDetailsDialog from "./hero-dialog/hero-dialog";
import {
  SetHeroes,
  OpenHeroDetailsDialog,
  SetHeroDialogID,
} from "../../redux/actions/heroActions/heroActions";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";

const Heroes = () => {
  const dispatch = useDispatch();
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    dispatch(SetHeroes(Heroes_Array));
    dispatch(OpenHeroDetailsDialog(false));
    GetAllHeroes();
  }, []);

  const GetAllHeroes = async () => {
    const rows = await fetch("/heroes/getAllHeroes");
    const response = await rows.json();
    setHeroes(response);
  };

  const handleOpen = (key) => {
    dispatch(OpenHeroDetailsDialog(true));
    dispatch(SetHeroDialogID(key));
  };

  if (!heroes) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="w-75 m-auto card mt-5">
        <HeroDetailsDialog />
        <div className="card-body">
          <h2>Guns</h2>
          <Flex flexWrap="wrap" row gap="1rem" justifyCenter>
            {heroes.map((x) => (
              <Tooltip title={x.hero_name} arrow key={x.hero_id}>
                <div
                  className={
                    "hero-profile border " +
                    (x.rarity == 5
                      ? "border-epic"
                      : x.rarity == 4
                      ? "border-rare"
                      : x.rarity == 3
                      ? "border-uncommon"
                      : "border-common")
                  }
                  onClick={() => handleOpen(x.hero_id)}
                >
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
  }
};

export default Heroes;
