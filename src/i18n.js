import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      description: "You can pick your preferred language and set up your timezone for accurate event times.",
      timeLeft: "Time left: {{days}} days, {{hours}} hours, {{minutes}} minutes",
      upcomingEvents: "Upcoming Events:",
      localTime: "Local Time",
      now: "NOW",
    },
  },
  ru: {
    translation: {
      welcome: "Добро пожаловать",
      description: "Вы можете выбрать предпочитаемый язык и настроить часовой пояс для точного времени событий.",
      upcomingEvents: "Предстоящие события:",
      localTime: "Местное время",
      now: "СЕЙЧАС",
      timeLeft: "Оставшееся время: {{days}} дней, {{hours}} часов, {{minutes}} минут"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') || 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false // React already escapes values
  }
});

export default i18n;