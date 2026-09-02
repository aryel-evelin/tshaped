// Gerenciamento de Idioma e Links Locais Dinâmicos (PT | EN)
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

// Funções de Compartilhamento Inteligente
function shareLink() {
    const shareData = {
        title: 'Aryel Evelin | Tech, Produto, Processos & IA',
        text: 'Technical Product Manager. Especialista em mapeamento BPMN premiado, conformidade LGPD, atuação T-Shaped, integração de IA e automação.',
        url: 'https://aryel-evelin.github.io/portfolio/tech/'
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareData.url);
        const alertMsg = document.documentElement.lang === 'pt-BR' 
            ? 'Link copiado para a área de transferência!' 
            : 'Link copied to clipboard!';
        alert(alertMsg);
    }
}

// Aplica o idioma ao carregar a página
document.addEventListener('DOMContentLoaded', () => updateLanguage(currentLang));