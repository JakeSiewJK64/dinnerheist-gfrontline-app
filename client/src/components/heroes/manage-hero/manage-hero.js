import { Button } from "@mui/material";
import Flex from "@react-css/flex";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import AddHeroDialog from "../add-hero-dialog/add-hero-dialog";
import HeroTable from "../hero-table/hero-table";

const AddHero = function () {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddNewUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dolls, setDolls] = useState([]);
  const [columns] = useState([
    {
      Header: "ID",
      accessor: "hero_id",
      width: 20,
    },
    {
      Header: "Codename",
      accessor: "hero_name",
      width: 40,
    },
    {
      Header: "Rarity",
      accessor: "rarity",
      width: 40,
    },
    {
      Header: "Category",
      accessor: "category_name",
      width: 40,
    },
  ]);

  const openDialogFunction = () => {
    setOpenDialog(true);
  };

  const GetHeroes = async () => {
    const response = await fetch("/heroes/getAllHeroes", {
      method: "GET",
    });
    const rows = await response.json();
    setDolls(rows);
  };

  useEffect(() => {
    GetHeroes();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card mt-5 w-75 mx-auto">
      <AddHeroDialog
        hero={null}
        openHeroDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <div className="card-body">
        <Flex justifySpaceBetween row>
          <h2>Manage Dolls</h2>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            Add
          </Button>
        </Flex>
        <HeroTable columns={columns} data={dolls} />
      </div>
    </div>
  );
};

export default AddHero;
