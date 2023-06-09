import { Stack } from "@mui/material";
import "./App.css";
import { ServiceCard } from "./ServiceCard";

function App() {
  return (
    <main>
      <h1>Unimed Greifswald Service Web</h1>
      <Stack direction="row" flexWrap={"wrap"}>
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <ServiceCard key={item} />
        ))}
      </Stack>
    </main>
  );
}

export default App;
