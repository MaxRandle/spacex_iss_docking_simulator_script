const getLiveData = () => {
  // Attitude values
  const [rollErrorDiv, rollRateDiv] = document.getElementById("roll").children;
  const [pitchErrorDiv, pitchRateDiv] = document.getElementById("pitch").children;
  const [yawErrorDiv, yawRateDiv] = document.getElementById("yaw").children;

  const rollError = Number(rollErrorDiv.innerText.replace("°", ""));
  const rollRate = Number(rollRateDiv.innerText.replace(" °/s", ""));

  const pitchError = Number(pitchErrorDiv.innerText.replace("°", ""));
  const pitchRate = Number(pitchRateDiv.innerText.replace(" °/s", ""));

  const yawError = Number(yawErrorDiv.innerText.replace("°", ""));
  const yawRate = Number(yawRateDiv.innerText.replace(" °/s", ""));

  // Translational values
  const [xRangeDiv] = document.getElementById("x-range").children;
  const [yRangeDiv] = document.getElementById("y-range").children;
  const [zRangeDiv] = document.getElementById("z-range").children;

  // i know this looks stupid but the programmers who made the simulator are to blame for this absolute monstrisity
  const zRange = Number(xRangeDiv.innerText.replace(" m", ""));
  const xRange = Number(yRangeDiv.innerText.replace(" m", ""));
  const yRange = Number(zRangeDiv.innerText.replace(" m", ""));

  return {
    rollError,
    rollRate,
    pitchError,
    pitchRate,
    yawError,
    yawRate,
    xRange,
    yRange,
    zRange,
  };
};

// Controls
// Attitude controls
const rollLeftButton = document.getElementById("roll-left-button");
const rollRightButton = document.getElementById("roll-right-button");
const pitchUpButton = document.getElementById("pitch-up-button");
const pitchDownButton = document.getElementById("pitch-down-button");
const yawLeftButton = document.getElementById("yaw-left-button");
const yawRightButton = document.getElementById("yaw-right-button");

// Translational controls
const translateLeftButton = document.getElementById("translate-left-button");
const translateRightButton = document.getElementById("translate-right-button");
const translateUpButton = document.getElementById("translate-up-button");
const translateDownButton = document.getElementById("translate-down-button");
const translateForwardButton = document.getElementById("translate-forward-button");
const translateBackButton = document.getElementById("translate-backward-button");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const loop = async () => {
  while (true) {
    const sleepTime = 100;
    const { rollError, rollRate, pitchError, pitchRate, yawError, yawRate, xRange, yRange, zRange } = getLiveData();

    // Attitude adjustments
    const targetRollRate = rollError / 10;
    const targetPitchRate = pitchError / 10;
    const targetYawRate = yawError / 10;

    // roll
    if (rollRate > targetRollRate) {
      rollLeftButton.click();
    } else if (rollRate < targetRollRate) {
      rollRightButton.click();
    }
    // pitch
    if (pitchRate > targetPitchRate) {
      pitchUpButton.click();
    } else if (pitchRate < targetPitchRate) {
      pitchDownButton.click();
    }
    // yaw
    if (yawRate > targetYawRate) {
      yawLeftButton.click();
    } else if (yawRate < targetYawRate) {
      yawRightButton.click();
    }

    // Translational adjustments
    const targetXVelocity = (xRange / 1e3) * -1;
    const targetYVelocity = (yRange / 1e3) * -1;
    const targetZVelocity = (zRange / 1e3) * -1;
    const { x: xVelocity, y: yVelocity, z: zVelocity } = motionVector;

    // x
    if (xVelocity > targetXVelocity) {
      translateLeftButton.click();
    } else if (xVelocity < targetXVelocity) {
      translateRightButton.click();
    }
    // y
    if (yVelocity > targetYVelocity) {
      translateDownButton.click();
    } else if (yVelocity < targetYVelocity) {
      translateUpButton.click();
    }
    // z
    if (zVelocity > targetZVelocity) {
      translateForwardButton.click();
    } else if (zVelocity < targetZVelocity) {
      translateBackButton.click();
    }

    await sleep(sleepTime);
  }
};

loop();
