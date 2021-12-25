import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  Select,
} from "@mui/material";
import Flex from "@react-css/flex";
import { useFormik } from "formik";
import { InputLabel, MenuItem } from "@material-ui/core";
import { toast } from "react-toastify";

export function TeamDialog({ openDialog, setOpenDialog, data, factions }) {
  var formik;

  const submitForm = async (val) => {
    const response = await fetch("/heroes/upsertTeam", {
      method: "POST",
      headers: {
        jwt_token: localStorage.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(val),
    });
    if (response) {
      toast.success("Success");
      setOpenDialog(false);
      formik.resetForm();
    }
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        team_name: data.team_name ? data.team_name : "",
        faction_name: data.faction_name
          ? data.faction_name
          : factions[0].faction_name,
        team_id: data.team_id ? data.team_id : null,
      },
      enableReinitialize: true,
      onSubmit: (x) => {
        submitForm(x);
      },
    });
  };

  if (data && factions) {
    GetFormik();
    return (
      <div>
        <Dialog open={openDialog}>
          <DialogTitle>{data.team_id ? "Edit" : "Add"} Team</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <Flex column gap={10}>
                <TextField
                  variant="outlined"
                  label="Team Name"
                  name="team_name"
                  onChange={formik.handleChange}
                  value={formik.values.team_name}
                  margin="dense"
                  fullWidth
                />
                <InputLabel>Faction</InputLabel>
                <Select
                  label="Faction"
                  name="faction_name"
                  onChange={formik.handleChange}
                  value={formik.values.faction_name}
                  variant="outlined"
                >
                  {factions.map((x) => (
                    <MenuItem key={x.faction_id} value={x.faction_name}>
                      {x.faction_name}
                    </MenuItem>
                  ))}
                </Select>
              </Flex>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>DISMISS</Button>
              <Button type="submit">SAVE</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}
