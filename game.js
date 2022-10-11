var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spacepressed = false;
let sky = null;

let life = 3;
let killingPlayer = false;
let gameOver = false;
let bombsAnimate = null;

function keyup(event) {
	var player = document.getElementById('player');

	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	if (event.keyCode == 32) {
		spacepressed = false;
		player.className = '';
	}

	player.className = 'character stand ' + lastPressed;
}

function move() {
	var player = document.getElementById('player');

	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 2;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);

		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		// console.log(element);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

	if (spacepressed) {
		var body = document.getElementsByTagName('body')[0];

		var playerLeftOffset = player.offsetLeft;
		var playerTopOffset = player.offsetTop;
		var windowHeight = window.innerHeight;
		var windowWidth = window.innerWidth;

		//Add fire animation to the player's sprite.
		player.classList.add('fire');

		//Create a new arrow element.
		var arrow = document.createElement('div');
		arrow.classList.add('arrow');
		arrow.style.top = playerTopOffset + 'px';
		arrow.style.left = playerLeftOffset + 'px';

		//Add the arrow to the screen.
		body.appendChild(arrow);

		var arrowDirection;

		if (player.classList.contains('up')) {
			arrowDirection = 0;
		} else if (player.classList.contains('right')) {
			arrowDirection = 1;
		} else if (player.classList.contains('down')) {
			arrowDirection = 2;
		} else if (player.classList.contains('left')) {
			arrowDirection = 3;
		}

		var arrowInterval = setInterval(function() {
			var arrowOffsetTop = arrow.offsetTop;
			var arrowOffsetLeft = arrow.offsetLeft;

			var currentDirection = arrowDirection;

			if (currentDirection == 0) {
				var arrowTopLeft = document.elementFromPoint(arrowOffsetLeft, arrowOffsetTop - 2);
				var arrowTopMiddle = document.elementFromPoint(arrowOffsetLeft + 5, arrowOffsetTop - 2);
				var arrowTopRight = document.elementFromPoint(arrowOffsetLeft + 10, arrowOffsetTop - 2);

				var arrowLeftMiddle = document.elementFromPoint(arrowOffsetLeft - 1, arrowOffsetTop + 16);
				var arrowRightMiddle = document.elementFromPoint(arrowOffsetLeft + 32, arrowOffsetTop + 16);

				var arrowBottomLeft = document.elementFromPoint(arrowOffsetLeft, arrowOffsetTop + 33);
				var arrowBottomMiddle = document.elementFromPoint(arrowOffsetLeft + 5, arrowOffsetTop + 33);
				var arrowBottomRight = document.elementFromPoint(arrowOffsetLeft + 10, arrowOffsetTop + 33);

				arrowOffsetTop = arrowOffsetTop - 10;
			} else if (currentDirection == 1) {
				var arrowTopLeft = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop - 10);
				var arrowTopMiddle = document.elementFromPoint(arrowOffsetLeft + 16, arrowOffsetTop - 10);
				var arrowTopRight = document.elementFromPoint(arrowOffsetLeft + 33, arrowOffsetTop - 10);

				var arrowLeftMiddle = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop + 10);
				var arrowRightMiddle = document.elementFromPoint(arrowOffsetLeft + 33, arrowOffsetTop + 10);

				var arrowBottomLeft = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop + 20);
				var arrowBottomMiddle = document.elementFromPoint(arrowOffsetLeft + 16, arrowOffsetTop + 20);
				var arrowBottomRight = document.elementFromPoint(arrowOffsetLeft + 33, arrowOffsetTop + 20);

				arrowOffsetLeft = arrowOffsetLeft + 10;
			} else if (currentDirection == 2) {
				var arrowTopLeft = document.elementFromPoint(arrowOffsetLeft, arrowOffsetTop - 2);
				var arrowTopMiddle = document.elementFromPoint(arrowOffsetLeft + 5, arrowOffsetTop - 2);
				var arrowTopRight = document.elementFromPoint(arrowOffsetLeft + 10, arrowOffsetTop - 2);

				var arrowLeftMiddle = document.elementFromPoint(arrowOffsetLeft - 1, arrowOffsetTop + 16);
				var arrowRightMiddle = document.elementFromPoint(arrowOffsetLeft + 32, arrowOffsetTop + 16);

				var arrowBottomLeft = document.elementFromPoint(arrowOffsetLeft, arrowOffsetTop + 33);
				var arrowBottomMiddle = document.elementFromPoint(arrowOffsetLeft + 5, arrowOffsetTop + 33);
				var arrowBottomRight = document.elementFromPoint(arrowOffsetLeft + 10, arrowOffsetTop + 33);

				arrowOffsetTop = arrowOffsetTop + 10;
			} else if (currentDirection == 3) {
				var arrowTopLeft = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop - 10);
				var arrowTopMiddle = document.elementFromPoint(arrowOffsetLeft + 16, arrowOffsetTop - 10);
				var arrowTopRight = document.elementFromPoint(arrowOffsetLeft + 32, arrowOffsetTop - 10);

				var arrowLeftMiddle = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop + 10);
				var arrowRightMiddle = document.elementFromPoint(arrowOffsetLeft + 32, arrowOffsetTop + 10);

				var arrowBottomLeft = document.elementFromPoint(arrowOffsetLeft - 2, arrowOffsetTop + 20);
				var arrowBottomMiddle = document.elementFromPoint(arrowOffsetLeft + 16, arrowOffsetTop + 20);
				var arrowBottomRight = document.elementFromPoint(arrowOffsetLeft + 32, arrowOffsetTop + 20);

				arrowOffsetLeft = arrowOffsetLeft - 10;
			}

			if (
				!arrowTopLeft.classList.contains('enemy') &&
				!arrowTopMiddle.classList.contains('enemy') &&
				!arrowTopRight.classList.contains('enemy') &&
				!arrowLeftMiddle.classList.contains('enemy') &&
				!arrowRightMiddle.classList.contains('enemy') &&
				!arrowBottomLeft.classList.contains('enemy') &&
				!arrowBottomMiddle.classList.contains('enemy') &&
				!arrowBottomRight.classList.contains('enemy')
			) {
				arrow.style.left = arrowOffsetLeft + 'px';
			} else if (enemyCount != 0) {
				if (
					!arrowTopLeft.classList.contains('hide') &&
					!arrowTopMiddle.classList.contains('hide') &&
					!arrowTopRight.classList.contains('hide') &&
					!arrowLeftMiddle.classList.contains('hide') &&
					!arrowRightMiddle.classList.contains('hide') &&
					!arrowBottomLeft.classList.contains('hide') &&
					!arrowBottomMiddle.classList.contains('hide') &&
					!arrowBottomRight.classList.contains('hide')
				) {
					if (
						!arrowTopLeft.classList.contains('dead') &&
						!arrowTopMiddle.classList.contains('dead') &&
						!arrowTopRight.classList.contains('dead') &&
						!arrowLeftMiddle.classList.contains('dead') &&
						!arrowRightMiddle.classList.contains('dead') &&
						!arrowBottomLeft.classList.contains('dead') &&
						!arrowBottomMiddle.classList.contains('dead') &&
						!arrowBottomRight.classList.contains('dead')
					) {
						if (arrowTopLeft.classList.contains('enemy')) {
							arrowTopLeft.classList.remove('blocking');
							arrowTopLeft.classList.remove('fire');
							arrowTopLeft.classList.remove('walk');
							arrowTopLeft.classList.add('dead');

							var enemy = arrowTopLeft.firstChild.parentElement;
						} else if (arrowTopMiddle.classList.contains('enemy')) {
							arrowTopMiddle.classList.remove('blocking');
							arrowTopMiddle.classList.remove('fire');
							arrowTopMiddle.classList.remove('walk');
							arrowTopMiddle.classList.add('dead');

							var enemy = arrowTopMiddle.firstChild.parentElement;
						} else if (arrowTopRight.classList.contains('enemy')) {
							arrowTopRight.classList.remove('blocking');
							arrowTopRight.classList.remove('fire');
							arrowTopRight.classList.remove('walk');
							arrowTopRight.classList.add('dead');

							var enemy = arrowTopRight.firstChild.parentElement;
						} else if (arrowLeftMiddle.classList.contains('enemy')) {
							arrowLeftMiddle.classList.remove('blocking');
							arrowLeftMiddle.classList.remove('fire');
							arrowLeftMiddle.classList.remove('walk');
							arrowLeftMiddle.classList.add('dead');

							var enemy = arrowLeftMiddle.firstChild.parentElement;
						} else if (arrowRightMiddle.classList.contains('enemy')) {
							arrowRightMiddle.classList.remove('blocking');
							arrowRightMiddle.classList.remove('fire');
							arrowRightMiddle.classList.remove('walk');
							arrowRightMiddle.classList.add('dead');

							var enemy = arrowRightMiddle.firstChild.parentElement;
						} else if (arrowBottomLeft.classList.contains('enemy')) {
							arrowBottomLeft.classList.remove('blocking');
							arrowBottomLeft.classList.remove('fire');
							arrowBottomLeft.classList.remove('walk');
							arrowBottomLeft.classList.add('dead');

							var enemy = arrowBottomLeft.firstChild.parentElement;
						} else if (arrowBottomMiddle.classList.contains('enemy')) {
							arrowBottomMiddle.classList.remove('blocking');
							arrowBottomMiddle.classList.remove('fire');
							arrowBottomMiddle.classList.remove('walk');
							arrowBottomMiddle.classList.add('dead');

							var enemy = arrowBottomMiddle.firstChild.parentElement;
						} else if (arrowBottomRight.classList.contains('enemy')) {
							arrowBottomRight.classList.remove('blocking');
							arrowBottomRight.classList.remove('fire');
							arrowBottomRight.classList.remove('walk');
							arrowBottomRight.classList.add('dead');

							var enemy = arrowBottomRight.firstChild.parentElement;
						}

						enemy.style.width = 48 + 'px';

						setTimeout(function() {
							body.removeChild(enemy);
						}, 2000);

						clearInterval(arrowInterval);
						body.removeChild(arrow);
					}
				}
			}

			if (
				!(arrowTopLeft.classList.contains('blocking') || arrowTopLeft.classList.contains('enemy')) &&
				!(arrowTopMiddle.classList.contains('blocking') || arrowTopMiddle.classList.contains('enemy')) &&
				!(arrowLeftMiddle.classList.contains('blocking') || arrowLeftMiddle.classList.contains('enemy')) &&
				!(arrowRightMiddle.classList.contains('blocking') || arrowRightMiddle.classList.contains('enemy')) &&
				!(arrowTopRight.classList.contains('blocking') || arrowTopRight.classList.contains('enemy')) &&
				!(arrowBottomLeft.classList.contains('blocking') || arrowBottomLeft.classList.contains('enemy')) &&
				!(arrowBottomMiddle.classList.contains('blocking') || arrowBottomMiddle.classList.contains('enemy')) &&
				!(arrowBottomRight.classList.contains('blocking') || arrowBottomRight.classList.contains('enemy'))
			) {
				if (currentDirection == 0) {
					arrow.classList.add('up');
					arrow.style.top = arrowOffsetTop + 'px';
					if (arrowOffsetTop <= 0) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 1) {
					arrow.classList.add('right');
					arrow.style.left = arrowOffsetLeft + 'px';
					if (arrowOffsetLeft + 32 >= windowWidth) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 2) {
					arrow.classList.add('down');
					arrow.style.top = arrowOffsetTop + 'px';
					if (arrowOffsetTop + 10 >= windowHeight) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 3) {
					arrow.classList.add('left');
					arrow.style.left = arrowOffsetLeft + 'px';
					if (arrowOffsetLeft <= 0) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				}
			} else if (
				arrowTopLeft.classList.contains('dead') ||
				arrowTopMiddle.classList.contains('dead') ||
				arrowTopRight.classList.contains('dead') ||
				arrowLeftMiddle.classList.contains('dead') ||
				arrowRightMiddle.classList.contains('dead') ||
				arrowBottomLeft.classList.contains('dead') ||
				arrowBottomMiddle.classList.contains('dead') ||
				arrowBottomRight.classList.contains('dead')
			) {
				if (currentDirection == 0) {
					arrow.classList.add('up');
					arrow.style.top = arrowOffsetTop + 'px';
					if (arrowOffsetTop <= 0) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 1) {
					arrow.classList.add('right');
					arrow.style.left = arrowOffsetLeft + 'px';
					if (arrowOffsetLeft + 32 >= windowWidth) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 2) {
					arrow.classList.add('down');
					arrow.style.top = arrowOffsetTop + 'px';
					if (arrowOffsetTop + 10 >= windowHeight) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				} else if (currentDirection == 3) {
					arrow.classList.add('left');
					arrow.style.left = arrowOffsetLeft + 'px';
					if (arrowOffsetLeft <= 0) {
						clearInterval(arrowInterval);
						body.removeChild(arrow); //Remove arrow from the screen.
					}
				}
			} else {
				if (arrow != null) {
					clearInterval(arrowInterval);

					setTimeout(function() {
						body.removeChild(arrow);
					}, 2000);
				}
			}
		}, 25);
	} else {
		//Remove fire animation from the player's sprite.
		player.classList.remove('fire');
	}
}

