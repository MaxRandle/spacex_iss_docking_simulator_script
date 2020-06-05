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
const tk = 0.1;
//translation damping constant
const td = 0;

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

		// // x
		// if (Math.abs(xRange) > rangeTolerance && xVelocity - targetXVelocity > velocityTolerance) {
		//   translateLeft();
		// } else if (Math.abs(xRange) > rangeTolerance && xVelocity < targetXVelocity) {
		//   translateRight();
		// }
		// // y
		// if (Math.abs(yRange) > rangeTolerance && yVelocity - targetYVelocity > velocityTolerance) {
		//   translateDown();
		// } else if (Math.abs(yRange) > rangeTolerance && yVelocity < targetYVelocity) {
		//   translateUp();
		// }
		// // z
		// if (Math.abs(zRange) > rangeTolerance && zVelocity - targetZVelocity > velocityTolerance) {
		//   translateForward();
		// } else if (Math.abs(zRange) > rangeTolerance && zVelocity < targetZVelocity) {
		//   translateBackward();
		// }

		await sleep(sleepTime);
	}
};

loop();
