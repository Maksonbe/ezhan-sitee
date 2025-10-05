// PWA для ЕЖАН СИСТЕМС
class EzhanPWA {
    constructor() {
        this.init();
    }

    init() {
        this.registerServiceWorker();
        this.setupOfflineDetection();
        this.addInstallPrompt();
    }

    // Регистрация Service Worker
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

    // Обнаружение оффлайн режима
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            NotificationManager.show('📱 Интернет подключен!', 'success');
        });

        window.addEventListener('offline', () => {
            NotificationManager.show('📴 Оффлайн режим! Дегенерация продолжается!', 'error');
        });
    }

    // Кнопка "Установить приложение"
    addInstallPrompt() {
        let deferredPrompt;
        const installBtn = document.createElement('button');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            installBtn.style.display = 'block';
            installBtn.innerHTML = '📱 УСТАНОВИТЬ ЕЖАНА';
            installBtn.className = 'btn btn-primary';
            installBtn.style.margin = '10px auto';
            installBtn.style.display = 'block';
            
            installBtn.addEventListener('click', () => {
                installBtn.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => {
                    deferredPrompt = null;
                });
            });

            // Добавляем кнопку в футер
            const footer = document.querySelector('.footer-content');
            if (footer) {
                footer.appendChild(installBtn);
            }
        });
    }
}

// Плавный запуск PWA
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new EzhanPWA();
    }, 500);
});