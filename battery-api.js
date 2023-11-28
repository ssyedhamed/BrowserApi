console.log("Battery API");

const charging = document.querySelector(".charging");
const chargingTime = document.querySelector(".charging-time");
const dischargingTime = document.querySelector(".discharging-time");
const level = document.querySelector(".level");

navigator.getBattery().then((battery) => {
  setStatus(battery);

  isCharging(battery);
  remainingTime(battery);
  batteryDiesIn(battery);
  batteryLevel(battery);
});

function setStatus(battery) {
  charging.innerHTML = battery.charging ? "Yes" : "No";
  chargingStatus(battery, true);
  chargingStatus(battery, false);
  level.innerHTML = `${battery.level * 100}%`;
}
function isCharging(battery) {
  battery.addEventListener("chargingchange", function () {
    charging.innerHTML = battery.charging ? "Yes" : "No";
  });
}

function chargingStatus(battery, isCharging) {
  if (isCharging) {
    if (battery.chargingTime == 0) {
      chargingTime.innerHTML = "Fully Charged";
    } else if (battery.chargingTime == "Infinity") {
      //   chargingTime.innerHTML = "Plug-in";
      chargingTime.innerHTML = "⌛Plug in";
    } else {
      chargingTime.innerHTML = battery.chargingTime;
    }
  } else {
    if (battery.dischargingTime == 0) {
      dischargingTime.innerHTML = "Plug-in";
    } else if (battery.dischargingTime == "Infinity") {
      //   dischargingTime.innerHTML = "Charging";
      dischargingTime.innerHTML = "⌛";
    } else {
      dischargingTime.innerHTML = battery.dischargingTime;
    }
  }
}
function remainingTime(battery) {
  battery.addEventListener("chargingtimechange", function () {
    chargingStatus(battery, true);
  });
}
function batteryDiesIn(battery) {
  battery.addEventListener("dischargingtimechange", function () {
    chargingStatus(battery, false);
  });
}

function batteryLevel(battery) {
  battery.addEventListener("levelchange", function () {
    level.innerHTML = `${battery.level * 100}%`;
  });
}
