import { Container, Grid, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";

const Speedups = () => {
  const mins = [1, 5, 10, 15, 30, 60];
  const hours = [3, 8, 24];

  const [minValuesOmni, setMinValuesOmni] = useState(Array(mins.length).fill(0));
  const [hourValuesOmni, setHourValuesOmni] = useState(Array(hours.length).fill(0));
  const [minValuesGeneric, setMinValuesGeneric] = useState(Array(mins.length).fill(0));
  const [hourValuesGeneric, setHourValuesGeneric] = useState(Array(hours.length).fill(0));
  const [totalResult, setTotalResult] = useState({ days: 0, hours: 0, minutes: 0 });

  const handleMinChange = (index, value, type) => {
    const updatedValues = type === "omni" ? [...minValuesOmni] : [...minValuesGeneric];
    updatedValues[index] = parseInt(value) || 0;
    type === "omni" ? setMinValuesOmni(updatedValues) : setMinValuesGeneric(updatedValues);
  };

  const handleHourChange = (index, value, type) => {
    const updatedValues = type === "omni" ? [...hourValuesOmni] : [...hourValuesGeneric];
    updatedValues[index] = parseInt(value) || 0;
    type === "omni" ? setHourValuesOmni(updatedValues) : setHourValuesGeneric(updatedValues);
  };

  const calculateTotalSpeedup = () => {
    const totalMinutes =
      mins.reduce((sum, min, index) => sum + min * minValuesOmni[index], 0) +
      hours.reduce((sum, hour, index) => sum + hour * 60 * hourValuesOmni[index], 0) +
      mins.reduce((sum, min, index) => sum + min * minValuesGeneric[index], 0) +
      hours.reduce((sum, hour, index) => sum + hour * 60 * hourValuesGeneric[index], 0);

    const days = Math.floor(totalMinutes / (24 * 60));
    const remainingMinutesAfterDays = totalMinutes % (24 * 60);
    const calculatedHours = Math.floor(remainingMinutesAfterDays / 60);
    const minutes = remainingMinutesAfterDays % 60;

    setTotalResult({ days, hours: calculatedHours, minutes });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Speedup Calculator
      </Typography>

      <Grid container spacing={2}>
        {/* Omni Speedup */}
        <Grid item xs={12}>
          <Typography variant="h6">Omni Speedup (Minutes):</Typography>
          {mins.map((min, index) => (
            <TextField
              key={`omni-min-${index}`}
              label={`${min} min`}
              type="number"
              variant="outlined"
              size="small"
              value={minValuesOmni[index]}
              onChange={(e) => handleMinChange(index, e.target.value, "omni")}
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Omni Speedup (Hours):</Typography>
          {hours.map((hour, index) => (
            <TextField
              key={`omni-hour-${index}`}
              label={`${hour} hr`}
              type="number"
              variant="outlined"
              size="small"
              value={hourValuesOmni[index]}
              onChange={(e) => handleHourChange(index, e.target.value, "omni")}
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
            />
          ))}
        </Grid>

        {/* Generic Speedup */}
        <Grid item xs={12}>
          <Typography variant="h6">Speedup (Minutes):</Typography>
          {mins.map((min, index) => (
            <TextField
              key={`generic-min-${index}`}
              label={`${min} min`}
              type="number"
              variant="outlined"
              size="small"
              value={minValuesGeneric[index]}
              onChange={(e) => handleMinChange(index, e.target.value, "generic")}
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
            />
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Speedup (Hours):</Typography>
          {hours.map((hour, index) => (
            <TextField
              key={`generic-hour-${index}`}
              label={`${hour} hr`}
              type="number"
              variant="outlined"
              size="small"
              value={hourValuesGeneric[index]}
              onChange={(e) => handleHourChange(index, e.target.value, "generic")}
              style={{ marginRight: "1rem", marginBottom: "1rem" }}
            />
          ))}
        </Grid>

        {/* Total Speedup */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={calculateTotalSpeedup}>
            Calculate Total Speedup
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Combined Total Speedup:
          </Typography>
          <Typography>
            {totalResult.days} days, {totalResult.hours} hours, {totalResult.minutes} minutes
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Speedups;