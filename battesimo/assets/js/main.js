// Main JavaScript for Baptism Layout
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the site
    initSite();
    
    // Load configuration from localStorage
    loadSiteConfiguration();
    
    // Initialize countdown
    initCountdown();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize map functionality
    initMap();
});

// Initialize the site
function initSite() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Load site configuration from localStorage
function loadSiteConfiguration() {
    // Load basic site info
    const siteName = localStorage.getItem('siteName');
    if (siteName) {
        document.title = siteName + ' - Battesimo';
        document.getElementById('siteName').textContent = siteName;
        document.getElementById('footerSiteName').textContent = siteName;
    }
    
    // Load layout
    const siteLayout = localStorage.getItem('siteLayout');
    if (siteLayout) {
        document.body.className = `layout-${siteLayout}`;
    }
    
    // Update all site elements
    updateSiteLogo();
    updateSiteTexts();
    updateHeroImage();
    updateGalleryImages();
    updateBaptismSpecificContent();
}

// Update site logo
function updateSiteLogo() {
    const logoType = localStorage.getItem('siteLogoType');
    const siteLogoElement = document.getElementById('siteLogo');
    
    if (logoType === 'text') {
        const logoText = localStorage.getItem('siteLogoText');
        if (logoText) {
            document.getElementById('siteName').textContent = logoText;
        }
    } else if (logoType === 'image') {
        const logoImage = localStorage.getItem('siteLogoImage');
        if (logoImage) {
            // Replace text logo with image
            siteLogoElement.innerHTML = `<img src="${logoImage}" alt="Logo" class="logo-image">`;
            siteLogoElement.classList.add('logo-image');
        }
    } else {
        // Default to site name
        const siteName = localStorage.getItem('siteName');
        if (siteName) {
            document.getElementById('siteName').textContent = siteName;
        }
    }
}

// Update all text content
function updateSiteTexts() {
    const heroTitle = localStorage.getItem('heroTitle');
    const heroSubtitle = localStorage.getItem('heroSubtitle');
    const footerText = localStorage.getItem('footerText');
    
    if (heroTitle) document.getElementById('heroTitle').innerHTML = heroTitle;
    if (heroSubtitle) document.getElementById('heroSubtitle').textContent = heroSubtitle;
    if (footerText) document.getElementById('footerText').textContent = footerText;
}

// Update hero image
function updateHeroImage() {
    const heroImage = localStorage.getItem('heroImage');
    if (heroImage) {
        document.querySelector('.hero').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${heroImage}')`;
    }
}

// Update gallery images
function updateGalleryImages() {
    const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    const galleryElement = document.getElementById('imageGallery');
    
    galleryElement.innerHTML = '';
    
    galleryImages.forEach(imageSrc => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${imageSrc}" alt="Galleria">`;
        galleryElement.appendChild(galleryItem);
    });
}

