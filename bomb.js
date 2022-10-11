class Bomb {
	constructor() {
		this.bomb = document.createElement('div');
		this.bomb.classList = 'bomb';

		var body = document.getElementsByTagName('body')[0];
		body.appendChild(this.bomb);
		var a = Math.floor(Math.random() * (100 - 18 + 1) + 8);
		// var randomNumber = Math.ceil(Math.random() * 100);
		this.bomb.style.left = a + 'vw';

		this.interval = setInterval(this.moveBomb, 100);
	}

	moveBomb = () => {
		if (!gameOver) {
			var randomNumber = Math.floor(Math.random() * (20 - 15 + 1) + 15);
			this.bomb.style.top = this.bomb.offsetTop + randomNumber + 'px';
			var randomA = Math.floor(Math.random() * (5 - 1 + 1) + 1);
			this.bomb.style.left = this.bomb.offsetLeft + randomA + 'px';
			this.checkCollisionOnGround();
			this.checkCollisionWithCharacter();
		}
	};

	checkCollisionOnGround = () => {
		const skyPosition = sky.getBoundingClientRect();

		let bombPosition = this.bomb.getBoundingClientRect();
		var randomB = Math.floor(Math.random() * (110 - 60 + 3) + 60);
		if (bombPosition.top + bombPosition.height >= skyPosition.bottom + randomB) {
			this.bomb.classList.add('explosion');
			clearInterval(this.interval);
			setTimeout(() => {
				this.bomb.remove();
			}, 1000);
		}
	};

	overlaps = (a, b) => {
		const rect1 = a.getBoundingClientRect();
		const rect2 = b.getBoundingClientRect();
		const isInHoriztonalBounds = rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
		const isInVerticalBounds = rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
		const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
		return isOverlapping;
	};
	// overlap function from  https://stackoverflow.com/questions/9768291/check-collision-between-certain-divs

	checkCollisionWithCharacter = () => {
		var player = document.getElementById('player');

		const isOverlapped = this.overlaps(player, this.bomb);

		if (isOverlapped && !killingPlayer) {
			const healthLi = document.getElementById(`health-${life}`);
			healthLi && healthLi.remove();
			if (life <= 1) {
				stopGame();
				return;
			}
			life--;
			killingPlayer = true;
			setTimeout(() => {
				killingPlayer = false;
			}, 1000);
		}
	};
}
