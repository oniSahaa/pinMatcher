//activate generate button and input which is also seen as screen
const generateBtn = document.getElementsByClassName('generate-btn')[0];
 generateBtn.addEventListener("click", randomNumber);
 const randomPinOutput = document.getElementsByClassName('random-pin')[0];
 var digitCount = document.getElementById("digit-count");

//calculating random number
function getRndInteger(){
    var max = 9999 , min = 1000;
    return Math.floor(Math.random() * (max - min + 1) ) + min ;
}

//shown the random number in screen
function randomNumber(){
    var pin = getRndInteger();
    randomPinOutput.value = pin;
}

//activate number button
const calculatorDisplay = document.getElementsByClassName('calculator-display')[0];
const clickedBtn = document.getElementsByClassName('number-button');

for ( let i = 0; i < clickedBtn.length; i++){  //finding all number-button for activate click
    var clicked = clickedBtn[i];
    clicked.addEventListener("click", displayNum);
}

//shown the number in calculator which is clicked by user
function displayNum(event){
    var digit = event.target //by target select which button clicked
    var currentDigit = calculatorDisplay.value; 
    if(currentDigit.length >= 4){
        alert("No more Four digit input");
        return;
    }
    
     else{
	 	digitCount.innerText = (currentDigit.length+1) + "/4";
	 }

    currentDigit = currentDigit + digit.innerText;
    calculatorDisplay.value = currentDigit;
}

//activate submit button
const submitBtn = document.getElementsByClassName('submit-btn')[0];
submitBtn.addEventListener('click', matchNum);
var actionLeft = document.getElementsByClassName("action-left")[0];
var tryLeft = 3;

//calculate the generate pin and user given number is matched or not!
function matchNum() {
    var randomOutput = randomPinOutput.value;
    var calculatorOutput = calculatorDisplay.value;

    if ( randomOutput == NaN || randomOutput == ""){
        alert("Oops! Generate a random number first.");
        return;
    }

    else if ( calculatorOutput == NaN || calculatorOutput == ""){
    alert("Oops! Input some number.");
    return;
   }

   else if (calculatorOutput.length <=3){
       alert("Oops! Four digit needed!");
       return;
   }

   else if ( randomOutput == calculatorOutput ){
       randomOutput.value = "";
       calculatorOutput.value = "";
       if(Number(digitCount.innerText) > 0) digitCount.innerText = "0/4";
		$('#myModal1').modal('show');
		tryLeft = 3;
   
    
   }

   else{
    $('#myModal2').modal('show')
    tryLeft = tryLeft - 1;

    /* submit button disable for five second */
    if(tryLeft <= 0){
        var secondLeft = 5;
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.backgroundColor = "gray";
        var x = setInterval(function() {
            actionLeft.innerText = "Wait for " + secondLeft + " seconds";
            secondLeft -= 1;
            if(secondLeft == 0){
                submitBtn.removeAttribute('disabled');
                tryLeft = 3;
                actionLeft.innerText = tryLeft + " try left";
                submitBtn.style.backgroundColor = "#495BC3";
                clearInterval(x);
            }
        },  1000);
    }
}
calculatorDisplay.value = "";
digitCount.innerText = "0/4";
actionLeft.innerText = tryLeft + " try left";

}

// activate delete-digit button which is delete one by one digit and all clear button
const oneByoneDlt = document.getElementsByClassName('delete-digit')[0];
const allClear = document.getElementsByClassName('all-clear')[0];

oneByoneDlt.addEventListener("click", deleteOneByone);
allClear.addEventListener("click", clear);

// function for one by one digit button
function deleteOneByone() {
       var currentDigit = calculatorDisplay.value;
       var deleteDigit = currentDigit.length;
       currentDigit = currentDigit.slice(0, deleteDigit - 1);
       calculatorDisplay.value = currentDigit;
       if(Number(digitCount.innerText.length) > 0) digitCount.innerText = (currentDigit.length) + "/4";
}

//function for all clear button
function clear() {
    calculatorDisplay.value = "";
    digitCount.innerText = "0/4";
}
















