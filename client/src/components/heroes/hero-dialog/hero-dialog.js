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
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import { OpenHeroDetailsDialog } from "../../../redux/actions/heroActions/heroActions";

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
    <Dialog open={openHeroDialog}>
      <DialogTitle>{hero.hero_name}</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Flex row gap={20} className="m-100">
          <img src={hero.image_url} alt="" />
          <Flex column>
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
