import { Avatar, Box, Card, CardContent, CardHeader, IconButton, List, ListItem, Paper, Stack, Typography } from '@mui/material'
import './App.css'
import { red } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'

function App() {
  return (
    <main>
      <h1>Unimed Greifswald Service Web</h1>
      <Stack direction="row" flexWrap={'wrap'} >
        {[0,1,2,3,4,5].map((item) => (
          
        <Card key={item} sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                RK
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<Typography variant="h6">Reisekostenabrechnung</Typography>}
            subheader="Max Mustermann, Tel. 0123/45678"
          ></CardHeader>
          <CardContent>
            <Box>
              <Typography>Erstattung von Reisekosten für dienstliche Aufwendungen.</Typography>
              <Typography>Antragstellung innerhalb von sechs Monaten nach Dienstreise, sonst keine Vergütung.</Typography>
            </Box>
            <List>
              <ListItem><a href='' target='_blank'>Antrag Reisekostenabrechnung</a></ListItem>
              <ListItem><a href='' target='_blank'>Merkblatt Reisekosten</a></ListItem>
            </List>
          </CardContent>
        </Card>

))}
      </Stack>
    </main>
  )
}

export default App
