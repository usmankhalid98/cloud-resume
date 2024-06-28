const counter = document.querySelector(".counter-number");
async function updateCounter() {
    let response = await fetch("https://6pemknww6pccxwlz4ig2kvgeie0metgu.lambda-url.eu-west-2.on.aws/");
    let data = await response.json();
    counter.innerHTML = ` This page has ${data} Views!`;
}

updateCounter();