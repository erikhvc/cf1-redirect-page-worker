Cloudflare worker for custom CF One Gateway redirect page

<img src="https://vplabs.us/redirect_page.png" alt="Custom CF One Gateway Redirect Page" width="600"/>

1. Create a new worker and upload the worker.js code
2. Modify the link to the logo and support info (Emailm URL and Phone) as needed:
   ```
    <img id="logo" src="https://vplabs.us/acme_corp_logo.png">
    <h1>You Are Accessing A</h1>
    <h1>Non-Sanctioned AI Tool</h1>
    <h1>Redirecting to ${escapeHtml(safeUrl)}</h1>
    <p>You will be automatically redirected in <span id="countdown" class="countdown">10</span> seconds</p>
   ```
3. Place the following url link in you CF One Gateway redirect rule within the "Policy URL redirect" and add the `?targetUrl=` with your custom redirect url, e.g.:
   ```
   https://<worker_name>.workers.dev/?targetUrl=https%3A%2F%2Fchatgpt.com
   ```

<img src="https://vplabs.us/redirect_policy.png" alt="Gateway Redirect Settings" width="1100"/>
