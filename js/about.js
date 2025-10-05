// Функции для страницы "О Ежане"
class AboutPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupImageEffects();
        this.setupStatsAnimation();
        this.setupInteractiveElements();
    }

    // Эффекты для изображения
    setupImageEffects() {
        const photo = document.getElementById('ezhan-photo');
        if (!photo) return;

        // Плавное случайное изменение фильтра
        let isAnimating = false;
        
        setInterval(() => {
            if (isAnimating) return;
            
            isAnimating = true;
            const filters = [
                'sepia(0.5) hue-rotate(280deg) contrast(1.2) brightness(1.05)',
                'sepia(0.3) hue-rotate(320deg) contrast(1.1) brightness(1.1)',
                'sepia(0.7) hue-rotate(200deg) contrast(1.3) brightness(0.95)',
                'grayscale(0.2) hue-rotate(350deg) contrast(1.2) brightness(1.02)'
            ];
            
            const randomFilter = filters[Math.floor(Math.random() * filters.length)];
            
            photo.style.transition = 'filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            photo.style.filter = randomFilter;
            
            setTimeout(() => {
                photo.style.transition = 'filter 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                photo.style.filter = 'sepia(0.5) hue-rotate(280deg) contrast(1.2)';
                
                setTimeout(() => {
                    isAnimating = false;
                }, 1500);
            }, 2500);
        }, 7000);
    }

    // Анимация статистики
    setupStatsAnimation() {
        const bars = document.querySelectorAll('.bar-fill');
        
        bars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.style.transition = 'width 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            bar.style.transitionDelay = `${index * 150}ms`;
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500 + index * 150);
        });

        // Плавная анимация чисел
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((number, index) => {
            setTimeout(() => {
                this.animateValue(number, 0, parseInt(number.textContent), 2500);
            }, 800 + index * 200);
        });
    }

    // Плавная анимация числовых значений
    animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            if (element.textContent === '∞') return;
            
            const value = Math.floor(easeOutQuart * (end - start) + start);
            element.textContent = value.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Интерактивные элементы
    setupInteractiveElements() {
        // Улучшенные клики по карточкам био
        document.querySelectorAll('.bio-card').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.98) rotate(0.5deg)';
                card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    card.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
                
                if (navigator.vibrate) navigator.vibrate(25);
            });
        });

        // Плавные ховер эффекты для спецификаций
        document.querySelectorAll('.spec-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.background = 'rgba(255, 51, 51, 0.15)';
                item.style.transform = 'translateX(12px) scale(1.02)';
                item.style.boxShadow = '0 8px 25px rgba(255, 51, 51, 0.15)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.background = 'rgba(255, 51, 51, 0.1)';
                item.style.transform = 'translateX(0) scale(1)';
                item.style.boxShadow = 'none';
            });
        });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new AboutPage();
});