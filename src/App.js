import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import './App.css';
import ListedCompaniesBlock from './ListedCompaniesBlock';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8}>
          <ListedCompaniesBlock />
        </Grid>
        <Grid item xs={4} md={4}>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
