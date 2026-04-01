// 🇰🇿 8 ПСИХОЛОГИЯЛЫҚ ТЕСТ
const tests = [
    {
        id: 1,
        title: "Айзенка тесті",
        description: "Сіз экстраверт пе, интроверт пе - білесіз бе?",
        duration: "10 мин",
        questions: [
            "Мен назар орталығында болғанды ұнатамын",
            "Маңызды оқиғалар алдында ұйқыма келе алмаймын",
            "Шулы компаниялардан гөрі жалғыздықты жақсы көремін",
            "Кішкентай істерге де алаңдаймын",
            "Жаңа адамдармен тез танысамын"
        ]
    },
    {
        id: 2,
        title: "Стресс деңгейі",
        description: "Өткен аптадағы стресс деңгейіңізді бағалаңыз",
        duration: "7 мин",
        questions: [
            "Бұлшықеттерімде кернеу сезімдедім",
            "Ұйқы мәселелерім болды",
            "Ашулымды басып қиын болды",
            "Назар аудару қиын болды",
            "Шаршағандық сездім"
        ]
    },
    {
        id: 3,
        title: "Эмоционалдық интеллект",
        description: "Эмоцияларды түсіну қабілетіңізді тексеріңіз",
        duration: "12 мин",
        questions: [
            "Басқа адамдардың эмоцияларын оңай түсінемін",
            "Дау кезінде эмоцияларымды бақылаймын",
            "Мақсатқа жету үшін өзімді ынталандыра аламын",
            "Өзгерістерге бейімделемін",
            "Адамдармен жақсы қарым-қатынас құрамын"
        ]
    },
    {
        id: 4,
        title: "Аңқаулық тесті",
        description: "Сіздің аңқаулығыңыздың деңгейін анықтаңыз",
        duration: "8 мин",
        questions: [
            "Жоспарсыз жұмыс істеу қиын",
            "Детальдарды есте сақтаймын",
            "Уақытты дұрыс бөле аламын",
            "Шағын тапсырмаларды орындау қиын",
            "Ұйымдастырылған болғанды ұнатамын"
        ]
    },
    {
        id: 5,
        title: "Өзін-өзі бағалау",
        description: "Өз қабілеттеріңізге деген сенімділікті тексеріңіз",
        duration: "9 мин",
        questions: [
            "Мен өзімді басқалардан жоғары бағалаймын",
            "Сәтсіздіктерден қорқамын",
            "Өз шешімдеріме сенемін",
            "Критикаға сезімталмын",
            "Мен табысты адаммын"
        ]
    },
    {
        id: 6,
        title: "Депрессия белгілері",
        description: "Депрессияға бейімділігіңізді бағалаңыз",
        duration: "10 мин",
        questions: [
            "Өмірге қызығушылығым төмендеді",
            "Ұйқы мәселелерім бар",
            "Ештеңеге күш таппаймын",
            "Өзімді кінәлі сезінемін",
            "Болашаққа сенімсізмін"
        ]
    },
    {
        id: 7,
        title: "Креативтілік деңгейі",
        description: "Шығармашылық қабілетіңізді өлшеңіз",
        duration: "11 мин",
        questions: [
            "Жаңа идеялар ойлап табамын",
            "Ырымға берілмеймін",
            "Күрделі мәселелерді шешемін",
            "Көп нәрсенің арасында байланыс табамын",
            "Шығармашылықпен айналысуды ұнатамын"
        ]
    },
    {
        id: 8,
        title: "Сезімталдық тесті",
        description: "Сіздің сезімталдығыңыз қаншалықты жоғары?",
        duration: "8 мин",
        questions: [
            "Басқалардың көңіл-күйін сеземін",
            "Шулы ортада шаршаймын",
            "Критиканы қатты қабылдаймын",
            "Эмоционалды фильмдерге берілемін",
            "Адамдардың ниетін түсінемін"
        ]
    }
];

// Переменные
let currentTest = null, currentQuestion = 0, userAnswers = [];
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser') || null;
let userResults = currentUser && users[currentUser] ? users[currentUser].results || [] : [];
let userProfile = currentUser && users[currentUser] ? users[currentUser] : { name: 'Қонақ', testsCount: 0 };

