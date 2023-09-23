function generateSixRandomNumbers() {
  let numbers = "";
  for (let i = 0; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    numbers += randomNumber;
  }
  return numbers;
}

module.exports = {generateSixRandomNumbers}