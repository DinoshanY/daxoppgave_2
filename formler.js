//inputs
let fodselsdatoD = document.getElementById("fodselsdatoD");
let fodselsdatoM = document.getElementById("fodselsdatoM");
let fodselsdatoY = document.getElementById("fodselsdatoY");
let isKvinne = document.getElementById("isKvinne");
let wowRace = document.getElementById("wowRace");
let antallGangerRettetGeirSinProg = document.getElementById(
  "antallGangerRettetGeirSinProg"
);
let treningPerUke = document.getElementById("treningPerUke");
let McTjukkasPerManed = document.getElementById("McTjukkasPerManed");
let hasFrokostForSkole = document.getElementById("hasFrokostForSkole");
let hasDrivingFemalePartner = document.getElementById(
  "hasDrivingFemalePartner"
);
let hasMaleDrivingPartner = document.getElementById("hasMaleDrivingPartner");
let isSpillerItimen = document.getElementById("isSpillerItimen");
//time hidden
let yearsDeath = document.getElementById("yearsDeath");
let daysDeath = document.getElementById("daysDeath");
let minutsDeath = document.getElementById("minutsDeath");
let sekundsDeath = document.getElementById("sekundsDeath");
let millisekundsDeath = document.getElementById("millisekundsDeath");
let hoursDeath = document.getElementById("hoursDeath");

//+ and - for timer
let zombie;

//deathMessage
let deathMessage = document.getElementById("deathMessage");
let deathDateMessage = document.getElementById("deathDateMessage");

//Gets todays date, and starts fucntion
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let today = new Date();

  let day = today.getDate() - fodselsdatoD.value;
  let mont = today.getDay() - fodselsdatoM.value;
  let year = today.getFullYear() - fodselsdatoY.value;
  let timeLeft = (day + mont + year * 365) / 365;

  calculateExactTimeOfDeath(
    timeLeft,
    isKvinne,
    wowRace,
    antallGangerRettetGeirSinProg,
    treningPerUke,
    McTjukkasPerManed,
    hasFrokostForSkole,
    hasDrivingFemalePartner,
    hasMaleDrivingPartner,
    isSpillerItimen
  );
});

/**
 * @param {number} isKvinne //how you identify, hvis du er ikke binær, bruk det tallet som du synes beskriver kjønnet ditt best
 * @param {String} wowRace //other MMO's count too..
 * @param {number} antallGangerRettetGeirSinProg
 * @param {number} treningPerUke //bare kul trening teller.
 * @param {number} McTjukkasPerManed //fatso King also counts
 * @param {boolean} hasFrokostForSkole
 * @param {boolean} hasDrivingFemalePartner or mother/sister
 * @param {boolean} hasMaleDrivingPartner or father/brother
 * @param {boolean} isSpillerItimen
 * @returns age achieved with current lifestyle. Exactly!
 */

//calculates Age you will live or have lived
function calculateAge(
  isKvinne,
  wowRace,
  antallGangerRettetGeirSinProg,
  treningPerUke,
  McTjukkasPerManed,
  hasFrokostForSkole,
  hasDrivingFemalePartner,
  hasMaleDrivingPartner,
  isSpillerItimen
) {
  let calculatedAge;
  if (isKvinne.value > 0) {
    calculatedAge = 81.7;
  } else {
    calculatedAge = 76.1;
    console.log(calculatedAge);
  }

  if (wowRace.value > 0) {
    calculatedAge = calculatedAge - 10.2; //To much sitting still..
  }
  calculatedAge =
    calculatedAge - antallGangerRettetGeirSinProg.value * (1.2 / 100);

  calculatedAge = calculatedAge - (McTjukkasPerManed.value * 4.666) / 100;

  calculatedAge = calculatedAge + treningPerUke.value * (1.2 / 100);

  if (hasFrokostForSkole.checked)
    calculatedAge = calculatedAge + calculatedAge * (4.19 / 100);

  if (hasMaleDrivingPartner.checked)
    calculatedAge = calculatedAge - calculatedAge * (3.75 / 100);

  if (hasDrivingFemalePartner.checked)
    calculatedAge = calculatedAge - calculatedAge * (3.71 / 100);

  if (isSpillerItimen.checked)
    calculatedAge = calculatedAge + calculatedAge * (4.62 / 100);

  return calculatedAge;
}

//Complete the formulae
//You are supposed to calculate time and date of death, down to the minute!
function calculateExactTimeOfDeath(
  timeLeft,
  isKvinne,
  wowRace,
  antallGangerRettetGeirSinProg,
  treningPerUke,
  McTjukkasPerManed,
  hasFrokostForSkole,
  hasDrivingFemalePartner,
  hasMaleDrivingPartner,
  isSpillerItimen
) {
  let achievedAge = calculateAge(
    isKvinne,
    wowRace,
    antallGangerRettetGeirSinProg,
    treningPerUke,
    McTjukkasPerManed,
    hasFrokostForSkole,
    hasDrivingFemalePartner,
    hasMaleDrivingPartner,
    isSpillerItimen
  );

  // calculets tim left
  let yourLifeSpand = achievedAge - timeLeft;

  //to turn sting to number
  //let noDesLife = Math.floor((yourLifeSpand.toFixed(0)));
  let noDesLife = yourLifeSpand;

  //start of countdown or countup
  if (noDesLife < 0 || 0) {
    //countup
    let undead = noDesLife * -1;
    timeYouHave(undead);
    zombie = 1;
    deathMessage.textContent =
      "You have survied your death date see bellow how long you have survied";
    deathDateMessage.textContent = "Your a immortal";
  } else {
    //countdown
    timeYouHave(noDesLife);
    zombie = -1;
    deathMessage.textContent =
      "Your death coutdown has started see bellow how much time you have left";
    deathDate(noDesLife);
  }

  return null; //f
}

