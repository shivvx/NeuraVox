import fetch from 'node-fetch';

async function testChat() {
  try {
    const response = await fetch('http://localhost:3002/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'Hello' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Chat response:', data);
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testChat();
