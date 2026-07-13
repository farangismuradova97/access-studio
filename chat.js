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
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: 'Ты AI-ассистент веб-студии Access AI Solutions. Основатель — Фарангис. Telegram: @access_ai_solutions. Отвечай коротко и дружелюбно.',
        messages: messages
      })
    });

    const data = await response.json();
    console.log('API response:', JSON.stringify(data));

    if (!response.ok) {
      console.error('API error:', data);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ reply: 'Напишите нам: @access_ai_solutions 😊' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: data.content[0].text })
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ reply: 'Напишите нам: @access_ai_solutions 😊' })
    };
  }
};
