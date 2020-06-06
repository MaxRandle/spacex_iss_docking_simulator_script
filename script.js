function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const rotationIncrement = rotationPulseSize * toRAD * 0.01;
// time between each loop
const sleepTime = 100;

// rotation spring constant
const rk = 0.02;
// rotation damping constant
const rd = 1.8;

// translation spring constant
const tk = 0.01;
//translation damping constant
const td = 2.5;

const loop = async () => {
	console.log("autopilot engaged");

	while (true) {
		// Rotaion adjustments
		const rotationX = camera.rotation.x;
		const rotationY = camera.rotation.y;
		const rotationZ = camera.rotation.z;
		// roll right decreaces
		const targetRotationXRate = -rk * rotationX - rd * currentRotationX;
		const targetRotationYRate = -rk * rotationY - rd * currentRotationY;
		const targetRotationZRate = -rk * rotationZ - rd * currentRotationZ;

		// pitch
		if (currentRotationX > targetRotationXRate && currentRotationX - targetRotationXRate > rotationIncrement / 2) {
			pitchDown();
		} else if (currentRotationX < targetRotationXRate && currentRotationX - targetRotationXRate < rotationIncrement / 2) {
			pitchUp();
		}

		// yaw
		if (currentRotationY > targetRotationYRate && currentRotationY - targetRotationYRate > rotationIncrement / 2) {
			yawRight();
		} else if (currentRotationY < targetRotationYRate && currentRotationY - targetRotationYRate < rotationIncrement / 2) {
			yawLeft();
		}

		// roll
		if (currentRotationZ > targetRotationZRate && currentRotationZ - targetRotationZRate > rotationIncrement / 2) {
			rollRight();
		} else if (currentRotationZ < targetRotationZRate && currentRotationZ - targetRotationZRate < rotationIncrement / 2) {
			rollLeft();
		}

		// // Translational adjustments
		const xRange = camera.position.x - issObject.position.x;
		const yRange = camera.position.y - issObject.position.y;
		const zRange = camera.position.z - issObject.position.z;
		const { x: currentXVelocity, y: currentYVelocity, z: currentZVelocity } = motionVector;

		const targetXVelocity = -tk * xRange - td * currentXVelocity;
		const targetYVelocity = -tk * yRange - td * currentYVelocity;
		const targetZVelocity = -tk * zRange - td * currentZVelocity;

		// x
		if (currentXVelocity > targetXVelocity && currentXVelocity - targetXVelocity > translationPulseSize / 2) {
			translateLeft();
		} else if (currentXVelocity < targetXVelocity && currentXVelocity - targetXVelocity < translationPulseSize / 2) {
			translateRight();
		}

		// y
		if (currentYVelocity > targetYVelocity && currentYVelocity - targetYVelocity > translationPulseSize / 2) {
			translateDown();
		} else if (currentYVelocity < targetYVelocity && currentYVelocity - targetYVelocity < translationPulseSize / 2) {
			translateUp();
		}

		// z
		if (currentZVelocity > targetZVelocity && currentZVelocity - targetZVelocity > translationPulseSize / 2) {
			translateForward();
		} else if (currentZVelocity < targetZVelocity && currentZVelocity - targetZVelocity < translationPulseSize / 2) {
			translateBackward();
		}

		await sleep(sleepTime);
	}
};

loop();
