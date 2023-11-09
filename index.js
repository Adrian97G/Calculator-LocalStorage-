const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const historial = document.querySelector("#historial");


// Cargar el historial desde Local Storage
const resultados = JSON.parse(localStorage.getItem("resultados")) || [];

// Mostrar el historial en la página
resultados.forEach(resultado => {
  const li = document.createElement("li");
  li.textContent = resultado;
  historial.appendChild(li);
});

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      const resultado = eval(display.innerText);
      display.innerText = resultado;

      // Añadir el resultado al historial y guardar en Local Storage
      resultados.push(resultado);
      localStorage.setItem("resultados", JSON.stringify(resultados));

      // Mostrar el resultado en el historial de la página
      const li = document.createElement("li");
      li.textContent = resultado;
      historial.appendChild(li);
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Null";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      display.innerText += item.id;
    }
  };
});

const borrarHistorialBtn = document.getElementById("borrarHistorial");

borrarHistorialBtn.onclick = () => {
  // Borrar el historial en Local Storage
  localStorage.removeItem("resultados");

  // Borrar los elementos de la lista en la página
  while (historial.firstChild) {
    historial.removeChild(historial.firstChild);
  }
};

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");

let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};


