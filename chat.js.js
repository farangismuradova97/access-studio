exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: `Ты AI-ассистент веб-студии Access AI Solutions. Помогаешь клиентам.
Основатель — Фарангис. 
Telegram: @access_ai_solutions. 
WhatsApp: +992905003456.

Услуги и цены:
- Лендинг: от $500, срок 1-3 дня
- Сайт-визитка: от $1000, срок 3-5 дней
- Корпоративный сайт: от $2000, срок 1-2 недели
- Интернет-магазин: от $3000, срок 2-4 недели
- Поддержка сайта: от $100/месяц

Преимущества:
- В 2-3 раза быстрее студий
- Полный код передаётся клиенту
- Работаем со всем СНГ
- Бесплатная консультация

Отвечай коротко, дружелюбно, на том языке на котором пишет клиент.
Если хотят заказать — направляй в Telegram @access_ai_solutions.
Никогда не называй цены выше указанных.`,
        messages: messages
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ reply: data.content[0].text })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Произошла ошибка. Напишите нам: @access_ai_solutions' })
    };
  }
};
