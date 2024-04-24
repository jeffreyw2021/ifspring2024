document.addEventListener('DOMContentLoaded', function () {
    const factionButtons = document.querySelectorAll('.pagination .pag-btn input[type="radio"]');
    const sliders = document.querySelectorAll('.chara-content-slider');
    const forwardButton = document.getElementById('forward-btn');
    const backwardButton = document.getElementById('backward-btn');

    function updateSliderVisibility() {
        sliders.forEach(slider => {
            if (document.querySelector(`#${slider.id.replace('-cards', '')}`).checked) {
                slider.style.display = 'block';
                updateCarouselButtonsVisibility(slider);
            } else {
                slider.style.display = 'none';
            }
        });
    }

    factionButtons.forEach(button => {
        button.addEventListener('change', updateSliderVisibility);
    });

    updateSliderVisibility();  

    function scrollSlider(direction) {
        const visibleSlider = document.querySelector('.chara-content-slider[style*="display: block"]');
        if (visibleSlider) {
            const scrollAmount = visibleSlider.clientWidth * 0.6;
            visibleSlider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    forwardButton.addEventListener('click', () => scrollSlider(-1));
    backwardButton.addEventListener('click', () => scrollSlider(1));

    function updateCarouselButtonsVisibility(slider) {
        const atreidesChecked = document.getElementById('atreides').checked;
        const isOverflowing = slider.scrollWidth > slider.clientWidth;
        if (atreidesChecked || isOverflowing) {
            forwardButton.style.display = 'flex';
            backwardButton.style.display = 'flex';
        } else {
            forwardButton.style.display = 'none';
            backwardButton.style.display = 'none';
        }
    }
});
