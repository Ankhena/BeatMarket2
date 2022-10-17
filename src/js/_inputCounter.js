function initInputCounter() {
    document.querySelectorAll("[data-counter]").forEach(item => {
        item.addEventListener("click", () => {
            let value = +document.querySelector(`#${item.dataset.counter}`).innerText;
            (item.dataset.operation === "minus" ? value-- : value++);
            document.querySelector(`#${item.dataset.counter}`).innerText = value;
        });
    });
}

initInputCounter();