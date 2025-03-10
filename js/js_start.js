window.addEventListener('load', () => {
    const background = document.getElementById('background');
    const welcome = document.getElementById('welcome');
    const selectTeams = document.getElementById('select-teams');
    const controls = document.querySelector('.controls');
    const buttonContainer = document.querySelector('.button-container');
    const numberDisplay = document.getElementById('number');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');

    let teamCount = 1;

    setTimeout(() => {
        background.classList.add('fade-in');
        welcome.classList.add('show-text');
    }, 500);

    setTimeout(() => {
        selectTeams.classList.add('show-select-teams');
    }, 1500);

    setTimeout(() => {
        controls.classList.add('show-controls');
    }, 2000);

    setTimeout(() => {
        buttonContainer.classList.add('show-button');
    }, 2500);

    minusButton.addEventListener('click', () => {
        if (teamCount > 1) {
            teamCount--;
            numberDisplay.textContent = teamCount;
        }
    });

    plusButton.addEventListener('click', () => {
        if (teamCount < 10) {
            teamCount++;
            numberDisplay.textContent = teamCount;
        }
    });
});

document.getElementById("quiz-button").addEventListener("click", () => {
    const teamCount = document.getElementById("number").textContent;
    setCookie("teamCount", teamCount, 1); 
    console.log(`Количество команд сохранено: ${teamCount}`);
    window.location.href = "quiz.html";
});

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
    console.log(`Cookie установлена: ${name}=${value}`);
}
