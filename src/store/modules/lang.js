import app from '@/main';
import jsonUtils from '@/lib/json';

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
  getLangMap({ commit, dispatch }) {
    jsonUtils.getJsonFromUrl(`lang/map.json`).then((json) => {
      const langs = Object.assign([], languagesG);
      const langMap = json.map;
      if (langMap) {
        const locales = Object.keys(langMap);
        locales.forEach((locale) => {
          if (!getLanguage(langs, locale)) {
            langs.push({ locale, lang: langMap[locale] });
          }
        });
      }
      commit('SET_LANG_MAP', langs);
      dispatch('setLang', state.locale);
    }).catch(() => {});
  },
  setLang({ commit }, locale) {
    if (!state.loadedLangs.includes(locale)) {
      jsonUtils.getJsonFromUrl(`lang/${locale}.json`).then((l) => {
        // if(locale === 'en') {
        //   jsonUtils.getJsonFromUrl(`lang/gen/${locale}.json`).then((m) => {
        //     const langs = merge({}, m, l);
        //     app.$i18n.setLocaleMessage(locale, langs);
        //     commit('SET_LANG', locale);
        //   }).catch(() => {
        //     const langs = l;
        //     app.$i18n.setLocaleMessage(locale, langs);
        //     commit('SET_LANG', locale);
        //   });
        // } else {
          const langs = l;
          app.$i18n.setLocaleMessage(locale, langs);
          commit('SET_LANG', locale);
        // }
      }).catch(() => {});
    } else {
      commit('SET_LANG', locale);
    }
  },
};

const mutations = {
    SET_LANG(states, locale) {
        states.lang = getLanguage(states.languages, locale) || defaultLang;
        states.locale = locale;
        states.loadedLangs.push(locale);
        localStorage.setItem('locale', locale);
        app.$i18n.locale = locale;
        // document.title = app.$t(app.$route.meta.i18n_title);
      },
      SET_LANG_MAP(states, languages) {
        states.languages = Object.assign([], languages);
      },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
