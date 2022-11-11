//sliders
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
    const range = wrap.querySelector(".range");
    const bubble = wrap.querySelector(".bubble");

    range.addEventListener("input", () => {
        setBubble(range, bubble);
    });

    setBubble(range, bubble);
});
function setBubble(range,bubble) {
    const val=range.value;
    const min=range.min ? range.min: 0;
    const max=range.max ? range.max: 100;
    const newVal=Number(((val-min)*100)/(max-min));
    bubble.innerHTML=val;          

    bubble.style.left =`calc(${newVal}% + (${8-newVal * 0.15}px))`;
};


//save form data to localStorage

//create javascript objects from html elements
const mainForm=document.getElementById('mainForm')
const nameInput=document.getElementById('name');
const resInput=document.getElementById('res');
const rajasInput=document.getElementById('rajas');
const dulceInput=document.getElementById('dulce');
const commentInput=document.getElementById('comment');
const champurradoInput=document.getElementById('champurrado');


//create empty array called resultsStorage in localStorage
let resultsStorage= localStorage.getItem('results') ? JSON.parse(localStorage.getItem('results')) : [];



//add an event on SUBMIT
mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    x={}
    //for each element add its value into results in resultStorage variable
    x["name"]=nameInput.value
    x["res"]=resInput.value
    x["rajas"]=rajasInput.value
    x["dulce"]=dulceInput.value
    x["champurrado"]=champurradoInput.value
    x["comment"]=commentInput.value
    resultsStorage.push(x)

    //save results to localStorage
    localStorage.setItem('results',JSON.stringify(resultsStorage));
    
    
    //reset the values for each item
    nameInput.value=''
    commentInput.value=''
    champurradoInput.value=''
    resInput.value=''
    rajasInput.value=''
    dulceInput.value=''
})

