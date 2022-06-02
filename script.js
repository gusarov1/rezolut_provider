"use strict"

window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax__container');
        const first = document.querySelector('.images-parallax__first');
        const second = document.querySelector('.images-parallax__second');
        const third = document.querySelector('.images-parallax__third');

        /* Коэффициенты */
        const forFirst = 40;
        const forSecond = 20;
        const forThird = 10;

        /* Скорость анимации */
        const speed = 0.05;

        /* Объявление переменных */
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            /* Передаем стили */
            first.style.cssText = `transform: translate(${positionX / forFirst}%,${positionY / forFirst}%)`;
            second.style.cssText = `transform: translate(${positionX / forSecond}%,${positionY / forSecond}%)`;
            third.style.cssText = `transform: translate(${positionX / forThird}%,${positionY / forThird}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            /* Поулчение ширины и высоты блока */
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            /* Ноль по середине */
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            /* Получаем проценты */
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        /* Parallax при скролле */

        let thresholdSets = [];
        for (let i = 0; i <= 1.0; i +=0.05) {
            thresholdSets.push(i);
        }
        
        const callback = function (entries, observer) {
            const scrollTopProcent = window.scrollY / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        
        const observer = new IntersectionObserver(callback, {threshold: thresholdSets});

        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
            second.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
            third.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
        }
    }
}