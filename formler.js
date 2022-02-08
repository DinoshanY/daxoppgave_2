let fodselsdato = document.getElementById("fodselsdato").value;
let isKvinne = document.getElementById("isKvinne").value;
let wowRace = document.getElementById("wowRace").value;
let antallGangerRettetGeirSinProg = document.getElementById("antallGangerRettetGeirSinProg".value);
let treningPerUke = document.getElementById("treningPerUke").value;
let McTjukkasPerManed = document.getElementById("McTjukkasPerManed").value;
let hasFrokostForSkole = document.getElementById("hasFrokostForSkole".value);
let hasDrivingFemalePartner = document.getElementById("hasDrivingFemalePartner".value);
let hasMaleDrivingPartner = document.getElementById("hasMaleDrivingPartner").value;
let isSpillerItimen = document.getElementById("isSpillerItimen").value;







const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(fodselsdato.value)
  let today = new Date();
  let timeLeft = today.getDate()+" "+today.getUTCDay()+" "+today.getFullYear();

  calculateExactTimeOfDeath(timeLeft, isKvinne, wowRace, antallGangerRettetGeirSinProg,
    treningPerUke, McTjukkasPerManed,  
    hasFrokostForSkole, hasDrivingFemalePartner, hasMaleDrivingPartner,
    isSpillerItimen);
});


/**
 * @param {String} fodselsdato format: ddmmyy
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
        if(isKvinne = 1){
            calculatedAge = 81.7;
        } else {
            calculatedAge = 76.1;
        }

        if(wowRace) calculatedAge -=10.2; //To much sitting still..
        calculatedAge -= (McTjukkasPerManed*4.666);
        calculatedAge = calculatedAge - antallGangerRettetGeirSinProg*1.2
        calculatedAge = calculatedAge + treningPerUke * 1.2;
        calculatedAge += (hasFrokostForSkole * 4.19);
        calculatedAge -= (isSpillerItimen * 4.21);
        calculatedAge += (hasDrivingFemalePartner * 3.75);
        calculatedAge -= (hasMaleDrivingPartner * 3.71); 
        calculatedAge -= (isSpillerItimen * 4.62)


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