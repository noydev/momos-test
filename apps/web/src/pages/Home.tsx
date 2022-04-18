import {
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DataItem from '../components/DataItem';
import { AuthenticationKeys } from '../constants/auth';
import { DATA_API_URL } from '../constants/data';
import { useAuthState } from '../hooks/useAuth';
import useDebounceInput from '../hooks/useDebounceInput';
import useFetch from '../hooks/useFetch';

export interface DataItemProps {
  type: Exclude<Type, 'all'>;
  id: number;
  origin: string;
  url: string;
}

interface UrlDataResponse {
  data: DataItemProps[];
  count: number;
}

const LIMIT = 3;

type Type = 'all' | 'video' | 'image';

const Home = () => {
  const { authenticated } = useAuthState();

  const [keyword, , onKeywordChange, realKeyword] = useDebounceInput('');

  const [page, setPage] = useState(1);
  const [type, setType] = useState('all');

  const token = localStorage.getItem(AuthenticationKeys.TOKEN);

  const { data, getData, loading, error } = useFetch<UrlDataResponse>(
    `${DATA_API_URL}?limit=${LIMIT}&skip=${(page - 1) * LIMIT}&type=${type}`,
    {
      headers: [['authorization', `Bearer ${token}`]],
    }
  );

  const handleTypeChange = (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setType(event.target.value);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  console.log(data);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return <CircularProgress />;

  if (error) return <div>Something wrong happened: {error}</div>;

  return (
    <div>
      <Container component="main" maxWidth="lg">
        <Grid
          container
          spacing={3}
          style={{ alignItems: 'center', marginTop: 20 }}
        >
          <Grid item xs={4}>
            <FormControl>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={type}
                label="type"
                onChange={handleTypeChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="video">Video</MenuItem>
                <MenuItem value="image">Image</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id="search">Search</InputLabel>
              <TextField
                autoComplete="search"
                id="search"
                margin="normal"
                name="search"
                variant="outlined"
                value={realKeyword}
                onChange={onKeywordChange}
              />
            </FormControl>
          </Grid>
        </Grid>

        {data ? (
          <div
            style={{
              display: 'flex    ',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '60vh',
              alignItems: 'center',
              marginTop: 50,
            }}
          >
            <Grid container spacing={3}>
              {data.data.map((i) => (
                <Grid key={i.id} item xs={12} border={1}>
                  <DataItem {...i} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              page={page}
              onChange={(_, page) => setPage(page)}
              count={Math.ceil(data.count / LIMIT)}
            />
          </div>
        ) : (
          <div>Nothing to show</div>
        )}
      </Container>
    </div>
  );
};

export default Home;
