// Redirect helper for OAuth success page
(function() {
    // Check if we're on the backend's auth-success page
    if (window.location.href.includes('/static/auth-success.html') || 
        window.location.href.includes('endearing-prosperity-production.up.railway.app')) {
        
        console.log('Detected OAuth success page, redirecting to dashboard...');
        
        // Wait a moment for cookies to be set, then redirect
        setTimeout(() => {
            const frontendUrl = 'http://localhost:3000/dashboard';
            window.location.href = frontendUrl;
        }, 1000);
    }
})();