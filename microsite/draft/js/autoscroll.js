document.addEventListener('DOMContentLoaded', function () {

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.getElementById('pg0').addEventListener('change', function () {
        scrollToSection('hero'); 
    });

    document.getElementById('pg1').addEventListener('change', function () {
        scrollToSection('hero'); 
    });

    document.getElementById('pg2').addEventListener('change', function () {
        scrollToSection('plot'); 
    });

    document.getElementById('pg3').addEventListener('change', function () {
        scrollToSection('characters'); 
    });
});
