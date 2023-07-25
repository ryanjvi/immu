const crypto = require('crypto');
const fs = require('fs');

function hashFile(filename) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filename);

    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        resolve(hash.digest('hex'));
      }
    });

    input.on('error', reject);
  });
}

hashFile('Monthly_average_retail_prices_for_gasoline_and_fuel_oil.csv')
  .then(console.log)
  .catch(console.error);
