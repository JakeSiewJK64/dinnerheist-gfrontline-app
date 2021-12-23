import { Dialog } from "@material-ui/core";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { HeroDialogFragment } from "./hero-dialog-fragment";
import { useFormik } from "formik";
import { useState, useEffect } from "react";

export function EditHeroDialog({ openDialog, setOpenDialog, doll }) {
  const [hero, setHero] = useState(null);

  const GetHero = async () => {
    if (doll) {
      const response = await fetch("/heroes/getHeroById/" + doll.hero_id);
      const rows = await response.json();
      setHero(rows);
    }
  };

  useEffect(() => {
    GetHero();
  }, [doll]);

  if (hero) {
    return (
      <HeroDialogFragment
        data={hero}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    );
  } else {
    return <div></div>;
  }
}
