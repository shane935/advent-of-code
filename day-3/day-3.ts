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
  const totalValue = rucksacks.reduce<number>((reduction, currentVal) => {
    const splitLocation = currentVal.length / 2;

    // currentVal.slice;
    const firstPocket = currentVal.slice(0, splitLocation);
    const secondPocket = currentVal.slice(splitLocation);

    const repeatedLetterValue = firstPocket
      .split("")
      .reduce((reduction, currentVal) => {
        if (secondPocket.search(currentVal) !== -1) {
          return getValue(currentVal);
        }
        return reduction;
      }, 0);

    return reduction + repeatedLetterValue;
  }, 0);
  console.log(totalValue);
});
