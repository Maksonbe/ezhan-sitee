// УЛУЧШЕНИЯ ДЛЯ ИГРЫ ЕЖАН SIMULATOR - ПОЛНАЯ ВЕРСИЯ
class GameEnhancements {
    constructor() {
        this.comboCount = 0;
        this.comboTimeout = null;
        this.lastClickTime = 0;
        this.isInitialized = false;
        this.shownAchievements = new Set();
        this.processedComboMilestones = new Set();
        
        this.achievementNames = {
            'first-fail': '🎯 Первый проёб',
            'brain-dead': '🧠 Окончательно безмозглый', 
            'pro-degenerate': '👑 Про дегенерат',
            'god-mode': '⚡ Режим бога',
            'fail-master': '💀 Мастер проёбов',
            'thinking-tryhard': '🤔 Пытался думать',
            'eternal-failure': '♾️ Вечный неудачник',
            'no-return': '🚷 Точка невозврата',
            'ultimate-chaos': '🌪️ Абсолютный хаос',
            'brain-explosion': '💥 Взрыв мозга',
            'fail-god': '😈 Бог провалов',
            'system-breaker': '💻 Разрушитель систем'
        };

        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupGameImprovements();
        this.addNewFeatures();
        this.isInitialized = true;
        
        console.log('🎮 Улучшения игры инициализированы');
    }

    setupGameImprovements() {
        this.setupSmoothAnimations();
        this.setupEnhancedParticles();
        this.setupGameSounds();
    }

    // 🎯 ПЛАВНЫЕ АНИМАЦИИ
    setupSmoothAnimations() {
        if (typeof EzhanSimulator === 'undefined') {
            setTimeout(() => this.setupSmoothAnimations(), 100);
            return;
        }

        // Перехватываем метод только если еще не перехватывали
        if (EzhanSimulator.prototype.unlockAchievement.__enhanced) {
            return;
        }

        const originalUnlockAchievement = EzhanSimulator.prototype.unlockAchievement;
        const self = this;
        
        EzhanSimulator.prototype.unlockAchievement = function(achievementId) {
            // Проверяем, не разблокировано ли уже
            if (this.gameState.achievements && this.gameState.achievements.includes(achievementId)) {
                return;
            }
            
            // Вызываем оригинальный метод
            if (originalUnlockAchievement) {
                originalUnlockAchievement.call(this, achievementId);
            }
            
            // Показываем уведомление
            self.showAchievementNotification(achievementId);
            
            // Запускаем эффекты
            self.showAchievementEffect(achievementId);
        };
        
        EzhanSimulator.prototype.unlockAchievement.__enhanced = true;
    }

    // ✨ УЛУЧШЕННЫЕ ЧАСТИЦЫ
    setupEnhancedParticles() {
        const originalCreateParticles = window.createParticles;
        
        window.createParticles = function(x, y, count, type = 'default') {
            const gameColors = {
                fail: ['#ff4444', '#ff6666', '#ff8888', '#ff3333'],
                think: ['#4444ff', '#6666ff', '#8888ff', '#3366ff'],
                blame: ['#ff44ff', '#ff66ff', '#ff88ff', '#ff33ff'],
                repeat: ['#ffff44', '#ffff66', '#ffff88', '#ffff33'],
                achievement: ['#ffd700', '#ffff00', '#ffed4e', '#ffdf00'],
                combo: ['#ff3333', '#ff6b35', '#ff9933', '#ffcc33', '#ffffff']
            };

            const colors = gameColors[type] || gameColors.fail;
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 60 + Math.random() * 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                const size = Math.random() * 4 + 2;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const delay = Math.random() * 0.2;
                const duration = 0.8 + Math.random() * 0.6;
                
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
                    boxShadow: `0 0 ${size * 1.5}px ${color}`
                });
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, (duration + delay) * 1000);
            }
        };
    }

// 🔊 ЗВУКИ И ВИБРАЦИЯ
setupGameSounds() {
    this.sounds = {
        // Оставляем только эти звуки, убираем звук для кнопок
        achievement: this.createSound(1200, 0.3),
        levelup: this.createSound(1000, 0.4)
    };

    this.setupVibration();
}

setupVibration() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.action-btn')) {
            this.vibrate();
        }
    });
}

// 📳 ВИБРАЦИЯ ДЛЯ КНОПОК
vibrate() {
    // Проверяем поддержку вибрации и настройки пользователя
    if (!navigator.vibrate || localStorage.getItem('game-vibration-enabled') === 'false') {
        return;
    }
    
    try {
        // Легкая короткая вибрация (50ms)
        navigator.vibrate(50);
    } catch (e) {
        console.log('📳 Вибрация не поддерживается');
    }
}

