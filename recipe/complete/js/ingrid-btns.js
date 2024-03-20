document.addEventListener('DOMContentLoaded', function () {
    const increaseBtn = document.querySelector('.btn[title="increase"]');
    const decreaseBtn = document.querySelector('.btn[title="decrease"]');
    const quantityDisplay = document.querySelector('.btn-group > p');
    
    increaseBtn.addEventListener('click', function () {
        updateQuantity(1);
    });

    decreaseBtn.addEventListener('click', function () {
        updateQuantity(-1);
    });

    function updateQuantity(change) {
        let currentQuantity = parseInt(quantityDisplay.textContent);
        currentQuantity = Math.max(1, currentQuantity + change);
        quantityDisplay.textContent = currentQuantity.toString();
        updateIngredientQuantities(currentQuantity);
    }

    function updateIngredientQuantities(multiplier) {
        document.querySelectorAll('.in-num').forEach(function (span) {
            const baseAmount = span.getAttribute('data-base-amount') || span.textContent;
            let [amount, unit] = baseAmount.split(/(\d+[\d\/]*)/).filter(Boolean);
            if (!span.hasAttribute('data-base-amount')) {
                span.setAttribute('data-base-amount', baseAmount);
            }
            if (unit) {
                amount = eval(amount.replace(/(\d+)\/(\d+)/, '($1/$2)')) * multiplier;
                span.textContent = `${Math.round(amount * 100) / 100} ${unit}`;
            } else {
                amount = eval(baseAmount.replace(/(\d+)\/(\d+)/, '($1/$2)')) * multiplier;
                span.textContent = Math.round(amount * 100) / 100;
            }
        });
    }
});
