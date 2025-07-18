// Handle all HTTP requests
export default {
  async fetch(request, env) {
    // Only process GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Configuration - set your target URL here
    const TARGET_URL = env.TARGET_URL || 'https://chatgpt.com/';
    const url = new URL(request.url);
    const targetUrlParam = url.searchParams.get('targetUrl');
    const safeUrl = decodeURIComponent(targetUrlParam);
    
    if (!targetUrlParam) {
      return new Response('No targetUrl parameter found.', { status: 400 });
    }

    // HTML template with countdown timer
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="10; url='${safeUrl}'">
  <title>Redirecting...</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding-top: 50px;
      background-color: #f0f8ff;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    #logo {
      height: 60;
      width: 50;
    }
    .countdown {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      margin: 20px 0;
    }
    .progress-bar {
      height: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      margin: 20px 0;
      overflow: hidden;
    }
    .progress {
      height: 100%;
      background: #3498db;
      width: 100%;
      animation: progress 10s linear forwards;
    }
    @keyframes progress {
      from { width: 100% }
      to { width: 0% }
    }
    h1 { color: #c0392b; }
  </style>
</head>
<body>
  <div class="container">
      <img id="logo" width="250" height="260" src="https://imagedelivery.net/ih4h24GjSpxgtoKR_JlczQ/218680b9-61eb-479c-e221-8b0938362500/public">
      <h1>Esta accediendo a una</h1>
      <h1>Aplicacion No-Aprobada de IA</h1>
      <h1>Redirigiendo a ${escapeHtml(safeUrl)}</h1>
      <p>Usted sera redirigido en <span id="countdown" class="countdown">10</span> segundos</p>
    
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
    
    <p>
      <a href="${safeUrl}">Presiona aqui</a> si no quiere esperar
    </p>
  </div>

  <script>
    // Countdown timer
    let seconds = 10;
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
      seconds--;
      countdownElement.textContent = seconds;
      if (seconds <= 0) clearInterval(timer);
    }, 1000);
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  }
};

// Helper to escape HTML special characters
function escapeHtml(unsafe) {
  return unsafe?.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;") || '';
}
