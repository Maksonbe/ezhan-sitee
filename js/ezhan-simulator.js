// ЕЖАН SIMULATOR - Мини-игра "Стань Ежаном"
class EzhanSimulator {
    constructor() {
        this.gameState = {
            degeneration: 0,
            fails: 0,
            brainCells: 100,
            level: 1,
            achievements: [],
            playerId: this.generatePlayerId(),
            lastPlayed: new Date().toISOString()
        };

        this.maxDegeneration = 1000;
        this.init();
    }

    // Генерация уникального ID игрока
    generatePlayerId() {
        let playerId = localStorage.getItem('ezhan_player_id');
        if (!playerId) {
            playerId = 'player_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('ezhan_player_id', playerId);
        }
        return playerId;
    }

    init() {
        this.loadGame();
        this.setupEventListeners();
        this.updateUI();
        this.addMessage('Игра "Ежан Simulator" запущена! Готовься стать дегенератом!', 'system');
        
        // Плавное автосохранение
        this.setupAutoSave();
    }

    // Настройка плавного автосохранения
    setupAutoSave() {
        setInterval(() => {
            this.saveGame();
        }, 15000);
    }

    // Загрузка сохранённой игры с плавной анимацией
    loadGame() {
        try {
            const saved = localStorage.getItem(`ezhanSimulator_${this.gameState.playerId}`);
            if (saved) {
                const loadedState = JSON.parse(saved);
                
                const lastPlayed = new Date(loadedState.lastPlayed);
                const daysDiff = (new Date() - lastPlayed) / (1000 * 60 * 60 * 24);
                
                if (daysDiff < 30) {
                    this.gameState = { ...this.gameState, ...loadedState };
                    setTimeout(() => {
                        this.addMessage('✅ Игра загружена из сохранения!', 'system');
                    }, 800);
                    
                    this.restoreAchievementsUI();
                }
            }
        } catch (error) {
            setTimeout(() => {
                this.addMessage('🎮 Начинаем новую игру!', 'system');
            }, 500);
        }
    }

