import Flex from "@react-css/flex";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import profile from "../../../img/empty-profile.png";
import LoadingSpinner from "../../../shared/shared-components/loadingSpinner/loadingSpinner";

export function UserProfile() {
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    const res = await fetch("/auth/userprofile", {
      method: "GET",
      headers: {
        jwt_token: localStorage.token,
      },
    });
    const parseRes = await res.json();
    if (parseRes) {
      setUser(parseRes);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (user) {
    return (
      <div className="w-100 mt-5 m-auto">
        <h2>My Profile</h2>
        <div className="card-body">
          <Flex column gap={10}>
            <Flex column className="m-auto p-3">
              <img
                src={user.image_url ? user.image_url : profile}
                alt="profile"
                draggable={false}
                style={{ width: "5rem" }}
                className="m-3 rounded-circle"
              />
            </Flex>
            <Flex row gap={10}>
              <TextField
                variant="outlined"
                margin="dense"
                inputProps={{
                  readOnly: true,
                }}
                label="Username"
                fullWidth
                value={user.user_name}
              />
              <TextField
                variant="outlined"
                margin="dense"
                inputProps={{
                  readOnly: true,
                }}
                label="Email"
                fullWidth
                value={user.user_email}
              />
            </Flex>
            <Flex row gap={10}>
              <TextField
                variant="outlined"
                margin="dense"
                inputProps={{
                  readOnly: true,
                }}
                label="First Name"
                fullWidth
                value={user.first_name}
              />
              <TextField
                variant="outlined"
                margin="dense"
                inputProps={{
                  readOnly: true,
                }}
                label="Last Name"
                fullWidth
                value={user.last_name}
              />
            </Flex>
          </Flex>
          <Flex row gap={10} className="mt-3">
            <TextField
              variant="outlined"
              margin="dense"
              inputProps={{
                readOnly: true,
              }}
              label="My Role"
              fullWidth
              value={user.role_name}
            />
          </Flex>
        </div>
      </div>
    );
  } else {
    return <LoadingSpinner />;
  }
}
