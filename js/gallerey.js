// Функции для галереи
class GalleryPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupGalleryAnimations();
        this.setupImageInteractions();
        this.setupStatsEffects();
    }

    // Плавные анимации галереи
    setupGalleryAnimations() {
        const galleryCards = document.querySelectorAll('.gallery-card');
        
        galleryCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) scale(0.9) rotate(2deg)';
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            }, 200 + index * 120);
        });

        // Плавный наблюдатель для анимаций при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });

        galleryCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Плавное взаимодействие с изображениями
    setupImageInteractions() {
        document.querySelectorAll('.gallery-card').forEach(card => {
            const image = card.querySelector('.gallery-image');
            
            card.addEventListener('click', () => {
                this.animateCardClick(card);
            });

            // Улучшенные плавные ховер-эффекты
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(-15px) scale(1.05) rotate(-1deg)';
                card.style.boxShadow = '0 30px 60px rgba(255, 51, 51, 0.35)';
                
                if (image) {
                    image.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    image.style.transform = 'scale(1.12)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }

    // Плавная анимация клика по карточке
    animateCardClick(card) {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'scale(0.92) rotate(1deg)';
        
        setTimeout(() => {
            card.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
        
        if (navigator.vibrate) navigator.vibrate(35);
    }

    // Плавные эффекты для статистики
    setupStatsEffects() {
        const statsCards = document.querySelectorAll('.stats-card');
        
        statsCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 1000 + index * 180);

            // Плавные ховер эффекты
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(-8px) scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(255, 51, 51, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
}

// Плавная инициализация
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new GalleryPage();
    }, 200);
});