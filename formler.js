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

// new date
const today = new Date();

//deathMessage
let deathMessage = document.getElementById("deathMessage");
let deathDateMessage = document.getElementById("deathDateMessage");

//months and days per months
const monthsDate = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//Gets todays date, and starts fucntion
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

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

  //start of countdown or countup
  if (yourLifeSpand < 0 || 0) {
    //countup
    let undead = yourLifeSpand * -1;
    timeYouHave(undead);
    zombie = 1;
    deathMessage.textContent =
      "You have survied your death date see bellow how long you have survied";
    deathDateMessage.textContent = "Dose not exist, You are immortal";
  } else {
    //countdown
    timeYouHave(yourLifeSpand);
    zombie = -1;
    deathMessage.textContent =
      "Your death coutdown has started see bellow how much time you have left";
    deathDate(yourLifeSpand);
  }
}

//countdown and countup
function timeYouHave(years) {
  let days = years * 365;
  let hours = days * 24;
  let minuts = hours * 60;
  let sekunder = minuts * 60;
  let milisek = sekunder * 1000;

  //countdwon and up date staret
  timeCounter(1, millisekundsDeath, "Ms", milisek);
  timeCounter(1000, sekundsDeath, "S", sekunder);
  timeCounter(60 * 1000, minutsDeath, "M", minuts);
  timeCounter(60 * 1000 * 60, hoursDeath, "H", hours);
  timeCounter(60 * 1000 * 60 * 24, daysDeath, "D", days);
  timeCounter(60 * 1000 * 60 * 24 * 365, yearsDeath, "Y", years);
}

//countdown/up and time
function timeCounter(realTime, whatKindOfTime, htmlMessage, amountOfTime) {
  whatKindOfTime.textContent = Math.trunc(amountOfTime) + htmlMessage;
  setTimeout(() => {
    amountOfTime = amountOfTime + zombie;
    whatKindOfTime.textContent = Math.trunc(amountOfTime) + htmlMessage;
    setInterval(() => {
      amountOfTime = amountOfTime + zombie;
      whatKindOfTime.textContent = Math.trunc(amountOfTime) + htmlMessage;
    }, realTime);
  }, realTime);
}

//date you will die
function deathDate(dateCal) {
  let getDateYear = today.getFullYear() + dateCal;
  yearAdd = getDateYear - Math.trunc(getDateYear);
  FinalDeathYear = yearAdd * 365;
  months(
    FinalDeathYear,
    Math.trunc(getDateYear),
    daysPerMonth[0],
    monthsDate[0],
    0
  );
}

//date calculater
function months(dateDaysLeft, yearYouWillDie, days, monthsYouDie, numbArray) {
  let x = numbArray;
  x++;
  if (dateDaysLeft > days) {
    dateDaysLeft = dateDaysLeft - days;
    months(dateDaysLeft, yearYouWillDie, daysPerMonth[x], monthsDate[x], x);
  } else {
    if (dateDaysLeft < days) {
      //clock
      let dateHour = (dateDaysLeft - Math.trunc(dateDaysLeft)) * 24;
      let dateMinut = (dateHour - Math.trunc(dateHour)) * 60;
      let datesekund = (dateMinut - Math.trunc(dateMinut)) * 60;
      let dateMilSekund = (datesekund - Math.trunc(datesekund)) * 1000;

      deathDateMessage.textContent =
        Math.trunc(dateDaysLeft) +
        " " +
        monthsYouDie +
        " " +
        yearYouWillDie +
        " " +
        "Kl:" +
        Math.trunc(dateHour) +
        ":" +
        Math.trunc(dateMinut) +
        ":" +
        Math.trunc(datesekund) +
        ":" +
        Math.trunc(dateMilSekund);
    }
  }
}
