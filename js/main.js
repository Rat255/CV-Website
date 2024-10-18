document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll Functionality
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        } else {
            console.log(`Section with ID '${sectionId}' not found.`);
        }
    }

    // Intersection Observer for Animation
    const sections = document.querySelectorAll('.info-page');
    
    if (sections.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    } else {
        console.log("No sections with class 'info-page' found.");
    }

    // Shows year on Footer
    const d = new Date();
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.innerHTML = d.getFullYear();
    } else {
        console.log("Element with ID 'year' not found.");
    }

    // Mobile Warning
    function showMobileWarning() {
        const mobileWarning = document.getElementById("mobile-warning");
        if (mobileWarning) {
            if (window.innerWidth <= 900 || window.innerHeight <= 550) {
                mobileWarning.style.display = "flex"; // Show the warning
            } else {
                mobileWarning.style.display = "none"; // Hide the warning
            }
        } else {
            console.log("Element with ID 'mobile-warning' not found.");
        }
    }
    
    // Run on page load
    showMobileWarning();

    // Run on window resize to check if the warning should be shown or hidden
    window.addEventListener('resize', showMobileWarning);

    // Seasonal Changes
    const body = document.body;
    const currentDate = new Date();
    const month = currentDate.getMonth(); // 0-11 (Jan=0, Dec=11)
    const day = currentDate.getDate(); // 1-31
    
    const seasonalImage = document.querySelector('.seasonal-image');
    if (seasonalImage) {
        seasonalImage.className = 'seasonal-image'; // Reset classes
        body.className = ''; // Reset body
    
        if (month === 11 && day >= 1 && day <= 26) { // Christmas from Dec 1 to 26
            seasonalImage.classList.add('christmas');
            body.classList.add('christmas');
        } else if (month >= 8 && month <= 10) { // Autumn
            seasonalImage.classList.add('autumn');
            body.classList.add('autumn');
            if (month === 9 && day >= 20 && day <= 31) { // Halloween from Oct 20 to Nov 1
                seasonalImage.classList.add('halloween');
                body.classList.remove('autumn');
                body.classList.add('halloween');
            }
            if (month === 10 && day === 1) { // Remove Halloween on Nov 1
                seasonalImage.classList.remove('halloween');
                body.classList.remove('halloween');
                body.classList.add('autumn'); // Revert to autumn after Halloween
            }
        } else if (month >= 2 && month <= 4) { // Spring
            seasonalImage.classList.add('spring');
            body.classList.add('spring');
        } else if (month >= 5 && month <= 7) { // Summer
            seasonalImage.classList.add('summer');
            body.classList.add('summer');
        } else {
            seasonalImage.classList.add('winter');
            body.classList.add('winter'); // Default winter
        }
    } else {
        console.log("Element with class 'seasonal-image' not found.");
    }

    //Cards Click Event
    const progressCards = document.querySelectorAll('.progress-card');
    if (progressCards.length > 0) {
        progressCards.forEach(card => {
            card.addEventListener('click', function() {

                progressCards.forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
            });
        });
    } else {
        console.log("No elements with class 'progress-card' found.");
    }
}); 


//feedback display
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        //loading message
        document.getElementById('feedback').innerText = 'Sending your message...';
        document.getElementById('feedback').style.display = 'block';
    });

