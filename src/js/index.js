// Main entry point for the application
import '../css/main.css';

// Import all existing modules
import './modules/navbar-scroll';
import './modules/custom-ai-assistant';
import './modules/index-articles';

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Capstone Stunting App initialized with Webpack');
    
    // Initialize any global functionality here
    initializeGlobalFeatures();
});

function initializeGlobalFeatures() {
    // Add any global initialization code here
    console.log('Global features initialized');
}
