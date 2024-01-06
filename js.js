const btn = document.getElementById("btnCalculate");
const modal = document.querySelector(".modal");
const modalBG = document.querySelector(".modalBG");
const modalText = document.querySelector(".modalText");
const tModal = document.getElementById("tModal");
tModal.style.display = "none";


function hideModal(){
    tModal.style.display = "none";
}


function dataVerification(){
    let date1 = document.getElementById("entryDay").value;
    let date2 = document.getElementById("toConsult").value;
    let shift = document.getElementById("shift").value;

    document.getElementById("toConsultError").style.display = "none";
    document.getElementById("entryDayError").style.display = "none";


    if(date1 == ''){
        document.getElementById("entryDayError").textContent = "Debe seleccionar una fecha";
        document.getElementById("entryDayError").style.display = "block";
        return;
    };

    if(date2 == ''){
        document.getElementById("toConsultError").textContent = "Debe seleccionar una fecha";
        document.getElementById("toConsultError").style.display = "block";
        return;
    };
                        
    if(date1 >= date2){
        document.getElementById("toConsultError").textContent = "Debe agregar un día posterior al día de entrada";
        document.getElementById("toConsultError").style.display = "block";
        return;
    };

    dayCalculator (date1,date2,shift);
}

function dayCalculator(date1,date2,shift) {
    
    date1 = new Date(date1);
    date2 = new Date(date2);
    shift = parseInt(shift);
    const weekDays = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const shiftMeaning = ['dia','noche']
    const msPerDay = 24 * 60 * 60 * 1000;

    

    let daysDifference = Math.floor((parseInt(date2.getTime()) - parseInt(date1.getTime()))/msPerDay)+1;

    while(daysDifference > 0){
        console.log(daysDifference);
        daysDifference-= 5;
        if(daysDifference <= 3 && daysDifference > 0 && shift === 1){
            tModal.style.display = "inline-block";
            modalText.textContent = `El ${weekDays[date2.getDay()]} ${date2.getDate()+1} de ${months[date2.getMonth()]} del año ${date2.getFullYear()}
            se encuentra en el día libre número ${daysDifference} después de la semana de noche`;
            return;           
        };
        if(daysDifference <= 2 && daysDifference > 0 && shift === 0){
            tModal.style.display = "inline-block";
            modalText.textContent = `El ${weekDays[date2.getDay()]} ${date2.getDate()+1} de ${months[date2.getMonth()]} del año ${date2.getFullYear()} 
            se encuentra en el día libre número ${daysDifference} después de la semana de dia`;
            return; 
        };
        if(daysDifference<= 0){
            tModal.style.display = "inline-block";
            modalText.textContent = `El ${weekDays[date2.getDay()]} ${date2.getDate()+1} de ${months[date2.getMonth()]} del año ${date2.getFullYear()}
            se encuentra trabajando en el día número ${5 + daysDifference} en la semana de ${shiftMeaning[shift]}`;
            return; 
        };
        if(shift===1){
            daysDifference -=3
            shift = 0;
            console.log("he restado los 3 dias libres "+daysDifference);
        }else{
            daysDifference -=2
            shift = 1;
            console.log("he restado los 2 dias libres "+daysDifference);
        };
    }
}

btn.addEventListener('click',dataVerification);
modal.addEventListener('click',hideModal);