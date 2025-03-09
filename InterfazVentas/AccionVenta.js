
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("sales-modal");
    const openModalBtn = document.getElementById("add-sale");
    const closeModalBtn = document.getElementById("close-modal");
    const increaseNights = document.getElementById("increase-nights");
    const decreaseNights = document.getElementById("decrease-nights");
    const nightsInput = document.getElementById("nights-input");
    const nightsCost = document.getElementById("nights-cost");
    
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });
    
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
    function updateNightCost() {
        const nights = parseInt(nightsInput.value, 10);
        const costPerNight = 100;
        nightsCost.textContent = `$${costPerNight} por noche × ${nights} noches = $${nights * costPerNight}`;
    }
    
    increaseNights.addEventListener("click", () => {
        nightsInput.value = parseInt(nightsInput.value, 10) + 1;
        updateNightCost();
    });
    
    decreaseNights.addEventListener("click", () => {
        if (parseInt(nightsInput.value, 10) > 1) {
            nightsInput.value = parseInt(nightsInput.value, 10) - 1;
            updateNightCost();
        }
    });
});
