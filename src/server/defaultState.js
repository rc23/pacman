// import md5 from 'md5';
// passwordHash: md5("rc23"),

export const defaultState = {
  users: [
    {
      id: "U1",
      name: "rc23",
    },
    {
      id: "U2",
      name: "noob",
    },
  ],
  scores: [
    {
      id: "S1",
      user: "U1",
      score: 9999,
    },
    {
      id: "S1",
      user: "U1",
      score: 8888,
    },
    {
      id: "S1",
      user: "U2",
      score: 0,
    },
  ],
  isPlaying: false,
};
