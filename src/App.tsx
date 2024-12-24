import { Tab, Tabs } from "@mui/material";
import React from "react";
import Events from "./Events";
import Speedups from "./Speedups";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    { name: 'Events', value: 'event' },
    { name: 'Speedups Calc', value: 'calc' },
  ]

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map(tab => <Tab key={tab.value} label={tab.name}></Tab>)}
      </Tabs>
      {value === 0 ? <Events/> : null}
      {value === 1 ? <Speedups/> : null}
    </>
  );
}

export default App;
