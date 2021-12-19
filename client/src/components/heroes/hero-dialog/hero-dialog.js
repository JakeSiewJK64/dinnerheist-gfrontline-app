import Flex from "@react-css/flex";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { OpenHeroDetailsDialog } from "../../../redux/actions/heroActions/heroActions";

const HeroDetailsDialog = () => {
  const dispatch = useDispatch();
  const openHeroDialog = useSelector((state) => state.heroDialog);

  useEffect(() => {});
  const handleClose = () => {
    dispatch(OpenHeroDetailsDialog(false));
  };

  return (
    <Dialog open={openHeroDialog}>
      <DialogTitle>H1</DialogTitle>
      <DialogContent>
        <Flex>
          <div>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </div>
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HeroDetailsDialog;
