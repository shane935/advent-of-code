import fs from "fs";
import path from "path";

// path.join(process.env.NODE_ENV)


const caloriesPath = path.join(__dirname, "calories.txt");


fs.readFile(caloriesPath, {"encoding": "utf-8"}, (err, data) => {
   const arrayData = data.split('\n\n');
   const intArray = arrayData.map(val => {
    return val.split("\n").reduce((reduction, currentVal) => {
        const currentInt = parseInt(currentVal, 10);
        return reduction + currentInt
    }, 0);
   });

   

   const sortedArr = intArray.sort((a, b) => b - a);

   const topThree = sortedArr[0] + sortedArr[1] + sortedArr[2];

   console.log(topThree);


});