    // Восстановление достижений с анимацией
    restoreAchievementsUI() {
        this.gameState.achievements.forEach((achievementId, index) => {
            setTimeout(() => {
                const achievementElement = document.querySelector(`[data-achievement="${achievementId}"]`);
                if (achievementElement) {
                    achievementElement.classList.remove('locked');
                    achievementElement.classList.add('unlocked');
                    achievementElement.style.opacity = '0';
                    achievementElement.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        achievementElement.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        achievementElement.style.opacity = '1';
                        achievementElement.style.transform = 'scale(1)';
                    }, 100);
                }
            }, index * 150);
        });
    }

    // Сохранение игры
    saveGame() {
        try {
            this.gameState.lastPlayed = new Date().toISOString();
            localStorage.setItem(`ezhanSimulator_${this.gameState.playerId}`, JSON.stringify(this.gameState));
            this.saveGlobalStats();
            return true;
        } catch (error) {
            return false;
        }
    }

    // Сохранение глобальной статистики
    saveGlobalStats() {
        try {
            let globalStats = JSON.parse(localStorage.getItem('ezhan_global_stats') || '{}');
            
            globalStats[this.gameState.playerId] = {
                degeneration: this.gameState.degeneration,
                fails: this.gameState.fails,
                level: this.gameState.level,
                achievements: this.gameState.achievements.length,
                lastPlayed: this.gameState.lastPlayed,
                playTime: (globalStats[this.gameState.playerId]?.playTime || 0) + 15
            };
            
            localStorage.setItem('ezhan_global_stats', JSON.stringify(globalStats));
        } catch (error) {
            console.error('Ошибка сохранения глобальной статистики:', error);
        }
    }

    // Настройка обработчиков событий
    setupEventListeners() {
        // Плавные действия игрока
        document.getElementById('action-fail')?.addEventListener('click', () => this.performAction('fail'));
        document.getElementById('action-think')?.addEventListener('click', () => this.performAction('think'));
        document.getElementById('action-blame')?.addEventListener('click', () => this.performAction('blame'));
        document.getElementById('action-repeat')?.addEventListener('click', () => this.performAction('repeat'));

        // Сброс игры
        document.getElementById('reset-game')?.addEventListener('click', () => this.resetGame());

        // Сохранение при закрытии
        window.addEventListener('beforeunload', () => this.saveGame());
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.saveGame();
        });

        // Улучшенные эффекты при наведении
        this.setupHoverEffects();
    }

    // Плавные эффекты при наведении
    setupHoverEffects() {
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.boxShadow = '0 20px 40px rgba(255, 51, 51, 0.35)';
                this.style.borderColor = 'var(--accent-red)';
                
                if (window.createParticles) {
                    const rect = this.getBoundingClientRect();
                    createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 'hover');
                }
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
                this.style.borderColor = '';
            });

            btn.addEventListener('click', function() {
                this.style.transform = 'scale(0.92)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                if (window.createParticles) {
                    const rect = this.getBoundingClientRect();
                    createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 'click');
                }
                
                if (navigator.vibrate) navigator.vibrate(25);
            });
        });
    }

    // Плавное выполнение действия
    performAction(actionType) {
        const actions = {
            fail: () => {
                this.gameState.degeneration += 10;
                this.gameState.fails += 1;
                this.gameState.brainCells = Math.max(0, this.gameState.brainCells - 2);
                this.addMessage('💀 Проёб успешно совершён! Дегенерация +10', 'action');
                this.checkAchievement('first-fail');
            },
            think: () => {
                this.gameState.brainCells = Math.max(0, this.gameState.brainCells - 5);
                this.gameState.degeneration += 5;
                this.addMessage('🤔 Попытка подумать провалилась! Разум -5', 'action');
            },
            blame: () => {
                this.gameState.degeneration += 15;
                this.gameState.brainCells = Math.max(0, this.gameState.brainCells - 3);
                this.addMessage('🔪 Все виноваты кроме тебя! Дегенерация +15', 'action');
            },
            repeat: () => {
                this.gameState.degeneration += 20;
                this.gameState.fails += 2;
                this.gameState.brainCells = Math.max(0, this.gameState.brainCells - 4);
                this.addMessage('♾️ Ошибка повторена! Дегенерация +20', 'action');
            }
        };

        if (actions[actionType]) {
            actions[actionType]();
            this.updateGameState();
            this.saveGame();
        }
    }

    // Плавное обновление состояния игры
    updateGameState() {
        const newLevel = Math.floor(this.gameState.degeneration / 100) + 1;
        if (newLevel > this.gameState.level) {
            this.gameState.level = newLevel;
            this.addMessage(`🎉 Достигнут уровень ${newLevel}! Ты становишься более дегенеративным!`, 'level-up');
        }

        this.checkAchievements();
        this.updateUI();
    }

    // Проверка достижений
    checkAchievements() {
        const achievements = {
            'first-fail': this.gameState.fails >= 1,
            'brain-dead': this.gameState.brainCells <= 0,
            'pro-degenerate': this.gameState.degeneration >= 500,
            'god-mode': this.gameState.degeneration >= 1000,
            'fail-master': this.gameState.fails >= 50,
            'thinking-tryhard': this.gameState.brainCells <= 20,
            'eternal-failure': this.gameState.fails >= 100,
            'no-return': this.gameState.degeneration >= 2000,
            'ultimate-chaos': this.gameState.degeneration >= 5000,
            'brain-explosion': this.gameState.brainCells <= 5,
            'fail-god': this.gameState.fails >= 500,
            'system-breaker': this.gameState.degeneration >= 10000
        };
    
        let unlockedNew = false;
    
        for (const [achievement, condition] of Object.entries(achievements)) {
            if (condition && !this.gameState.achievements.includes(achievement)) {
                this.unlockAchievement(achievement);
                unlockedNew = true;
            }
        }
    
        if (unlockedNew) {
            this.saveGame();
        }
    }

    // Проверка конкретного достижения
    checkAchievement(achievementId) {
        if (!this.gameState.achievements.includes(achievementId)) {
            this.unlockAchievement(achievementId);
        }
    }

    // Плавная разблокировка достижения
    unlockAchievement(achievementId) {
        this.gameState.achievements.push(achievementId);
        
        const achievementElement = document.querySelector(`[data-achievement="${achievementId}"]`);
        if (achievementElement) {
            achievementElement.classList.remove('locked');
            achievementElement.classList.add('unlocked');
            
            achievementElement.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            achievementElement.style.transform = 'scale(1.15) rotate(5deg)';
            
            setTimeout(() => {
                achievementElement.style.transform = 'scale(1) rotate(0deg)';
            }, 400);

            this.addMessage(`🏆 Достижение получено: "${achievementElement.querySelector('.achievement-name')?.textContent}"`, 'achievement');
            
            if (window.createParticles) {
                const rect = achievementElement.getBoundingClientRect();
                createParticles(rect.left + rect.width/2, rect.top + rect.height/2, 'achievement');
            }
        }
    }

    // Плавное добавление сообщения в журнал
    addMessage(text, type = 'action') {
        const messagesContainer = document.getElementById('messages-container');
        if (!messagesContainer) return;

        const messageElement = document.createElement('div');
        
        messageElement.className = `message-item ${type}-message`;
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(20px)';
        messageElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        messageElement.innerHTML = `
            <span class="message-time">[${this.getCurrentTime()}]:</span>
            <span class="message-text">${text}</span>
        `;

        messagesContainer.appendChild(messageElement);

        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 50);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const messages = messagesContainer.querySelectorAll('.message-item');
        if (messages.length > 25) {
            messages[0].style.opacity = '0';
            messages[0].style.transform = 'translateX(-100%)';
            setTimeout(() => {
                messages[0].remove();
            }, 500);
        }
    }

    // Получение текущего времени
    getCurrentTime() {
        return new Date().toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // Плавное обновление интерфейса
    updateUI() {
        // Плавное обновление статистики
        const elements = {
            'degeneration-level': this.gameState.degeneration,
            'fail-count': this.gameState.fails,
            'brain-cells': this.gameState.brainCells,
            'game-level': this.gameState.level
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.style.transform = 'scale(1.1)';
                element.textContent = value;
                setTimeout(() => {
                    element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.transform = 'scale(1)';
                }, 150);
            }
        });

        // Плавное обновление прогресс бара
        const progressPercent = (this.gameState.degeneration / this.maxDegeneration) * 100;
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-percent');
        
        if (progressFill && progressText) {
            progressFill.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.8s ease';
            progressFill.style.width = Math.min(100, progressPercent) + '%';
            
            progressText.style.transition = 'all 0.5s ease';
            progressText.textContent = Math.min(100, Math.round(progressPercent)) + '%';

            if (progressPercent < 30) {
                progressFill.style.background = 'var(--accent-blue)';
            } else if (progressPercent < 70) {
                progressFill.style.background = 'var(--accent-red)';
            } else {
                progressFill.style.background = 'var(--success-color)';
            }
        }
    }

    // Плавный сброс игры
    resetGame() {
        if (confirm('Точно хочешь начать заново? Все твои дегенеративные достижения будут потеряны!')) {
            // Анимация исчезновения
            document.querySelectorAll('.achievement-item.unlocked').forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                }, index * 80);
            });

            setTimeout(() => {
                this.gameState = {
                    degeneration: 0,
                    fails: 0,
                    brainCells: 100,
                    level: 1,
                    achievements: [],
                    playerId: this.gameState.playerId,
                    lastPlayed: new Date().toISOString()
                };
                
                localStorage.removeItem(`ezhanSimulator_${this.gameState.playerId}`);
                
                const messagesContainer = document.getElementById('messages-container');
                if (messagesContainer) {
                    messagesContainer.innerHTML = `
                        <div class="message-item system-message">
                            <span class="message-time">[СИСТЕМА]:</span>
                            <span class="message-text">ИГРА СБРОШЕНА. НАЧИНАЕМ НОВУЮ ДЕГЕНЕРАЦИЮ!</span>
                        </div>
                    `;
                }

                document.querySelectorAll('.achievement-item').forEach(item => {
                    item.classList.add('locked');
                    item.classList.remove('unlocked');
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                });

                this.updateUI();
                this.addMessage('Игра сброшена! Начинаем новую дегенерацию!', 'system');
                this.saveGame();
            }, 500);
        }
    }

    // Получение информации о игроке
    getPlayerInfo() {
        return {
            id: this.gameState.playerId,
            degeneration: this.gameState.degeneration,
            level: this.gameState.level,
            achievements: this.gameState.achievements.length,
            lastPlayed: this.gameState.lastPlayed
        };
    }
}

// Плавная инициализация игры
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const game = new EzhanSimulator();
        window.ezhanGame = game;
    }, 300);
});