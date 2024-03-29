
(async () => {
  const replaceOnDocument = (pattern, string, {target = document.body} = {}) => {
    [
      target,
      ...target.querySelectorAll("*:not(script):not(noscript):not(style)")
    ].forEach(({childNodes: [...nodes]}) => nodes
      .filter(({nodeType}) => nodeType === Node.TEXT_NODE)
      .forEach((textNode) => textNode.textContent = textNode.textContent.replace(pattern, string)));
  };
  let lang = localStorage.getItem('lang') || navigator.language || navigator.userLanguage || 'en';
  const allowed = ['en', 'pt-BR'];
  if (!allowed.includes(lang)) lang = 'en';

  document.body.classList.add(lang);

  if (lang === 'en') return;

  const dictionary = await (await fetch(`./lang/${lang}.json`)).json();
  if (dictionary) {
    Object.keys(dictionary).forEach((key) => {
      replaceOnDocument(key, dictionary[key]);
    });
  }
})();

const setLang = (lang) => {
  localStorage.setItem('lang', lang);
  window.location.reload();
}