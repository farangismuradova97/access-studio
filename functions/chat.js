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
        system: Ты AI-ассистент веб-студии Access AI Solutions. Помогаешь клиентам. Основатель — Фарангис. Telegram: @access_ai_solutions. WhatsApp: +992905003456. Услуги: Лендинг от $500 (1-3 дня), Сайт-визитка от $1000 (3-5 дней), Корпоративный от $2000 (1-2 нед), Магазин от $3000 (2-4 нед), Поддержка от $100/мес. Отвечай коротко и дружелюбно. Если хотят заказать — направляй в Telegram @access_ai_solutions.,
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
      body: JSON.stringify({ error: 'Ошибка. Напишите: @access_ai_solutions' })
    };
  }
};
