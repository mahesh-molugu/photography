// Main JavaScript - Shared Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Single Page Application Navigation
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const pages = document.querySelectorAll('.page');
    
    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation active state
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Load component-specific scripts
        loadComponentScripts(pageId);
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.slice(1) || 'home';
        showPage(hash);
    });
    
    // Show initial page based on URL hash
    const initialPage = window.location.hash.slice(1) || 'home';
    showPage(initialPage);
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Initialize shared functionality
    initializeSharedFeatures();
});

// Function to load component-specific scripts
function loadComponentScripts(pageId) {
    // Remove existing component scripts
    const existingScripts = document.querySelectorAll('script[data-component]');
    existingScripts.forEach(script => script.remove());
    
    // Load component-specific script
    const script = document.createElement('script');
    script.src = `js/${pageId}.js`;
    script.setAttribute('data-component', pageId);
    script.onload = function() {
        console.log(`Loaded ${pageId} component script`);
    };
    script.onerror = function() {
        console.log(`No specific script for ${pageId} component`);
    };
    document.head.appendChild(script);
}

// Function to initialize shared features
function initializeSharedFeatures() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add scroll effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
} 