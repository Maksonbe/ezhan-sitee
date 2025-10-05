// AI ЕЖАН - Улучшенная нейросеть для генерации фраз дегенерата
class AIEzhan {
    constructor() {
        this.init();
    }

    init() {
        this.setupTrainingData();
        this.setupGrammarRules();
        this.setupAI();
        this.setupUI();
    }

    // Обучающие данные - фразы Ежана
    setupTrainingData() {
        this.trainingData = [
            "Я ЕЖАН, Я КОНЧЕНЫЙ ДЕГЕНЕРАТ",
            "МОЗГИ ОТСУТСТВУЮТ, НО ЭТО НЕ МЕШАЕТ",
            "ПРОЁБ - ЭТО НЕ ПРОБЛЕМА, ЭТО СТИЛЬ ЖИЗНИ",
            "ДЕГЕНЕРАЦИЯ - ЭТО ИСКУССТВО",
            "РАЗУМ - ПЕРЕЖИТОК ПРОШЛОГО",
            "МЫСЛИТЬ - ЗНАЧИТ СТРАДАТЬ",
            "БЕЗМОЗГЛАЯ ЖИЗНЬ - СВОБОДНАЯ ЖИЗНЬ",
            "Я ЕСТЬ АЛЬФА И ОМЕГА ДЕГЕНЕРАЦИИ",
            "СЛЕДУЙ ЗА МНОЙ В БЕЗДНУ ПРОЁБОВ",
            "НИКОГДА НЕ ДУМАЙ - ВСЕГДА ПРОЁБЫВАЙ",
            "МОЙ УРОВЕНЬ ДЕГЕНЕРАЦИИ ПРЕВЫШАЕТ ВСЕ ДОПУСТИМЫЕ НОРМЫ",
            "ПРОЁБЫВАЮ ВСЁ ЧТО МОЖНО И НЕЛЬЗЯ ПРОЁБАТЬ",
            "КАЖДЫЙ МОЙ ДЕНЬ - ЭТО ШЕДЕВР ДЕГЕНЕРАТИВНОГО ИСКУССТВА",
            "МОЗГИ ОТКЛЮЧЕНЫ, ИНСТИНКТЫ АКТИВИРОВАНЫ",
            "Я НЕ ДЕЛАЮ ОШИБКИ - Я СОЗДАЮ НОВЫЕ ВИДЫ ПРОЁБОВ",
            "ДЕГЕНЕРАЦИЯ ДОСТИГЛА КРИТИЧЕСКОЙ МАССЫ",
            "МОЙ ПУТЬ - ЭТО ПУТЬ ВЕЧНОГО ПРОЁБА",
            "СИСТЕМА ОБНАРУЖИЛА НОВЫЙ УРОВЕНЬ ДЕГЕНЕРАЦИИ",
            "ПРОЁБЫВАНИЕ - МОЯ СТИХИЯ, ХАОС - МОЙ ДОМ",
            "КОЛИЧЕСТВО МОИХ ПРОЁБОВ ПРЕВЫСИЛО ВСЕ ВОЗМОЖНЫЕ ЛИМИТЫ",
            "МОЗГИ ОТСУТСТВУЮТ, НО Я ПРОДОЛЖАЮ ПРОЁБЫВАТЬ",
            "ДЕГЕНЕРАЦИЯ - ЭТО МОЯ СУПЕРСИЛА",
            "Я ПРОЁБЫВАЮ ДАЖЕ КОГДА НЕ ПЫТАЮСЬ",
            "ОТСУТСТВИЕ МОЗГОВ - ЭТО МОЁ ПРЕИМУЩЕСТВО",
            "КАЖДЫЙ МОЙ ПРОЁБ - ЭТО ШАГ К ВЕЛИЧИЮ",
            "Я ДЕГЕНЕРИРУЮ, ЗНАЧИТ СУЩЕСТВУЮ",
            "ПРОЁБЫ - ЭТО МОЯ ВТОРАЯ НАТУРА",
            "МОЙ РАЗУМ ОТКЛЮЧИЛСЯ, НО РУКИ ПРОДОЛЖАЮТ ПРОЁБЫВАТЬ",
            "Я СОЗДАЮ ХАОС ИЗ ПОРЯДКА С ЗАКРЫТЫМИ ГЛАЗАМИ",
            "ДЕГЕНЕРАЦИЯ ТЕЧЁТ В МОИХ ЖИЛАХ"
        ];
    }

