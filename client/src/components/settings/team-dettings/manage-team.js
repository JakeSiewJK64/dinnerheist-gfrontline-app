import Flex from "@react-css/flex";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import { TeamDialog } from "./team-dialog";
import { TeamTable } from "./team-table";
import { Button, IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export function ManageTeam() {
  const [team, setTeam] = useState(null);
  const [faction, setFaction] = useState(null);
  const [newDialog, setNewDialog] = useState(false);
  const [headers] = useState([
    {
      Header: "ID",
      accessor: "team_id",
    },
    {
      Header: "Team Name",
      accessor: "team_name",
    },
    {
      Header: "Faction Name",
      accessor: "faction_name",
    },
  ]);

  const getTeams = async () => {
    const response = await fetch("/heroes/getFactionTeam");
    const rows = await response.json();
    setTeam(rows);
  };

  const GetFactions = async () => {
    const response = await fetch("/heroes/getFactions");
    const row = await response.json();
    setFaction(row);
  };

  useEffect(() => {
    getTeams();
    GetFactions();
  }, []);

  if (team) {
    return (
      <div>
        <TeamDialog
          openDialog={newDialog}
          setOpenDialog={setNewDialog}
          data={{}}
          factions={faction}
        />
        <Flex row justifySpaceBetween>
          <h2>Manage Team</h2>
          <Flex justifySpaceBetween>
            <IconButton onClick={getTeams}>
              <RefreshIcon />
            </IconButton>
            <Button onClick={() => setNewDialog(true)}>Add Team</Button>
          </Flex>
        </Flex>
        <TeamTable columns={headers} data={team} faction={faction} />
      </div>
    );
  } else {
    return <LoadingSpinner color={"#000"} className={"text-black"} />;
  }
}
