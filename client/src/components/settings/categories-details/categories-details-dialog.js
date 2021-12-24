import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

export function CategoriesDetailsDialog({ openDialog, setOpenDialog, data }) {
  var formik;

  console.log(data);

  const submitCategory = (val) => {
    console.log("submitted val: ", val);
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        category_name: data.category_name,
      },
      onSubmit: (x) => {
        submitCategory(x);
      },
      enableReinitialize: true,
    });
  };

  if (data) {
    GetFormik();
    return (
      <Dialog open={openDialog}>
        <DialogTitle>{data.category_id ? "Edit" : "Add"} Category</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="mt-2">
              <TextField
                label="Category Name"
                type="text"
                margin="dense"
                onChange={formik.handleChange}
                value={formik.values.category_name}
                name="category_name"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>DISMISS</Button>
            <Button type="submit">SAVE</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  } else {
    return <div></div>;
  }
}
