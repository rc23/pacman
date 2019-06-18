import React from "react";
import "./Leaderboard.css";

import { connect } from "react-redux";

export const Leaderboard = ({ users, scores }) => {
  const getUserScore = userId =>
    scores
      .filter(score => score.userId === userId)
      .reduce((acc, curr) => (curr.score > acc.score ? curr : acc));

  const getScores = () =>
    users.map(user => {
      const userHighestScore = getUserScore(user.id);
      return {
        id: userHighestScore.id,
        user: user.name,
        score: userHighestScore.score,
      };
    });

  const getSortedUserScores = () =>
    getScores().sort((a, b) => b.score - a.score);

  return (
    <section className="leaderboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>High Score</th>
                </tr>
              </thead>
              <tbody>
                {getSortedUserScores().map((score, index) => (
                  <tr key={score.id}>
                    <td>#{index + 1}</td>
                    <td>{score.user}</td>
                    <td>{score.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
  scores: state.users.scores,
});

export const ConnectedLeaderboard = connect(mapStateToProps)(Leaderboard);