// function fire() {}

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
	if (event.keyCode == 32) {
		spacepressed = true;
	}
}
//----------------------------------------------------------------------------------------------------------------------------------------

function bombMove(bomb) {
	var top = bomb.offsetTop;
	var sky = document.getElementsByClassName('sky')[0];

	var player = document.getElementById('player');
}

function stats() {
	var player = document.querySelectorAll('#player');
	var spaceShip = document.querySelectorAll('.alien');
	var bullet = document.querySelectorAll('.bomb');
	var explosion = document.querySelectorAll('.explosion');
	var statsbox = document.getElementsByClassName('stats')[0];
	statsbox.style.display = 'block';
	statsbox.firstChild.nodeValue = `Players : { ${player.length} }
	Number of Alien: { ${spaceShip.length} }
	Number of bullets: { ${bullet.length} }   
	Total kills: {N?A}
	Bomb Survived : ${bullet.length - 3} `;
}

function startpressed() {
	playerMove();
	var startBtn = document.getElementsByClassName('start')[0];
	startBtn.style.display = 'none';

	var a = Math.floor(Math.random() * (10 - 3 + 1) + 3);
	generate(a);
	position();

	positiontimer = setInterval(position, 2000);
	setInterval(bombMove, 200);
	createBombAndAnimate();
}
//------------------alien generate and bullet generate
function createBombAndAnimate() {
	bombsAnimate = setInterval(function() {
		const bomb = new Bomb();
	}, 500);
}
function stopGame() {
	clearInterval(bombsAnimate);
	clearInterval(positiontimer);
	gameOver = true;

	var player = document.getElementById('player');
	player.className = 'character dead';
	stats();
	tryagain();
}

