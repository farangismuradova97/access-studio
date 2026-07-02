exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const data = JSON.parse(event.body);
    const message = `🔔 НОВАЯ ЗАЯВКА — Access AI Solutions\n\n👤 Клиент: ${data.name || '—'}\n🏢 Компания: ${data.company || '—'}\n📧 Email: ${data.email || '—'}\n💬 Telegram/WhatsApp: ${data.messenger || '—'}\n🌍 Город: ${data.location || '—'}\n\n📋 Тип проекта: ${data.project_type || '—'}\n🏭 Сфера: ${data.industry || '—'}\n💰 Бюджет: ${data.budget || '—'}\n⏰ Срок: ${data.deadline || '—'}\n\n📝 Описание:\n${data.description || '—'}\n\n✅ Функционал: ${data.features || '—'}\n🎨 Стиль: ${data.design_style || '—'}\n\n💡 Доп. пожелания: ${data.additional || '—'}\n📣 Откуда узнал: ${data.source || '—'}`;

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message
      })
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
