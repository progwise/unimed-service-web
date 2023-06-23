import { ServiceCard } from './ServiceCard'
import { Stack, TextField, Typography } from '@mui/material'
import './App.css'
import { useState } from 'react'
import { useSearch } from './useSearch'
import { PersonCard } from './PersonCard'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const { result: foundServices} = useSearch('service', searchTerm)
  const { result: foundPersons} = useSearch('person', searchTerm)

  const handleSearchInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newTerm = event.target.value.trim()
    setSearchTerm(newTerm)
  }

  return (
    <Stack alignItems="center" justifyContent="center" direction="column" gap={2}>
      <div>
        <img src="logo_m_siegel.jpg" />
      </div>
      <div>
        <Typography variant="h4">Hallo, ich bin George - Ihre Verwaltungs KI.</Typography>
        <Typography></Typography>
      </div>
      <TextField
        label="Was kann ich für Sie tun?"
        sx={{ width: '50%' }}
        onChange={handleSearchInputChange}
      />
      <Stack
        direction="row"
        flexWrap={'wrap'}
        width={'75%'}
        gap={2}
        bgcolor={'#eeeeee'}
        padding={2}
        justifyContent="center"
        border="solid 1px #cccccc"
        borderRadius={'20px'}
      >
        {foundServices.map((item, index) => (
          <ServiceCard key={index} item={item} />
        ))}
        {foundPersons.map((item, index) => (
          <PersonCard key={index} item={item} />
        ))}
      </Stack>
    </Stack>
  )
}

export default App
