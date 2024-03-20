document.addEventListener('DOMContentLoaded', function() {
    const recipeSteps = [
        {
            "title": "Hamburger Patties",
            "steps": [
                "Mix together the ground beef, Worcestershire sauce, seasoning salt, garlic powder, and black pepper in a large bowl.",
                "Start forming it into patties by grabbing a handful of meat and rolling it into a ball. Then press down to flatten it out. Smooth the edges so there isn't any cracks or jagged edges. Patties should come out to at least one inch thick. Try to keep the patties large since it will shrink when fried.",
                "Heat a pan over medium heat. Fry each side of the patties for about 3-5 minutes or until well done.",
                "Set each finished patty on a plate lined with paper towel to catch any extra grease."
            ],
            "carousel": [
                "assets/procedure/burger/1.png",
                "assets/procedure/burger/2.png",
                "assets/procedure/burger/3.png",
                "assets/procedure/burger/4.png",
                "assets/procedure/burger/5.png",
                "assets/procedure/burger/6.png",
                "assets/procedure/burger/7.png",
                "assets/procedure/burger/8.png",
                "assets/procedure/burger/9.png",
                "assets/procedure/burger/10.png",
                "assets/procedure/burger/11.png",
                "assets/procedure/burger/12.png"
            ]
        },
        {
            "title": "Gravy",
            "steps": [
                "Mix together the beef stock, shoyu, Worcestershire sauce, ketchup, and cornstarch. Whisk it until the cornstarch has come off of the bottom.",
                "Using the same pan, melt one tablespoon of the butter to caramelize the onions for about a minute then fry the mushrooms for another minute or two. (It is optional to add the mushrooms and onions. If not, just skip to the next step.)",
                "Melt the rest of the butter and add in the gravy mix to the pan. Keep stirring the gravy until it begins to thicken and simmer."
            ],
            "carousel": [
                "assets/procedure/gravy/1.png",
                "assets/procedure/gravy/2.png",
                "assets/procedure/gravy/3.png",
                "assets/procedure/gravy/4.png",
                "assets/procedure/gravy/5.png",
                "assets/procedure/gravy/6.png",
                "assets/procedure/gravy/7.png",
                "assets/procedure/gravy/8.png",
                "assets/procedure/gravy/9.png",
                "assets/procedure/gravy/10.png",
                "assets/procedure/gravy/11.png",
                "assets/procedure/gravy/12.png",
                "assets/procedure/gravy/13.png",
                "assets/procedure/gravy/14.png",
                "assets/procedure/gravy/15.png"
            ]
        },
        {
            "title": "Egg",
            "steps": [
                "Melt a slice of butter and crack an egg on a frying pan.",
                "Cook a sunny side up egg. (You can switch it up to your preference) Set aside"
            ],
            "carousel": [
                "assets/procedure/egg/1.png",
                "assets/procedure/egg/2.png"
            ]
        },
        {
            "title": "Assemble Loco Moco",
            "steps": [
                "Scoop a generous serving of hot white rice on a plate. Layer it with one hamburger patty then drizzle on the gravy. Top it with the egg and garnish with green onions.",
                "Serve it hot and enjoy!"
            ],
            "carousel": [
                "assets/procedure/assemble/1.png",
                "assets/procedure/assemble/2.png",
                "assets/procedure/assemble/3.png",
                "assets/procedure/assemble/4.png"
            ]
        }
    ]    

    const stepsContainer = document.querySelector('.steps');

    recipeSteps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';

        let carouselHTML = `<div class="carousel">
                                <img src="${step.carousel[0]}" alt="${step.title}">
                                <div class="step-title">
                                    <p><span class="step-roman-count">${indexToRoman(index + 1)}.</span> ${step.title}</p>
                                </div>
                                <div class="carousel-btns">
                                    <button class="caro-btn" title="previous"><i class="fa-chevron-left fa-solid"></i></button>
                                    <button class="caro-btn" title="next"><i class="fa-chevron-right fa-solid"></i></button>
                                </div>
                            </div>`;

        let stepDescHTML = '<div class="step-desc">';
        step.steps.forEach((subStep, subIndex) => {
            stepDescHTML += `<div class="substep">
                                <div class="step-num">${subIndex + 1}</div>
                                <p>${subStep}</p>
                            </div>`;
        });
        stepDescHTML += '</div>';

        stepElement.innerHTML = carouselHTML + stepDescHTML;
        stepsContainer.appendChild(stepElement);

        initializeCarousel(stepElement, step.carousel);
    });

    function indexToRoman(num) {
        if (num < 1 || num > 3999) return "";
    
        const numeralCodes = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
        let result = "";
    
        numeralCodes.forEach(([letter, value]) => {
            while (num >= value) {
                result += letter;
                num -= value;
            }
        });
        return result;
    }    

    function initializeCarousel(stepElement, images) {
        const prevButton = stepElement.querySelector('button[title="previous"]');
        const nextButton = stepElement.querySelector('button[title="next"]');
        const imgElement = stepElement.querySelector('.carousel img');

        let currentImageIndex = 0;

        prevButton.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                imgElement.src = images[currentImageIndex];
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                imgElement.src = images[currentImageIndex];
            }
        });
    }
});
