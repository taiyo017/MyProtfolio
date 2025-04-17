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


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}





//side-menu js
function responsiveNavbar() {
    var menu = document.getElementById("slidemenu");
    menu.classList.toggle("active");
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