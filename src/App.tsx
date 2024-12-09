import React, { useState } from "react";
import { getNextThreeEvents } from "./utils";
import { useTranslation } from "react-i18next";
import TimezoneSelector from "./TimezoneSelector";
import { Button, Container, Typography, Box, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";

function App() {
  const { t, i18n } = useTranslation();
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    localStorage.getItem("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const updateTimezone = (_: unknown, newValue: string) => {
    if (newValue) {
      setSelectedTimezone(newValue);
      localStorage.setItem("timezone", newValue); // Save timezone in local storage
    }
  };

  const changeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

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
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          {t("welcome")}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {t("description")}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => changeLanguage("en")}
            sx={{ mx: 1 }}
          >
            English
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => changeLanguage("ru")}
            sx={{ mx: 1 }}
          >
            Русский
          </Button>
        </Box>
      </Box>
      <Box sx={{ my: 4 }}>
        <TimezoneSelector timezone={selectedTimezone} updateTimezone={updateTimezone} />
      </Box>
      <Typography variant="h4" gutterBottom>
        {t("upcomingEvents")}
      </Typography>
      <Card sx={{ mt: 2, p: 2 }}>
        <CardContent>
          <List>
            {nextEvents.map((event, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="h6" component="span">
                        {event.name}
                      </Typography>{" "}
                      -{" "}
                      <Typography
                        component="span"
                        color={event.ongoing ? "error" : "text.primary"}
                      >
                        {event.ongoing ? t("now") : formatTimeLeft(event.timeLeftMs)}
                      </Typography>
                    </>
                  }
                  secondary={

                    <Typography variant="body2" color="text.secondary">
                      {t("localTime")}:{" "}
                      {event.eventStart.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: selectedTimezone
                      })}
                      {" | "}
                      UTC: {event.eventStart.toISOString().substring(11, 16)}
                    </Typography>

                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
