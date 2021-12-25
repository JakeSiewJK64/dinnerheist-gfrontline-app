import Flex from "@react-css/flex";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";
import { TeamDialog } from "./team-dialog";
import { TeamTable } from "./team-table";
import { Button } from "@mui/material";

export function ManageTeam() {
  const [team, setTeam] = useState(null);
  const [faction, setFaction] = useState(null);
  const [newDialog, setNewDialog] = useState(false);
  const [headers] = useState([
    {
      Header: "Team Name",
      accessor: "team_name",
    },
    {
      Header: "ID",
      accessor: "team_id",
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
          data={team}
          factions={faction}
        />
        <Flex row justifySpaceBetween>
          <h2>Manage Team</h2>
          <Button onClick={() => setNewDialog(true)}>Add Team</Button>
        </Flex>
        <TeamTable columns={headers} data={team} faction={faction} />
      </div>
    );
  } else {
    return <LoadingSpinner color={"#000"} className={"text-black"} />;
  }
}