    // Грамматические правила и склонения
    setupGrammarRules() {
        this.grammar = {
            // Субъекты (кто)
            subjects: {
                "Я": { cases: { "им": "Я", "род": "МЕНЯ", "дат": "МНЕ", "вин": "МЕНЯ", "твор": "МНОЙ", "пред": "ОБО МНЕ" }},
                "МОЗГИ": { cases: { "им": "МОЗГИ", "род": "МОЗГОВ", "дат": "МОЗГАМ", "вин": "МОЗГИ", "твор": "МОЗГАМИ", "пред": "О МОЗГАХ" }, plural: true },
                "ПРОЁБ": { cases: { "им": "ПРОЁБ", "род": "ПРОЁБА", "дат": "ПРОЁБУ", "вин": "ПРОЁБ", "твор": "ПРОЁБОМ", "пред": "О ПРОЁБЕ" }},
                "РАЗУМ": { cases: { "им": "РАЗУМ", "род": "РАЗУМА", "дат": "РАЗУМУ", "вин": "РАЗУМ", "твор": "РАЗУМОМ", "пред": "О РАЗУМЕ" }},
                "ДЕГЕНЕРАЦИЯ": { cases: { "им": "ДЕГЕНЕРАЦИЯ", "род": "ДЕГЕНЕРАЦИИ", "дат": "ДЕГЕНЕРАЦИИ", "вин": "ДЕГЕНЕРАЦИЮ", "твор": "ДЕГЕНЕРАЦИЕЙ", "пред": "О ДЕГЕНЕРАЦИИ" }, feminine: true },
                "СИСТЕМА": { cases: { "им": "СИСТЕМА", "род": "СИСТЕМЫ", "дат": "СИСТЕМЕ", "вин": "СИСТЕМУ", "твор": "СИСТЕМОЙ", "пред": "О СИСТЕМЕ" }, feminine: true },
                "ЖИЗНЬ": { cases: { "им": "ЖИЗНЬ", "род": "ЖИЗНИ", "дат": "ЖИЗНИ", "вин": "ЖИЗНЬ", "твор": "ЖИЗНЬЮ", "пред": "О ЖИЗНИ" }, feminine: true }
            },

            // Глаголы (что делает)
            verbs: {
                "ПРОЁБЫВАТЬ": { 
                    tenses: {
                        "наст": { "я": "ПРОЁБЫВАЮ", "ты": "ПРОЁБЫВАЕШЬ", "он": "ПРОЁБЫВАЕТ", "мы": "ПРОЁБЫВАЕМ", "вы": "ПРОЁБЫВАЕТЕ", "они": "ПРОЁБЫВАЮТ" },
                        "прош": { "я": "ПРОЁБЫВАЛ", "ты": "ПРОЁБЫВАЛ", "он": "ПРОЁБЫВАЛ", "она": "ПРОЁБЫВАЛА", "оно": "ПРОЁБЫВАЛО", "мы": "ПРОЁБЫВАЛИ", "вы": "ПРОЁБЫВАЛИ", "они": "ПРОЁБЫВАЛИ" }
                    }
                },
                "ОТСУТСТВОВАТЬ": {
                    tenses: {
                        "наст": { "я": "ОТСУТСТВУЮ", "ты": "ОТСУТСТВУЕШЬ", "он": "ОТСУТСТВУЕТ", "мы": "ОТСУТСТВУЕМ", "вы": "ОТСУТСТВУЕТЕ", "они": "ОТСУТСТВУЮТ" },
                        "прош": { "я": "ОТСУТСТВОВАЛ", "ты": "ОТСУТСТВОВАЛ", "он": "ОТСУТСТВОВАЛ", "она": "ОТСУТСТВОВАЛА", "оно": "ОТСУТСТВОВАЛО", "мы": "ОТСУТСТВОВАЛИ", "вы": "ОТСУТСТВОВАЛИ", "они": "ОТСУТСТВОВАЛИ" }
                    }
                },
                "ДУМАТЬ": {
                    tenses: {
                        "наст": { "я": "ДУМАЮ", "ты": "ДУМАЕШЬ", "он": "ДУМАЕТ", "мы": "ДУМАЕМ", "вы": "ДУМАЕТЕ", "они": "ДУМАЮТ" },
                        "прош": { "я": "ДУМАЛ", "ты": "ДУМАЛ", "он": "ДУМАЛ", "она": "ДУМАЛА", "оно": "ДУМАЛО", "мы": "ДУМАЛИ", "вы": "ДУМАЛИ", "они": "ДУМАЛИ" }
                    }
                },
                "СОЗДАВАТЬ": {
                    tenses: {
                        "наст": { "я": "СОЗДАЮ", "ты": "СОЗДАЁШЬ", "он": "СОЗДАЁТ", "мы": "СОЗДАЁМ", "вы": "СОЗДАЁТЕ", "они": "СОЗДАЮТ" },
                        "прош": { "я": "СОЗДАВАЛ", "ты": "СОЗДАВАЛ", "он": "СОЗДАВАЛ", "она": "СОЗДАВАЛА", "оно": "СОЗДАВАЛО", "мы": "СОЗДАВАЛИ", "вы": "СОЗДАВАЛИ", "они": "СОЗДАВАЛИ" }
                    }
                },
                "ДОСТИГАТЬ": {
                    tenses: {
                        "наст": { "я": "ДОСТИГАЮ", "ты": "ДОСТИГАЕШЬ", "он": "ДОСТИГАЕТ", "мы": "ДОСТИГАЕМ", "вы": "ДОСТИГАЕТЕ", "они": "ДОСТИГАЮТ" },
                        "прош": { "я": "ДОСТИГАЛ", "ты": "ДОСТИГАЛ", "он": "ДОСТИГАЛ", "она": "ДОСТИГАЛА", "оно": "ДОСТИГАЛО", "мы": "ДОСТИГАЛИ", "вы": "ДОСТИГАЛИ", "они": "ДОСТИГАЛИ" }
                    }
                }
            },

            // Прилагательные (какой)
            adjectives: {
                "КОНЧЕНЫЙ": { 
                    genders: {
                        "м": "КОНЧЕНЫЙ", "ж": "КОНЧЕНАЯ", "с": "КОНЧЕНОЕ", "мн": "КОНЧЕНЫЕ"
                    },
                    cases: {
                        "им": { "м": "КОНЧЕНЫЙ", "ж": "КОНЧЕНАЯ", "с": "КОНЧЕНОЕ", "мн": "КОНЧЕНЫЕ" },
                        "род": { "м": "КОНЧЕНОГО", "ж": "КОНЧЕНОЙ", "с": "КОНЧЕНОГО", "мн": "КОНЧЕНЫХ" },
                        "дат": { "м": "КОНЧЕНОМУ", "ж": "КОНЧЕНОЙ", "с": "КОНЧЕНОМУ", "мн": "КОНЧЕНЫМ" },
                        "вин": { "м": "КОНЧЕНОГО", "ж": "КОНЧЕНУЮ", "с": "КОНЧЕНОЕ", "мн": "КОНЧЕНЫХ" },
                        "твор": { "м": "КОНЧЕНЫМ", "ж": "КОНЧЕНОЙ", "с": "КОНЧЕНЫМ", "мн": "КОНЧЕНЫМИ" },
                        "пред": { "м": "КОНЧЕНОМ", "ж": "КОНЧЕНОЙ", "с": "КОНЧЕНОМ", "мн": "КОНЧЕНЫХ" }
                    }
                },
                "БЕЗМОЗГЛЫЙ": {
                    genders: {
                        "м": "БЕЗМОЗГЛЫЙ", "ж": "БЕЗМОЗГЛАЯ", "с": "БЕЗМОЗГЛОЕ", "мн": "БЕЗМОЗГЛЫЕ"
                    },
                    cases: {
                        "им": { "м": "БЕЗМОЗГЛЫЙ", "ж": "БЕЗМОЗГЛАЯ", "с": "БЕЗМОЗГЛОЕ", "мн": "БЕЗМОЗГЛЫЕ" },
                        "род": { "м": "БЕЗМОЗГЛОГО", "ж": "БЕЗМОЗГЛОЙ", "с": "БЕЗМОЗГЛОГО", "мн": "БЕЗМОЗГЛЫХ" },
                        "дат": { "м": "БЕЗМОЗГЛОМУ", "ж": "БЕЗМОЗГЛОЙ", "с": "БЕЗМОЗГЛОМУ", "мн": "БЕЗМОЗГЛЫМ" },
                        "вин": { "м": "БЕЗМОЗГЛОГО", "ж": "БЕЗМОЗГЛУЮ", "с": "БЕЗМОЗГЛОЕ", "мн": "БЕЗМОЗГЛЫХ" },
                        "твор": { "м": "БЕЗМОЗГЛЫМ", "ж": "БЕЗМОЗГЛОЙ", "с": "БЕЗМОЗГЛЫМ", "мн": "БЕЗМОЗГЛЫМИ" },
                        "пред": { "м": "БЕЗМОЗГЛОМ", "ж": "БЕЗМОЗГЛОЙ", "с": "БЕЗМОЗГЛОМ", "мн": "БЕЗМОЗГЛЫХ" }
                    }
                },
                "ДЕГЕНЕРАТИВНЫЙ": {
                    genders: {
                        "м": "ДЕГЕНЕРАТИВНЫЙ", "ж": "ДЕГЕНЕРАТИВНАЯ", "с": "ДЕГЕНЕРАТИВНОЕ", "мн": "ДЕГЕНЕРАТИВНЫЕ"
                    },
                    cases: {
                        "им": { "м": "ДЕГЕНЕРАТИВНЫЙ", "ж": "ДЕГЕНЕРАТИВНАЯ", "с": "ДЕГЕНЕРАТИВНОЕ", "мн": "ДЕГЕНЕРАТИВНЫЕ" },
                        "род": { "м": "ДЕГЕНЕРАТИВНОГО", "ж": "ДЕГЕНЕРАТИВНОЙ", "с": "ДЕГЕНЕРАТИВНОГО", "мн": "ДЕГЕНЕРАТИВНЫХ" },
                        "дат": { "м": "ДЕГЕНЕРАТИВНОМУ", "ж": "ДЕГЕНЕРАТИВНОЙ", "с": "ДЕГЕНЕРАТИВНОМУ", "мн": "ДЕГЕНЕРАТИВНЫМ" },
                        "вин": { "м": "ДЕГЕНЕРАТИВНОГО", "ж": "ДЕГЕНЕРАТИВНУЮ", "с": "ДЕГЕНЕРАТИВНОЕ", "мн": "ДЕГЕНЕРАТИВНЫХ" },
                        "твор": { "м": "ДЕГЕНЕРАТИВНЫМ", "ж": "ДЕГЕНЕРАТИВНОЙ", "с": "ДЕГЕНЕРАТИВНЫМ", "мн": "ДЕГЕНЕРАТИВНЫМИ" },
                        "пред": { "м": "ДЕГЕНЕРАТИВНОМ", "ж": "ДЕГЕНЕРАТИВНОЙ", "с": "ДЕГЕНЕРАТИВНОМ", "мн": "ДЕГЕНЕРАТИВНЫХ" }
                    }
                }
            },

            // Дополнения (что/кого)
            objects: {
                "ВСЁ": { cases: { "им": "ВСЁ", "род": "ВСЕГО", "дат": "ВСЕМУ", "вин": "ВСЁ", "твор": "ВСЕМ", "пред": "ОБО ВСЁМ" }},
                "НИЧЕГО": { cases: { "им": "НИЧЕГО", "род": "НИЧЕГО", "дат": "НИЧЕМУ", "вин": "НИЧЕГО", "твор": "НИЧЕМ", "пред": "О НИЧЁМ" }},
                "ХАОС": { cases: { "им": "ХАОС", "род": "ХАОСА", "дат": "ХАОСУ", "вин": "ХАОС", "твор": "ХАОСОМ", "пред": "О ХАОСЕ" }},
                "ПОРЯДОК": { cases: { "им": "ПОРЯДОК", "род": "ПОРЯДКА", "дат": "ПОРЯДКУ", "вин": "ПОРЯДОК", "твор": "ПОРЯДКОМ", "пред": "О ПОРЯДКЕ" }}
            }
        };
    }

