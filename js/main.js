// ЕЖАН СИСТЕМС - Главная страница с продвинутыми анимациями
class MainApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.setupButtonInteractions();
        this.setupHeaderEffects();
        this.setupSmartButtons();
        this.setupCardHoverEffects();
        this.setupAdvancedAnimations();
        this.setupPreloader();
        this.setupMobileTouchEffects();
    }

    // Плавная прокрутка
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Анимации при скролле
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.stat-card, .quote-card').forEach(card => {
            card.classList.add('pre-animate');
            observer.observe(card);
        });
    }

    // Интерактивность кнопок
    setupButtonInteractions() {
        document.querySelectorAll('.btn:not(.confirmed):not(.refused)').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }

    // Эффекты хедера
    setupHeaderEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const scrolled = window.scrollY;
            
            // Изменение фона
            if (scrolled > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--bg-dark)';
                header.style.backdropFilter = 'none';
            }
            
            lastScrollY = scrolled;
        });
    }

    // Умные кнопки с сессионным сохранением
    setupSmartButtons() {
        this.checkButtonStates();
        
        const confirmBtn = document.querySelector('.btn-primary');
        const refuseBtn = document.querySelector('.btn-secondary');

        if (confirmBtn && !confirmBtn.classList.contains('confirmed')) {
            confirmBtn.addEventListener('click', () => this.handleConfirmation(confirmBtn));
        }

        if (refuseBtn && !refuseBtn.classList.contains('refused')) {
            refuseBtn.addEventListener('click', () => this.handleMindRefusal(refuseBtn));
        }
    }

    handleConfirmation(button) {
        if (button.classList.contains('confirmed')) return;
        
        this.animateButtonPress(button);
        sessionStorage.setItem('degenerationConfirmed', 'true');
        this.setButtonConfirmed(button);
        
        // Вибрация
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        
        // Уведомление
        NotificationManager.show('💀 ДЕГЕНЕРАЦИЯ ПОДТВЕРЖДЕНА!', 'success');
    }

    handleMindRefusal(button) {
        if (button.classList.contains('refused')) return;
        
        this.animateButtonPress(button);
        sessionStorage.setItem('mindRefused', 'true');
        this.setButtonRefused(button);
        
        // Вибрация
        if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        
        // Случайные сообщения
        const messages = [
            {text: "🧠 РАЗУМ УСПЕШНО УДАЛЁН!", type: "error"},
            {text: "💀 МОЗГИ ОТСУТСТВУЮТ!", type: "error"},
            {text: "🤪 ТЕПЕРЬ ТЫ НАСТОЯЩИЙ ДЕГЕНЕРАТ!", type: "success"},
            {text: "🎉 ПОЗДРАВЛЯЕМ С ОТСУТСТВИЕМ РАЗУМА!", type: "success"}
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        NotificationManager.show(randomMessage.text, randomMessage.type);
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    checkButtonStates() {
        const confirmBtn = document.querySelector('.btn-primary');
        const refuseBtn = document.querySelector('.btn-secondary');
        
        if (sessionStorage.getItem('degenerationConfirmed') === 'true' && confirmBtn) {
            this.setButtonConfirmed(confirmBtn);
        }
        
        if (sessionStorage.getItem('mindRefused') === 'true' && refuseBtn) {
            this.setButtonRefused(refuseBtn);
        }
    }

    setButtonConfirmed(button) {
        button.classList.add('confirmed');
        button.innerHTML = '✅ ДЕГЕНЕРАЦИЯ ПОДТВЕРЖДЕНА';
        button.style.background = 'linear-gradient(135deg, var(--success-color), #00cc66)';
        button.style.color = '#000';
        button.style.border = 'none';
        button.style.cursor = 'not-allowed';
        button.style.fontWeight = '700';
        button.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3)';
        
        // Удаляем обработчик
        button.replaceWith(button.cloneNode(true));
    }

    setButtonRefused(button) {
        button.classList.add('refused');
        button.innerHTML = '🧠 РАЗУМ ОТКЛЮЧЕН';
        button.style.background = 'linear-gradient(135deg, #ff4444, #cc3333)';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.cursor = 'not-allowed';
        button.style.fontWeight = '700';
        button.style.boxShadow = '0 0 20px rgba(255, 68, 68, 0.3)';
        
        // Удаляем обработчик
        button.replaceWith(button.cloneNode(true));
    }

    // Эффекты при наведении на карточки
    setupCardHoverEffects() {
        document.querySelectorAll('.stat-card, .quote-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // ПРОДВИНУТЫЕ АНИМАЦИИ
    setupAdvancedAnimations() {
        this.createStarfield();
        this.setupRippleEffects();
        this.setupParticleSystem();
        this.setup3DCards();
        this.setupFireText();
    }

    // 1. Звёздное небо
    createStarfield() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        hero.classList.add('animated-bg');
        
        const stars = 50;
        for (let i = 0; i < stars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            Object.assign(star.style, {
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
            });
            hero.appendChild(star);
        }
    }

    // 2. Волновой эффект для кнопок
    setupRippleEffects() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.classList.contains('confirmed') || this.classList.contains('refused')) return;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                Object.assign(ripple.style, {
                    width: size + 'px',
                    height: size + 'px',
                    left: x + 'px',
                    top: y + 'px'
                });
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // 3. Система частиц
    setupParticleSystem() {
        document.querySelectorAll('.btn, .gallery-card, .stat-item, .quote-card, .bio-card, .article-card, .law-item, .stats-card, .nav-link, .spec-item').forEach(element => {
            // При клике - МНОГО частиц
            element.addEventListener('click', (e) => {
                this.createParticles(e.clientX, e.clientY, 25, 'click');
            });
            
            // При наведении - много частиц
            element.addEventListener('mouseenter', (e) => {
                this.createParticles(e.clientX, e.clientY, 15, 'hover');
            });

            // Для мобильных - касание
            element.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                this.createParticles(touch.clientX, touch.clientY, 20, 'touch');
            });
        });

        // Особые эффекты для заголовков
        document.querySelectorAll('.hero-title, .page-title, .section-title').forEach(title => {
            title.addEventListener('mouseenter', (e) => {
                const rect = title.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                this.createParticles(x, y, 30, 'title');
            });
        });
    }

    createParticles(x, y, count, type = 'default') {
        const colors = {
            click: ['#ff3333', '#ff6b35', '#ff9933', '#ff3333'],
            hover: ['#ff4444', '#ff5555', '#ff6666', '#ff3333'],
            touch: ['#ff3333', '#ff4444', '#ff5555'],
            title: ['#ff3333', '#ff6b35', '#ff9933', '#ffcc33', '#ffffff'],
            default: ['#ff3333', '#ff4444', '#ff5555']
        };

        const sizes = {
            click: { min: 3, max: 8 },
            hover: { min: 2, max: 6 },
            touch: { min: 3, max: 7 },
            title: { min: 4, max: 10 },
            default: { min: 2, max: 5 }
        };

        const speeds = {
            click: 100,
            hover: 80,
            touch: 90,
            title: 120,
            default: 70
        };

        const currentColors = colors[type] || colors.default;
        const currentSize = sizes[type] || sizes.default;
        const currentSpeed = speeds[type] || speeds.default;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Случайный угол и расстояние
            const angle = Math.random() * Math.PI * 2;
            const distance = currentSpeed + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            // Случайный размер
            const size = Math.random() * (currentSize.max - currentSize.min) + currentSize.min;
            
            // Случайный цвет из палитры
            const color = currentColors[Math.floor(Math.random() * currentColors.length)];
            
            // Случайная задержка анимации
            const delay = Math.random() * 0.5;
            
            // Случайная длительность анимации
            const duration = 1 + Math.random() * 1.5;
            
            Object.assign(particle.style, {
                '--tx': tx + 'px',
                '--ty': ty + 'px',
                left: x + 'px',
                top: y + 'px',
                background: color,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                boxShadow: `0 0 ${size * 2}px ${color}`
            });
            
            document.body.appendChild(particle);
            
            // Удаляем частицу после анимации
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, (duration + delay) * 1000);
        }

        // Вибрация для мобильных
        if (type === 'click' || type === 'touch') {
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    }

    createParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            Object.assign(particle.style, {
                '--tx': tx + 'px',
                '--ty': ty + 'px',
                left: x + 'px',
                top: y + 'px',
                background: `hsl(${Math.random() * 60 + 330}, 100%, 60%)`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                borderRadius: '50%'
            });
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }

    // 4. 3D карточки для галереи
    setup3DCards() {
        document.querySelectorAll('.gallery-card').forEach((card, index) => {
            card.classList.add('gallery-card-3d');
            
            // Создаем обратную сторону
            const back = document.createElement('div');
            back.className = 'gallery-card-back';
            back.innerHTML = `
                <h3>ПРОЁБ №${index + 1}</h3>
                <p>Уровень дегенерации: ${Math.floor(Math.random() * 100) + 900}</p>
                <p>Качество: ${Math.floor(Math.random() * 100)}%</p>
            `;
            
            card.appendChild(back);
            
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    // 5. Огненный текст
    setupFireText() {
        document.querySelectorAll('.hero-title, .page-title').forEach(title => {
            title.classList.add('fire-text');
        });
    }

    // Прелоадер
    setupPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        });
    }

    // ДОБАВИЛ НОВЫЙ МЕТОД ДЛЯ МОБИЛЬНЫХ ТАЧ-ЭФФЕКТОВ
    setupMobileTouchEffects() {
        // Для мобильных устройств добавляем touch-эффекты
        if ('ontouchstart' in window) {
            const touchElements = document.querySelectorAll(
                '.stat-item, .quote-card, .bio-card, .spec-item, .article-card, .law-item, .gallery-card, .stats-card'
            );
            
            touchElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 10px 20px rgba(255, 51, 51, 0.15)';
                    this.style.borderColor = 'var(--accent-red)';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '';
                    this.style.borderColor = '';
                });
            });

            // Особые эффекты для кнопок на мобильных
            document.querySelectorAll('.btn:not(.confirmed):not(.refused)').forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            });

            // Эффекты для навигации на мобильных
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('touchstart', function() {
                    this.style.color = 'var(--accent-red)';
                    this.style.textShadow = '0 0 10px rgba(255, 51, 51, 0.5)';
                });
                
                link.addEventListener('touchend', function() {
                    if (!this.classList.contains('active')) {
                        this.style.color = '';
                        this.style.textShadow = '';
                    }
                });
            });

            console.log('📱 Мобильные touch-эффекты активированы!');
        }
    }
}


// Менеджер уведомлений
class NotificationManager {
    static show(message, type = 'info') {
        // Удаляем старые уведомления
        document.querySelectorAll('.notification').forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Стили
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--bg-card)',
            color: type === 'success' ? 'var(--success-color)' : 'var(--accent-red)',
            padding: '1rem 1.5rem',
            border: `1px solid ${type === 'success' ? 'var(--success-color)' : 'var(--accent-red)'}`,
            borderRadius: '5px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Закрытие по клику
        notification.querySelector('.notification-close').onclick = () => {
            this.closeNotification(notification);
        };
        
        // Автоматическое закрытие
        setTimeout(() => {
            this.closeNotification(notification);
        }, 4000);
    }

    static closeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }
}

// Утилиты
class AppUtils {
    static resetButtons() {
        sessionStorage.removeItem('degenerationConfirmed');
        sessionStorage.removeItem('mindRefused');
        location.reload();
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new MainApp();
});


// Глобальные функции
window.resetButtons = AppUtils.resetButtons;

console.log('💀 ЕЖАН СИСТЕМС загружен!');
console.log('🎮 Для сброса кнопок введите: resetButtons()');
console.log('✨ Продвинутые анимации активированы!');

