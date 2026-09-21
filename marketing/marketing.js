let currentLang = localStorage.getItem('pref_lang');

if (!currentLang) {
    const browserLang = navigator.language || navigator.userLanguage;
    currentLang = browserLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pref_lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    const langText = document.getElementById('lang-text');
    if (langText) langText.textContent = lang === 'pt' ? 'EN' : 'PT';

    // 1. Mapeamento dos arquivos PDF da trilha de Marketing por ID
    const pdfLinks = {
        'resume-link': `curriculo_marketing_${lang}.pdf`,
        'copy-link': `portfolio_copy_${lang}.pdf`,
        'photo-link': `portfolio_fotografia_${lang}.pdf`
    };

    Object.entries(pdfLinks).forEach(([id, fileName]) => {
        const linkEl = document.getElementById(id);
        if (linkEl) {
            linkEl.href = `/tshaped/${fileName}`;
        }
    });

    // 2. Atualização genérica de links via atributos no HTML (data-pt-href / data-en-href)
    document.querySelectorAll('[data-pt-href]').forEach(el => {
        const targetHref = el.getAttribute(`data-${lang}-href`);
        if (targetHref) {
            el.href = targetHref;
        }
    });

    // 3. Tradução dos textos visíveis
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

function shareMarketing() {
    const isPt = currentLang === 'pt';
    
    const shareData = {
        title: 'Aryel Evelin | Marketing & Ads Portfolio',
        text: isPt 
            ? 'Confira o portfólio de Marketing, Growth, Ads e Storytelling de Aryel Evelin.' 
            : 'Explore Aryel Evelin\'s Marketing, Growth, Ads, and Storytelling portfolio.',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    } else {
        navigator.clipboard.writeText(shareData.url);
        const alertMsg = isPt 
            ? 'Link do portfólio de Marketing copiado para a área de transferência!' 
            : 'Marketing portfolio link copied to clipboard!';
        alert(alertMsg);
    }
}

document.addEventListener('DOMContentLoaded', () => updateLanguage(currentLang));
