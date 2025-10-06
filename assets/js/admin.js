// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize admin panel
    initializeAdminPanel();
    
    // Event listeners
    setupEventListeners();
    
    // Load current data
    loadAdminData();
});

// Authentication system
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    const loginPage = document.getElementById('loginPage');
    const adminPanel = document.getElementById('adminPanel');
    
    if (!isAuthenticated) {
        loginPage.classList.remove('hidden');
        adminPanel.classList.add('hidden');
    } else {
        loginPage.classList.add('hidden');
        adminPanel.classList.remove('hidden');
    }
}

function login(username, password) {
    // Hardcoded credentials
    const validUsername = 'admin';
    const validPassword = 'admin';
    
    if (username === validUsername && password === validPassword) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        showNotification('Accesso effettuato con successo!', 'success');
        setTimeout(() => {
            checkAuthentication();
        }, 1000);
        return true;
    } else {
        showNotification('Credenziali non valide!', 'error');
        return false;
    }
}

function logout() {
    sessionStorage.removeItem('adminAuthenticated');
    showNotification('Logout effettuato', 'info');
    setTimeout(() => {
        checkAuthentication();
    }, 1000);
}

// Admin panel initialization
function initializeAdminPanel() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const adminSections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            adminSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// Event listeners setup
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Preview button
    document.getElementById('previewBtn').addEventListener('click', function() {
        window.open('index.html', '_blank');
    });
    
    // Logo type toggle
    document.getElementById('logoType').addEventListener('change', function() {
        toggleLogoType(this.value);
    });
    
    // Logo image preview
    document.getElementById('logoImage').addEventListener('change', function(e) {
        previewImage(e.target.files[0], 'logoPreview');
    });
    
    // Hero image preview
    document.getElementById('heroImage').addEventListener('change', function(e) {
        previewImage(e.target.files[0], 'heroImagePreview');
    });
    
    // Save buttons
    document.getElementById('saveLogo').addEventListener('click', saveLogo);
    document.getElementById('saveSiteInfo').addEventListener('click', saveSiteInfo);
    document.getElementById('saveAllTexts').addEventListener('click', saveAllTexts);
    document.getElementById('saveImages').addEventListener('click', saveImages);
    document.getElementById('saveLayout').addEventListener('click', saveLayout);
    
    // Layout selection
    const layoutOptions = document.querySelectorAll('.layout-option');
    layoutOptions.forEach(option => {
        option.addEventListener('click', function() {
            layoutOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Color customization
    document.getElementById('primaryColor').addEventListener('change', updateColorPreview);
    document.getElementById('secondaryColor').addEventListener('change', updateColorPreview);
    
    // Gallery images
    document.getElementById('galleryImages').addEventListener('change', function(e) {
        previewGalleryImages(e.target.files);
    });
    
    // Reset setup
    document.getElementById('resetSetup').addEventListener('click', function() {
        if (confirm('Sei sicuro di voler ripristinare completamente la configurazione? Tutti i dati verranno cancellati.')) {
            localStorage.clear();
            showNotification('Configurazione ripristinata', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    });
    
    // Export/Import configuration
    document.getElementById('exportConfig').addEventListener('click', exportConfiguration);
    document.getElementById('importConfigBtn').addEventListener('click', importConfiguration);
}

// Load current data into admin panel
function loadAdminData() {
    // Load site info
    const siteName = localStorage.getItem('siteName');
    if (siteName) {
        document.getElementById('siteName').value = siteName;
    }
    
    // Load logo settings
    const logoType = localStorage.getItem('siteLogoType') || 'text';
    document.getElementById('logoType').value = logoType;
    toggleLogoType(logoType);
    
    if (logoType === 'text') {
        const logoText = localStorage.getItem('siteLogoText');
        if (logoText) {
            document.getElementById('logoText').value = logoText;
        }
    } else {
        const logoImage = localStorage.getItem('siteLogoImage');
        if (logoImage) {
            document.getElementById('logoPreview').src = logoImage;
        }
    }
    
    // Load texts
    document.getElementById('heroTitleInput').value = localStorage.getItem('heroTitle') || '';
    document.getElementById('heroSubtitleInput').value = localStorage.getItem('heroSubtitle') || '';
    document.getElementById('aboutTitleInput').value = localStorage.getItem('aboutTitle') || '';
    document.getElementById('aboutTextInput').value = localStorage.getItem('aboutText') || '';
    document.getElementById('galleryTitleInput').value = localStorage.getItem('galleryTitle') || '';
    document.getElementById('footerTextInput').value = localStorage.getItem('footerText') || '';
    
    // Load layout
    const siteLayout = localStorage.getItem('siteLayout');
    if (siteLayout) {
        const layoutOption = document.querySelector(`.layout-option[data-layout="${siteLayout}"]`);
        if (layoutOption) {
            layoutOption.classList.add('selected');
        }
    }
    
    // Load colors
    const primaryColor = localStorage.getItem('primaryColor') || '#4a6fa5';
    const secondaryColor = localStorage.getItem('secondaryColor') || '#ff7e5f';
    document.getElementById('primaryColor').value = primaryColor;
    document.getElementById('secondaryColor').value = secondaryColor;
    
    // Load images
    const heroImage = localStorage.getItem('heroImage');
    if (heroImage) {
        document.getElementById('heroImagePreview').src = heroImage;
    }
    
    // Load gallery images
    updateGalleryPreview();
}

// Toggle logo type
function toggleLogoType(type) {
    const textGroup = document.getElementById('logoTextGroup');
    const imageGroup = document.getElementById('logoImageGroup');
    
    if (type === 'text') {
        textGroup.classList.remove('hidden');
        imageGroup.classList.add('hidden');
    } else {
        textGroup.classList.add('hidden');
        imageGroup.classList.remove('hidden');
    }
}

// Image preview function
function previewImage(file, previewElementId) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(previewElementId).src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Gallery images preview
function previewGalleryImages(files) {
    const galleryPreview = document.getElementById('galleryPreview');
    
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview';
            galleryPreview.appendChild(img);
        };
        reader.readAsDataURL(files[i]);
    }
}

// Update gallery preview from localStorage
function updateGalleryPreview() {
    const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    const galleryPreview = document.getElementById('galleryPreview');
    
    galleryPreview.innerHTML = '';
    
    galleryImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'image-preview';
        galleryPreview.appendChild(img);
    });
}

// Color preview update
function updateColorPreview() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    
    // Update CSS variables for preview
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
}

