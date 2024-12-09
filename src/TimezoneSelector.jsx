import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

function TimezoneSelector({timezone, updateTimezone}) {
  const timezones = Intl.supportedValuesOf("timeZone"); // Fetch supported timezones

  return (
    <div>
      <Autocomplete
        options={timezones}
        value={timezone}
        onChange={updateTimezone}
        renderInput={(params) => (
          <TextField {...params} label="Select Timezone" variant="outlined" />
        )}
        style={{ width: 300 }}
      />
    </div>
  );
}

export default TimezoneSelector;
