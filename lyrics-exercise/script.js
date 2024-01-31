document.addEventListener("DOMContentLoaded", function () {
    const size = 4;
    let currentIndex = 0;

    function createCircleSVGs() {
        for (let i = 0; i < 5; i++) {
            let radius = 60 + i * 60;

            let circleDiv = document.createElement("div");
            circleDiv.className = 'circle';
            circleDiv.style.animation = `continuousRotate ${30 - (i * 5)}s linear infinite`;

            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute('width', '1200');
            svg.setAttribute('height', '1200');

            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'none');
            path.setAttribute('id', `circlePath${i + 1}`);
            path.setAttribute('d', `M600,600 m-${radius},0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`);

            svg.appendChild(path);
            circleDiv.appendChild(svg);
            document.getElementById("lyricContainer").appendChild(circleDiv);
        }
    }
    createCircleSVGs();

    let fetchedLyrics = [];

    fetch('lyric.json')
        .then(response => response.json())
        .then(data => {
            fetchedLyrics = data.lyrics;
            initializeLyrics(fetchedLyrics, size, currentIndex);
        })
        .catch(error => console.error('Error fetching JSON:', error));

    function initializeLyrics(lyrics, size, startIndex) {
        document.querySelectorAll('.circle text').forEach(text => text.remove());

        for (let i = 0; i < 5; i++) {
            let textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
            textPath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#circlePath${5 - i}`);
            textPath.setAttribute("startOffset", "0%");
            textPath.textContent = lyrics[startIndex + i];

            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.style.fontSize = `${(18 * size) - i * 2 * size}px`;
            text.style.fill = 'var(--white)';

            if (i === 0) {
                text.classList.add('bigText');
            } else {
                text.classList.add('regularText');
                text.style.opacity = 0.5 - (i - 1) * 0.1;
            }

            text.appendChild(textPath);

            document.querySelector(`#circlePath${5 - i}`).parentNode.appendChild(text);
        }
    }

    let y = 0;
    let isScrollHandled = false;
    let allowScrollAction = true;
    function handleScroll() {
        if (isScrollHandled || !allowScrollAction) {
            return;
        }
        isScrollHandled = true;
        allowScrollAction = false;

        let deltaY = window.scrollY;

        if (deltaY > 0) {
            moveOn();
        } else {
            moveDown();
        }

        setTimeout(() => {
            isScrollHandled = false;
        }, 100);
    }

    function resetScrollAction() {
        allowScrollAction = true;
    }

    const svg = document.querySelector('svg');

    function moveOn() {
        if (currentIndex + 5 < fetchedLyrics.length) {
            document.querySelectorAll('#lyricContainer svg').forEach(svg => {
                svg.classList.add('scaleUp');
            });

            setTimeout(() => {
                document.querySelectorAll('#lyricContainer svg').forEach(svg => {
                    svg.classList.remove('scaleUp');
                });

                currentIndex++;
                initializeLyrics(fetchedLyrics, size, currentIndex);

                let newBigTextSVG = document.querySelector('.bigText').closest('svg');
                if (newBigTextSVG) {
                    newBigTextSVG.classList.add('FadeIn');
                    newBigTextSVG.addEventListener('animationend', () => {
                        newBigTextSVG.classList.remove('FadeIn');
                    }, { once: true });
                }
            }, 500);
        }
    }

    function moveDown() {
        if (currentIndex > 0) {
            document.querySelectorAll('#lyricContainer svg').forEach(svg => {
                svg.classList.add('scaleDown');
            });

            setTimeout(() => {
                document.querySelectorAll('#lyricContainer svg').forEach(svg => {
                    svg.classList.remove('scaleDown');
                });

                currentIndex--;
                initializeLyrics(fetchedLyrics, size, currentIndex);

                let newBigTextSVG = document.querySelector('.bigText').closest('svg');
                if (newBigTextSVG) {
                    newBigTextSVG.classList.add('FadeIn');
                    newBigTextSVG.addEventListener('animationend', () => {
                        newBigTextSVG.classList.remove('FadeIn');
                    }, { once: true });
                }
            }, 500);
        }
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debounce(resetScrollAction, 150));
});