// Save functions
function saveLogo() {
    const logoType = document.getElementById('logoType').value;
    
    if (logoType === 'text') {
        const logoText = document.getElementById('logoText').value;
        if (logoText) {
            localStorage.setItem('siteLogoType', 'text');
            localStorage.setItem('siteLogoText', logoText);
            showNotification('Logo salvato con successo!', 'success');
        } else {
            showNotification('Inserisci un testo per il logo.', 'error');
        }
    } else {
        const logoFile = document.getElementById('logoImage').files[0];
        if (logoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('siteLogoType', 'image');
                localStorage.setItem('siteLogoImage', e.target.result);
                showNotification('Logo salvato con successo!', 'success');
            };
            reader.readAsDataURL(logoFile);
        } else {
            const existingLogo = localStorage.getItem('siteLogoImage');
            if (existingLogo) {
                showNotification('Logo mantenuto (nessuna nuova immagine selezionata)', 'info');
            } else {
                showNotification('Seleziona un\'immagine per il logo.', 'error');
            }
        }
    }
}

function saveSiteInfo() {
    const siteName = document.getElementById('siteName').value;
    
    if (siteName) {
        localStorage.setItem('siteName', siteName);
        showNotification('Informazioni sito salvate!', 'success');
    } else {
        showNotification('Inserisci un nome per il sito.', 'error');
    }
}

function saveAllTexts() {
    const heroTitle = document.getElementById('heroTitleInput').value;
    const heroSubtitle = document.getElementById('heroSubtitleInput').value;
    const aboutTitle = document.getElementById('aboutTitleInput').value;
    const aboutText = document.getElementById('aboutTextInput').value;
    const galleryTitle = document.getElementById('galleryTitleInput').value;
    const footerText = document.getElementById('footerTextInput').value;
    
    localStorage.setItem('heroTitle', heroTitle);
    localStorage.setItem('heroSubtitle', heroSubtitle);
    localStorage.setItem('aboutTitle', aboutTitle);
    localStorage.setItem('aboutText', aboutText);
    localStorage.setItem('galleryTitle', galleryTitle);
    localStorage.setItem('footerText', footerText);
    
    showNotification('Tutti i testi salvati con successo!', 'success');
}

function saveImages() {
    const heroImageFile = document.getElementById('heroImage').files[0];
    const galleryImageFiles = document.getElementById('galleryImages').files;
    
    let savedCount = 0;
    
    // Save hero image
    if (heroImageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('heroImage', e.target.result);
            savedCount++;
            checkSaveComplete(galleryImageFiles.length + savedCount);
        };
        reader.readAsDataURL(heroImageFile);
    } else {
        savedCount++;
        checkSaveComplete(galleryImageFiles.length + savedCount);
    }
    
    // Save gallery images
    if (galleryImageFiles.length > 0) {
        const galleryImages = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        
        for (let i = 0; i < galleryImageFiles.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                galleryImages.push(e.target.result);
                localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
                savedCount++;
                checkSaveComplete(galleryImageFiles.length + 1); // +1 for hero image
            };
            reader.readAsDataURL(galleryImageFiles[i]);
        }
    } else {
        savedCount += galleryImageFiles.length > 0 ? galleryImageFiles.length : 1;
        checkSaveComplete(savedCount);
    }
    
    if (galleryImageFiles.length === 0 && !heroImageFile) {
        showNotification('Nessuna nuova immagine selezionata.', 'info');
    }
}

function checkSaveComplete(expectedCount) {
    // This is a simplified version - in a real app you'd track each save operation
    setTimeout(() => {
        showNotification('Immagini salvate con successo!', 'success');
        updateGalleryPreview();
    }, 500);
}

function saveLayout() {
    // Save selected layout
    const selectedLayout = document.querySelector('.layout-option.selected');
    if (selectedLayout) {
        const layout = selectedLayout.dataset.layout;
        localStorage.setItem('siteLayout', layout);
    }
    
    // Save colors
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    localStorage.setItem('primaryColor', primaryColor);
    localStorage.setItem('secondaryColor', secondaryColor);
    
    showNotification('Layout salvato con successo!', 'success');
}

// Export/Import configuration
function exportConfiguration() {
    const config = {};
    
    // Get all localStorage items
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        config[key] = localStorage.getItem(key);
    }
    
    const configJson = JSON.stringify(config, null, 2);
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-configuration.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Configurazione esportata!', 'success');
}

function importConfiguration() {
    const fileInput = document.getElementById('importConfig');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Seleziona un file di configurazione.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const config = JSON.parse(e.target.result);
            
            // Clear current configuration
            localStorage.clear();
            
            // Import new configuration
            for (const key in config) {
                localStorage.setItem(key, config[key]);
            }
            
            showNotification('Configurazione importata con successo!', 'success');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            showNotification('Errore nell\'importazione del file.', 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}