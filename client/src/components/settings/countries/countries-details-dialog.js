import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import Flex from "@react-css/flex";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export function CountriesDetailsDialog({ openDialog, setOpenDialog, data }) {
  var formik;

  const submitForm = async (val) => {
    const res = await fetch("/heroes/upsertCountries", {
      method: "POST",
      headers: {
        jwt_token: localStorage.token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(val),
    });

    if (res) {
      toast.success("Success");
      setOpenDialog(false);
    }
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        country_name: data.country_name,
        country_id: data.country_id,
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
          <form onSubmit={formik.handleSubmit}>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogContent>
              <div className="mt-2">
                <Flex>
                  <TextField
                    fullWidth
                    name="country_name"
                    value={formik.values.country_name}
                    type="text"
                    onChange={formik.handleChange}
                    label="Country Name"
                  />
                </Flex>
              </div>
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
