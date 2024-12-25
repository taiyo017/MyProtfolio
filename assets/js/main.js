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
responsiveNavbar = () => {
    let x = document.getElementById('nav');
    if (x.className === "nav") {
        x.className += " responsive";
    }
    else {
        x.className = "nav";
    }
}


//form submission to google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbyvugMTarLpu6FF7toZ3EfmPReFzgJmcIcjZ1hf89o72oDUFYYUmRgXZu7lxHHMtEH2/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('messg');
const submitButton = document.querySelector('.submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission

    // Show loading animation
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitButton.disabled = true;

    // Submit the form
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully!";
            msg.style.color = "green";
            form.reset();

            // Reset the button after submission
            setTimeout(() => {
                msg.innerHTML = '';
            }, 3000);
        })
        .catch(error => {
            msg.innerHTML = "Something went wrong. Please try again.";
            msg.style.color = "red";

            setTimeout(() => {
                msg.innerHTML = '';
            }, 3000);
        })
        .finally(() => {
            // Hide loading animation and enable button
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitButton.disabled = false;
        });
});