import fs from "fs";
import path from "path";

const cleaningPath = path.join(__dirname, "cleaning.txt");

const getSegmentOverlaps = (
  startSegment: number,
  endSegment: number,
  segmentToCheck: number
) => {
  console.log({
    startSegment,
    endSegment,
    segmentToCheck,
    test: segmentToCheck >= startSegment && segmentToCheck <= endSegment,
  });
  return segmentToCheck >= startSegment && segmentToCheck <= endSegment;
};

const getOverlapsExist = (
  firstElfStartInt: number,
  firstElfEndInt: number,
  secondElfStartInt: number,
  secondElfEndInt: number
) => {
  const firstOverlapsSecond =
    getSegmentOverlaps(firstElfStartInt, firstElfEndInt, secondElfStartInt) ||
    getSegmentOverlaps(firstElfStartInt, firstElfEndInt, secondElfEndInt);
  const secondOverlapsFirst =
    getSegmentOverlaps(secondElfStartInt, secondElfEndInt, firstElfStartInt) ||
    getSegmentOverlaps(secondElfStartInt, secondElfEndInt, firstElfEndInt);

  return firstOverlapsSecond || secondOverlapsFirst;
};

const getCheckIfContained = (
  firstElfStart: string,
  firstElfEnd: string,
  secondElfStart: string,
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

  const overlapsExist = getOverlapsExist(
    firstElfStartInt,
    firstElfEndInt,
    secondElfStartInt,
    secondElfEndInt
  );

  return firstContainsSecond || secondContainsFirst || overlapsExist;
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
        firstElfEnd,
        secondElfStart,
        secondElfEnd
      )
    ) {
      return reduction + 1;
    }

    return reduction;
  }, 0);

  console.log(getOverlapsExist(5, 7, 7, 9));

  console.log(duplicatedWork);
});
