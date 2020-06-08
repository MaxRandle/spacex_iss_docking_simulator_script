function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const rotationIncrement = rotationPulseSize * toRAD * 0.01;
// time between each loop
const sleepTime = 20;

// rotation spring constant
const rk = 0.02;
// rotation critical damping constant
const rb = Math.sqrt(4 * rk);

// translation spring constant
const tk = 0.005;
// translation critical damping constant
const tb = Math.sqrt(4 * tk);

const loop = async () => {
	console.log("autopilot engaged");

	while (true) {
		// Rotaion adjustments
		const rotationX = camera.rotation.x;
		const rotationY = camera.rotation.y;
		const rotationZ = camera.rotation.z;
		// roll right decreaces
		const targetRotationXRate = -rk * rotationX - rb * currentRotationX;
		const targetRotationYRate = -rk * rotationY - rb * currentRotationY;
		const targetRotationZRate = -rk * rotationZ - rb * currentRotationZ;

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

		// Translational adjustments
		const xRange = camera.position.x - issObject.position.x;
		const yRange = camera.position.y - issObject.position.y;
		const zRange = camera.position.z - issObject.position.z;
		const { x: currentXVelocity, y: currentYVelocity, z: currentZVelocity } = motionVector;

		const targetXVelocity = -tk * xRange - tb * currentXVelocity;
		const targetYVelocity = -tk * yRange - tb * currentYVelocity;
		const targetZVelocity = -tk * zRange - tb * currentZVelocity - 0.01;

		const shouldTranslate = (targetVelocity, currentVelocity, pulse) => {
			// will translating get me closer to my target velocity
			const newVelocity = currentVelocity + pulse;
			return Math.abs(targetVelocity - newVelocity) < Math.abs(targetVelocity - currentVelocity);
		};

		const onTarget = (range, currentVelocity) => {
			return Math.abs(range) < 0.05 && Math.abs(currentVelocity) < translationPulseSize / 5;
		};

		// x
		if (!onTarget(xRange, currentXVelocity) && shouldTranslate(targetXVelocity, currentXVelocity, -translationPulseSize)) {
			translateLeft();
		}
		if (!onTarget(xRange, currentXVelocity) && shouldTranslate(targetXVelocity, currentXVelocity, translationPulseSize)) {
			translateRight();
		}

		// // y
		// if (!onTarget(yRange, currentYVelocity) && shouldTranslate(targetYVelocity, currentYVelocity, -translationPulseSize)) {
		// 	translateDown();
		// }
		// if (!onTarget(yRange, currentYVelocity) && shouldTranslate(targetYVelocity, currentYVelocity, translationPulseSize)) {
		// 	translateUp();
		// }

		// // z
		// if (!onTarget(zRange, currentZVelocity) && shouldTranslate(targetZVelocity, currentZVelocity, -translationPulseSize)) {
		// 	translateForward();
		// }
		// if (!onTarget(zRange, currentZVelocity) && shouldTranslate(targetZVelocity, currentZVelocity, translationPulseSize)) {
		// 	translateBackward();
		// }

		await sleep(sleepTime);
	}
};

loop();
