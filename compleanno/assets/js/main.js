// Inizializzazione del layout Compleanno
document.addEventListener('DOMContentLoaded', function() {
    // Carica i dati dal localStorage
    loadBirthdayData();
    
    // Inizializza il countdown
    initCountdown();
    
    // Inizializza le animazioni
    initAnimations();
    
    // Gestione del form RSVP
    initRSVPForm();
    
    // Crea palloncini animati
    createBalloons();
});

// Carica i dati del compleanno dal localStorage
function loadBirthdayData() {
    // Dati di esempio - sostituire con dati reali dal sistema admin
    const birthdayData = {
        heroTitle: "Buon Compleanno Marco!",
        heroSubtitle: "Festeggiamo insieme i tuoi 30 anni",
        festeggiatoNome: "Marco Rossi",
        festeggiatoEta: "30",
        festeggiatoData: "15 Settembre 1993",
        festeggiatoSegno: "Vergine",
        festeggiatoPassioni: "Viaggi, Musica, Cucina, Fotografia",
        festeggiatoDescrizione: "Una persona solare e positiva che ama la vita e le avventure. Sempre pronto a sorridere e a rendere speciale ogni momento.",
        festaData: "Sabato, 15 Settembre 2023",
        festaOra: "Dalle 18:00 in poi",
        festaLuogo: "Villa dei Fiori",
        festaIndirizzo: "Via delle Rose 123, Milano",
        festaDresscode: "Festivo e Colorato",
        festaTema: "Anni '80",
        festaDescrizione: "Una serata indimenticabile piena di sorprese, musica, balli e tante risate! Preparatevi a festeggiare in grande stile con un tema anni '80 che ci riporterà indietro nel tempo. Ci saranno giochi, musica dal vivo e una torta speciale che non dimenticherete facilmente!",
        regaloPreferito: "Un buono per un corso di cucina italiana! Ho sempre voluto imparare a fare la pasta fatta in casa come la faceva mia nonna.",
        ringraziamentiTesto: "Un enorme grazie a tutti coloro che hanno reso possibile questa giornata speciale. In particolare, vorrei ringraziare:",
        mappaLuogo: "Villa dei Fiori",
        mappaIndirizzo: "Via delle Rose 123, Milano",
        mappaIstruzioni: "Parcheggio disponibile all'interno della struttura. La villa si trova a 10 minuti a piedi dalla stazione centrale.",
        rsvpScadenza: "10 Settembre 2023",
        contattoTelefono: "+39 123 456 7890",
        contattoEmail: "compleanno@example.com",
        contattoReferente: "Maria - Organizzatrice"
    };

    // Carica i dati dal localStorage se disponibili
    const savedData = localStorage.getItem('birthdayData');
    const data = savedData ? JSON.parse(savedData) : birthdayData;

    // Popola i contenuti della pagina
    document.getElementById('hero-title').textContent = data.heroTitle;
    document.getElementById('hero-subtitle').textContent = data.heroSubtitle;
    document.getElementById('festeggiato-nome').textContent = data.festeggiatoNome;
    document.getElementById('festeggiato-eta').textContent = data.festeggiatoEta;
    document.getElementById('age-badge').textContent = data.festeggiatoEta;
    document.getElementById('festeggiato-data').textContent = data.festeggiatoData;
    document.getElementById('festeggiato-segno').textContent = data.festeggiatoSegno;
    document.getElementById('festeggiato-passioni').textContent = data.festeggiatoPassioni;
    document.getElementById('festeggiato-descrizione').textContent = data.festeggiatoDescrizione;
    document.getElementById('festa-data').textContent = data.festaData;
    document.getElementById('festa-ora').textContent = data.festaOra;
    document.getElementById('festa-luogo').textContent = data.festaLuogo;
    document.getElementById('festa-indirizzo').textContent = data.festaIndirizzo;
    document.getElementById('festa-dresscode').textContent = data.festaDresscode;
    document.getElementById('festa-tema').textContent = data.festaTema;
    document.getElementById('festa-descrizione-testo').textContent = data.festaDescrizione;
    document.getElementById('regalo-preferito-testo').textContent = data.regaloPreferito;
    document.getElementById('ringraziamenti-testo').textContent = data.ringraziamentiTesto;
    document.getElementById('mappa-luogo').textContent = data.mappaLuogo;
    document.getElementById('mappa-indirizzo').textContent = data.mappaIndirizzo;
    document.getElementById('mappa-istruzioni').textContent = data.mappaIstruzioni;
    document.getElementById('rsvp-scadenza').textContent = data.rsvpScadenza;
    document.getElementById('contatto-telefono').textContent = data.contattoTelefono;
    document.getElementById('contatto-email').textContent = data.contattoEmail;
    document.getElementById('contatto-referente').textContent = data.contattoReferente;
}

