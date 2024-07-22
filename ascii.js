/*jslint browser: true, devel: true */
/*global ANIMATIONS */

document.addEventListener("DOMContentLoaded", function () {
    const animationTextArea = document.getElementById("text-area");
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const animationSelect = document.getElementById("animation");
    const fontSizeSelect = document.getElementById("fontsize");
    const turboCheckbox = document.getElementById("turbo");

    let animationInterval;
    let currentFrameIndex = 0;
    let frames;
    const frameDelay = {normal: 250, turbo: 50};
    const defaultFontSize = 12;
    const fontSizes = {
        "Extra Large": 24,
        Large: 16,
        Medium: defaultFontSize,
        Small: 10,
        Tiny: 7,
        XXL: 32
    };

    startButton.addEventListener("click", startAnimation);
    stopButton.addEventListener("click", stopAnimation);
    animationSelect.addEventListener("change", loadAnimation);
    fontSizeSelect.addEventListener("change", changeFontSize);
    turboCheckbox.addEventListener("change", changeSpeed);

    function startAnimation() {
        console.log("started");
        if (!animationInterval) {
            frames = animationTextArea.value.split("=====\n");
            animationInterval = setInterval(showNextFrame, getFrameDelay());
            toggleControls(true);
        }
    }

    function stopAnimation() {
        console.log("stopped");
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
            animationTextArea.value = frames.join("=====\n");
            toggleControls(false);
        }
    }

    function loadAnimation() {
        const selectedAnimation = animationSelect.value;
        animationTextArea.value = ANIMATIONS[selectedAnimation] || "";
    }

    function changeFontSize() {
        animationTextArea.style.fontSize =
        (fontSizes[fontSizeSelect.value] || defaultFontSize) + "pt";
    }

    function changeSpeed() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = setInterval(showNextFrame, getFrameDelay());
        }
    }

    function getFrameDelay() {
        return (
            turboCheckbox.checked
            ? frameDelay.turbo
            : frameDelay.normal
        );
    }

    function showNextFrame() {
        animationTextArea.value = frames[currentFrameIndex];
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
    }

    function toggleControls(isAnimating) {
        startButton.disabled = isAnimating;
        stopButton.disabled = !isAnimating;
        animationSelect.disabled = isAnimating;
    }
});
