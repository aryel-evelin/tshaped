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
    const resumeLinkBottom = document.getElementById('resume-link-bottom');

    // Altera rigorosamente para o currículo em Português ou Inglês conforme o idioma selecionado
    if (lang === 'pt') {
        if (resumeLink) resumeLink.href = 'curriculo_pt.pdf';
        if (resumeLinkBottom) resumeLinkBottom.href = 'curriculo_pt.pdf';
    } else {
        if (resumeLink) resumeLink.href = 'curriculo_en.pdf';
        if (resumeLinkBottom) resumeLinkBottom.href = 'curriculo_en.pdf';
    }

    // Traduz todos os textos da página que possuem data-pt e data-en
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

document.addEventListener('DOMContentLoaded', () => updateLanguage(currentLang));