function tryagain() {
	var tryButton = document.getElementsByClassName('try')[0];
	tryButton.style.display = 'block';
	tryButton.firstChild.nodeValue = '🎰🎮🕹️Try Again?...';
	var next = document.getElementsByClassName('next')[0];
	next.style.display = 'block';
	// nextlevel.addEventListener('click', refresh);
	tryButton.addEventListener('click', refresh);
}
function refresh() {
	location.reload();
	return false;
}

function generate(a) {
	for (var i = 0; i < a; i++) {
		var spaceShip = document.createElement('div');
		spaceShip.classList = 'alien';
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(spaceShip);
	}
}

// function bombgenerate(a) {
// 	for (var i = 0; i < a; i++) {
// 		var bomb = document.createElement('div');
// 		bomb.classList = 'bomb';
// 		var body = document.getElementsByTagName('body')[0];
// 		body.appendChild(bomb);
// 	}
// }

//----------position spaceship and bomb at same place
function position() {
	var spaceShip = document.getElementsByClassName('alien');
	var bulletPosition = document.getElementsByClassName('bomb');
	for (var i = 0; i < spaceShip.length; i++) {
		var randomNumber = Math.ceil(Math.random() * 100 - 19);
		spaceShip[i].style.left = randomNumber + 'vw';
		spaceShip[i].style.top = 0;
	}
}

