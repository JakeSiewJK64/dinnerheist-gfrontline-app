import { useEffect, useState } from "react";
import { FactionTable } from "./faction-table";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import { UpsertFactionDialog } from "./upsert-faction-dialog";
import Flex from "@react-css/flex";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, IconButton } from "@mui/material";

export function ManageFaction() {
  const [faction, setFaction] = useState(null);
  const [newDialog, setNewDialog] = useState(false);
  const [headers] = useState([
    {
      Header: "ID",
      accessor: "faction_id",
    },
    {
      Header: "Faction Name",
      accessor: "faction_name",
    },
  ]);

  const getFactions = async () => {
    const response = await fetch("/heroes/getFactions");
    const res = await response.json();
    setFaction(res);
  };

  useEffect(() => {
    getFactions();
  }, []);

  if (faction) {
    return (
      <div>
        <UpsertFactionDialog
          data={{}}
          openDialog={newDialog}
          setOpenDialog={setNewDialog}
        />
        <Flex row justifySpaceBetween>
          <h2>Manage Factions</h2>
          <Flex row gap={5}>
            <IconButton onClick={getFactions}>
              <RefreshIcon />
            </IconButton>
            <Button onClick={() => setNewDialog(true)}>ADD FACTION</Button>
          </Flex>
        </Flex>
        <FactionTable columns={headers} data={faction} size={1} />
      </div>
    );
  } else {
    return <LoadingSpinner className={"text-black"} color={"#000"} />;
  }
}
