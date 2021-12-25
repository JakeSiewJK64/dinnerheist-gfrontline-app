import { useEffect, useState } from "react";
import { CategoriesTable } from "./categories-table";
import { Button, IconButton } from "@mui/material";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
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
    {
      Header: "Description",
      accessor: "category_description",
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
        <Flex row gap={10}>
          <h2>Gun Categories</h2>
          <Flex row className="ms-auto">
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
        </Flex>
        <CategoriesTable columns={headers} data={categories} />
      </div>
    );
  } else {
    return <LoadingSpinner color={"#000"} className={"text-black"} />;
  }
}
