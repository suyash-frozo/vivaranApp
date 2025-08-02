// ==UserScript==
// @name         Vivaran OAuth Auto Redirect
// @namespace    http://vivaran.app/
// @version      1.0
// @description  Automatically redirect from backend auth-success to frontend dashboard
// @author       Vivaran Team
// @match        https://endearing-prosperity-production.up.railway.app/static/auth-success.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('Vivaran OAuth redirect script loaded');
    
    // Function to redirect to dashboard
    function redirectToDashboard() {
        const frontendUrl = 'http://localhost:3000/dashboard';
        console.log('Redirecting to:', frontendUrl);
        window.location.href = frontendUrl;
    }
    
    // Show a custom message and redirect
    function showRedirectMessage() {
        document.body.innerHTML = `
            <div style="
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                color: white;
            ">
                <div style="
                    text-align: center;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 40px;
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                ">
                    <div style="
                        width: 64px;
                        height: 64px;
                        background: linear-gradient(135deg, #3b82f6, #14b8a6);
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 20px;
                        font-size: 32px;
                        font-weight: bold;
                    ">V</div>
                    <h1>Login Successful!</h1>
                    <p>Redirecting to your dashboard...</p>
                    <div style="
                        width: 24px;
                        height: 24px;
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        border-top: 3px solid white;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 20px auto;
                    "></div>
                    <button onclick="window.location.href='http://localhost:3000/dashboard'" style="
                        background: #3b82f6;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 10px;
                    ">Go to Dashboard Now</button>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
    }
    
    // Execute when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            showRedirectMessage();
            setTimeout(redirectToDashboard, 2000);
        });
    } else {
        showRedirectMessage();
        setTimeout(redirectToDashboard, 2000);
    }
})();