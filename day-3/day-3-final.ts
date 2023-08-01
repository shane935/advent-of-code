import fs from "fs";
import path from "path";

const rucksackPath = path.join(__dirname, "rucksack.txt");

const getValue = (letter: string) => {
  const asciiCode = letter.charCodeAt(0);
  if (asciiCode <= 90) {
    return asciiCode - 38;
  } else {
    return asciiCode - 96;
  }
};

fs.readFile(rucksackPath, { encoding: "utf-8" }, (err, data) => {
  const rucksacks = data.split("\n");

  const groupedByThree = rucksacks.reduce<string[][]>(
    (reduction, currentVal, currentIndex) => {
      if (currentIndex % 3 === 0) {
        return [...reduction, [currentVal]];
      } else {
        const lastArray = reduction.pop() ?? [];
        return [...reduction, [...lastArray, currentVal]];
      }
    },
    []
  );

  const totalValue = groupedByThree.reduce<number>((reduction, currentVal) => {
    const [firstElf, secondElf, thirdElf] = currentVal;

    const repeatedLetterValue = firstElf
      .split("")
      .reduce((reduction, currentVal) => {
        if (
          secondElf.search(currentVal) !== -1 &&
          thirdElf.search(currentVal) !== -1
        ) {
          return getValue(currentVal);
        }
        return reduction;
      }, 0);

    return reduction + repeatedLetterValue;
  }, 0);
  console.log(totalValue);
});
