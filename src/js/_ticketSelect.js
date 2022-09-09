function initTicketSelect() {
    document.querySelectorAll(".inputSelect").forEach((item, i) => {
      const checkBox = item.querySelector(".inputSelect__checkbox")
      const radioes = item.querySelectorAll(".inputSelect__item");
      const value = item.querySelector(".inputSelect__value")
      const dropdown = item.querySelector(".inputSelect__dropdown")
  
      checkBox.addEventListener("change", () => {
        if (!dropdown.classList.contains("active")) {
          checkBox.checked = true
          dropdown.classList.add("active")
        } else {
          checkBox.checked = false
          dropdown.classList.remove("active")
        }
      })
      
      if (document.querySelector(".main-content-analyticScanner")) {
        document.querySelector(".main-content-analyticScanner").addEventListener("click", (e) => {
          if (e.target != dropdown) {
            checkBox.checked = false
            dropdown.classList.remove("active")
          }
        })
      }
  
  
      radioes.forEach(radio => {
        const listText = radio.querySelectorAll(".inputSelect__choose")
        radio.addEventListener('change', function () {
          document.querySelector(".inputSelect__checkbox ").removeAttribute("checked")
          listText.forEach(text => {
            value.textContent = text.textContent
          })
        });
      })
    })
}

initTicketSelect();