// ✅ ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('test-window').style.display = 'none';
    initAll();

    document.getElementById('authModal').addEventListener('click', function (e) {
        if (e.target === this) this.style.display = 'none';
    });
});

function initAll() {
    initTests();
    initNavigation();
    initProfile();
    initResults();
    updateAuthUI();
}

// 🇰🇿 ҚАЗАҚША ФУНКЦИЯЛАР
function toggleAuthModal() { document.getElementById('authModal').style.display = 'flex'; }

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
}

function registerUser() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    if (!name || !email || !password) return alert('Барлық өрістерді толтырыңыз!');
    if (users[email]) return alert('Бұл email арқылы тіркелу бар!');
    users[email] = { name, password, results: [], testsCount: 0, avgScore: 0 };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Тіркелу сәтті! Енді кіріңіз.'); switchAuthTab('login');
}

function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    if (users[email]?.password === password) {
        currentUser = email; localStorage.setItem('currentUser', email);
        userProfile = users[email]; userResults = userProfile.results;
        document.getElementById('authModal').style.display = 'none';
        updateAuthUI(); initProfile(); initResults(); alert('Сәтті кірдіңіз!');
    } else alert('Қате email немесе құпиясөз!');
}

function demoLogin() {
    currentUser = 'guest'; userProfile = { name: 'Қонақ', testsCount: 0, results: [] };
    localStorage.setItem('currentUser', 'guest');
    document.getElementById('authModal').style.display = 'none';
    updateAuthUI(); initProfile();
}

function updateAuthUI() {
    document.getElementById('authNav').innerHTML = currentUser ?
        `<a href="#" class="nav-link" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Шығу</a>` :
        `<a href="#" class="nav-link" onclick="toggleAuthModal()"><i class="fas fa-sign-in-alt"></i> Кіру</a>`;
}

function logout() {
    currentUser = null; localStorage.removeItem('currentUser');
    userProfile = { name: 'Қонақ', testsCount: 0 }; userResults = [];
    updateAuthUI(); initProfile(); initResults();
}

// Тесттер
function initTests() {
    document.getElementById('testsGrid').innerHTML = tests.map(t => `
        <div class="test-card" onclick="startTest(${t.id})">
            <h3>${t.title}</h3><p>${t.description}</p>
            <div class="duration"><i class="fas fa-clock"></i> ${t.duration}</div>
        </div>`).join('');
}

function startTest(id) {
    currentTest = tests.find(t => t.id === id);
    currentQuestion = 0; userAnswers = [];
    document.getElementById('testTitle').textContent = currentTest.title;
    showQuestion();
    showSection('test-window');
}

function showQuestion() {
    const q = currentTest.questions[currentQuestion];
    document.getElementById('questionContainer').innerHTML = `
        <div class="question">${currentQuestion + 1}. ${q}</div>
        <div class="answers">
            ${[1, 2, 3, 4, 5].map(a => `<div class="answer-option" onclick="selectAnswer(${a})">${a} - ${getAnswerText(a)}</div>`).join('')}
        </div>`;
    document.getElementById('questionCounter').textContent = `${currentQuestion + 1}/${currentTest.questions.length}`;
    updateProgress(); updateButtons();
    document.querySelector('.test-controls').style.display = 'flex';
}

function getAnswerText(a) {
    return {
        1: 'Маған мүлде ұқсамайды',
        2: 'Әдетте ұқсамайды',
        3: 'Кейде болады',
        4: 'Әдетте ұқсайды',
        5: 'Толық маған ұқсайды'
    }[a];
}

function selectAnswer(answer) {
    userAnswers[currentQuestion] = answer;
    document.querySelectorAll('.answer-option').forEach((o, i) => o.classList.toggle('selected', i + 1 === answer));
    updateButtons();
}

function nextQuestion() {
    if (!userAnswers[currentQuestion]) return alert('Жауап таңдаңыз!');
    if (currentQuestion < currentTest.questions.length - 1) {
        currentQuestion++; showQuestion();
    } else {
        showTestResult();
    }
}

