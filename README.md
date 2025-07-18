Cloudflare worker para pagina personalizada de redirection para CF One Gateway

<img src="https://vplabs.us/custom_redirect_page.png" alt="Custom CF One Gateway Redirect Page" width="600"/>

1. Crea un nuevo worker y carga el codigo del archivo worker.js
2. Modifica la liga del logo y la informacion conforme se nencesite, de igual manera el tiempo puede ser modificado aqui:
   ```
    <img id="logo" width="250" height="260" src="https://imagedelivery.net/ih4h24GjSpxgtoKR_JlczQ/218680b9-61eb-479c-e221-8b0938362500/public">
    <h1>Esta accediendo a una</h1>
    <h1>Aplicacion No-Aprobada de IA</h1>
    <h1>Redirigiendo a ${escapeHtml(safeUrl)}</h1>
    <p>Usted sera redirigido a en <span id="countdown" class="countdown">10</span> segundos</p>
   ```
3. Agrega el siguiente url en la politica de CF One Gateway en la regla de redireccion "URL de redirección definida por política" y agrega `?targetUrl=` con la url a dirigir, e.g.:
   ```
   https://<worker_name>.workers.dev/?targetUrl=https%3A%2F%2Fchatgpt.com
   ```

<img src="https://imagedelivery.net/ih4h24GjSpxgtoKR_JlczQ/bae5502b-01bd-4c47-3d97-75b6c9aeb000/public" alt="Gateway Redirect Settings" width="1100"/>
