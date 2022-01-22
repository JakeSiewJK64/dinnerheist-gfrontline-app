import "./heroes.css";
import Flex from "@react-css/flex";
import Heroes_Array from "./gun-array";
import { Tooltip, tooltipClasses } from "@mui/material";

import { useDispatch } from "react-redux";
import infobox_border from "../../img/Infobox_border.png";
import star from "../../img/rarity_star.png";
import { category_label } from "../../shared/constants";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  if (!heroes) {
    return <LoadingSpinner />;
  } else {
    return (
      <div
        className="w-75 m-auto card mt-5 shadow-lg"
        style={{ backgroundColor: "#222f3e" }}
      >
        <HeroDetailsDialog />
        <div className="card-body text-white">
          <h2>Guns</h2>
          <Flex flexWrap="wrap" row gap="1rem" justifyCenter>
            {heroes.map((x) => (
              <div key={x.hero_id}>
                <HtmlTooltip
                  arrow
                  title={
                    <div className="hero-profile-base-tooltip">
                      <img
                        src={x.image_url}
                        alt=""
                        draggable="false"
                        className="hero-profile-image-tooltip"
                      />
                      <img
                        src={infobox_border}
                        alt=""
                        className="info-frame-tooltip"
                        draggable="false"
                      />
                      <div className="hero-id-tooltip">
                        <h5>{x.hero_id}</h5>
                      </div>
                      <div className="hero-name-tooltip">
                        <p>{x.hero_name}</p>
                      </div>
                      <div className="rarity-star-container-tooltip">
                        {[...Array(x.rarity)].map((x, i) => {
                          return (
                            <img
                              src={star}
                              key={i}
                              alt=""
                              className="star-tooltip"
                              draggable="false"
                            />
                          );
                        })}
                      </div>
                      <img
                        src={
                          category_label.filter(function (cat) {
                            return (
                              cat.category === x.category_name &&
                              cat.stars === x.rarity
                            );
                          })[0].image_url
                        }
                        alt=""
                        draggable="false"
                        className="category-label-tooltip"
                      />
                    </div>
                  }
                >
                  <div
                    className={
                      "hero-profile border " +
                      (x.rarity === 5
                        ? "border-epic"
                        : x.rarity === 4
                        ? "border-rare"
                        : x.rarity === 3
                        ? "border-uncommon"
                        : "border-common")
                    }
                    onClick={() => handleOpen(x.hero_id)}
                  >
                    <img
                      draggable="false"
                      src={x.image_url}
                      alt=""
                      className="hero-image"
                    />
                  </div>
                </HtmlTooltip>
              </div>
            ))}
          </Flex>
        </div>
      </div>
    );
  }
};

export default Heroes;