function previousQuestion() { if (currentQuestion > 0) { currentQuestion--; showQuestion(); } }

function updateButtons() {
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.innerHTML = currentQuestion === currentTest.questions.length - 1 ? '✅ Тестті аяқтау' : 'Келесі →';
    nextBtn.className = 'btn btn-primary';
    nextBtn.disabled = false;
}

function updateProgress() {
    document.getElementById('progressBar').style.width = `${((currentQuestion + 1) / currentTest.questions.length) * 100}%`;
}

// 🇰🇿 ЖАҢА 8 ТЕСТ ПІШІМІНДЕ НӘТИЖЕЛЕР
function showTestResult() {
    const score = userAnswers.reduce((a, b) => a + b, 0);
    const max = currentTest.questions.length * 5;
    const percent = Math.round(score / max * 100);

    const result = { testId: currentTest.id, title: currentTest.title, score, maxScore: max, percentage: percent, date: new Date().toLocaleDateString('kk-KZ') };
    userResults.unshift(result); userProfile.testsCount++;
    userProfile.avgScore = Math.round(userResults.reduce((s, r) => s + r.percentage, 0) / userResults.length);

    if (currentUser && currentUser !== 'guest') {
        users[currentUser] = userProfile; localStorage.setItem('users', JSON.stringify(users));
    }

    document.getElementById('questionContainer').innerHTML = `
        <div style="text-align:center;padding:3rem 2rem;">
            <div style="font-size:4rem;color:#10b981;margin:1rem 0;">${percent}%</div>
            <h3 style="color:#1a202c;margin:1rem 0;">${currentTest.title}</h3>
            <div style="color:#64748b;font-size:1.2rem;margin:1rem 0;">${score}/${max} балл</div>
            <div style="background:#f0fdf4;padding:2rem;border-radius:20px;border-left:5px solid #10b981;margin:2rem 0;">
                <h4 style="color:#166534;margin-bottom:1rem;">📊 Сіздің нәтижеңіз:</h4>
                <p style="color:#065f46;font-size:1.1rem;line-height:1.6;">${getResultText(percent, currentTest.id)}</p>
            </div>
            <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="goToResults()" style="background:linear-gradient(135deg,#10b981,#059669)!important;">
                    📈 Барлық нәтижелер
                </button>
                <button class="btn btn-secondary" onclick="closeTest()">
                    ➡️ Жаңа тест
                </button>
            </div>
        </div>`;

    document.querySelector('.test-controls').style.display = 'none';
}

