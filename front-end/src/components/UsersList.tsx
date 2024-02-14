import { Box } from "@mui/material";
import { TUser } from "../types/user";

type TUserListProps = {
  users: TUser[];
};

const UsersList = ({ users }: TUserListProps) => {
  return (
    <Box sx={{ marginY: "100px" }}>
      <h1>Hello ReqRes users!</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            const name = `${user.first_name} ${user.last_name}`;
            const job = user.job ? ` - ${user.job}` : "";
            const identity = `${name}${job}`;
            return (
              <div key={user.id}>
                <p>
                  <strong>{identity}</strong>
                </p>
                <p>{user.email}</p>
                <img key={user.avatar} src={user.avatar} />
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default UsersList;
