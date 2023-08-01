import fs from "fs";
import path from "path";

const cleaningPath = path.join(__dirname, "cleaning.txt");

const getCheckIfContained = (
  firstElfStart: string,
  secondElfStart: string,
  firstElfEnd: string,
  secondElfEnd: string
) => {
  const firstElfStartInt = parseInt(firstElfStart, 10);
  const firstElfEndInt = parseInt(firstElfEnd, 10);
  const secondElfStartInt = parseInt(secondElfStart, 10);
  const secondElfEndInt = parseInt(secondElfEnd, 10);

  const firstContainsSecond =
    firstElfStartInt >= secondElfStartInt && firstElfEndInt <= secondElfEndInt;
  const secondContainsFirst =
    secondElfStartInt >= firstElfStartInt && secondElfEndInt <= firstElfEndInt;

  return firstContainsSecond || secondContainsFirst;
};

fs.readFile(cleaningPath, { encoding: "utf-8" }, (err, data) => {
  const pairArray = data.split("\n");

  const duplicatedWork = pairArray.reduce((reduction, currentVal) => {
    const [firstElf, secondElf] = currentVal.split(",");
    const [firstElfStart, firstElfEnd] = firstElf.split("-");
    const [secondElfStart, secondElfEnd] = secondElf.split("-");

    if (
      getCheckIfContained(
        firstElfStart,
        secondElfStart,
        firstElfEnd,
        secondElfEnd
      )
    ) {
      return reduction + 1;
    }

    return reduction;
  }, 0);

  console.log(duplicatedWork);
});
