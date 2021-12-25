import { useEffect, useState } from "react";
import { CategoriesTable } from "./categories-table";
import { Button, IconButton } from "@mui/material";
import { Flex } from "@react-css/flex";
import RefreshIcon from "@mui/icons-material/Refresh";

import { CategoriesDetailsDialog } from "./categories-details-dialog";

export function CategoriesDetails() {
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [headers] = useState([
    {
      Header: "ID",
      accessor: "category_id",
    },
    {
      Header: "Category Name",
      accessor: "category_name",
    },
  ]);

  const getCategories = async () => {
    const cat = await fetch("/heroes/getCategories");
    const res = await cat.json();
    setCategories(res);
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (categories && categories.length > 0) {
    return (
      <div>
        <CategoriesDetailsDialog
          openDialog={openNewDialog}
          setOpenDialog={setOpenNewDialog}
          data={{}}
        />
        <Flex row gap={10} justifySpaceBetween>
          <h2>Gun Categories</h2>
          <IconButton onClick={getCategories}>
            <RefreshIcon fontSize="59" />
          </IconButton>
          <Button
            onClick={() => {
              setOpenNewDialog(true);
            }}
          >
            Add Category
          </Button>
        </Flex>
        <CategoriesTable columns={headers} data={categories} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
