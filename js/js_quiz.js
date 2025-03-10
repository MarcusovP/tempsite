document.addEventListener("DOMContentLoaded", () => {
    const teamList = document.getElementById("team-list");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const questionCategory = document.getElementById("question-category");
    const questionText = document.getElementById("question-text");
    const answerInput = document.getElementById("answer-input");
    const submitAnswer = document.getElementById("submit-answer");
    const currentTeamLabel = document.getElementById("current-team");
    const teamCount = getCookie("teamCount");

    if (!teamCount) {
        alert("Количество команд не найдено, возвращаемся на главную страницу.");
        window.location.href = "index.html";
        return;
    }

    for (let i = 1; i <= teamCount; i++) {
        const li = document.createElement("li");
        li.textContent = `Команда ${i}: 0 очков`;
        li.dataset.points = 0;
        li.dataset.team = i;
        teamList.appendChild(li);
    }

    const questions = {
        "Биография писателя": {
            100: { 
                question: "Какое настоящее имя Стендаля?", 
                answer: "Анри Мари Бейль" 
            },
            200: { 
                question: "Как Стендаль оказался в России?", 
                answer: "200" // участвовал в походе Наполеона против России в 1812 году.
            },
            300: { 
                question: "Сколько лет было писателю, когда скончалась его мать?", 
                answer: "7" 
            }
        },
        "Сюжет произведения": {
            100: { 
                question: "Откуда Стендаль взял сюжет произведения?", 
                answer: "101"  //Сюжет взят из газетной статьи, которую Стендаль прочитал в гренобльской газете.
            },
            200: { 
                question: "Кем восхищался Жюльен?", 
                answer: "Наполеон" 
            },
            300: { 
                question: "Куда переехал Жюльен из Верьера?", 
                answer: "Безансон" 
            }
        },
        "Тема, идея, творческое своеобразие": {
            100: { 
                question: "Кто из героев романа 'Преступление и наказание' был похож внутренне на Жюльена?", 
                answer: "Родион Раскольников" 
            },
            200: { 
                question: "Как Андре Жид и Максим Горький характеризовали стендалевские романы?", 
                answer: "письма в будущее" 
            },
            300: { 
                question: "В чем смысл названия романа?", 
                answer: "301" //красный - цвет торжества и победы или цвет любви, страсти, черный - цвет скорби и несчастья.
            }
        }
    };

    let currentCategory = '';
    let currentValue = 0;
    let currentButton = null;
    let currentTeamIndex = 0;
    function updateCurrentTeam() {
        const teamItems = document.querySelectorAll("#team-list li");
        currentTeamLabel.textContent = `Сейчас отвечает: Команда ${currentTeamIndex + 1}`;
        teamItems.forEach(item => item.classList.remove("active"));
        teamItems[currentTeamIndex].classList.add("active");
    }

    updateCurrentTeam();

    document.querySelectorAll(".quiz-button").forEach(button => {
        button.addEventListener("click", () => {
            if (button.disabled) return;

            currentCategory = button.dataset.category;
            currentValue = parseInt(button.dataset.value);
            currentButton = button;

            console.log(`Выбрана категория: ${currentCategory}, значение: ${currentValue}`);

            if (questions[currentCategory] && questions[currentCategory][currentValue]) {
                questionCategory.textContent = `${currentCategory} за ${currentValue}`;
                questionText.textContent = questions[currentCategory][currentValue].question;
                
                answerInput.value = '';
                modal.classList.add("show");
            } else {
                console.error(`Ошибка: Вопрос для категории "${currentCategory}" со значением "${currentValue}" не найден.`);
            }
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    submitAnswer.addEventListener("click", () => {
        const userAnswer = answerInput.value.trim();
    
        if (userAnswer === "") {
            answerInput.classList.add("error");
            return;
        } else {
            answerInput.classList.remove("error");
        }
    
        const correctAnswer = questions[currentCategory][currentValue].answer.toLowerCase();
    
        if (userAnswer.toLowerCase() === correctAnswer) {
            alert("Ответ верный!");
            updateTeamScore(currentValue);
        } else {
            alert(`Ответ неверный. Вы теряете ${currentValue} очков. Правильный ответ: ${questions[currentCategory][currentValue].answer}`);
            updateTeamScore(-currentValue);
        }
    
        if (currentButton) {
            currentButton.disabled = true;
            currentButton.classList.add("disabled");
        }
    
        modal.classList.remove("show");
        currentTeamIndex = (currentTeamIndex + 1) % teamCount;
        updateCurrentTeam();
    
        checkForWinner(); 
    });
    

    function updateTeamScore(points) {
        const teamItems = document.querySelectorAll("#team-list li");
        const teamItem = teamItems[currentTeamIndex];
        
        const currentPoints = parseInt(teamItem.dataset.points);
        const newPoints = currentPoints + points;
        
        teamItem.dataset.points = newPoints;
        teamItem.textContent = `Команда ${currentTeamIndex + 1}: ${newPoints} очков`;
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});


function checkForWinner() {
    const buttons = document.querySelectorAll(".quiz-button:not(.disabled)");
    if (buttons.length === 0) {
        const teamItems = document.querySelectorAll("#team-list li");
        let winner = null;
        let maxPoints = -Infinity;

        teamItems.forEach(item => {
            const points = parseInt(item.dataset.points);
            if (points > maxPoints) {
                maxPoints = points;
                winner = item.textContent;
            }
        });

        setTimeout(() => {
            alert(`Игра окончена! Победитель: ${winner}`);
        }, 500);
    }
}

