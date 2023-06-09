import { ServiceCard } from "./ServiceCard";
import { Stack } from '@mui/material'
import './App.css'

function App() {
  return (
    <main>
      <img src="logo_m_siegel.jpg" />

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
