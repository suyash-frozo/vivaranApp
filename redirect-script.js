// Browser console script to redirect from backend auth-success to frontend
// Run this in browser console when stuck on auth-success page

if (window.location.href.includes('auth-success.html') || 
    window.location.href.includes('endearing-prosperity-production')) {
    
    console.log('Detected auth-success page, redirecting to frontend...');
    
    // Check if we have OAuth in progress
    const oauthLogin = localStorage.getItem('vivaran-oauth-login');
    
    if (oauthLogin === 'true') {
        // Redirect to our OAuth callback page
        window.location.href = 'http://localhost:3000/oauth-callback';
    } else {
        // Redirect to dashboard directly
        window.location.href = 'http://localhost:3000/dashboard';
    }
}