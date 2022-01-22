import { useEffect, useState } from "react";
import { Flex } from "@react-css/flex";
import { Button, IconButton } from "@mui/material";
import { CountriesTable } from "./countries-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CountriesDetailsDialog } from "./countries-details-dialog";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";

export function ManageCountries() {
  const [countries, setContries] = useState(null);
  const [newDialog, setOpenNewDialog] = useState(false);
  const [headers] = useState([
    {
      Header: "ID",
      accessor: "country_id",
    },
    {
      Header: "Country Name",
      accessor: "country_name",
    },
  ]);

  const getCountries = async () => {
    const cat = await fetch("/heroes/getCountries");
    const res = await cat.json();
    setContries(res);
  };

  useEffect(() => {
    getCountries();
  }, []);

  if (countries) {
    return (
      <div>
        <CountriesDetailsDialog
          data={{}}
          openDialog={newDialog}
          setOpenDialog={setOpenNewDialog}
        />
        <Flex row gap={10}>
          <h2>Countries</h2>
          <Flex row className="ms-auto">
            <IconButton onClick={getCountries}>
              <RefreshIcon fontSize="59" />
            </IconButton>
            <Button
              onClick={() => {
                setOpenNewDialog(true);
              }}
            >
              Add Countries
            </Button>
          </Flex>
        </Flex>
        <CountriesTable columns={headers} data={countries} />
      </div>
    );
  } else {
    return <LoadingSpinner color={"#000"} className={"text-black"} />;
  }
}
