let fodselsdatoD = document.getElementById("fodselsdatoD");
let fodselsdatoM = document.getElementById("fodselsdatoM");
let fodselsdatoY = document.getElementById("fodselsdatoY");
let isKvinne = document.getElementById("isKvinne");
let wowRace = document.getElementById("wowRace");
let antallGangerRettetGeirSinProg = document.getElementById("antallGangerRettetGeirSinProg");
let treningPerUke = document.getElementById("treningPerUke");
let McTjukkasPerManed = document.getElementById("McTjukkasPerManed");
let hasFrokostForSkole = document.getElementById("hasFrokostForSkole");
let hasDrivingFemalePartner = document.getElementById("hasDrivingFemalePartner");
let hasMaleDrivingPartner = document.getElementById("hasMaleDrivingPartner");
let isSpillerItimen = document.getElementById("isSpillerItimen");


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  
  let today = new Date();
  let day = today.getDay() - fodselsdatoD.value;
  let mont = today.getDate() - fodselsdatoM.value;
  let year = today.getFullYear() - fodselsdatoY.value;
  let timeLeft = day + mont + year * 365;
  console.log(day)
  console.log(mont)
  console.log(year)
  console.log(timeLeft)

  calculateExactTimeOfDeath(timeLeft, isKvinne, wowRace, antallGangerRettetGeirSinProg,
    treningPerUke, McTjukkasPerManed,  
    hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
    isSpillerItimen);
});


/**
 * @param {String} fodselsdatoY format: dd
 * @param {String} fodselsdatoM format: mm
 * @param {String} fodselsdatoY format: yy
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
function calculateAge(
    isKvinne, wowRace, antallGangerRettetGeirSinProg,
    treningPerUke, McTjukkasPerManed,  
    hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
    isSpillerItimen){
        let calculatedAge;
        if(isKvinne.value = 1){
            calculatedAge = 81.7;
        } else {
            calculatedAge = 76.1;
        }

        if(wowRace) calculatedAge -=10.2; //To much sitting still..
        calculatedAge -= (McTjukkasPerManed.value*4.666);
        calculatedAge = calculatedAge - antallGangerRettetGeirSinProg.value*1.2
        calculatedAge = calculatedAge + treningPerUke.value * 1.2;
        calculatedAge += (hasFrokostForSkole.value * 4.19);
        calculatedAge -= (isSpillerItimen.value * 4.21);
        calculatedAge += (hasDrivingFemalePartner.value * 3.75);
        calculatedAge -= (hasMaleDrivingPartner.value * 3.71); 
        calculatedAge -= (isSpillerItimen .value* 4.62)


        return calculatedAge;
    }

   

    //Complete the formulae
    //You are supposed to calculate time and date of death, down to the minute!
    function calculateExactTimeOfDeath(
        timeLeft, isKvinne, wowRace, antallGangerRettetGeirSinProg,
        treningPerUke, McTjukkasPerManed,  
        hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
        isSpillerItimen){
        let achievedAge = calculateAge(isKvinne, wowRace, antallGangerRettetGeirSinProg,
            treningPerUke, McTjukkasPerManed,  
            hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
            isSpillerItimen);

           let left = achievedAge - timeLeft;
        console.log(achievedAge);
           console.log(timeLeft)
           console.log(left);



        return null;//f
    }