// Main JavaScript for Laurea Layout

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initSite();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize countdown if date is set
    initCountdown();
    
    // Load content from localStorage
    loadContent();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Setup contact form
    setupContactForm();
});

// Initialize the site
function initSite() {
    console.log('Laurea layout initialized');
}

// Initialize countdown timer
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    const ceremonyDate = localStorage.getItem('ceremonyDate');
    
    if (!ceremonyDate) {
        countdownElement.style.display = 'none';
        return;
    }
    
    const targetDate = new Date(ceremonyDate).getTime();
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        // If countdown is over
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<h3>La cerimonia è iniziata!</h3>';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Load content from localStorage
function loadContent() {
    // Load site name and logo
    const siteName = localStorage.getItem('siteName') || 'Laurea';
    document.getElementById('siteName').textContent = siteName;
    
    const logoType = localStorage.getItem('logoType');
    const logoText = localStorage.getItem('logoText') || 'L';
    const logoImage = localStorage.getItem('logoImage');
    
    const siteLogo = document.getElementById('siteLogo');
    const footerLogo = document.getElementById('footerLogo');
    
    if (logoType === 'image' && logoImage) {
        siteLogo.innerHTML = `<img src="${logoImage}" alt="${siteName}">`;
        footerLogo.innerHTML = `<img src="${logoImage}" alt="${siteName}">`;
    } else {
        siteLogo.textContent = logoText;
        footerLogo.textContent = logoText;
    }
    
    // Load hero section
    document.getElementById('heroTitle').textContent = localStorage.getItem('heroTitle') || 'Laurea Magistrale';
    document.getElementById('heroSubtitle').textContent = localStorage.getItem('heroSubtitle') || 'Celebrazione del percorso accademico';
    
    const heroImage = localStorage.getItem('heroImage');
    if (heroImage) {
        document.getElementById('heroBackground').style.backgroundImage = `url('${heroImage}')`;
    }
    
    // Load graduate information
    document.getElementById('graduateName').textContent = localStorage.getItem('graduateName') || 'Nome Cognome';
    document.getElementById('graduateUniversity').textContent = localStorage.getItem('graduateUniversity') || 'Nome Università';
    document.getElementById('graduateCourse').textContent = localStorage.getItem('graduateCourse') || 'Corso di Laurea';
    document.getElementById('graduateDate').textContent = localStorage.getItem('graduateDate') || 'DD/MM/YYYY';
    document.getElementById('graduateGrade').textContent = localStorage.getItem('graduateGrade') || '110/110';
    
    const graduateImage = localStorage.getItem('graduateImage');
    if (graduateImage) {
        document.getElementById('graduateImage').innerHTML = `<img src="${graduateImage}" alt="Il Laureato">`;
    }
    
    // Load thesis information
    document.getElementById('thesisTopic').textContent = localStorage.getItem('thesisTopic') || 'Titolo della Tesi';
    document.getElementById('thesisAbstract').textContent = localStorage.getItem('thesisAbstract') || 'Abstract della tesi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
    document.getElementById('thesisSupervisor').textContent = localStorage.getItem('thesisSupervisor') || 'Prof. Nome Cognome';
    document.getElementById('thesisCoSupervisor').textContent = localStorage.getItem('thesisCoSupervisor') || 'Prof. Nome Cognome';
    
    // Load gallery images
    loadGalleryImages();
    
    // Load thanks text
    const thanksText = localStorage.getItem('thanksText');
    if (thanksText) {
        document.getElementById('thanksText').innerHTML = `<p>${thanksText}</p>`;
    }
    
    // Load ceremony information
    document.getElementById('ceremonyLocation').textContent = localStorage.getItem('ceremonyLocation') || 'Aula Magna - Università';
    document.getElementById('ceremonyAddress').textContent = localStorage.getItem('ceremonyAddress') || 'Via dell\'Università, 123 - Città';
    document.getElementById('ceremonyDateTime').textContent = localStorage.getItem('ceremonyDateTime') || 'DD/MM/YYYY - Ore HH:MM';
    document.getElementById('ceremonyDate').textContent = localStorage.getItem('ceremonyDate') || 'DD/MM/YYYY';
    document.getElementById('ceremonyTime').textContent = localStorage.getItem('ceremonyTime') || 'Ore HH:MM';
    
    // Load contact information
    document.getElementById('contactName').textContent = localStorage.getItem('contactName') || 'Nome Cognome';
    document.getElementById('contactEmail').textContent = localStorage.getItem('contactEmail') || 'email@example.com';
    document.getElementById('contactPhone').textContent = localStorage.getItem('contactPhone') || '+39 123 456 7890';
    
    // Load footer text
    document.getElementById('footerText').textContent = localStorage.getItem('footerText') || 'Celebrazione del percorso accademico';
    
    // Apply color theme
    applyColorTheme();
}

// Load gallery images from localStorage
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    
    if (galleryImages.length === 0) {
        galleryGrid.innerHTML = `
            <div class="gallery-item empty">
                <i class="fas fa-plus"></i>
                <p>Aggiungi immagini dalla sezione admin</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = '';
    galleryImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${image}" alt="Galleria immagine">`;
        galleryGrid.appendChild(galleryItem);
    });
}

// Apply color theme from localStorage
function applyColorTheme() {
    const primaryColor = localStorage.getItem('primaryColor') || '#1e3a5f';
    const secondaryColor = localStorage.getItem('secondaryColor') || '#d4af37';
    
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('messageForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senderName = document.getElementById('senderName').value;
        const senderEmail = document.getElementById('senderEmail').value;
        const senderMessage = document.getElementById('senderMessage').value;
        
        // In a real implementation, you would send this data to a server
        // For now, we'll just show a success message and reset the form
        alert(`Grazie ${senderName}! Il tuo messaggio è stato inviato con successo.`);
        
        contactForm.reset();
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});