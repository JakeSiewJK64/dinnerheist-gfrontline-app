import Flex from "@react-css/flex";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import { OpenHeroDetailsDialog } from "../../../redux/actions/heroActions/heroActions";

const HeroDetailsDialog = () => {
  let dispatch = useDispatch();
  const [hero, setHero] = useState({});
  const openHeroDialog = useSelector((state) => state.heroDialog);
  const id = useSelector((state) => state.heroDialogId);

  const handleClose = () => {
    dispatch(OpenHeroDetailsDialog(false));
  };

  useEffect(() => {
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

  if (hero) {
    return (
      <Dialog open={openHeroDialog}>
        <DialogTitle>H1</DialogTitle>
        <DialogContent>
          <Flex>
            <Flex>
              <p>{hero.hero_name}</p>
            </Flex>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return <LoadingSpinner />;
  }
};

export default HeroDetailsDialog;
