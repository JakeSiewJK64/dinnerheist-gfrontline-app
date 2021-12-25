import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Flex from "@react-css/flex";

export function CategoriesDetailsDialog({ openDialog, setOpenDialog, data }) {
  var formik;

  const submitCategory = async (val) => {
    const res = await fetch("/heroes/upsertCategories", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        jwt_token: localStorage.token,
      },
      body: JSON.stringify(val),
    });
    const success = res;
    if (success.status === 200) {
      toast.success("Success!");
    } else {
      toast.error("An error occured!");
    }
    setOpenDialog(false);
  };

  const GetFormik = () => {
    formik = useFormik({
      initialValues: {
        category_name: data.category_name,
        category_description: data.category_description,
        category_id: data.category_id ? data.category_id : "",
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
              <Flex column>
                <TextField
                  label="Category Name"
                  type="text"
                  margin="dense"
                  onChange={formik.handleChange}
                  value={formik.values.category_name}
                  name="category_name"
                />
                <TextField
                  label="Category Description"
                  type="text"
                  margin="dense"
                  onChange={formik.handleChange}
                  value={
                    formik.values.category_description
                      ? formik.values.category_description
                      : ""
                  }
                  name="category_description"
                />
              </Flex>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              DISMISS
            </Button>
            <Button type="submit">SAVE</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  } else {
    return <div></div>;
  }
}