// function bombposition() {
// 	var spaceShip = document.getElementsByClassName('alien');
// 	var bulletPosition = document.getElementsByClassName('bomb');
// 	for (var i = 0; i < bulletPosition.length; i++) {
// 		var randomNumber = Math.ceil(Math.random() * 100);

//
// 	}
// }

// function bombMove() {
// 	var bombs = document.getElementsByClassName('bomb');
// 	for (var i = 0; i < bombs.length; i++) {
// 		var top = bombs[i].offsetTop;
// 	}
// }

// function bombExplosion(bomb) {
// 	var top = bomb.offsetTop;
// 	var sky = document.getElementById('sky');
// 	var player = document.getElementById('player');
// 	var randomSpeed = Math.ceil(Math.random() * 20);
// 	var li = document.getElementsByTagName('li');

// 	setInterval(function() {
// 		var element = document.elementsFromPoint(player.offsetLeft, player.offsetTop);

// 		if (top > sky.offsetHeight) {
// 			bomb.classList = 'explosion';

// 			setTimeout(function() {
// 				bomb.parentNode.removeChild(bomb);
// 			}, 2000);

// 			if (element.classList.contains('explosion') == true) {
// 				player.className = 'character dead';

// 				li[0].parentNode.removeChild(li[0]);
// 				var startButton = document.get('start')[0];
// 				startButton.style.display = 'block';

