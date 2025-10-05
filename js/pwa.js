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
        this.addInstallPrompt();
        this.forceShowInstallButton();
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
                    // УБРАНО УВЕДОМЛЕНИЕ АКТИВАЦИИ
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

    addInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('📱 Событие beforeinstallprompt сработало!');
            e.preventDefault();
            deferredPrompt = e;
            
            this.createInstallButton(deferredPrompt);
        });

        window.addEventListener('appinstalled', (evt) => {
            console.log('🎉 Приложение установлено!');
        });

        setTimeout(() => {
            if (!deferredPrompt) {
                console.log('ℹ️ beforeinstallprompt не сработал, показываем кнопку установки');
                this.createInstallButton();
            }
        }, 3000);
    }

    createInstallButton(deferredPrompt = null) {
        this.removeExistingButton();
        
        const installBtn = document.createElement('button');
        installBtn.id = 'ezhan-install-btn';
        installBtn.innerHTML = '📱 УСТАНОВИТЬ ЕЖАНА';
        installBtn.className = 'ezhan-install-btn';
        installBtn.style.cssText = `
            display: block !important;
            margin: 20px auto;
            padding: 15px 25px;
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;

        installBtn.onmouseover = () => {
            installBtn.style.transform = 'scale(1.05)';
            installBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        };
        
        installBtn.onmouseout = () => {
            installBtn.style.transform = 'scale(1)';
            installBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        };

        if (deferredPrompt) {
            installBtn.addEventListener('click', () => {
                console.log('🔄 Запуск установки...');
                installBtn.innerHTML = '⏳ УСТАНАВЛИВАЕМ...';
                installBtn.style.background = '#6c757d';
                installBtn.disabled = true;
                
                deferredPrompt.prompt();
                
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('✅ Пользователь принял установку');
                        installBtn.style.display = 'none';
                    } else {
                        console.log('❌ Пользователь отклонил установку');
                        installBtn.innerHTML = '📱 УСТАНОВИТЬ ЕЖАНА';
                        installBtn.style.background = 'linear-gradient(45deg, #FF6B6B, #4ECDC4)';
                        installBtn.disabled = false;
                    }
                    deferredPrompt = null;
                });
            });
        } else {
            installBtn.addEventListener('click', () => {
                this.showInstallInstructions();
            });
        }

        this.addButtonToPage(installBtn);
    }

    forceShowInstallButton() {
        setTimeout(() => {
            const existingBtn = document.getElementById('ezhan-install-btn');
            if (!existingBtn) {
                console.log('🛠️ Принудительно создаем кнопку установки');
                this.createInstallButton();
            }
        }, 5000);
    }

    showInstallInstructions() {
        const instructions = document.createElement('div');
        instructions.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(0,0,0,0.5);
                z-index: 10001;
                max-width: 400px;
                text-align: center;
            ">
                <h3>📱 Установка ЕЖАН СИСТЕМС</h3>
                <p><strong>Chrome/Edge:</strong> Меню → "Установить ЕЖАН СИСТЕМС"</p>
                <p><strong>Firefox:</strong> Меню → "Установить сайт"</p>
                <p><strong>Safari:</strong> Поделиться → "На экран «Домой»"</p>
                <button onclick="this.parentElement.remove()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Закрыть</button>
            </div>
        `;
        document.body.appendChild(instructions);
    }

    removeExistingButton() {
        const oldBtn = document.getElementById('ezhan-install-btn');
        if (oldBtn) oldBtn.remove();
    }

    addButtonToPage(button) {
        const locations = [
            document.querySelector('footer'),
            document.querySelector('.footer'),
            document.querySelector('main'),
            document.querySelector('.container'),
            document.querySelector('nav'),
            document.body
        ];

        for (let location of locations) {
            if (location) {
                location.appendChild(button);
                console.log('✅ Кнопка добавлена в:', location);
                return;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, запускаем PWA...');
    console.log('📍 Протокол:', window.location.protocol);
    console.log('📍 Хост:', window.location.hostname);
    
    setTimeout(() => {
        window.ezhanPWA = new EzhanPWA();
    }, 1000);
});

window.showEzhanInstall = function() {
    if (window.ezhanPWA) {
        window.ezhanPWA.createInstallButton();
    }
};