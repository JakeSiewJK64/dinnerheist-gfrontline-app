import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  InputLabel,
  MenuItem,
  DialogTitle,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import Flex from "@react-css/flex";
import { useFormik } from "formik";
import { useState, useEffect, useRef } from "react";

import { rarity_select } from "../../../shared/constants";
import empty_profile from "../../../img/empty-profile.png";
import { toast } from "react-toastify";

export function HeroDialogFragment({ openDialog, setOpenDialog, data }) {
  const [countries, setCountries] = useState(null);
  const [categories, setCategories] = useState(null);
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  var imageRef;
  var formik;

  const handleImageReset = () => {
    formik.values.image_url = "";
    formik.setFieldValue("image_url", "");
  };

  const GetTeams = async () => {
    const res = await fetch("/heroes/getFactionTeam", {
      method: "GET",
    });
    const rows = await res.json();
    setTeams(rows);
  };

  const GetCountries = async () => {
    const res = await fetch("/heroes/getCountries", {
      method: "GET",
    });
    const rows = await res.json();
    setCountries(rows);
  };

  const GetCategories = async () => {
    const res = await fetch("/heroes/getCategories", {
      method: "GET",
    });
    const rows = await res.json();
    setCategories(rows);
    setIsLoading(false);
  };

  imageRef = useRef();

  const submitHero = async (val) => {
    const res = await fetch("/heroes/upsertHero", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        jwt_token: localStorage.token,
      },
      body: JSON.stringify(val),
    });
    const p = await res.json();
    if (res.status === 500) {
      toast.error(p.message);
    } else {
      toast.success("Success!");
      setOpenDialog(false);
    }
  };

  formik = useFormik({
    initialValues: {
      image_url: data.image_url,
    },
    onSubmit: (val) => {
      submitHero(val);
    },
  });

  const handleClose = () => {
    setOpenDialog(false);
    setIsLoading(true);
  };

  const onImageUploadClick = () => {
    imageRef.current.click();
  };

  const handleFileInputChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (x) => {
      var file = x.target.result.toString();
      formik.values.image_url = file;
      formik.setFieldValue("image_url", file);
    };
  };

  useEffect(() => {
    GetTeams();
    GetCountries();
    GetCategories();
  }, [!isLoading]);

  return (
    <Dialog
      open={openDialog}
      PaperProps={{
        style: {
          maxWidth: "100rem",
          width: "60rem",
        },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Edit Doll</DialogTitle>
        <input
          ref={imageRef}
          type="file"
          id="file"
          name="image_url"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <DialogContent>
          <Flex column gap={10} className="mt-2">
            <Flex alignItemsCenter column>
              <img
                src={
                  formik.values.image_url !== null &&
                  formik.values.image_url.length > 0
                    ? formik.values.image_url
                    : empty_profile
                }
                alt="profile"
                draggable={false}
                onClick={onImageUploadClick}
                style={{ width: "5rem", zIndex: 2, height: "5rem" }}
                className="m-3 rounded-circle m-auto profile-circle"
              />
              <Button type="reset" onClick={handleImageReset}>
                Remove Image
              </Button>
            </Flex>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            CLOSE
          </Button>
          <Button color="error" variant="outlined" type="submit">
            SAVE
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
