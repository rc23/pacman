import React from "react";

export const UserList = props => (
  <div>
    {props.users.map(user => (
      <div key={user.id}>{user.name}</div>
    ))}
  </div>
);
