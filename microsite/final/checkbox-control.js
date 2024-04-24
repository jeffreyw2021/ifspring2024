document.addEventListener('DOMContentLoaded', function () {
    var heroLearnMore = document.querySelector('#hero-block input[type="checkbox"]');
    var originLearnMore = document.querySelector('#origin-block input[type="checkbox"]');
    var footer = document.querySelector('.footer');
    var navRadioButtons = document.querySelectorAll('input[name="nav"]');

    function toggleFooterVisibility() {
        if (heroLearnMore.checked || originLearnMore.checked) {
            footer.style.display = 'none';
        } else {
            footer.style.display = 'flex';
        }
    }

    function checkNavStatus() {
        if (!navRadioButtons[0].checked) {
            heroLearnMore.checked = false;
        }
        if (!navRadioButtons[1].checked) {
            originLearnMore.checked = false;
        }
        toggleFooterVisibility();
    }

    heroLearnMore.addEventListener('change', toggleFooterVisibility);
    originLearnMore.addEventListener('change', toggleFooterVisibility);

    navRadioButtons.forEach(function (button) {
        button.addEventListener('change', checkNavStatus);
    });
});
