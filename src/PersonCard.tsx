import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import { green } from '@mui/material/colors'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
export const PersonCard = (params: { item: Record<string, string | string[]> }) => {
  console.log(params.item)
  const schlagworte = !Array.isArray(params.item.schlagworte) ? params.item.schlagworte.split(',') : params.item.schlagworte

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
            {params.item['avatar'] ?? <PersonIcon />}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6">
            {params.item.vorname} {params.item.nachname}
          </Typography>
        }
        subheader={`${params.item.email ?? 'Keine Email'}, ${params.item.telefonnummer}`}
      ></CardHeader>
      <CardContent>
      <Stack direction="row" spacing={1} flexWrap={'wrap'} gap={1}>
          {schlagworte.map((wort, index) => <Chip key={index} label={wort} size='small' />)}
        </Stack>
      </CardContent>
    </Card>
  )
}
