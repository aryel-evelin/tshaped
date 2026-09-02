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

    // Alterna o link do currículo de acordo com o idioma ativo
    if (lang === 'pt') {
        if (resumeLink) resumeLink.href = './curriculo_pt.pdf';
    } else {
        if (resumeLink) resumeLink.href = './curriculo_en.pdf';
    }

    // Traduz os textos com atributos data-pt e data-en
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

function shareHub() {
    const isPt = currentLang === 'pt';
    
    const shareData = {
        title: 'Aryel Evelin | T-Shaped Portfolio',
        text: isPt 
            ? 'A conexão definitiva entre Produto, Tecnologia e Marketing. Conheça o portfólio T-Shaped de Aryel Evelin.' 
            : 'The ultimate connection between Product, Technology, and Marketing. Explore Aryel Evelin\'s T-Shaped portfolio.',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareData.url);
        const alertMsg = isPt 
            ? 'Link do Hub copiado para a área de transferência!' 
            : 'Hub link copied to clipboard!';
        alert(alertMsg);
    }
}

document.addEventListener('DOMContentLoaded', () => updateLanguage(currentLang));
