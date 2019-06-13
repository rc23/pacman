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
      name: "average",
    },
    {
      id: "U3",
      name: "pro",
    },
  ],
  scores: [
    {
      id: "S1",
      userId: "U1",
      score: 0,
    },
    {
      id: "S2",
      userId: "U2",
      score: 100,
    },
    {
      id: "S3",
      userId: "U2",
      score: 101,
    },
    {
      id: "S4",
      userId: "U2",
      score: 50,
    },
    {
      id: "S5",
      userId: "U3",
      score: 9999,
    },
  ],
  isPlaying: false,
};
