function initTicketSelect() {
  document.querySelectorAll(".inputSelect").forEach((item, i) => {
    const radioes = item.querySelectorAll(".inputSelect__item");
    const value = item.querySelector(".inputSelect__value")
    radioes.forEach(radio => {
      const listText = radio.querySelectorAll(".inputSelect__choose")
      radio.addEventListener('change', function () {
        listText.forEach(text => {
          value.textContent = text.textContent
        })
      });
    })
  })
}

initTicketSelect();
