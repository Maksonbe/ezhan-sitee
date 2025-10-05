// PWA для ЕЖАН СИСТЕМС
console.log('🔄 Загрузка PWA скрипта...');

class EzhanPWA {
    constructor() {
        console.log('🚀 Конструктор EzhanPWA вызван');
        this.init();
    }

    init() {
        console.log('🎯 Инициализация ЕЖАН PWA...');
        this.checkEnvironment();
        this.setupOfflineDetection();
        // УБРАЛИ addInstallPrompt - кнопка установки не нужна
    }

    checkEnvironment() {
        const isLocalFile = window.location.protocol === 'file:';
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
        
        if (isLocalFile) {
            console.log('⚠️ Запуск в file:// режиме. Service Worker отключен.');
            return;
        }
        
        if (isLocalhost || window.location.protocol === 'https:') {
            this.registerServiceWorker();
        } else {
            console.log('⚠️ Неподдерживаемый протокол для Service Worker');
        }
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            console.log('🔧 Регистрируем Service Worker...');
            
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('✅ Service Worker зарегистрирован успешно:', registration);
                })
                .catch(error => {
                    console.log('❌ Ошибка регистрации Service Worker:', error);
                });
        }
    }

    setupOfflineDetection() {
        window.addEventListener('online', () => {
            console.log('📱 Онлайн статус: есть интернет');
        });

        window.addEventListener('offline', () => {
            console.log('📴 Оффлайн статус: нет интернета');
        });
    }
}

// Запуск когда DOM готов
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, запускаем PWA...');
    
    setTimeout(() => {
        window.ezhanPWA = new EzhanPWA();
    }, 1000);
});