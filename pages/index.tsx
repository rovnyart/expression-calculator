import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box, Grid, TextField, Button, Typography,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

const regex = /[^0-9.+-//*]/gi;

const Home: NextPage = () => {
  const [result, setResult] = useState<string>('');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const response = await fetch('/api/calculate', {
      method: 'POST',
      body: JSON.stringify({ value: data.get('value') }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    setResult(json.result);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value.replace(regex, '');
    },
    [],
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <Grid
        container
        sx={{ display: 'flex', height: '100vh', width: '100%' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <CalculateIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h5">Expression calculator</Typography>
        </Grid>
        <Grid item sx={{ width: '30%' }}>
          <TextField onChange={handleChange} required name="value" fullWidth placeholder="Enter expression, e.g. 2 + 3 * 7 / 2" />
        </Grid>
        {result && (
          <Grid item>
            <Typography variant="h6">
              =
              {' '}
              {result}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <Button type="submit" variant="contained">Calculate</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