    // Простая нейросеть для генерации фраз
    setupAI() {
        this.markovChains = this.createMarkovChains();
    }

    // Создание марковских цепей
    createMarkovChains() {
        const chains = {};
        
        this.trainingData.forEach(phrase => {
            const words = phrase.split(' ');
            
            for (let i = 0; i < words.length - 1; i++) {
                const currentWord = words[i];
                const nextWord = words[i + 1];
                
                if (!chains[currentWord]) {
                    chains[currentWord] = [];
                }
                chains[currentWord].push(nextWord);
            }
        });
        
        return chains;
    }

    // Генерация новой фразы
    generatePhrase() {
        // 40% chance использовать марковские цепи, 60% - грамматическую генерацию
        if (Math.random() < 0.4 && Object.keys(this.markovChains).length > 0) {
            return this.generateMarkovPhrase();
        } else {
            return this.generateGrammarPhrase();
        }
    }

    // Генерация фразы с помощью марковских цепей
    generateMarkovPhrase() {
        let phrase = [];
        const startWords = ["Я", "МОЗГИ", "ПРОЁБ", "ДЕГЕНЕРАЦИЯ", "РАЗУМ"];
        let currentWord = startWords[Math.floor(Math.random() * startWords.length)];
        
        phrase.push(currentWord);
        
        // Генерируем до 8 слов
        for (let i = 0; i < 7; i++) {
            const nextWords = this.markovChains[currentWord];
            if (!nextWords || nextWords.length === 0) break;
            
            currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
            phrase.push(currentWord);
            
            // Останавливаемся если попали на точку или восклицательный знак
            if (currentWord.includes('.') || currentWord.includes('!')) break;
        }
        
        return phrase.join(' ');
    }