// Update baptism-specific content
function updateBaptismSpecificContent() {
    // Battezzato info
    const battezzatoNome = localStorage.getItem('battezzatoNome');
    const battezzatoNascita = localStorage.getItem('battezzatoNascita');
    const battezzatoPeso = localStorage.getItem('battezzatoPeso');
    const battezzatoLunghezza = localStorage.getItem('battezzatoLunghezza');
    const battezzatoOra = localStorage.getItem('battezzatoOra');
    const battezzatoDescrizione = localStorage.getItem('battezzatoDescrizione');
    const battezzatoPhoto = localStorage.getItem('battezzatoPhoto');
    
    if (battezzatoNome) document.getElementById('battezzatoNome').textContent = battezzatoNome;
    if (battezzatoNascita) document.getElementById('battezzatoNascita').textContent = battezzatoNascita;
    if (battezzatoPeso) document.getElementById('battezzatoPeso').textContent = battezzatoPeso;
    if (battezzatoLunghezza) document.getElementById('battezzatoLunghezza').textContent = battezzatoLunghezza;
    if (battezzatoOra) document.getElementById('battezzatoOra').textContent = battezzatoOra;
    if (battezzatoDescrizione) document.getElementById('battezzatoDescrizione').textContent = battezzatoDescrizione;
    if (battezzatoPhoto) document.getElementById('battezzatoPhoto').src = battezzatoPhoto;
    
    // Cerimonia info
    const cerimoniaData = localStorage.getItem('cerimoniaData');
    const cerimoniaOra = localStorage.getItem('cerimoniaOra');
    const cerimoniaChiesa = localStorage.getItem('cerimoniaChiesa');
    const cerimoniaIndirizzo = localStorage.getItem('cerimoniaIndirizzo');
    const cerimoniaCelebrante = localStorage.getItem('cerimoniaCelebrante');
    const ricevimentoLuogo = localStorage.getItem('ricevimentoLuogo');
    const ricevimentoIndirizzo = localStorage.getItem('ricevimentoIndirizzo');
    const cerimoniaNote = localStorage.getItem('cerimoniaNote');
    
    if (cerimoniaData) document.getElementById('cerimoniaData').textContent = cerimoniaData;
    if (cerimoniaOra) document.getElementById('cerimoniaOra').textContent = cerimoniaOra;
    if (cerimoniaChiesa) document.getElementById('cerimoniaChiesa').textContent = cerimoniaChiesa;
    if (cerimoniaIndirizzo) document.getElementById('cerimoniaIndirizzo').textContent = cerimoniaIndirizzo;
    if (cerimoniaCelebrante) document.getElementById('cerimoniaCelebrante').textContent = cerimoniaCelebrante;
    if (ricevimentoLuogo) document.getElementById('ricevimentoLuogo').textContent = ricevimentoLuogo;
    if (ricevimentoIndirizzo) document.getElementById('ricevimentoIndirizzo').textContent = ricevimentoIndirizzo;
    if (cerimoniaNote) document.getElementById('cerimoniaNote').textContent = cerimoniaNote;
    
    // Padrini info
    const padrinoNome = localStorage.getItem('padrinoNome');
    const padrinoRelazione = localStorage.getItem('padrinoRelazione');
    const padrinoMessaggio = localStorage.getItem('padrinoMessaggio');
    const padrinoPhoto = localStorage.getItem('padrinoPhoto');
    const madrinaNome = localStorage.getItem('madrinaNome');
    const madrinaRelazione = localStorage.getItem('madrinaRelazione');
    const madrinaMessaggio = localStorage.getItem('madrinaMessaggio');
    const madrinaPhoto = localStorage.getItem('madrinaPhoto');
    
    if (padrinoNome) document.getElementById('padrinoNome').textContent = padrinoNome;
    if (padrinoRelazione) document.getElementById('padrinoRelazione').textContent = padrinoRelazione;
    if (padrinoMessaggio) document.getElementById('padrinoMessaggio').textContent = padrinoMessaggio;
    if (padrinoPhoto) document.getElementById('padrinoPhoto').src = padrinoPhoto;
    if (madrinaNome) document.getElementById('madrinaNome').textContent = madrinaNome;
    if (madrinaRelazione) document.getElementById('madrinaRelazione').textContent = madrinaRelazione;
    if (madrinaMessaggio) document.getElementById('madrinaMessaggio').textContent = madrinaMessaggio;
    if (madrinaPhoto) document.getElementById('madrinaPhoto').src = madrinaPhoto;
    
    // Ringraziamenti
    const ringraziamentiTesto = localStorage.getItem('ringraziamentiTesto');
    const ringraziamentiFirma = localStorage.getItem('ringraziamentiFirma');
    
    if (ringraziamentiTesto) document.getElementById('ringraziamentiTesto').textContent = ringraziamentiTesto;
    if (ringraziamentiFirma) document.getElementById('ringraziamentiFirma').innerHTML = ringraziamentiFirma;
    
    // Mappa info
    const mappaChiesaNome = localStorage.getItem('mappaChiesaNome');
    const mappaChiesaIndirizzo = localStorage.getItem('mappaChiesaIndirizzo');
    const mappaRicevimentoNome = localStorage.getItem('mappaRicevimentoNome');
    const mappaRicevimentoIndirizzo = localStorage.getItem('mappaRicevimentoIndirizzo');
    
    if (mappaChiesaNome) document.getElementById('mappaChiesaNome').textContent = mappaChiesaNome;
    if (mappaChiesaIndirizzo) document.getElementById('mappaChiesaIndirizzo').textContent = mappaChiesaIndirizzo;
    if (mappaRicevimentoNome) document.getElementById('mappaRicevimentoNome').textContent = mappaRicevimentoNome;
    if (mappaRicevimentoIndirizzo) document.getElementById('mappaRicevimentoIndirizzo').textContent = mappaRicevimentoIndirizzo;
    
    // Contatti
    const contattoNome1 = localStorage.getItem('contattoNome1');
    const contattoTelefono1 = localStorage.getItem('contattoTelefono1');
    const contattoNome2 = localStorage.getItem('contattoNome2');
    const contattoTelefono2 = localStorage.getItem('contattoTelefono2');
    const contattoEmail = localStorage.getItem('contattoEmail');
    
    if (contattoNome1) document.getElementById('contattoNome1').textContent = contattoNome1;
    if (contattoTelefono1) document.getElementById('contattoTelefono1').textContent = contattoTelefono1;
    if (contattoNome2) document.getElementById('contattoNome2').textContent = contattoNome2;
    if (contattoTelefono2) document.getElementById('contattoTelefono2').textContent = contattoTelefono2;
    if (contattoEmail) document.getElementById('contattoEmail').textContent = contattoEmail;
}

// Initialize countdown
function initCountdown() {
    const countdownDate = localStorage.getItem('cerimoniaDataCountdown');
    
    if (!countdownDate) {
        // Default to 30 days from now if no date is set
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 30);
        localStorage.setItem('cerimoniaDataCountdown', defaultDate.toISOString());
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const countdownDate = new Date(localStorage.getItem('cerimoniaDataCountdown')).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<div class="countdown-finished">La cerimonia è già avvenuta!</div>';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Grazie per il tuo messaggio! Ti risponderemo al più presto.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
}

// Initialize smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize map functionality
function initMap() {
    const direzioniChiesaBtn = document.getElementById('direzioniChiesaBtn');
    const direzioniRicevimentoBtn = document.getElementById('direzioniRicevimentoBtn');
    
    if (direzioniChiesaBtn) {
        direzioniChiesaBtn.addEventListener('click', function() {
            const chiesaIndirizzo = document.getElementById('mappaChiesaIndirizzo').textContent;
            if (chiesaIndirizzo && chiesaIndirizzo !== '[Indirizzo della chiesa]') {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(chiesaIndirizzo)}`, '_blank');
            } else {
                alert('Indirizzo della chiesa non disponibile');
            }
        });
    }
    
    if (direzioniRicevimentoBtn) {
        direzioniRicevimentoBtn.addEventListener('click', function() {
            const ricevimentoIndirizzo = document.getElementById('mappaRicevimentoIndirizzo').textContent;
            if (ricevimentoIndirizzo && ricevimentoIndirizzo !== '[Indirizzo del ricevimento]') {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ricevimentoIndirizzo)}`, '_blank');
            } else {
                alert('Indirizzo del ricevimento non disponibile');
            }
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});