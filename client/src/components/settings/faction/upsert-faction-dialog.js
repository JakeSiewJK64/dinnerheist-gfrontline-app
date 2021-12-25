import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import Flex from "@react-css/flex";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export function UpsertFactionDialog({ openDialog, setOpenDialog, data }) {
  var formik;

  const submitForm = async (val) => {
    const response = await fetch("/heroes/upsertFaction", {
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
    }
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        faction_name: data.faction_name,
        image_url: data.image_url,
        faction_id: data.faction_id,
      },
      enableReinitialize: true,
      onSubmit: (x) => {
        submitForm(x);
      },
    });
  };

  if (data) {
    GetFormik();
    return (
      <div>
        <Dialog
          open={openDialog}
          PaperProps={{
            style: {
              width: "80rem",
            },
          }}
        >
          <DialogTitle>Add Faction</DialogTitle>
          <div className="mt-2">
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <Flex column gap={5}>
                  <TextField
                    type={"text"}
                    label="Faction Name"
                    name="faction_name"
                    onChange={formik.handleChange}
                    value={formik.values.faction_name}
                  />
                </Flex>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>DISMISS</Button>
                <Button type="submit">SAVE</Button>
              </DialogActions>
            </form>
          </div>
        </Dialog>
      </div>
    );
  } else {
    return <div></div>;
  }
}