//countdown and countup
async function timeYouHave(years) {
  let days = years * 365;
  let hours = days * 24;
  let minuts = hours * 60;
  let sekunder = minuts * 60;
  let milisek = sekunder * 1000;

  millisekundsDeath.textContent = milisek + "Ms";
  sekundsDeath.textContent = sekunder + "S";
  minutsDeath.textContent = minuts + "M";
  hoursDeath.textContent = hours + "H";
  daysDeath.textContent = days + "D";
  yearsDeath.textContent = years + "Y";

  //milisek counter
  setTimeout(() => {
    milisek = milisek + zombie;
    millisekundsDeath.textContent = milisek + "Ms";
    setInterval(() => {
      milisek = milisek + zombie;
      millisekundsDeath.textContent = milisek + "Ms";
    }, 1);
  }, 1);

  //sekund countor
  setTimeout(() => {
    sekunder = sekunder + zombie;
    sekundsDeath.textContent = sekunder + "S";
    setInterval(() => {
      sekunder = sekunder + zombie;
      sekundsDeath.textContent = sekunder + "S";
    }, 1000);
  }, 1000);

  //minuts countor
  setTimeout(() => {
    minuts = minuts + zombie;
    minutsDeath.textContent = minuts + "M";
    setInterval(() => {
      minuts = minuts + zombie;
      minutsDeath.textContent = minuts + "M";
    }, 60 * 1000);
  }, 60 * 1000);

  //hours counter
  setTimeout(() => {
    hours = hours + zombie;
    hoursDeath.textContent = hours + "H";
    setInterval(() => {
      hours = hours + zombie;
      hoursDeath.textContent = hours + "H";
    }, 60 * 1000 * 60);
  }, 60 * 1000 * 60);

  //day countor
  setTimeout(() => {
    days = days + zombie;
    hoursDeath.textContent = days + "D";
    setInterval(() => {
      days = days + zombie;
      daysDeath.textContent = days + "D";
    }, 60 * 1000 * 60 * 24);
  }, 60 * 1000 * 60 * 24);

  //year countor
  setTimeout(() => {
    years = years + zombie;
    hoursDeath.textContent = years + "Y";
    setInterval(() => {
      years = years + zombie;
      yearsDeath.textContent = years + "Y";
    }, 60 * 1000 * 60 * 24 * 365);
  }, 60 * 1000 * 60 * 24 * 365);
}

//date you will die
async function deathDate(dateCal) {
  let todyssss = new Date();
  let getDateYear = todyssss.getFullYear() + dateCal;

  yearAdd = getDateYear - Math.trunc(getDateYear);
  FinalDeathYear = yearAdd * 365;
  months(FinalDeathYear,Math.trunc(getDateYear));

  //let hoursDate = daysDate * 24;
  //let minutsDate = hoursDate * 60;
  //let sekunderDate = minutsDate * 60;
}

//stops countdown when millisecund hits 0
async function stopper(test) {
  if (test == 0) {
    zombie = 0;
    return zombie;
  }
}

//date calculater
async function months(dateDaysLeft, yearYouWillDie) {
  //january 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "January", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //feburay 28 or 29(leap years) days
  if (dateDaysLeft > 28) {
    dateDaysLeft = dateDaysLeft - 28;
  } else {
    if (dateDaysLeft < 28) {
      console.log(yearYouWillDie, "Feburay", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //march 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "March", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //april 30 days
  if (dateDaysLeft > 30) {
    dateDaysLeft = dateDaysLeft - 30;
  } else {
    if (dateDaysLeft < 30) {
      console.log(yearYouWillDie, "April", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //may 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "May", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //june 30 days
  if (dateDaysLeft > 30) {
    dateDaysLeft = dateDaysLeft - 30;
  } else {
    if (dateDaysLeft < 30) {
      console.log(yearYouWillDie, "June", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //july 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "July", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //august 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "August", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //september 30 days
  if (dateDaysLeft > 30) {
    dateDaysLeft = dateDaysLeft - 30;
  } else {
    if (dateDaysLeft < 30) {
      console.log(yearYouWillDie, "September", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //october 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "October", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //november 30 days
  if (dateDaysLeft > 30) {
    dateDaysLeft = dateDaysLeft - 30;
  } else {
    if (dateDaysLeft < 30) {
      console.log(yearYouWillDie, "November", Math.trunc(dateDaysLeft));
      return;
    }
  }
  //december 31 days
  if (dateDaysLeft > 31) {
    dateDaysLeft = dateDaysLeft - 31;
  } else {
    if (dateDaysLeft < 31) {
      console.log(yearYouWillDie, "December", Math.trunc(dateDaysLeft));
      return;
    }
  }
}



