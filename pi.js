var fs = require('fs');

var readStream = fs.createReadStream("data/pi.txt");
let searchString = process.argv[2]
let posBase = 0;
let lastBlob = "";
let found = false;
readStream.on('data', function (data) {
  let searchText = lastBlob + data.toString()
  let index = searchText.indexOf(searchString)
  if (index > 0) {
    console.log(`String '${searchString}' found at: ${(index+posBase-1)}`)
    readStream.destroy()
    found = true
  }

  lastBlob = data.toString()
  posBase += lastBlob.length
});

readStream.on('close', () => {
  if (!found) {
    console.log("not found")
  }
})

readStream.on('error', function(err) {
  console.error(err);
  process.exit()
});
