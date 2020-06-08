function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const rotationIncrement = rotationPulseSize * toRAD * 0.01;
// time between each loop
const sleepTime = 20;

// rotation spring constant
const rk = 0.02;
// rotation critical damping constant
const rb = Math.sqrt(4 * rk);

// translation spring constant
const tk = 0.01;
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
    } else if (
      currentRotationX < targetRotationXRate &&
      currentRotationX - targetRotationXRate < rotationIncrement / 2
    ) {
      pitchUp();
    }

    // yaw
    if (currentRotationY > targetRotationYRate && currentRotationY - targetRotationYRate > rotationIncrement / 2) {
      yawRight();
    } else if (
      currentRotationY < targetRotationYRate &&
      currentRotationY - targetRotationYRate < rotationIncrement / 2
    ) {
      yawLeft();
    }

    // roll
    if (currentRotationZ > targetRotationZRate && currentRotationZ - targetRotationZRate > rotationIncrement / 2) {
      rollRight();
    } else if (
      currentRotationZ < targetRotationZRate &&
      currentRotationZ - targetRotationZRate < rotationIncrement / 2
    ) {
      rollLeft();
    }

    // // // Translational adjustments
    // const xRange = camera.position.x - issObject.position.x;
    // const yRange = camera.position.y - issObject.position.y;
    // const zRange = camera.position.z - issObject.position.z;
    // const { x: currentXVelocity, y: currentYVelocity, z: currentZVelocity } = motionVector;

    // const targetXVelocity = -tk * xRange - tb * currentXVelocity;
    // const targetYVelocity = -tk * yRange - tb * currentYVelocity;
    // const targetZVelocity = -tk * zRange - tb * currentZVelocity;

    // // x
    // if (currentXVelocity > targetXVelocity && currentXVelocity - targetXVelocity > translationPulseSize / 2) {
    // 	translateLeft();
    // } else if (currentXVelocity < targetXVelocity && currentXVelocity - targetXVelocity < translationPulseSize / 2) {
    // 	translateRight();
    // }

    // // y
    // if (currentYVelocity > targetYVelocity && currentYVelocity - targetYVelocity > translationPulseSize / 2) {
    // 	translateDown();
    // } else if (currentYVelocity < targetYVelocity && currentYVelocity - targetYVelocity < translationPulseSize / 2) {
    // 	translateUp();
    // }

    // // z
    // if (currentZVelocity > targetZVelocity && currentZVelocity - targetZVelocity > translationPulseSize / 2) {
    // 	translateForwarb();
    // } else if (currentZVelocity < targetZVelocity && currentZVelocity - targetZVelocity < translationPulseSize / 2) {
    // 	translateBackwarb();
    // }

    await sleep(sleepTime);
  }
};

loop();
