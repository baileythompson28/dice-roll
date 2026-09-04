let score = 0;
let rolls = 0;
let isRolling = false;
let rollInterval = null;

function rollDice() {
  if (isRolling || rolls >= 10) {
    return;
  }
//had to look this up, idk what some of it means, but it works.
  const dice1 = document.getElementById('dice1');
  const dice2 = document.getElementById('dice2');
  const rollButton = document.getElementById('roll-button');
  const diceResult = document.getElementById('diceResult');
  const rollDuration = 2000;
  const frames = 30;
  const delay = rollDuration / frames;
  let frameCount = 0;

  isRolling = true;
  rollButton.disabled = true;

  rollInterval = setInterval(() => {
    const randomValue1 = Math.floor(Math.random() * 6) + 1;
    const randomValue2 = Math.floor(Math.random() * 6) + 1;
    dice1.textContent = randomValue1;
    dice2.textContent = randomValue2;
    frameCount++;

    if (frameCount >= frames) {
      clearInterval(rollInterval);
      const finalValue1 = Math.floor(Math.random() * 6) + 1;
      const finalValue2 = Math.floor(Math.random() * 6) + 1;
      dice1.textContent = finalValue1;
      dice2.textContent = finalValue2;
      const total = finalValue1 + finalValue2;
      if (total === 7) {
        score = 0;
        diceResult.textContent += 'you rolled 7 and lost all your points!';
      } else {
        score += total;
      }
      rolls++;
      document.getElementById('score').textContent = 'Score: ' + score;
      document.getElementById('rollsLeft').textContent = 'Rolls Left: ' + (10 - rolls);
      isRolling = false;
      rollButton.disabled = rolls >= 10;
      if (rolls >= 10) {
        diceResult.textContent += ' - game over.';
      }
    }
  }, delay);
}

document.getElementById('roll-button').addEventListener('click', rollDice);
document.getElementById('reset-button').addEventListener('click', () => {
  if (rollInterval !== null) {
    clearInterval(rollInterval);
    rollInterval = null;
  }

  score = 0;
  rolls = 0;
  isRolling = false;
  document.getElementById('dice1').textContent = '';
  document.getElementById('dice2').textContent = '';
  document.getElementById('diceResult').textContent = '';
  document.getElementById('score').textContent = 'Score: 0';
  document.getElementById('rollsLeft').textContent = 'Rolls Left: 10';
});