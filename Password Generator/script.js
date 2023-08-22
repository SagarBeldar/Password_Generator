const inputSlider= document.querySelector('[data-LengthSlider]');
const dataDisplayNbr=document.querySelector('[data-lengthNumber]');
const dataDisplay=document.querySelector('[data-PasswordDisplay]');
const copyBtn=document.querySelector('[data-CopyBtn]');
const copyMsg=document.querySelector('[copyMessage]');
const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector('#numbers');
const symbolCheck=document.querySelector('#symbols');
const indicator=document.querySelector('.indicator');
const generateBtn=document.querySelector('.mainBtn');
let checkBoxes = document.querySelectorAll("input[type=checkbox]");
 // Generate Random Letters and Number and Symbols
 const symbol="~`!@#$%^&*()_-+={[}]|:;<,>.?/"

let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();




// Set Password Length
 function handleSlider(){
       dataDisplayNbr.innerText=passwordLength;
       inputSlider.value=passwordLength;
       let min=inputSlider.min;
       let max=inputSlider.max;
       inputSlider.style.backgroundSize =  ( (passwordLength-min)*100/(max-min))+"% 100%"
 }
//Circle Color
function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}


function generateRandom(min, max){
   return Math.floor(Math.random()*(max-min))+min;
}
   // Random Number 
 function generateRandomNumber() {
    return generateRandom(1, 10);
}
 // Random Lowercase Letter 
 function generateRandomLowercase(){
   return String.fromCharCode(generateRandom(97,123));
 }
 //  Random Uppercase Letter 
 function generateRandomUppercase(){;
   return String.fromCharCode(generateRandom(65,91));
 }



 //Random Symbols
 function  generateSymbols(){
    const randNum = generateRandom(0, symbol.length);
    return symbol.charAt(randNum);
}

// console.log(generateRandomLowercase());
// console.log(generateRandomUppercase());
// console.log(generateRandomNumber());
// console.log(generateSymbols());
// ----------------------------------------------  //

// ----------------------------------------------  //


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked)hasUpper=true;
    if(lowercaseCheck.checked)hasLower=true;
    if(numberCheck.checked)hasNumber=true;
    if(symbol.checked)hasSymbol=true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
        
    }
}
console.log("starting the journt");
// ----------------------------------------------  //
    

// ----------------------------------------------  //
async function copyContent(){
    try{
      await navigator.clipboard.writeText(dataDisplay.value);
      copyMsg.innerText = "Copied";
    }
    catch(e){
          // alert("Something went wrong in CopyContent");
          copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000)
}
console.log("starting the journt");
// shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
 // Shuffle the array randomly - 
 function  shufflepassword(array) {
    // Fisher Yates Method
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
let str = "";
array.forEach((el) => (str += el));
return str;
}


console.log("starting the journt");


function handleCheckBoxChange(){
      checkCount=0;
      checkBoxes.forEach( (checkBox) => {
        if(checkBox.checked)
        checkCount++;
      });

    //   spcial condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
console.log("starting the journt");
checkBoxes.forEach((checkBox) =>{
    checkBox.addEventListener('change', handleCheckBoxChange);
})

console.log("starting the journt");
inputSlider.addEventListener('input',(e) => {
    passwordLength =e.target.value;
    handleSlider();
});
console.log("starting the journt");
copyBtn.addEventListener('click',() =>{
    if(dataDisplay.value)
    copyContent();
})




     // ----------------------------------------------  //

     generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
  
    if(checkCount <=0)
     return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    // let's start journey 

    // remove old password
    password="";

    // let's put the stuff in the checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateRandomUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateRandomLowercase();
    // }
    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolCheck.checked){
    //     password+=generateRandomNumber();
    // }
    console.log("sagar")
    let funcArr =[];

    if(uppercaseCheck.checked)
     funcArr.push(generateRandomUppercase);

     if(lowercaseCheck.checked)
     funcArr.push(generateRandomLowercase);

     if(numberCheck.checked)
     funcArr.push(generateRandomNumber);

     if(symbolCheck.checked)
     funcArr.push(generateSymbols);
   

    //  cumpolsory addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    // remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=generateRandom(0,funcArr.length);
        password+= funcArr[randIndex]();
    }
  

    // shuffle the password
      password=shufflepassword(Array.from(password));

    //   shoe in UI
    dataDisplay.value=password;
    // calculate strength
    calcStrength();
});





 