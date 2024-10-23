import { Grid } from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  return (
    <Grid container className={styles.userRow}>
      {/* Render each user row inputs and trash icon at the end of each row */}
      {/* <TrashIconButton /> */}
    </Grid>
  );
};

export default UserRow;