// Inizializza il countdown
function initCountdown() {
    // Imposta la data del compleanno (formato: YYYY-MM-DD)
    const birthdayDate = new Date('2023-09-15T18:00:00');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate.getTime() - now;
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "<div class='countdown-finished'>La festa è iniziata!</div>";
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
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inizializza le animazioni
function initAnimations() {
    // Animazione di apparizione degli elementi al scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Osserva tutti gli elementi con la classe 'animate-on-scroll'
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Aggiungi stili CSS per l'animazione
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Crea palloncini animati
function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons');
    const colors = ['#FF6B6B', '#FFD93D', '#6B5B95', '#4ECDC4', '#45B7D1', '#FFA07A'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        
        // Posizione casuale
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        balloon.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 20}px;
            height: ${25 + Math.random() * 25}px;
            background: ${color};
            border-radius: 50%;
            left: ${left}%;
            animation: float ${duration}s infinite linear;
            animation-delay: ${delay}s;
            opacity: 0;
        `;
        
        balloonsContainer.appendChild(balloon);
    }
}

// Inizializza il form RSVP
function initRSVPForm() {
    const form = document.getElementById('form-rsvp');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Raccogli i dati del form
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            partecipazione: document.getElementById('partecipazione').value,
            ospiti: document.getElementById('ospiti').value,
            messaggio: document.getElementById('messaggio').value,
            dataInvio: new Date().toISOString()
        };
        
        // Salva i dati nel localStorage
        saveRSVPData(formData);
        
        // Mostra conferma
        showConfirmation(formData);
        
        // Resetta il form
        form.reset();
    });
}

// Salva i dati RSVP nel localStorage
function saveRSVPData(formData) {
    let rsvpList = JSON.parse(localStorage.getItem('birthdayRSVP')) || [];
    rsvpList.push(formData);
    localStorage.setItem('birthdayRSVP', JSON.stringify(rsvpList));
}

// Mostra conferma dell'invio
function showConfirmation(formData) {
    // Crea elemento di conferma
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation-message';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <h3>Grazie ${formData.nome}!</h3>
            <p>La tua conferma è stata inviata con successo.</p>
            <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Chiudi</button>
        </div>
    `;
    
    // Stili per la conferma
    confirmation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const content = confirmation.querySelector('.confirmation-content');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    content.querySelector('i').style.cssText = `
        color: #4CAF50;
        font-size: 4rem;
        margin-bottom: 20px;
    `;
    
    content.querySelector('h3').style.cssText = `
        color: #2C3E50;
        margin-bottom: 10px;
    `;
    
    content.querySelector('p').style.cssText = `
        margin-bottom: 20px;
        color: #666;
    `;
    
    document.body.appendChild(confirmation);
    
    // Rimuovi automaticamente dopo 5 secondi
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 5000);
}

// Funzione per aggiornare i dati dal pannello admin
function updateBirthdayData(newData) {
    localStorage.setItem('birthdayData', JSON.stringify(newData));
    loadBirthdayData(); // Ricarica i dati
}

// Esporta funzioni per uso globale
window.updateBirthdayData = updateBirthdayData;