
const languagesG = [{
  locale: 'en',
  lang: 'English',
}];

const defaultLocale = 'en';
const defaultLang = 'English';

const localeG = localStorage.getItem('locale') || defaultLocale;

const getLanguage = (languages, locale) => {
    for (let index = 0; index < languages.length; index++) {
      const lang = languages[index];
      if (lang.locale === locale) {
        return lang.lang;
      }
    }
    return null;
  };


const state = {
  locale: localeG,
  lang: defaultLang,
  languages: languagesG,
  loadedLangs: [],
};


// getters
const getters = {
  lang: states => states.lang,
  locale: states => states.locale,
  languages: states => states.languages,
  loadedLangs: states => states.loadedLangs,
};

// actions
const actions = {
    setLang({ commit }, locale) {
        commit('SET_LANG', locale);
      },
};

const mutations = {
    SET_LANG(states, locale) {
        states.lang = getLanguage(states.languages, locale) || defaultLang;
        states.locale = locale;
        states.loadedLangs.push(locale);
        localStorage.setItem('locale', locale);
        // app.$i18n.locale = locale;
        // document.title = app.$t(app.$route.meta.i18n_title);
      },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
