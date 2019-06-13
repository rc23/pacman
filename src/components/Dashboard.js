import React from "react";
import { connect } from "react-redux";

import { UserList } from "./UserList";

export const Dashboard = ({ users }) => (
  <div id="page-wrap">
    <h1>Dashboard</h1>
    <h2>
      <UserList users={users} />
    </h2>
  </div>
);

const mapStateToProps = state => ({
  users: state.users,
  scores: state.scores,
});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
