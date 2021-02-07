const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;


function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createTanque() {
  const tanque = document.createElement('div');
  let tanquePosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  tanque.classList.add('cactus');
  background.appendChild(tanque);
  tanque.style.left = tanquePosition + 'px';

  let leftTimer = setInterval(() => {
    if (tanquePosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(tanque);
    } else if (tanquePosition > 0 && tanquePosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      tanquePosition -= 10;
      tanque.style.left = tanquePosition + 'px';
    }
  }, 20);

  setTimeout(createTanque, randomTime);
}

createTanque();
document.addEventListener('keyup', handleKeyUp);