// 				startButton.firstChild.nodeValue = 'game Over';
// 			}
// 		} else {
// 			top = top + 1;
// 			bomb.style.top = top + 'px';
// 		}
// 	}, randomSpeed);
// }

//---------bomb dropping
//--------------------function--------------------

// const bombfall = () => {
// 	var spaceShip = document.getElementsByClassName('alien');
// 	var bulletPosition = document.querySelectorAll('.bomb')[0];
// 	var bombtop = bulletPosition.offsetTop;
// 	console.log(bombtop);
// 	var sky = document.getElementsByClassName('sky')[0];
// 	var player = document.getElementById('player');
// 	var speed = Math.ceil(Math.random() * 25);
// 	setInterval(function() {
// 		var element = document.elementFromPoint(player.offsetLeft, player.offsetTop);

// 		if (bombtop > sky.offsetTop) {
// 			bulletPosition.classList = 'explosion';

// 			if (element.classList.contains('explosion') == true) {
// 				var divs = document.getElementsByTagName('div');

// 				for (var i = 0; i < divs.length; i++) {
// 					divs[i].style.display = 'none';
// 				}
// 				var startbutton = document.getElementsByClassName('start')[0];
// 				startbutton.style.display = 'block';
// 				startbutton.firstChild.nodeValue = 'Game Over';
// 				clearInterval(position);
// 			}
// 			setTimeout(function() {
// 				if (bulletPosition.parentNode != null) {
// 					bulletPosition.parentNode.removeChild(bomb);
// 				}
// 			}, 3000);
// 		} else {
// 			bombtop++;
// 			bulletPosition.style.top = bombtop + 'px';
// 		}
// 	}, speed);
// };

// const bombDrop = () => {
// 	var bombs = document.querySelectorAll('.bomb');
// 	var player = document.getElementById('player');
// 	var sky = document.getElementsByClassName('sky')[0];
// 	var playerTop = player.offsetTop;
// 	var speed = Math.ceil(Math.random() * 25);

// 	bombs.forEach((bomb) => {
// 		let bombTop = bomb.offsetTop;
// 		console.log(bombTop);
// 		var newbomb = bombTop + 10;
// 		bomb.style.top = newbomb + '%';
// 		clearInterval(positionTimer);
// 		console.log(bombTop);
// 	});
// };

//---------------- player move keys eventlistener
const playerMove = () => {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
};

//-----------load function and DOMcontentloaded
function myLoadFunction() {
	var startBtn = document.getElementsByClassName('start')[0];
	startBtn.addEventListener('click', startpressed);
	sky = document.getElementById('sky');
}

document.addEventListener('DOMContentLoaded', myLoadFunction);
