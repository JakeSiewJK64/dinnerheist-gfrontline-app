import Flex from "@react-css/flex";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";
import { OpenHeroDetailsDialog } from "../../../redux/actions/heroActions/heroActions";
import infobox_border from "../../../img/Infobox_border.png";
import star from "../../../img/rarity_star.png";
import "./hero-dialog.css";
import { category_label } from "../../../shared/constants";

const HeroDetailsDialog = () => {
  let dispatch = useDispatch();
  const [hero, setHero] = useState(null);
  var openHeroDialog = useSelector((state) => state.heroDialog);
  var id = useSelector((state) => state.heroDialogId);

  const handleClose = () => {
    dispatch(OpenHeroDetailsDialog(false));
  };

  useEffect(() => {
    dispatch(OpenHeroDetailsDialog(false));
    if (id) {
      GetHero();
    }
  }, [id]);

  const GetHero = async () => {
    try {
      const response = await fetch("/heroes/getHeroById/" + id, {
        method: "GET",
      });
      const res = await response.json();
      setHero(res);
    } catch (error) {
      console.log(error);
    }
  };

  return hero === undefined || hero === null ? (
    <div></div>
  ) : (
    <Dialog
      open={openHeroDialog}
      PaperProps={{
        style: {
          maxWidth: "100rem",
          maxHeight: "100rem",
          width: "60rem",
        },
      }}
    >
      <DialogTitle>{hero.hero_name}</DialogTitle>
      <DialogContent className="hero-dialog-content">
        <DialogContentText></DialogContentText>
        <Flex row gap={20} className="m-100">
          <div>
            <img src={hero.image_url} alt="" draggable="false" />
            <img
              src={infobox_border}
              alt=""
              className="info-frame"
              draggable="false"
            />
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
          <Flex column className="w-100">
            <TextField
              autoFocus
              margin="dense"
              label="Gun Name"
              type="text"
              fullWidth
              value={hero.hero_name}
              variant="outlined"
            />
            <Flex row gap={10} className="w-100">
              <TextField
                autoFocus
                margin="dense"
                label="Armor"
                type="text"
                fullWidth
                variant="outlined"
                value={hero.armor}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Armor"
                type="text"
                fullWidth
                variant="outlined"
                value={hero.hero_damage}
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
              />
              <TextField
                autoFocus
                margin="dense"
                label="Critical Rate"
                type="text"
                fullWidth
                variant="outlined"
                value={hero.crit_rate}
              />
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HeroDetailsDialog;
