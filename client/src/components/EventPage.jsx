import { Grid } from '@mui/material';
import EventList from './EventList';
import AddEditEvent from './AddEditEvent';

function EventPage() {
  return (
    <Grid container spacing={2} style={styles.pageContainer}>
      <Grid item xs={12} md={6}>
        <EventList />
      </Grid>
      <Grid item xs={12} md={6}>
        <AddEditEvent />
      </Grid>
    </Grid>
  );
}

const styles = {
  pageContainer: {
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#fff',
  },
};

export default EventPage;