function getResultText(percent, testId) {
    switch (testId) {
        case 1: // Айзенк
            if (percent >= 70) return "🎉 **ЭКСТРАВЕРТ!** Сіз өте ашық, энергиялы және адамдармен араласқанды жақсы көресіз. Назар орталығында болу сізге күш береді, жаңа ортаға тез бейімделесіз.";
            if (percent >= 40) return "⚖️ **АМБИВЕРТ.** Сіздің бойыңызда интроверттің де, экстраверттің де қасиеттері тең сақталған. Жағдайға байланысты әрі белсенді, әрі тыныш бола аласыз.";
            return "🤫 **ИНТРОВЕРТ.** Сіз ішкі жан дүниеңіздің тыныштығын бағалайсыз. Жалғыз қалып ой сергіту сізге жайлылық сыйлайды, жақын достардың шағын ортасын қалайсыз.";

        case 2: // Стресс
            if (percent >= 70) return "⚠️ **ЖОҒАРЫ СТРЕСС!** Қазіргі уақытта сіздің жүйке жүйеңізге үлкен салмақ түсіп тұр. Психологиялық шаршауды болдырмау үшін дереу демалып, ұйқы режимін қалпына келтіруіңіз қажет.";
            if (percent >= 40) return "📊 **ОРТАША ДЕҢГЕЙ.** Сізде аздаған мазасыздық бар, бірақ оны бақылауда ұстап отырсыз. Көбірек демалып, өзіңізге ұнайтын істермен айналысу арқылы стрессті азайтуға болады.";
            return "✅ **ТӨМЕН СТРЕСС.** Психологиялық жағдайыңыз өте тұрақты! Сіз қиындықтарға сабырмен қарайсыз және эмоцияңызды басқара аласыз. Осы қалыпты сақтаңыз.";

        case 3: // Эмоционалдық IQ
            if (percent >= 70) return "⭐ **ЖОҒАРЫ EQ!** Сіз өз эмоцияларыңызды және өзгелердің көңіл-күйін өте жақсы түсінесіз. Бұл қасиет сізге қарым-қатынаста және мансапта үлкен жетістіктерге жетуге көмектеседі.";
            if (percent >= 40) return "📈 **ОРТАША ДЕҢГЕЙ.** Эмоцияларды түсіну қабілетіңіз жақсы, бірақ кейде сезімге ерік беріп қоясыз. Эмпатия мен сезімді басқару бойынша әлі де ізденуге болады.";
            return "📚 **ТӨМЕН EQ.** Сізге эмоцияларды тану және оларды сыртқа дұрыс шығару бойынша жұмыс істеу керек. Психологиялық әдебиеттер оқу сіздің айналаңызбен қарым-қатынасыңызды жақсартады.";

        case 4: // Аңқаулық (Еркіндік vs Тұрақтылық)
            if (percent <= 30) return "🧠 **ТҰРАҚТЫ!** Сіз өте ұйымшыл, жинақы және әр қадамыңызды жоспарлайтын адамсыз. Жауапкершілік пен тәртіп — сіздің басты қаруыңыз.";
            if (percent <= 60) return "📋 **ОРТАША.** Кейде жоспармен жүресіз, бірақ кейде жағдайға байланысты шешім қабылдайсыз. Өмірдің әр саласында жүйелілікті арттыру пайдалы болады.";
            return "🎯 **ЕРКІН ОЙЛАУШЫ!** Сіз қатаң ережелерді ұнатпайсыз, икемдісіз және сәтпен өмір сүргенді қалайсыз. Импровизация жасауға шеберсіз.";

        case 5: // Өзін-өзі бағалау
            if (percent >= 70) return "💎 **ЖОҒАРЫ СЕНІМДІЛІК!** Сіз өзіңіздің құндылығыңызды білесіз, сынға төзімдісіз және мақсатқа нық қадам басасыз. Өзіне сенетін мықты тұлғасыз.";
            if (percent >= 40) return "⚖️ **ОРТАША.** Өзіңізге деген сенімділік бар, бірақ кейде өз қабілетіңізге күмән келтіресіз. Жетістіктеріңізді жиі еске алып, өзіңізді көбірек мақтаңыз.";
            return "📈 **ТӨМЕН.** Өзіңізді тым қатты сынға аласыз. Өз-өзіңізді қабылдау және ішкі сенімділікті арттыру үшін психологиялық жаттығулар жасау ұсынылады.";

        case 6: // Депрессия
            if (percent <= 30) return "✅ **ПСИХИКАЛЫҚ ДЕНСАУЛЫҚ!** Көңіл-күйіңіз орнықты, өмірге деген құштарлығыңыз жоғары. Психологиялық тұрғыдан өзіңізді өте жақсы сезінесіз.";
            if (percent <= 60) return "⚠️ **НАЗАР АУДАРЫҢЫЗ.** Соңғы кездері сізде шаршау немесе мұңайу белгілері байқалады. Көбірек демалып, жақын адамдарыңызбен сөйлесіп, көңіліңізді көтеруге тырысыңыз.";
            return "🚨 **МАҢЫЗДЫ!** Сізде депрессияның айқын белгілері байқалады (ұйқысыздық, аппатия). Өзіңізге көмектесу үшін психолог маманымен кеңесуді ұсынамыз.";

        case 7: // Креативтілік
            if (percent >= 70) return "🎨 **КРЕАТИВТІ ГЕНИЙ!** Сіздің ойлау қабілетіңіз стандартты емес. Кез келген мәселенің ерекше шешімін таба аласыз. Шығармашылықпен айналысуды тоқтатпаңыз!";
            if (percent >= 40) return "✨ **ШЫҒАРМАШЫЛЫҚ ӘЛЕУЕТ.** Сіздің қиялыңыз жақсы дамыған, бірақ оны іс жүзінде қолдануға кейде батылыңыз бармайды. Жаңа идеяларды жүзеге асырудан қорықпаңыз.";
            return "📚 **РАЦИОНАЛДЫ ОЙЛАУШЫ.** Сіз нақтылық пен логиканы бірінші орынға қоясыз. Креативтілікті арттыру үшін миға шабуыл жасап, күнделікті істерге жаңаша қарауға тырысыңыз.";

        case 8: // Сезімталдық
            if (percent >= 70) return "🌸 **ЖОҒАРЫ СЕЗІМТАЛДЫҚ.** Сіз өте нәзік, сезімтал жансыз. Өзгелердің ауырсынуын өз жаныңыздай сезінесіз (эмпат). Эмоционалдық гигиенаны сақтауыңыз маңызды.";
            if (percent >= 40) return "⚖️ **ОРТАША СЕЗІМТАЛДЫҚ.** Сіз эмоция мен логиканы тең ұстайсыз. Адамдарды түсіне білесіз, бірақ өзіңізді артық сезімге билетпейсіз.";
            return "🛡️ **ТӨЗІМДІ ТҰЛҒА.** Сіз эмоцияға берілмейсіз, суыққандысыз және рационалдысыз. Қиын сәттерде басыңызды жоғалтпай, тек фактілерге сүйеніп шешім қабылдайсыз.";
    }
}



