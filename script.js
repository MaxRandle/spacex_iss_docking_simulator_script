function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const loop = async () => {
  const rotationIncrement = rotationPulseSize * toRAD * 0.01;
  const translationSize = 0.001;

  while (true) {
    // time between each loop
    const sleepTime = 100;
    // spring constant
    const k = 0.01;
    // damping constant
    const d = 0.1;

    // Rotaion adjustments
    const rotationX = camera.rotation.x;
    const rotationY = camera.rotation.y;
    const rotationZ = camera.rotation.z;
    // roll right decreaces
    const targetRotationXRate = -k * rotationX - d * currentRotationX;
    const targetRotationYRate = -k * rotationY - d * currentRotationY;
    const targetRotationZRate = -k * rotationZ - d * currentRotationZ;

    // // pitch
    // if (currentRotationX > targetRotationXRate) {
    //   pitchDown();
    // } else if (currentRotationX < targetRotationXRate) {
    //   pitchUp();
    // }

    // // yaw
    // if (currentRotationY > targetRotationYRate) {
    //   yawRight();
    // } else if (currentRotationY < targetRotationYRate) {
    //   yawLeft();
    // }

    // roll
    const shouldRollRight =
      currentRotationZ > targetRotationZRate &&
      currentRotationZ - rotationIncrement - targetRotationZRate < currentRotationZ - targetRotationZRate;
    const shouldRollLeft =
      currentRotationZ < targetRotationZRate &&
      currentRotationZ + rotationIncrement - targetRotationZRate > currentRotationZ - targetRotationZRate;

    // if (currentRotationZ > targetRotationZRate) {
    if (shouldRollRight) {
      rollRight();
    } else if (shouldRollLeft) {
      rollLeft();
    }

    // // Translational adjustments
    // const targetXVelocity = (xRange / 500) * -1;
    // const targetYVelocity = (yRange / 500) * -1;
    // const targetZVelocity = (zRange / 1000) * -1 - 0.005;
    // const { x: xVelocity, y: yVelocity, z: zVelocity } = motionVector;

    // const fineTranslationAdjustmentMagnitude = 0.001;
    // const courseTranslationAdjustmentMagnitude = 0.005;
    // const fineAttitudeAdjustmentMagnitude = 0.1;
    // // const courseAttitudeAdjustmentMagnitude = ???

    // const rangeTolerance = 0.05;
    // const velocityTolerance = 0.0005;

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
