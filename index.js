const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path) {
  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sum = 0.00;
  for await (const line of rl) {
    let splits = line.split(";")

    let parsedFloat = parseFloat(splits[6].replace("\"", "").replace(",", "."));
    if (!isNaN(parsedFloat)) {
      sum += parsedFloat;
    }
  }

  return sum;
}

let arguments = process.argv.slice(2);

let sumPasseringer = processLineByLine(arguments[0]);

sumPasseringer.then((sum) => {
  console.log("Total kr i passeringer: ", sum.toFixed(2));
})