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
  if (isKvinne == 1) {
    calculatedAge = 81.7;
    console.log("1", calculatedAge);
  } else {
    calculatedAge = 76.1;
    console.log("1", calculatedAge);
  }

  if (wowRace.value > 0) {calculatedAge = calculatedAge - 10.2; //To much sitting still..
  }
  calculatedAge = calculatedAge - antallGangerRettetGeirSinProg.value * (1.2 / 100);
  
  calculatedAge = calculatedAge - (McTjukkasPerManed.value * 4.666) / 100;
 
  calculatedAge = calculatedAge + treningPerUke.value * (1.2 / 100);

  if (hasFrokostForSkole.checked) calculatedAge = calculatedAge + calculatedAge * (4.19 / 100);
  
  if (hasMaleDrivingPartner.checked) calculatedAge = calculatedAge + calculatedAge * (3.75 / 100);
 
  if (hasDrivingFemalePartner.checked) calculatedAge = calculatedAge  + calculatedAge* (3.71 / 100);

  if (isSpillerItimen.checked) calculatedAge = calculatedAge + calculatedAge * (4.62 / 100);
 

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
  let noDesLife = yourLifeSpand.toFixed(0)

  //start of countdown or countup 
  if (noDesLife < 0){
    let undead = noDesLife * -1;
    timeYouHave(undead);
    zombie = 1;
    deathMessage.textContent = "You have survied your death death see bellow how long you have survied";
  } else{
    timeYouHave(noDesLife);
    zombie = -1;
    deathMessage.textContent = "Your death coutdown has started see bellow how much time you have left"
  }

  return null; //f
}


//countdown and countup
async function timeYouHave(years){
  let days = years * 365;
  let hours = days * 24;
  let minuts = hours * 60;
  let sekunder = minuts * 60;
  let milisek  = sekunder * 1000;

  millisekundsDeath.textContent = milisek + "Ms"
  sekundsDeath.textContent = sekunder + "S"
  minutsDeath.textContent = minuts + "M"
  hoursDeath.textContent = hours + "H"
  daysDeath.textContent = days + "D"
  yearsDeath.textContent = years + "Y"

  setTimeout(() => {
    milisek = milisek + zombie
    millisekundsDeath.textContent = milisek + "Ms"
    setInterval(() => {
      milisek = milisek + zombie
      millisekundsDeath.textContent = milisek + "Ms"
    },1);
  },1);

setTimeout(() => {
  sekunder = sekunder + zombie
  sekundsDeath.textContent = sekunder + "S"
  setInterval(() => {
    sekunder = sekunder + zombie
    sekundsDeath.textContent = sekunder + "S"
  },1000);
},1000);

setTimeout(() => {
  minuts = minuts + zombie
  minutsDeath.textContent = minuts + "M"
  setInterval(() => {
    minuts = minuts + zombie
    minutsDeath.textContent = minuts + "M"
  },60 *1000);
},60 *1000);

setTimeout(() => {
  hours = hours + zombie
  hoursDeath.textContent = hours + "H"
setInterval(() => {
  hours = hours + zombie
  hoursDeath.textContent = hours + "H"
},(60*1000)*60);
},(60*1000)*60);


}





