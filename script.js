const getLiveData = () => {
	const [rollErrorDiv, rollRateDiv] = document.getElementById("roll").children;
	const [pitchErrorDiv, pitchRateDiv] = document.getElementById("pitch").children;
	const [yawErrorDiv, yawRateDiv] = document.getElementById("yaw").children;

	const rollError = Number(rollErrorDiv.innerText.replace("°", ""));
	const rollRate = Number(rollRateDiv.innerText.replace(" °/s", ""));

	const pitchError = Number(pitchErrorDiv.innerText.replace("°", ""));
	const pitchRate = Number(pitchRateDiv.innerText.replace(" °/s", ""));

	const yawError = Number(yawErrorDiv.innerText.replace("°", ""));
	const yawRate = Number(yawRateDiv.innerText.replace(" °/s", ""));

	return {
		rollError,
		rollRate,
		pitchError,
		pitchRate,
		yawError,
		yawRate
	};
};

//button controls
const rollLeftButton = document.getElementById("roll-left-button");
const rollRightButton = document.getElementById("roll-right-button");
const pitchUpButton = document.getElementById("pitch-up-button");
const pitchDownButton = document.getElementById("pitch-down-button");
const yawLeftButton = document.getElementById("yaw-left-button");
const yawRightButton = document.getElementById("yaw-right-button");

const loop = async () => {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	while (true) {
		const sleepTime = 100;
		const { rollError, rollRate, pitchError, pitchRate, yawError, yawRate } = getLiveData();

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
		await sleep(sleepTime);
	}
};

loop();
