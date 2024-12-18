//tab-link js
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let totalSlides = slides.length;

    // Ensure the slides container only shows 3 at a time
    for (let i = 0; i < totalSlides; i++) {
        slides[i].style.display = "none"; // Hide all groups
    }

    // Show the current slide group
    slides[slideIndex].style.display = "flex";
}

function plusSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let totalSlides = slides.length;

    // Increment or decrement the slide index, ensuring it stays within bounds
    slideIndex = (slideIndex + n + totalSlides) % totalSlides;

    showSlides(); // Show the updated slide group
}

// Initialize the first slide
showSlides();


//side-menu js
responsiveNavbar=()=>{
    let x = document.getElementById('nav');
    if(x.className==="nav"){
        x.className+=" responsive";
    }
    else{
    x.className="nav";
    }
    }


//form submission to google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbyHnxX48g5XfeNTFea8tfv-U4YxSUV85hgKfBZqU6132XwIwZfIVxND1HjxLa5aHNhe/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("messg")
form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Submitted Successfully"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })

        .catch(error => console.error('Error!', error.message))
})