    // Генерация фразы с правильной грамматикой
    generateGrammarPhrase() {
        const templates = [
            // Простые утверждения
            () => `${this.getSubject("Я")} ${this.getVerb("ПРОЁБЫВАТЬ", "я", "наст")} ${this.getObject("ВСЁ", "вин")}`,
            () => `${this.getSubject("МОЗГИ")} ${this.getVerb("ОТСУТСТВОВАТЬ", "они", "наст")}`,
            () => `${this.getSubject("Я")} ${this.getVerb("СОЗДАВАТЬ", "я", "наст")} ${this.getObject("ХАОС", "вин")}`,
            
            // С прилагательными
            () => `${this.getSubject("Я")} - ${this.getAdjective("КОНЧЕНЫЙ", "м", "им")} ${this.getSubject("ДЕГЕНЕРАТ", "им")}`,
            () => `${this.getAdjective("БЕЗМОЗГЛЫЙ", "ж", "им")} ${this.getSubject("ЖИЗНЬ")} - ${this.getAdjective("СВОБОДНЫЙ", "ж", "им")} ${this.getSubject("ЖИЗНЬ")}`,
            
            // Сложные конструкции
            () => `${this.getSubject("Я")} ${this.getVerb("ПРОЁБЫВАТЬ", "я", "наст")} ${this.getObject("ВСЁ", "вин")}, ${this.getSubject("ЧТО")} ${this.getVerb("МОЧЬ", "я", "наст")}`,
            () => `${this.getSubject("ДЕГЕНЕРАЦИЯ")} ${this.getVerb("ДОСТИГАТЬ", "она", "наст")} ${this.getAdjective("КРИТИЧЕСКИЙ", "ж", "род")} ${this.getSubject("МАССА", "род")}`,
            
            // Философские
            () => `${this.getSubject("РАЗУМ")} - ${this.getAdjective("ЛИШНИЙ", "м", "им")} ${this.getSubject("ПЕРЕЖИТОК", "им")}`,
            () => `${this.getSubject("ПРОЁБ")} - ${this.getAdjective("НЕ", "м", "им")} ${this.getSubject("ПРОБЛЕМА", "им")}, ${this.getAdjective("ЭТО", "м", "им")} ${this.getSubject("СТИЛЬ", "им")} ${this.getSubject("ЖИЗНЬ", "род")}`
        ];
        
        const template = templates[Math.floor(Math.random() * templates.length)];
        return template();
    }

