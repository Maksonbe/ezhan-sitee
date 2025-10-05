// PWA для ЕЖАН СИСТЕМС
class EzhanPWA {
    constructor() {
        this.init();
    }

    init() {
        console.log('🚀 Инициализация ЕЖАН PWA...');
        this.registerServiceWorker();
        this.setupOfflineDetection();
        this.addInstallPrompt();
    }

    // Регистрация Service Worker с правильным путем
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Используем правильный путь для GitHub Pages
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker зарегистрирован:', registration);
                    this.showNotification('🔄 ЕЖАН PWA активирован!', 'success');
                })
                .catch(error => {
                    console.log('❌ Ошибка Service Worker:', error);
                    this.showNotification('❌ Ошибка PWA', 'error');
                });
        } else {
            console.log('⚠️ Service Worker не поддерживается');
        }
    }

    // Обнаружение оффлайн режима
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            this.showNotification('📱 Интернет подключен!', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('📴 Оффлайн режим! Дегенерация продолжается!', 'error');
        });
    }

    // Кнопка "Установить приложение"
    addInstallPrompt() {
        let deferredPrompt;
        
        // Создаем кнопку установки
        const installBtn = document.createElement('button');
        installBtn.innerHTML = '📱 УСТАНОВИТЬ ЕЖАНА';
        installBtn.className = 'btn btn-primary';
        installBtn.style.margin = '10px auto';
        installBtn.style.display = 'none'; // Скрыта по умолчанию
        installBtn.id = 'install-btn';

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Показываем кнопку
            installBtn.style.display = 'block';
            
            installBtn.onclick = () => {
                installBtn.style.display = 'none';
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('✅ Пользователь установил приложение');
                    }
                    deferredPrompt = null;
                });
            };

            // Добавляем кнопку в подвал или другое место
            const footer = document.querySelector('footer') || document.querySelector('.footer') || document.body;
            footer.appendChild(installBtn);
        });
    }

    // Утилита для уведомлений
    showNotification(message, type = 'info') {
        // Создаем простое уведомление
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 15px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
        `;
        
        document.body.appendChild(notification);
        
        // Авто-удаление через 3 секунды
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Проверяем, что DOM загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EzhanPWA();
    });
} else {
    new EzhanPWA();
}