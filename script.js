let currentLang = localStorage.getItem('pref_lang');

if (!currentLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pref_lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.getElementById('lang-text').textContent = lang === 'pt' ? 'EN' : 'PT';

    const resumeLink = document.getElementById('resume-link');

    if (lang === 'pt') {
        if (resumeLink) resumeLink.href = '../curriculo_pt.pdf';
    } else {
        if (resumeLink) resumeLink.href = '../curriculo_en.pdf';
    }

    document.querySelectorAll('[data-pt]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });
}

function toggleLanguage() {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    updateLanguage(newLang);
}

function shareTech() {
    const isPt = currentLang === 'pt';
    
    const shareData = {
        title: 'Aryel Evelin | Tech & Product Portfolio',
        text: isPt 
            ? 'Confira o portfólio Tech, Produto, Processos (BPMN) e IA de Aryel Evelin.' 
            : 'Explore Aryel Evelin\'s Tech, Product Management, BPMN, and AI portfolio.',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareData.url);
        const alertMsg = isPt 
            ? 'Link do portfólio Tech copiado para a área de transferência!' 
            : 'Tech portfolio link copied to clipboard!';
        alert(alertMsg);
    }
}

document.addEventListener('DOMContentLoaded', () => updateLanguage(currentLang));