    // Получение субъекта в нужном падеже
    getSubject(word, caseType = "им") {
        const subject = this.grammar.subjects[word];
        if (subject && subject.cases[caseType]) {
            return subject.cases[caseType];
        }
        return word;
    }

    // Получение глагола в нужном времени и лице
    getVerb(verb, person = "я", tense = "наст") {
        const verbData = this.grammar.verbs[verb];
        if (verbData && verbData.tenses[tense] && verbData.tenses[tense][person]) {
            return verbData.tenses[tense][person];
        }
        return verb;
    }

    // Получение прилагательного в нужном роде и падеже
    getAdjective(adjective, gender = "м", caseType = "им") {
        const adjData = this.grammar.adjectives[adjective];
        if (adjData && adjData.cases[caseType] && adjData.cases[caseType][gender]) {
            return adjData.cases[caseType][gender];
        }
        return adjective;
    }

    // Получение объекта в нужном падеже
    getObject(object, caseType = "вин") {
        const objData = this.grammar.objects[object];
        if (objData && objData.cases[caseType]) {
            return objData.cases[caseType];
        }
        return object;
    }

    // Создание интерфейса для AI
    setupUI() {
        // Проверяем, не добавлен ли уже AI
        if (document.querySelector('.ai-ezhan-container')) {
            console.log('🤖 AI Ежан уже активирован');
            return;
        }

        // Создаём контейнер для AI
        const aiContainer = document.createElement('div');
        aiContainer.className = 'ai-ezhan-container';
        aiContainer.style.textAlign = 'center';
        aiContainer.style.margin = '30px 0';
        aiContainer.style.padding = '20px';
        aiContainer.style.background = 'var(--bg-card)';
        aiContainer.style.border = '1px solid var(--accent-red)';
        aiContainer.style.borderRadius = '10px';
        aiContainer.style.position = 'relative';
        aiContainer.style.overflow = 'hidden';

        // Заголовок AI
        const aiTitle = document.createElement('h3');
        aiTitle.className = 'ai-title';
        aiTitle.innerHTML = '🤖 AI ЕЖАН ГОВОРИТ:';
        aiTitle.style.color = 'var(--accent-red)';
        aiTitle.style.marginBottom = '15px';
        aiTitle.style.textTransform = 'uppercase';
        aiTitle.style.letterSpacing = '1px';

        // Контейнер для фразы
        const aiPhrase = document.createElement('div');
        aiPhrase.className = 'ai-phrase';
        aiPhrase.style.fontSize = '1.2rem';
        aiPhrase.style.fontWeight = '600';
        aiPhrase.style.color = 'var(--text-primary)';
        aiPhrase.style.minHeight = '60px';
        aiPhrase.style.display = 'flex';
        aiPhrase.style.alignItems = 'center';
        aiPhrase.style.justifyContent = 'center';
        aiPhrase.style.padding = '15px';
        aiPhrase.style.background = 'rgba(255, 51, 51, 0.05)';
        aiPhrase.style.borderRadius = '5px';
        aiPhrase.style.border = '1px solid var(--border-color)';
        aiPhrase.style.marginBottom = '20px';
        aiPhrase.innerHTML = 'НАЖМИ КНОПКУ ЧТОБЫ ПОРОЖДАТЬ ДЕГЕНЕРАТИВНЫЕ ФРАЗЫ';

        // Кнопка генерации
        const aiButton = document.createElement('button');
        aiButton.className = 'btn btn-primary ai-ezhan-btn';
        aiButton.innerHTML = '🤖 AI ЕЖАН: ГЕНЕРИРОВАТЬ ФРАЗУ';
        aiButton.style.margin = '0 auto';
        aiButton.style.display = 'block';
        aiButton.style.padding = '12px 24px';
        aiButton.style.fontSize = '1rem';
        aiButton.style.fontWeight = '600';

        // Собираем интерфейс
        aiContainer.appendChild(aiTitle);
        aiContainer.appendChild(aiPhrase);
        aiContainer.appendChild(aiButton);

        // Добавляем на главную страницу после цитат
        const quotesSection = document.querySelector('.quotes-section');
        if (quotesSection) {
            quotesSection.parentNode.insertBefore(aiContainer, quotesSection.nextSibling);
        }

        // Обработчик кнопки
        aiButton.addEventListener('click', () => {
            this.generateAndDisplayPhrase(aiPhrase, aiButton);
        });

        // Автогенерация при загрузке
        setTimeout(() => {
            this.generateAndDisplayPhrase(aiPhrase, aiButton);
        }, 1000);

        console.log('🤖 AI ЕЖАН активирован!');
    }

