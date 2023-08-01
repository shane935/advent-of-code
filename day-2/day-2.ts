import fs from "fs";
import path from "path";

const scorePath = path.join(__dirname, "score.txt");

const OPlays = {
  Rock: "A",
  Paper: "B",
  Scissors: "C",
} as const;

const OInverse = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const OResults = {
  Win: "Z",
  Draw: "Y",
  Lose: "X",
} as const;

const OInverseResults = {
  Z: "Win",
  Y: "Draw",
  X: "Lose",
};

type Plays = typeof OPlays;

type GameOptions = "A" | "B" | "C";
type ResultOptions = "X" | "Y" | "Z";

const getWinner = (opponent: GameOptions, me: GameOptions) => {
  if (opponent === OPlays.Paper) {
    if (me === OPlays.Scissors) {
      return 6;
    } else if (me === OPlays.Paper) {
      return 3;
    } else {
      return 0;
    }
  } else if (opponent === OPlays.Rock) {
    if (me === OPlays.Paper) {
      return 6;
    } else if (me === OPlays.Rock) {
      return 3;
    } else {
      return 0;
    }
  } else {
    //Scissors
    if (me === OPlays.Rock) {
      return 6;
    } else if (me === OPlays.Scissors) {
      return 3;
    } else {
      return 0;
    }
  }
};

const getMyResponse = (opponent: GameOptions, result: ResultOptions) => {
  if (result === OResults.Win) {
    if (opponent === OPlays.Rock) {
      return OPlays.Paper;
    } else if (opponent === OPlays.Paper) {
      return OPlays.Scissors;
    } else {
      // Scissors
      return OPlays.Rock;
    }
  } else if (result === OResults.Lose) {
    if (opponent === OPlays.Rock) {
      return OPlays.Scissors;
    } else if (opponent === OPlays.Paper) {
      return OPlays.Rock;
    } else {
      // Scissors
      return OPlays.Paper;
    }
  } else {
    // Draw
    return opponent;
  }
};

const OPlayScore = {
  A: 1,
  B: 2,
  C: 3,
} as const;

fs.readFile(scorePath, { encoding: "utf-8" }, (err, data) => {
  const arrayData = data.split("\n");

  const score = arrayData.reduce<number>((reduction, currentVal) => {
    const [opponent, expectedResult] = currentVal.split(" ") as [
      GameOptions,
      ResultOptions,
    ];

    const myResponse = getMyResponse(opponent, expectedResult);

    console.log({
      me: OInverse[myResponse],
      opponent: OInverse[opponent],
      expectedResult: OInverseResults[expectedResult],
    });

    const gameScore = getWinner(opponent, myResponse);
    console.log(gameScore + OPlayScore[myResponse]);
    return reduction + gameScore + OPlayScore[myResponse];
  }, 0);

  console.log(score);
});
