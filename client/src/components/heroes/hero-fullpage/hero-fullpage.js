import "./hero-fullpage.css";
import Flex from "@react-css/flex";
import React, { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import infobox_border from "../../../img/Infobox_border.png";
import star from "../../../img/rarity_star.png";
import { category_label } from "../../../shared/constants";

import BadgeIcon from "@mui/icons-material/Badge";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import QRcode from "react-qr-code";

import Icon from "@mdi/react";
import {
  mdiShoeSneaker,
  mdiFactory,
  mdiFlag,
  mdiBrush,
  mdiTarget,
  mdiMicrophone,
  mdiCardAccountDetails,
  mdiPistol,
  mdiEarth,
  mdiRunFast,
  mdiSword,
  mdiChartBoxOutline,
  mdiText,
  mdiInformation,
} from "@mdi/js";

import Barcode from "react-barcode";

const HeroFullPage = (props) => {
  const [hero, setHero] = useState(null);
  const [heroId, setHeroId] = useState(null);

  const GetHeroById = async () => {
    try {
      if (heroId !== undefined && heroId !== null) {
        const response = await fetch("/heroes/getHeroById/" + heroId, {
          method: "GET",
        });
        const result = await response.json();
        setHero(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setHeroId(props.match.params.id);
    if (setHeroId !== null || setHeroId !== undefined) {
      GetHeroById(props.match.params.id);
    }
  }, [heroId]);

  return hero === undefined || hero === null ? (
    <div></div>
  ) : (
    <Flex column gap={20}>
      <Flex column alignContentCenter className="ms-auto text-center me-2">
        <Barcode
          value={window.location.href}
          width={1}
          height={50}
          displayValue={false}
        />
        <p style={{ fontFamily: "courier" }}>Codename: {hero.hero_name}</p>
      </Flex>
      <Flex row gap={20} className="m-100 m-4">
        <Flex column style={{ height: "0rem" }}>
          <div className="hero-profile-base">
            <img src={hero.image_url} alt="" draggable="false" />
            <img
              src={infobox_border}
              alt=""
              className="info-frame"
              draggable="false"
            />
            <div className="hero-id">
              <h2>{hero.hero_id}</h2>
            </div>
            <div className="rarity-star-container">
              {[...Array(hero.rarity)].map((x, i) => {
                return (
                  <img
                    src={star}
                    key={i}
                    alt=""
                    className="star"
                    draggable="false"
                  />
                );
              })}
            </div>
            <img
              src={category_label[0].image_url}
              draggable="false"
              className="category-label"
            />
          </div>
          <div className="mx-auto mb-2">
            <QRcode
              value={window.location.href + "/" + hero.hero_id}
              size={100}
            />
          </div>
        </Flex>
        <Flex column className="w-100 hero-fullpage-gun-info-container">
          <img
            src={hero.faction_image_url}
            alt=""
            draggable="false"
            className="faction_image"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Gun Name"
            type="text"
            fullWidth
            value={hero.hero_name}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
          />
          <div className="hero-dialog-header w-100 my-3 p-2 rounded-pill">
            <Flex row gap={5}>
              <Icon path={mdiChartBoxOutline} size={1} />
              <strong>Game Stats</strong>
            </Flex>
          </div>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Armor"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.armor}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ShieldIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Damage"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.hero_damage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalFireDepartmentIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Critical Damage"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.crit_damage}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WarningAmberIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Critical Rate"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.crit_rate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Health"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.health}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HealthAndSafetyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Movement Speed"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.move_speed}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiShoeSneaker} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Accuracy"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.accuracy}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiTarget} size={1} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Armor Penetration"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.armor_penetration}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src="https://iopwiki.com/images/thumb/b/b0/Icon_penetration.png/25px-Icon_penetration.png"
                      style={{ filter: "invert(45%)" }}
                      draggable="false"
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Firerate"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.firerate}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiPistol} size={1} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Evasion"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.evasion}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiRunFast} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          {/* Gun Info */}
          <div className="hero-dialog-header w-100 my-3 p-2 rounded-pill">
            <Flex row gap={5}>
              <Icon path={mdiPistol} size={1} />
              <strong>Gun Information</strong>
            </Flex>
          </div>
          <Flex column gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.hero_fullname}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiCardAccountDetails} size={1} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Origin Country"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.country_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiEarth} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          {/* Game Info */}
          <div className="hero-dialog-header w-100 my-3 p-2 rounded-pill">
            <Flex row gap={5}>
              <Icon path={mdiInformation} size={1} />
              <strong>Game Information</strong>
            </Flex>
          </div>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Faction"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.faction_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiFlag} size={1} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Revise / Manufacturer"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.revise}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiFactory} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex row gap={10} className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Voice Actor"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.va}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiMicrophone} size={1} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Artist"
              type="text"
              fullWidth
              variant="outlined"
              value={hero.artist}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiBrush} title="User Profile" size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          <Flex className="w-100" column>
            <TextField
              autoFocus
              margin="dense"
              label="Team"
              fullWidth
              variant="outlined"
              value={hero.team_name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon path={mdiSword} size={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Flex>
          {/* Gun Description */}
          <div className="hero-dialog-header w-100 my-3 p-2 rounded-pill">
            <Flex row gap={5}>
              <Icon path={mdiText} size={1} />
              <strong>{hero.hero_name} Background</strong>
            </Flex>
          </div>
          <Flex row gap={10} className="w-100">
            <div>{hero.description}</div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeroFullPage;
