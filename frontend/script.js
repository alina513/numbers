const number = document.querySelector(".number");
const increaseButton = document.querySelector(".increase");
const decreaseButton = document.querySelector(".decrease");
const lastUpdateEl = document.querySelector(".last-update");

let handleDecrease = null;

async function fetchNumber() {
  try {
    const response = await fetch(
      "https://numbers-backend.onrender.com/api/numbers"
    );
    if (!response.ok) throw new Error("403 Forbidden");
    const result = await response.json();
    updateUI(result[0]);
  } catch (error) {
    console.error(error);
  }
}

async function updateNumber(newNumber) {
  try {
    const response = await fetch(
      "https://numbers-backend.onrender.com/api/numbers",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: newNumber }),
      }
    );
    if (!response.ok) throw new Error("Помилка оновлення");
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error(error);
  }
}

function updateUI(data) {
  number.textContent = data.number;
  number.style.transform = "scale(1.5)";
  setTimeout(() => (number.style.transform = "scale(1)"), 300);

  const numericValue = Number(data.number);

  const updateDate = new Date(data.updatedAt);
  lastUpdateEl.textContent = `Останнє оновлення: ${updateDate
    .toString()
    .slice(3, 25)}`;

  if (numericValue === 0) {
    decreaseButton.disabled = true;
    if (handleDecrease) {
      decreaseButton.removeEventListener("click", handleDecrease);
      handleDecrease = null;
    }
  } else {
    if (!handleDecrease) {
      handleDecrease = () => {
        const current = Number(number.textContent);
        if (current > 0) {
          updateNumber(current - 1);
          lastUpdateEl.textContent = `Останнє оновлення: ${new Date()
            .toString()
            .slice(3, 25)}`;
        }
      };
      decreaseButton.addEventListener("click", handleDecrease);
    }
    decreaseButton.disabled = false;
  }
}

increaseButton.addEventListener("click", () => {
  const current = Number(number.textContent);
  updateNumber(current + 1);
  lastUpdateEl.textContent = `Останнє оновлення: ${new Date()
    .toString()
    .slice(3, 25)}`;
});

fetchNumber();
