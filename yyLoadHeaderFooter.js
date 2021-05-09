function loadHeaderFooter() {
    fetch("/yyHeader.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            navbarTogglerInit();
        });

    fetch("/yyFooter.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });

    fetch("/yyTop.html")
        .then(response => {
            return response.text()
        })
        .then(data => {

            const myBtn = document.getElementById("myBtn");

            myBtn.innerHTML = data;

            // When the user scrolls down 20px from the top of the document, show the button
            window.onscroll = scrollFunction;

            function scrollFunction() {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                    myBtn.style.display = "block";
                } else {
                    myBtn.style.display = "none";
                }
            }

            myBtn.addEventListener("click", topFunction);

        });
}

function navbarTogglerInit() {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarMenu = document.querySelector(".navbar ul");
    navbarToggler.addEventListener("click", () => {
        navbarToggler.classList.toggle("open-navbar-toggler");
        navbarMenu.classList.toggle("open");
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadHeaderFooter();
});


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}