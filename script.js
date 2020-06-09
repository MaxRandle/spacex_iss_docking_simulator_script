function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const shouldMove = (targetVelocity, currentVelocity, pulse) => {
  // will moving get me closer to my target velocity
  const newVelocity = currentVelocity + pulse;
  return Math.abs(targetVelocity - newVelocity) < Math.abs(targetVelocity - currentVelocity);
};

const rotationIncrement = rotationPulseSize * toRAD * 0.01;
// time between each loop
const sleepTime = 20;

// rotation spring constant
const rk = 0.02;
// rotation critical damping constant
const rb = Math.sqrt(4 * rk);

// translation spring constant
const tk = 0.8;
// translation critical damping constant
const tb = Math.sqrt(4 * tk);

const loop = async () => {
  console.log("autopilot engaged");

  while (true) {
    // rotaion
    const rotationX = camera.rotation.x;
    const rotationY = camera.rotation.y;
    const rotationZ = camera.rotation.z;
    const targetRotationXRate = -rk * rotationX - rb * currentRotationX;
    const targetRotationYRate = -rk * rotationY - rb * currentRotationY;
    const targetRotationZRate = -rk * rotationZ - rb * currentRotationZ;

    // translation
    const xRange = camera.position.x - issObject.position.x;
    const yRange = camera.position.y - issObject.position.y;
    const zRange = camera.position.z - issObject.position.z;
    const currentXVelocity = motionVector.x * 50;
    const currentYVelocity = motionVector.y * 50;
    const currentZVelocity = motionVector.z * 50;
    const targetXVelocity = -tk * xRange - tb * currentXVelocity;
    const targetYVelocity = -tk * yRange - tb * currentYVelocity;
    const targetZVelocity = -tk * zRange - tb * currentZVelocity - 0.01;

    // rotation
    if (shouldMove(targetRotationXRate, currentRotationX, -rotationIncrement)) {
      pitchDown();
    }
    if (shouldMove(targetRotationXRate, currentRotationX, rotationIncrement)) {
      pitchUp();
    }
    if (shouldMove(targetRotationYRate, currentRotationY, -rotationIncrement)) {
      yawRight();
    }
    if (shouldMove(targetRotationYRate, currentRotationY, rotationIncrement)) {
      yawLeft();
    }
    if (shouldMove(targetRotationZRate, currentRotationZ, -rotationIncrement)) {
      rollRight();
    }
    if (shouldMove(targetRotationZRate, currentRotationZ, rotationIncrement)) {
      rollLeft();
    }
    // translation
    if (shouldMove(targetXVelocity, currentXVelocity, -translationPulseSize)) {
      translateLeft();
    }
    if (shouldMove(targetXVelocity, currentXVelocity, translationPulseSize)) {
      translateRight();
    }
    if (shouldMove(targetYVelocity, currentYVelocity, -translationPulseSize)) {
      translateDown();
    }
    if (shouldMove(targetYVelocity, currentYVelocity, translationPulseSize)) {
      translateUp();
    }
    if (shouldMove(targetZVelocity, currentZVelocity, -translationPulseSize)) {
      translateForward();
    }
    if (shouldMove(targetZVelocity, currentZVelocity, translationPulseSize)) {
      translateBackward();
    }

    await sleep(sleepTime);
  }
};

loop();