function goToResults() { showSection('results'); }
function closeTest() { showSection('tests'); }

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    const targetSection = document.getElementById(id);
    targetSection.classList.add('active');
    targetSection.style.display = 'block';

    if (id === 'profile') initProfile();
    if (id === 'results') initResults();
    if (id === 'tests') initTests();

    if (!currentUser && !['home', 'tests'].includes(id)) {
        toggleAuthModal();
        showSection('home');
    }
}

function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            setActiveNav(this);
            document.querySelector('.nav-menu')?.classList.remove('active');
        });
    });
    document.querySelector('.hamburger')?.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}

function setActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function initProfile() {
    document.getElementById('userName').textContent = userProfile.name;
    document.getElementById('userTests').textContent = userProfile.testsCount;
    document.getElementById('userAvgScore').textContent = userProfile.avgScore || 0;
}

function toggleEditProfile() {
    document.getElementById('profileForm').style.display =
        document.getElementById('profileForm').style.display === 'none' ? 'block' : 'none';
}

function saveProfile() {
    userProfile.name = document.getElementById('editName').value.trim() || userProfile.name;
    if (currentUser && currentUser !== 'guest') {
        users[currentUser].name = userProfile.name;
        localStorage.setItem('users', JSON.stringify(users));
    }
    initProfile(); toggleEditProfile();
}

// script.js - initResults функциясын жаңарту

function initResults() {
    const list = document.getElementById('resultsList');

    // Егер нәтижелер жоқ болса
    if (!userResults || userResults.length === 0) {
        list.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:4rem;color:#64748b;"><i class="fas fa-chart-bar" style="font-size:4rem;opacity:.5;"></i><p>Әзірге нәтижелер жоқ. Тест өтіңіз!</p></div>';
        return;
    }

    // Нәтижелер бар болса, карталарды шығарамыз
    list.innerHTML = userResults.map(r => {
        // Кеңесті алу (getResultText функциясын қолданамыз)
        // r.percentage - пайыз, r.testId - тесттің ID-сі
        let advice = getResultText(r.percentage, r.testId);

        // Мәтіндегі жұлдызшаларды (**) қарайтып көрсету (bold) үшін HTML-ге ауыстырамыз
        advice = advice.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        return `
        <div class="result-card">
            <h4>${r.title}</h4>
            <div class="result-header">
                <div class="result-score">${r.score}/${r.maxScore}</div>
                <div class="result-percentage">${r.percentage}%</div>
            </div>
            <small class="result-date">${r.date}</small>
            
            <div class="result-advice">
                ${advice}
            </div>
        </div>`;
    }).join('');
}