displayConfirmation();

function displayConfirmation(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    document.getElementById("name").textContent = urlParams.get("name");
    document.getElementById("orderId").textContent = urlParams.get("orderId");
    document.getElementById("price").textContent = urlParams.get("price") + "€";
}