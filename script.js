// Ilana Ichie Cosmetics - JavaScript
// כל הפונקציות הדינמיות לאתר

// חכה עד שהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ilana Ichie Cosmetics - אתר קוסמטיקה מקצועית נטען');
    
    // אתחול כל הפונקציות
    initNavigation();
    initGallery();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
    
    // טען אירועי לחיצה לתמונות בגלריה
    setTimeout(initImageClickEvents, 1000);
});

// פונקציות אתחול
function initNavigation() {
    // ניווט חלק לקישורים פנימיים
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // דלג אם זה קישור ריק או לקישור חיצוני
            if (href === '#' || href.includes('tel:') || href.includes('mailto:') || href.includes('whatsapp')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // אם זה קישור לגלריה - הצג את הגלריה המלאה
                if (targetId === '#gallery') {
                    const galleryLoaded = document.getElementById('fullGallery').classList.contains('active');
                    if (!galleryLoaded) {
                        showGallery();
                        return;
                    }
                }
                
                // גלול למטרה עם התחשבות בכותרת קבועה
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // סגור תפריט ניווט במובייל אם פתוח
                if (window.innerWidth <= 768) {
                    document.querySelector('.nav').classList.remove('active');
                }
            }
        });
    });
}

function initGallery() {
    console.log('מאתחל גלריה עם 137 תמונות');
}

function initImageClickEvents() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            showImageModal(this.src, this.alt || `תמונה ${index + 1}`);
        });
        
        // הוסף אפקט hover לתמונות
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> נשלח בהצלחה!';
                button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

function initMobileMenu() {
    // אפשר להוסיף תפריט מובייל אם צריך
}

// פונקציה להצגת הגלריה המלאה
function showGallery() {
    // הסתר את התצוגה המקדימה
    document.getElementById('galleryPreview').style.display = 'none';
    
    // הצג את הגלריה המלאה
    document.getElementById('fullGallery').classList.add('active');
    
    // הצג את מונה התמונות
    document.getElementById('galleryCounter').classList.add('active');
    
    // גלול לגלריה
    document.getElementById('fullGallery').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // הוסף אירועי לחיצה לתמונות
    setTimeout(initImageClickEvents, 500);
}

// פונקציה להצגת תמונה מוגדלת במודל
function showImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalInfo = document.getElementById('modalInfo');
    
    // הצג את המודל עם אנימציה
    modal.classList.add('active');
    
    // הגדר את מקור התמונה
    modalImg.src = src;
    modalImg.alt = alt;
    
    // הוסף מידע על התמונה
    modalInfo.textContent = alt;
    
    // סגירה בלחיצה על X
    document.querySelector('.close-modal').onclick = function() {
        modal.classList.remove('active');
    }
    
    // סגירה בלחיצה מחוץ לתמונה
    modal.onclick = function(e) {
        if (e.target === modal || e.target.classList.contains('image-modal-content')) {
            modal.classList.remove('active');
        }
    }
    
    // סגירה עם מקש Escape
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // אפשרות ניווט עם מקשי חצים
    document.addEventListener('keydown', function navigateImages(e) {
        if (!modal.classList.contains('active')) return;
        
        const galleryItems = document.querySelectorAll('.gallery-item img');
        const currentIndex = Array.from(galleryItems).findIndex(img => img.src === src);
        
        if (e.key === 'ArrowRight' && currentIndex > 0) {
            // תמונה קודמת
            const prevImg = galleryItems[currentIndex - 1];
            modalImg.src = prevImg.src;
            modalImg.alt = prevImg.alt;
            modalInfo.textContent = prevImg.alt;
        }
        
        if (e.key === 'ArrowLeft' && currentIndex < galleryItems.length - 1) {
            // תמונה הבאה
            const nextImg = galleryItems[currentIndex + 1];
            modalImg.src = nextImg.src;
            modalImg.alt = nextImg.alt;
            modalInfo.textContent = nextImg.alt;
        }
    });
}

// WhatsApp click tracking
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp clicked from: ' + this.closest('section')?.id || 'unknown');
    });
});

// טען אוטומטית את אירועי התמונות כשהדף נטען
document.addEventListener('DOMContentLoaded', function() {
    // המתן שהדף יטען לחלוטין
    setTimeout(() => {
        initImageClickEvents();
    }, 1000);
    
    // הוסף טעינה איטית לתמונות
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});