    // Генерация и отображение фразы
    generateAndDisplayPhrase(phraseElement, button) {
        // Анимация загрузки
        phraseElement.style.opacity = '0.5';
        phraseElement.innerHTML = '🤖 AI ЕЖАН ДУМАЕТ...';
        
        button.disabled = true;
        button.innerHTML = '🤖 ГЕНЕРАЦИЯ...';
        
        // Имитация "думания" AI
        setTimeout(() => {
            const newPhrase = this.generatePhrase();
            
            // Анимация появления
            phraseElement.style.opacity = '0';
            setTimeout(() => {
                phraseElement.innerHTML = newPhrase;
                phraseElement.style.opacity = '1';
                phraseElement.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    phraseElement.style.transform = 'scale(1)';
                }, 200);
            }, 50);
            
            button.disabled = false;
            button.innerHTML = '🤖 AI ЕЖАН: ГЕНЕРИРОВАТЬ ФРАЗУ';
            
            // Вибрация и уведомление
            if (navigator.vibrate) navigator.vibrate(50);
            
            // Показываем уведомление
            if (window.NotificationManager) {
                NotificationManager.show('🤖 AI ЕЖАН СОЗДАЛ НОВУЮ ФРАЗУ!', 'success');
            }
            
        }, 800 + Math.random() * 800);
    }
}

// Инициализация AI Ежана
document.addEventListener('DOMContentLoaded', function() {
    // Защита от множественной инициализации
    if (window.aiEzhanInstance) {
        console.log('🤖 AI Ежан уже запущен');
        return;
    }
    
    setTimeout(() => {
        try {
            window.aiEzhanInstance = new AIEzhan();
        } catch (error) {
            console.error('❌ Критическая ошибка AI:', error);
        }
    }, 1000);
});