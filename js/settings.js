// СИСТЕМА НАСТРОЕК ДЛЯ ЕЖАН СИСТЕМС - БЕЗ ЗВУКОВ
class EzhanSettings {
    constructor() {
        console.log('⚙️ Инициализация настроек Ежана...');
        this.settings = {
            theme: 'dark',
            sound: false, // ЗВУКИ ВЫКЛЮЧЕНЫ ПО УМОЛЧАНИЮ
            vibration: true,
            notifications: true
        };
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.loadSettings();
        this.createSettingsButton();
        this.createSettingsPanel();
        this.applyTheme(this.settings.theme);
        this.setupGlobalEventListeners();
        this.applyNotificationSettings();
        this.isInitialized = true;
        
        console.log('✅ Настройки Ежана загружены');
    }

    // 📥 ЗАГРУЗКА НАСТРОЕК
    loadSettings() {
        const saved = localStorage.getItem('ezhan-settings');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.settings = { ...this.settings, ...parsed };
            } catch (e) {
                console.error('❌ Ошибка загрузки настроек:', e);
            }
        }
        
        // Загружаем отдельные настройки для совместимости
        this.loadLegacySettings();
    }

    loadLegacySettings() {
        // Совместимость со старыми настройками
        if (localStorage.getItem('game-sound-enabled') !== null) {
            this.settings.sound = localStorage.getItem('game-sound-enabled') === 'true';
        }
        if (localStorage.getItem('game-vibration-enabled') !== null) {
            this.settings.vibration = localStorage.getItem('game-vibration-enabled') === 'true';
        }
        if (localStorage.getItem('game-notifications-enabled') !== null) {
            this.settings.notifications = localStorage.getItem('game-notifications-enabled') === 'true';
        }
    }

    // 💾 СОХРАНЕНИЕ НАСТРОЕК
    saveSettings() {
        try {
            localStorage.setItem('ezhan-settings', JSON.stringify(this.settings));
            
            // Сохраняем для совместимости
            localStorage.setItem('game-sound-enabled', this.settings.sound);
            localStorage.setItem('game-vibration-enabled', this.settings.vibration);
            localStorage.setItem('game-notifications-enabled', this.settings.notifications);
            
            console.log('💾 Настройки сохранены:', this.settings);
        } catch (e) {
            console.error('❌ Ошибка сохранения настроек:', e);
        }
    }

    // 🎨 СОЗДАНИЕ КНОПКИ НАСТРОЕК
    createSettingsButton() {
        if (document.getElementById('settings-btn')) return;

        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'settings-btn';
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.title = 'Настройки дегенерации';
        
        Object.assign(settingsBtn.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--accent-red)',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            zIndex: '10000',
            boxShadow: '0 4px 15px rgba(255, 51, 51, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'inherit'
        });

        settingsBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(90deg)';
            this.style.boxShadow = '0 6px 20px rgba(255, 51, 51, 0.5)';
        });

        settingsBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(255, 51, 51, 0.3)';
        });

        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettingsPanel();
            this.vibrate(30);
        });

        document.body.appendChild(settingsBtn);
    }

    // 🎛️ СОЗДАНИЕ ПАНЕЛИ НАСТРОЕК
    createSettingsPanel() {
        if (document.getElementById('settings-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'settings-panel';
        panel.className = 'settings-panel';
        
        panel.innerHTML = `
            <div class="settings-header">
                <h3>⚙️ НАСТРОЙКИ ДЕГЕНЕРАЦИИ</h3>
                <button class="settings-close" id="settings-close-btn">
                    <span>&times;</span>
                </button>
            </div>
            
            <div class="settings-content">
                <!-- Тема -->
                <div class="setting-group">
                    <label class="setting-label">🎨 ТЕМА ЕЖАНА</label>
                    <div class="theme-buttons">
                        <button class="theme-btn ${this.settings.theme === 'dark' ? 'active' : ''}" 
                                data-theme="dark">
                            👑 ЕБЛАН
                        </button>
                        <button class="theme-btn ${this.settings.theme === 'light' ? 'active' : ''}" 
                                data-theme="light">
                            💀 ДЕГЕНЕРАТ
                        </button>
                        <button class="theme-btn ${this.settings.theme === 'auto' ? 'active' : ''}" 
                                data-theme="auto">
                            🎲 АВТО
                        </button>
                    </div>
                </div>
                
                <div class="settings-divider"></div>
                
                <!-- Звук УБРАН -->
                
                <!-- Вибрация -->
                <div class="setting-group">
                    <div class="setting-row">
                        <label for="vibration-toggle" class="setting-label">📳 ВИБРАЦИЯ ПРОЁБОВ</label>
                        <label class="switch">
                            <input type="checkbox" id="vibration-toggle" ${this.settings.vibration ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="setting-description">Тактильная отдача при действиях в игре</div>
                </div>
                
                <!-- Уведомления -->
                <div class="setting-group">
                    <div class="setting-row">
                        <label for="notifications-toggle" class="setting-label">🔔 УВЕДОМЛЕНИЯ</label>
                        <label class="switch">
                            <input type="checkbox" id="notifications-toggle" ${this.settings.notifications ? 'checked' : ''}>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="setting-description">Оповещения о достижениях и комбо</div>
                </div>
            </div>
            
            <div class="settings-footer">
                <div class="version-info">ВЕРСИЯ СИСТЕМЫ: 2.0</div>
                <div class="status-info">СТАТУС: ДЕГЕНЕРАТ</div>
            </div>
        `;

        document.body.appendChild(panel);
        this.setupPanelEventListeners();
        this.applyPanelStyles();
    }

    // 🎮 НАСТРОЙКА ОБРАБОТЧИКОВ ПАНЕЛИ
    setupPanelEventListeners() {
        // Закрытие
        document.getElementById('settings-close-btn').addEventListener('click', () => {
            this.hideSettingsPanel();
            this.vibrate(20);
        });

        // Тема
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.dataset.theme;
                this.switchTheme(theme);
                this.vibrate(40);
                
                // Обновляем состояние кнопок
                document.querySelectorAll('.theme-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.theme === theme);
                });
            });
        });

        // Переключатели
        const toggles = {
            'vibration-toggle': 'vibration', 
            'notifications-toggle': 'notifications'
        };

        Object.entries(toggles).forEach(([id, setting]) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', (e) => {
                    const isEnabled = e.target.checked;
                    this.settings[setting] = isEnabled;
                    this.saveSettings();
                    this.vibrate(25);
                    this.showSettingNotification(setting, isEnabled);
                    
                    // Применяем настройки сразу
                    this.applyNotificationSettings();
                });
            }
        });

        // Клавиша Escape для закрытия
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPanelVisible()) {
                this.hideSettingsPanel();
            }
        });
    }

    // 🌍 ГЛОБАЛЬНЫЕ ОБРАБОТЧИКИ
    setupGlobalEventListeners() {
        // Закрытие по клику вне панели
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('settings-panel');
            const btn = document.getElementById('settings-btn');
            
            if (panel && panel.classList.contains('active') && 
                !panel.contains(e.target) && e.target !== btn) {
                this.hideSettingsPanel();
            }
        });
    }

    // 🎨 ПЕРЕКЛЮЧЕНИЕ ТЕМЫ
    switchTheme(theme) {
        this.settings.theme = theme;
        this.saveSettings();
        this.applyTheme(theme);
        
        this.showNotification(`🎨 Тема: ${this.getThemeName(theme)}`, 'success');
    }

    getThemeName(theme) {
        const names = {
            'dark': 'ЕБЛАН',
            'light': 'ДЕГЕНЕРАТ', 
            'auto': 'АВТОМАТИЧЕСКАЯ'
        };
        return names[theme] || theme;
    }

    // 🖼️ ПРИМЕНЕНИЕ ТЕМЫ
    applyTheme(theme) {
        let actualTheme = theme;
        
        if (theme === 'auto') {
            actualTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', actualTheme);
        localStorage.setItem('ezhan-theme', theme);
    }

    // 📳 ВИБРАЦИЯ
    vibrate(duration = 50) {
        if (!this.settings.vibration || !navigator.vibrate) return;
        
        try {
            navigator.vibrate(duration);
        } catch (e) {
            console.log('📳 Вибрация не поддерживается');
        }
    }

    // 🔔 УВЕДОМЛЕНИЯ О НАСТРОЙКАХ
    showSettingNotification(setting, enabled) {
        const messages = {
            vibration: `📳 Вибрация ${enabled ? 'включена' : 'выключена'}`,
            notifications: `🔔 Уведомления ${enabled ? 'включены' : 'выключены'}`
        };
        
        this.showNotification(messages[setting] || 'Настройка изменена', 'success');
    }

    showNotification(message, type = 'info') {
        if (this.settings.notifications && window.NotificationManager) {
            NotificationManager.show(message, type);
        } else {
            console.log(`📢 ${message}`);
        }
    }

    // 👁️ УПРАВЛЕНИЕ ПАНЕЛЬЮ
    isPanelVisible() {
        const panel = document.getElementById('settings-panel');
        return panel && panel.classList.contains('active');
    }

    toggleSettingsPanel() {
        this.isPanelVisible() ? this.hideSettingsPanel() : this.showSettingsPanel();
    }

    showSettingsPanel() {
        const panel = document.getElementById('settings-panel');
        if (!panel) return;

        panel.classList.add('active');
        
        setTimeout(() => {
            panel.style.transform = 'translateX(0)';
        }, 10);
    }

    hideSettingsPanel() {
        const panel = document.getElementById('settings-panel');
        if (!panel) return;

        panel.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            panel.classList.remove('active');
        }, 300);
    }

    // 🛠️ ПРИМЕНЕНИЕ НАСТРОЕК УВЕДОМЛЕНИЙ
    applyNotificationSettings() {
        // Сохраняем настройки в localStorage для совместимости
        localStorage.setItem('game-sound-enabled', this.settings.sound);
        localStorage.setItem('game-vibration-enabled', this.settings.vibration);
        localStorage.setItem('game-notifications-enabled', this.settings.notifications);
        
        console.log('⚙️ Применены настройки:', {
            sound: this.settings.sound,
            vibration: this.settings.vibration,
            notifications: this.settings.notifications
        });
    }

    // 🎨 ПРИМЕНЕНИЕ СТИЛЕЙ ПАНЕЛИ
    applyPanelStyles() {
        const style = document.createElement('style');
        style.textContent = this.getPanelStyles();
        document.head.appendChild(style);
    }

    getPanelStyles() {
        return `
            .settings-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: 400px;
                height: 100vh;
                background: var(--bg-card);
                border-left: 1px solid var(--border-color);
                z-index: 9999;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                display: none;
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
                font-family: 'Inter', sans-serif;
            }
            
            .settings-panel.active {
                display: block;
            }
            
            .settings-header {
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-dark);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .settings-header h3 {
                color: var(--accent-red);
                margin: 0;
                font-size: 1.2rem;
                font-weight: 700;
            }
            
            .settings-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                border-radius: 50%;
            }
            
            .settings-close:hover {
                color: var(--accent-red);
                background: rgba(255, 51, 51, 0.1);
            }
            
            .settings-content {
                padding: 1.5rem;
                overflow-y: auto;
                height: calc(100vh - 120px);
            }
            
            .setting-group {
                margin-bottom: 2rem;
            }
            
            .setting-label {
                display: block;
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-weight: 600;
            }
            
            .setting-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .setting-description {
                color: var(--text-secondary);
                font-size: 0.85rem;
                margin-top: 0.3rem;
            }
            
            .theme-buttons {
                display: flex;
                gap: 0.5rem;
            }
            
            .theme-btn {
                flex: 1;
                padding: 0.8rem 1rem;
                background: var(--bg-light);
                border: 1px solid var(--border-color);
                color: var(--text-secondary);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .theme-btn:hover {
                background: var(--accent-red);
                color: white;
                border-color: var(--accent-red);
            }
            
            .theme-btn.active {
                background: var(--accent-red);
                color: white;
                border-color: var(--accent-red);
                font-weight: 700;
            }
            
            .switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: var(--bg-light);
                transition: .4s;
                border-radius: 24px;
                border: 1px solid var(--border-color);
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 3px;
                background-color: var(--text-secondary);
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .slider {
                background-color: var(--accent-red);
                border-color: var(--accent-red);
            }
            
            input:checked + .slider:before {
                transform: translateX(26px);
                background-color: white;
            }
            
            .settings-divider {
                height: 1px;
                background: var(--border-color);
                margin: 1.5rem 0;
            }
            
            .settings-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid var(--border-color);
                background: var(--bg-dark);
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                color: var(--text-muted);
            }
            
            .version-info {
                font-weight: 600;
            }
            
            .status-info {
                color: var(--accent-red);
                font-weight: 700;
            }
            
            @media (max-width: 480px) {
                .settings-panel {
                    width: 100vw;
                }
            }
        `;
    }
}

// 🚀 ЗАГРУЗКА СИСТЕМЫ НАСТРОЕК
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.ezhanSettings = new EzhanSettings();
    }, 500);
});