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
import { useState, useRef } from "react";

import { rarity_select } from "../../../shared/constants";
import empty_profile from "../../../img/empty-profile.png";
import { toast } from "react-toastify";

export function HeroDialogFragment({ openDialog, setOpenDialog, data, categories, teams, countries }) {

  const [isLoading, setIsLoading] = useState(true);
  var imageRef;
  var formik;

  const handleImageReset = () => {
    formik.values.image_url = "";
    formik.setFieldValue("image_url", "");
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

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        hero_id: data.hero_id,
        image_url: data.image_url ? data.image_url : "",
        hero_name: data.hero_name ? data.hero_name : "",
        rarity: data.rarity ? data.rarity : 2,
        hero_fullname: data.hero_fullname ? data.hero_fullname : "",
        category: data.category ? data.category : 1,
        health: data.health ? data.health : 0,
        armor: data.armor ? data.armor : 0,
        crit_damage: data.crit_damage ? data.crit_damage : 0,
        crit_rate: data.crit_rate ? data.crit_rate : 0,
        damage: data.damage ? data.damage : 0,
        evasion: data.evasion ? data.evasion : 0,
        move_speed: data.move_speed ? data.move_speed : 0,
        armor_penetration: data.armor_penetration ? data.armor_penetration : 0,
        accuracy: data.accuracy ? data.accuracy : 0,
        firerate: data.firerate ? data.firerate : 0,
        manufacturer: data.manufacturer ? data.manufacturer : "",
        country: data.country ? data.country : 1,
        team_id: data.team_id ? data.team_id : 1,
        revise: data.revise ? data.revise : "",
        va: data.va ? data.va : "",
        artist: data.artist ? data.artist : "",
        description: data.description ? data.description : "",
        personality: data.personality ? data.personality : "",
      },
      onSubmit: (val) => {
        submitHero(val);
      },
    });
  }

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

  GetFormik();

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
            {formik.values.image_url.length > 0 ? (
              <div></div>
            ) : (
              <TextField
                fullWidth
                label="Image URL"
                type="text"
                name="image_url"
                onChange={formik.handleChange}
                value={formik.values.image_url}
              />
            )}
            <TextField
              fullWidth
              label="Hero Name"
              type="text"
              name="hero_name"
              onChange={formik.handleChange}
              value={formik.values.hero_name}
            />
            <TextField
              fullWidth
              label="Full Name"
              type="text"
              name="hero_fullname"
              onChange={formik.handleChange}
              value={formik.values.hero_fullname}
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
              {rarity_select.map((x) => (
                <MenuItem value={x.rarity} key={x.rarity}>
                  [{x.rarity} stars] {x.title}
                </MenuItem>
              ))}
            </Select>
            <InputLabel title="Category" id="category">
              Category
            </InputLabel>
            <Select
              label="category"
              labelId="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              name="category"
            >
              {categories.map((x) => (
                <MenuItem value={x.category_id} key={x.category_id}>
                  {x.category_name}
                </MenuItem>
              ))}
            </Select>
            <Divider />
            <h2>Gun Stats</h2>
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
            <Divider />
            <h2>Gun Information</h2>
            <Flex column gap={10}>
              <TextField
                fullWidth
                label="Manufacturer"
                type="text"
                name="manufacturer"
                onChange={formik.handleChange}
                value={formik.values.manufacturer}
              />
              <InputLabel title="Origin Country" id="country">
                Origin Country
              </InputLabel>
              <Select
                value={formik.values.country}
                label="Country"
                labelId="country"
                onChange={formik.handleChange}
                name="country"
              >
                {countries.map((x) => (
                  <MenuItem value={x.country_id} key={x.country_id}>
                    {x.country_name}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel title="Team" id="team">
                Team
              </InputLabel>
              <Select
                value={formik.values.team_id}
                label="Team"
                labelId="team"
                onChange={formik.handleChange}
                name="team_id"
              >
                {teams.map((x) => (
                  <MenuItem value={x.team_id} key={x.team_id}>
                    {x.team_name}
                  </MenuItem>
                ))}
              </Select>
            </Flex>
            <Divider />
            <h2>Game Information</h2>
            <Flex column gap={10}>
              <TextField
                fullWidth
                helperText="* FACTION DEPENDENT ON TEAM SELECTION"
                InputProps={{
                  disabled: true,
                }}
                label="Faction"
                type="text"
                name="faction"
                onChange={formik.handleChange}
                value={
                  teams.filter((x) => {
                    return x.team_id === formik.values.team_id;
                  })[0].faction_name
                }
              />
              <TextField
                fullWidth
                label="Manufactured By / Revise"
                type="text"
                name="revise"
                onChange={formik.handleChange}
                value={formik.values.revise}
              />
              <TextField
                fullWidth
                label="Voice Actor"
                type="text"
                name="va"
                onChange={formik.handleChange}
                value={formik.values.va}
              />
              <TextField
                fullWidth
                label="Artist"
                type="text"
                name="artist"
                onChange={formik.handleChange}
                value={formik.values.artist}
              />
            </Flex>
          </Flex>
          <h2>Miscellaneous</h2>
          <Flex column gap={10}>
            <Divider />
            <h3>Doll Description</h3>
            <TextareaAutosize
              name="description"
              onChange={formik.handleChange}
              style={{
                minHeight: "5rem",
                height: "5rem",
              }}
              value={formik.values.description}
              placeholder="Doll Description"
            />
            <h3>Doll Personality</h3>
            <TextareaAutosize
              name="personality"
              onChange={formik.handleChange}
              style={{
                minHeight: "5rem",
                height: "5rem",
              }}
              placeholder="Doll Personality"
              value={formik.values.personality}
            />
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
