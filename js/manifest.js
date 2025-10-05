class ManifestPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupOathButton();
        this.setupArticleInteractions();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
    }

    // Плавная обработка клятвы
    setupOathButton() {
        const oathBtn = document.querySelector('.oath-btn');
        if (!oathBtn) return;

        if (sessionStorage.getItem('oathSworn') === 'true') {
            this.setOathSworn(oathBtn);
            return;
        }

        oathBtn.addEventListener('click', () => {
            if (oathBtn.classList.contains('sworn')) return;

            oathBtn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            oathBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                oathBtn.style.transform = 'scale(1)';
            }, 200);

            sessionStorage.setItem('oathSworn', 'true');
            this.setOathSworn(oathBtn);
            
            if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40]);
            NotificationManager.show('⚡ КЛЯТВА ПРИНЯТА! ТЕПЕРЬ ТЫ ДЕГЕНЕРАТ!', 'success');
        });
    }

    setOathSworn(button) {
        button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        button.classList.add('sworn');
        button.innerHTML = '⚡ КЛЯТВА ПРИНЯТА!';
        button.style.background = 'linear-gradient(135deg, var(--success-color), #00cc66)';
        button.style.color = '#000';
        button.style.cursor = 'not-allowed';
        button.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
        
        button.replaceWith(button.cloneNode(true));
        
        const oathText = document.querySelector('.oath-text');
        if (oathText) {
            oathText.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            oathText.innerHTML = `
                <p style="color: var(--success-color); font-weight: 600; font-size: 1.2rem;">КЛЯТВА ПРИНЯТА!</p>
                <p style="color: var(--text-primary); font-weight: 500;">ТЫ СТАЛ ОФИЦИАЛЬНЫМ ДЕГЕНЕРАТОМ</p>
                <p style="color: var(--text-secondary);">ПОЗДРАВЛЯЕМ С ОТСУТСТВИЕМ РАЗУМА!</p>
            `;
        }
    }

    // Плавная интерактивность статей
    setupArticleInteractions() {
        document.querySelectorAll('.article-card').forEach((card) => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(-6px) scale(1.02)';
                card.style.boxShadow = '0 15px 35px rgba(255, 51, 51, 0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });

            card.addEventListener('click', () => {
                card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
                
                if (navigator.vibrate) navigator.vibrate(15);
            });
        });

        // Плавные анимации законов
        document.querySelectorAll('.law-item').forEach((item) => {
            item.addEventListener('mouseenter', () => {
                item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.transform = 'translateX(8px) scale(1.02)';
                item.style.background = 'rgba(255, 51, 51, 0.12)';
                item.style.boxShadow = '0 5px 20px rgba(255, 51, 51, 0.15)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.transform = 'translateX(0) scale(1)';
                item.style.background = 'rgba(255, 51, 51, 0.05)';
                item.style.boxShadow = 'none';
            });
        });
    }

    // Плавные анимации при скролле
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.article-card, .law-item, .oath-section').forEach(element => {
            element.classList.add('pre-animate');
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px) scale(0.95)';
            observer.observe(element);
        });
    }

    // Плавные дополнительные интерактивные элементы
    setupInteractiveElements() {
        document.querySelectorAll('.article-number').forEach(number => {
            number.addEventListener('click', (e) => {
                e.stopPropagation();
                number.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                number.style.transform = 'scale(0.85)';
                setTimeout(() => {
                    number.style.transform = 'scale(1)';
                }, 200);
                
                if (navigator.vibrate) navigator.vibrate(8);
            });
        });
    }
}

// Плавная инициализация
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new ManifestPage();
    }, 200);
});

// Плавный PWA для ЕЖАН СИСТЕМС
class EzhanPWA {
    constructor() {
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupOfflineDetection();
        this.addInstallPrompt();
    }

    // Плавная регистрация Service Worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('🔄 Service Worker зарегистрирован:', registration);
                })
                .catch(error => {
                    console.log('❌ Ошибка Service Worker:', error);
                });
        }
    }

    // Плавное обнаружение оффлайн режима
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            setTimeout(() => {
                NotificationManager.show('📱 Интернет подключен!', 'success');
            }, 300);
        });

        window.addEventListener('offline', () => {
            NotificationManager.show('📴 Оффлайн режим! Дегенерация продолжается!', 'error');
        });
    }

    // Плавная кнопка "Установить приложение"
    addInstallPrompt() {
        let deferredPrompt;
        const installBtn = document.createElement('button');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            installBtn.style.display = 'block';
            installBtn.innerHTML = '📱 УСТАНОВИТЬ ЕЖАНА';
            installBtn.className = 'btn btn-primary';
            installBtn.style.margin = '15px auto';
            installBtn.style.display = 'block';
            installBtn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            installBtn.addEventListener('click', () => {
                installBtn.style.transform = 'scale(0.95)';
                installBtn.style.opacity = '0.8';
                setTimeout(() => {
                    installBtn.style.display = 'none';
                    deferredPrompt.prompt();
                    deferredPrompt.userChoice.then(() => {
                        deferredPrompt = null;
                    });
                }, 200);
            });

            const footer = document.querySelector('.footer-content');
            if (footer) {
                footer.appendChild(installBtn);
                
                setTimeout(() => {
                    installBtn.style.opacity = '0';
                    installBtn.style.transform = 'translateY(20px)';
                    installBtn.style.display = 'block';
                    
                    setTimeout(() => {
                        installBtn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        installBtn.style.opacity = '1';
                        installBtn.style.transform = 'translateY(0)';
                    }, 50);
                }, 1000);
            }
        });
    }
}