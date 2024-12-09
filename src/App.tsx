import { getNextThreeEvents } from "./utils";
import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };
  console.log(Intl.supportedValuesOf('timeZone'))
  const startDate = new Date(2024, 10, 25);
  const nextEvents = getNextThreeEvents(startDate);

  const formatTimeLeft = (ms: number) => {
    if (ms <= 0) return t("now");

    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    return t("timeLeft", { days, hours, minutes });
  };

  return (
    <div>
      <div>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("ru")}>Русский</button>
      </div>
      <h1>{t("upcomingEvents")}</h1>
      <ul>
        {nextEvents.map((event, index) => (
          <li key={index}>
            <strong>{event.name}</strong> -{" "}
            {event.ongoing ? (
              <span style={{ color: "red" }}>{t("now")}</span>
            ) : (
              <span>{formatTimeLeft(event.timeLeftMs)}</span>
            )}
            <br />
            {t("localTime")}:{" "}
            {event.eventStart.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" | "}
            UTC: {event.eventStart.toISOString().substring(11, 16)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;