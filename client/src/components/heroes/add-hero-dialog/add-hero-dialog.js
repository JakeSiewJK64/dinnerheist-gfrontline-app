import "./add-hero-dialog.css";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  DialogTitle,
} from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import empty_profile from "../../../img/empty-profile.png";
import Flex from "@react-css/flex";

export default function AddHeroDialog({ openHeroDialog, setOpenDialog, hero }) {
  var imageRef;

  var formik;

  const GetImageRef = () => {
    imageRef = useRef();
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        image_url: "",
        hero_name: "",
        rarity: 2,
        hero_fullname: "",
        health: 0,
        armor: 0,
        crit_damage: 0,
        crit_rate: 0,
        damage: 0,
        evasion: 0,
        move_speed: 0,
        armor_penetration: 0,
        accuracy: 0,
        firerate: 0,
      },
      onSubmit: (val) => {
        console.log(val);
      },
    });
  };

  if (openHeroDialog) {
    GetImageRef();

    const onImageUploadClick = () => {
      imageRef.current.click();
    };

    const handleFileInputChange = (e) => {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (x) => {
        var file = x.target.result.toString();
        formik.values.image_url = file;
      };
    };

    GetFormik();

    return (
      <Dialog
        open={openHeroDialog}
        PaperProps={{
          style: {
            maxWidth: "100rem",
            minHeight: "30rem",
            maxHeight: "80vh",
            width: "60rem",
          },
        }}
      >
        <input
          ref={imageRef}
          type="file"
          id="file"
          name="image_url"
          onChange={handleFileInputChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            <div>
              <h3>Add Hero</h3>
            </div>
          </DialogTitle>
          <DialogContent>
            <Flex column gap={10} className="mt-2">
              <Flex alignItemsCenter>
                <EditIcon fontSize="medium" className="edit-icon" />
                <img
                  src={empty_profile}
                  alt="profile"
                  draggable={false}
                  onClick={onImageUploadClick}
                  style={{ width: "5rem", zIndex: 2 }}
                  className="m-3 rounded-circle m-auto profile-circle"
                />
              </Flex>
              <TextField
                fullWidth
                label="Hero Name"
                type="text"
                name="hero_name"
                onChange={formik.handleChange}
                values={formik.values.hero_name}
              />
              <TextField
                fullWidth
                label="Full Name"
                type="text"
                name="hero_fullname"
                onChange={formik.handleChange}
                values={formik.values.hero_fullname}
              />
              <InputLabel title="Rarity" id="rarity">
                Rarity
              </InputLabel>
              <Select
                label="Rarity"
                labelId="rarity"
                value={formik.values.rarity}
                onChange={formik.handleChange}
                name="rarity"
              >
                {[...Array(5)].map((x, i) => {
                  return i < 1 ? (
                    <div key={i}></div>
                  ) : (
                    <MenuItem value={i + 1} key={i}>
                      {i + 1}
                    </MenuItem>
                  );
                })}
              </Select>
              <Flex row gap={10}>
                <TextField
                  fullWidth
                  label="Health"
                  name="health"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.health}
                />
                <TextField
                  fullWidth
                  label="Armor"
                  name="armor"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.armor}
                />
              </Flex>
              <Flex row gap={10}>
                <TextField
                  fullWidth
                  label="Critical Damage"
                  name="crit_damage"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.crit_damage}
                />
                <TextField
                  fullWidth
                  label="Critical Rate"
                  name="crit_rate"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.crit_rate}
                />
              </Flex>
              <Flex row gap={10}>
                <TextField
                  fullWidth
                  label="Movement Speed"
                  type="number"
                  name="move_speed"
                  onChange={formik.handleChange}
                  value={formik.values.move_speed}
                />
                <TextField
                  fullWidth
                  label="Damage"
                  type="number"
                  name="damage"
                  onChange={formik.handleChange}
                  value={formik.values.damage}
                />
                <TextField
                  fullWidth
                  label="Evasion"
                  type="number"
                  name="evasion"
                  onChange={formik.handleChange}
                  value={formik.values.evasion}
                />
              </Flex>
              <Flex row gap={10}>
                <TextField
                  fullWidth
                  label="Armor Penetration"
                  type="number"
                  name="armor_penetration"
                  onChange={formik.handleChange}
                  value={formik.values.armor_penetration}
                />
                <TextField
                  fullWidth
                  label="Accuracy"
                  type="number"
                  name="accuracy"
                  onChange={formik.handleChange}
                  value={formik.values.accuracy}
                />
                <TextField
                  fullWidth
                  label="Firerate"
                  type="number"
                  name="firerate"
                  onChange={formik.handleChange}
                  value={formik.values.firerate}
                />
              </Flex>
            </Flex>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              CLOSE
            </Button>
            <Button color="error" variant="outlined" type="submit">
              SAVE
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  } else {
    return <div></div>;
  }
}