createSound(frequency, duration) {
    return function() {
        try {
            if (localStorage.getItem('game-sound-enabled') === 'false') return;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('🔇 Web Audio API не поддерживается');
        }
    };
}

// Убираем старый setupSoundButtons, так как звуки кнопок больше не нужны

    createSound(frequency, duration) {
        return function() {
            try {
                if (localStorage.getItem('game-sound-enabled') === 'false') return;
                
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.log('🔇 Web Audio API не поддерживается');
            }
        };
    }

    setupSoundButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                const actionType = e.target.closest('.action-btn').dataset.type;
                if (this.sounds[actionType]) {
                    this.sounds[actionType]();
                }
            }
        });
    }

    // 🎮 НОВЫЕ ФИЧИ
    addNewFeatures() {
        this.addComboSystem();
        this.addAchievementNotifications();
    }

    // ⚡ СИСТЕМА КОМБО С ФЕЙЕРВЕРКАМИ
    addComboSystem() {
        const self = this;
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                const currentTime = Date.now();
                
                if (currentTime - self.lastClickTime < 100) return;
                self.lastClickTime = currentTime;
                
                self.comboCount++;
                self.showCombo(self.comboCount);
                
                // Проверяем milestones комбо (10, 20, 30...)
                self.checkComboMilestones(self.comboCount);
                
                clearTimeout(self.comboTimeout);
                self.comboTimeout = setTimeout(() => {
                    if (self.comboCount >= 3) {
                        self.awardComboBonus(self.comboCount);
                    }
                    self.comboCount = 0;
                    self.processedComboMilestones.clear(); // Сбрасываем milestones
                }, 2000);
            }
        });
    }

    // 🎇 ПРОВЕРКА MILESTONES КОМБО (10, 20, 30...)
    checkComboMilestones(combo) {
        const milestones = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        
        milestones.forEach(milestone => {
            if (combo === milestone && !this.processedComboMilestones.has(milestone)) {
                this.processedComboMilestones.add(milestone);
                this.createFireworks(milestone);
                
                if (window.NotificationManager) {
                    NotificationManager.show(`🎇 COMBO ${milestone}! ФЕЙЕРВЕРК!`, 'success');
                }
            }
        });
    }

    // 🎆 СОЗДАНИЕ ФЕЙЕРВЕРКОВ
    createFireworks(milestone) {
        const colors = [
            '#ff3333', '#ff6b35', '#ff9933', '#ffcc33', 
            '#33ff33', '#3366ff', '#ff33ff', '#ffff33'
        ];
        
        // Создаем несколько фейерверков в разных местах экрана
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = 100 + Math.random() * (window.innerWidth - 200);
                const y = 100 + Math.random() * (window.innerHeight - 200);
                
                // Большой взрыв фейерверка
                if (window.createParticles) {
                    window.createParticles(x, y, 50, 'combo');
                }
                
                // Дополнительные эффекты для больших milestones
                if (milestone >= 50) {
                    this.createSpecialFirework(x, y, milestone);
                }
                
            }, i * 300);
        }
        
        // Особый эффект для комбо 100
        if (milestone === 100) {
            this.createUltimateFirework();
        }
    }

    createSpecialFirework(x, y, milestone) {
        // Специальные эффекты для высоких комбо
        const specialColors = milestone >= 80 ? 
            ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff'] :
            ['#ff3333', '#ff9933', '#ffff33', '#33ff33'];
            
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                if (window.createParticles) {
                    window.createParticles(x, y, 30, 'combo');
                }
            }, i * 200);
        }
    }

    createUltimateFirework() {
        // Максимальный фейерверк для комбо 100
        console.log('🎆 ULTIMATE FIREWORK FOR COMBO 100!');
        
        // Фейерверки по углам экрана
        const corners = [
            {x: 100, y: 100},
            {x: window.innerWidth - 100, y: 100},
            {x: 100, y: window.innerHeight - 100},
            {x: window.innerWidth - 100, y: window.innerHeight - 100}
        ];
        
        corners.forEach((corner, index) => {
            setTimeout(() => {
                if (window.createParticles) {
                    window.createParticles(corner.x, corner.y, 40, 'combo');
                }
            }, index * 400);
        });
        
        // Центральный мега-фейерверк
        setTimeout(() => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            if (window.createParticles) {
                window.createParticles(centerX, centerY, 100, 'combo');
            }
        }, 1000);
    }

    showCombo(count) {
        if (count >= 2) {
            const maxCombo = 100;
            const displayCount = Math.min(count, maxCombo);
            
            const scale = 1 + (displayCount * 0.01);
            const fontSize = 1.8 + (displayCount * 0.03);
            
            const oldCombos = document.querySelectorAll('.combo-popup');
            oldCombos.forEach(combo => combo.remove());
            
            const comboElement = document.createElement('div');
            comboElement.className = 'combo-popup';
            comboElement.textContent = `COMBO x${displayCount}${count > maxCombo ? '+' : ''}!`;
            comboElement.style.cssText = `
                position: fixed;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%) scale(${scale});
                font-size: ${fontSize}rem;
                font-weight: 900;
                color: var(--accent-red);
                z-index: 10000;
                text-shadow: 0 0 20px rgba(255, 51, 51, 0.8);
                opacity: 0;
                animation: smoothComboPop 0.9s ease-out forwards;
                pointer-events: none;
                font-family: 'Inter', sans-serif;
            `;
            
            document.body.appendChild(comboElement);
            
            setTimeout(() => {
                comboElement.style.animation = 'smoothComboExit 0.4s ease-out forwards';
                setTimeout(() => {
                    if (comboElement.parentNode) {
                        comboElement.remove();
                    }
                }, 400);
            }, 600);
        }
    }

    awardComboBonus(combo) {
        const bonus = Math.min(combo * 5, 200);
        if (window.ezhanGame) {
            window.ezhanGame.gameState.degeneration += bonus;
            window.ezhanGame.updateUI();
            
            if (window.NotificationManager) {
                NotificationManager.show(`🎯 COMBO BONUS! +${bonus} дегенерации`, 'success');
            }
        }
    }

    // 🏆 УВЕДОМЛЕНИЯ О ДОСТИЖЕНИЯХ БЕЗ ДУБЛИРОВАНИЯ
    addAchievementNotifications() {
        if (typeof EzhanSimulator === 'undefined') {
            setTimeout(() => this.addAchievementNotifications(), 100);
            return;
        }

        // Уже настроено в setupSmoothAnimations
    }

    showAchievementNotification(achievementId) {
        // Проверяем, не показывали ли уже это достижение
        if (this.shownAchievements.has(achievementId)) {
            return;
        }
        
        this.shownAchievements.add(achievementId);
        
        const achievementName = this.achievementNames[achievementId] || 'Новое достижение';
        
        if (window.NotificationManager) {
            NotificationManager.show(`🏆 ДОСТИЖЕНИЕ: ${achievementName}`, 'success');
        } else {
            this.showFallbackNotification(`🏆 ${achievementName}`);
        }
        
        console.log(`🎉 Новое достижение: ${achievementName}`);
    }

    showFallbackNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🏆</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        const existingNotifications = document.querySelectorAll('.achievement-notification');
        const topPosition = 20 + (existingNotifications.length * 90);
        
        notification.style.cssText = `
            position: fixed;
            top: ${topPosition}px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-red), #ff6b35);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 20px rgba(255, 51, 51, 0.4);
            animation: slideInRight 0.5s ease-out;
            font-weight: 600;
            max-width: 300px;
            min-width: 250px;
        `;
        
        document.body.appendChild(notification);
        this.updateNotificationsPosition();
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                    this.updateNotificationsPosition();
                }
            }, 500);
        }, 3000);
    }

    updateNotificationsPosition() {
        const notifications = document.querySelectorAll('.achievement-notification');
        notifications.forEach((notification, index) => {
            const topPosition = 20 + (index * 90);
            notification.style.top = `${topPosition}px`;
        });
    }

    showAchievementEffect(achievementId) {
        if (window.createParticles) {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            window.createParticles(centerX, centerY, 30, 'achievement');
        }
    }
}

// 🎨 CSS ДЛЯ АНИМАЦИЙ
const enhancementStyles = `
@keyframes smoothComboPop {
    0% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
    }
    60% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
    }
    100% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes smoothComboExit {
    0% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    100% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.2) translateY(-20px);
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.combo-popup {
    pointer-events: none;
}

.achievement-notification {
    font-family: 'Inter', sans-serif;
    transition: top 0.3s ease !important;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.notification-icon {
    font-size: 1.5rem;
}

.notification-text {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 600;
}

@media (max-width: 768px) {
    .achievement-notification {
        right: 10px !important;
        left: 10px !important;
        max-width: none !important;
        min-width: auto !important;
    }
}
`;

// Добавляем стили
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancementStyles;
document.head.appendChild(styleSheet);

// 🚀 ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new GameEnhancements();
    }, 500);
});

if (typeof EzhanSimulator !== 'undefined') {
    new GameEnhancements();
}