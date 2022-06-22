import React, { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import {
  Box, Grid, TextField, Button, Typography, InputAdornment,
} from '@mui/material';
import { Calculate as CalculateIcon } from '@mui/icons-material';

import { expressionRegex, fetcher } from '../utils/helpers';

const Home: NextPage = () => {
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setResult('');

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetcher('/api/calculate', {
        method: 'POST',
        body: JSON.stringify({ expression: data.get('value') }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setResult(response.result);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.value = e.currentTarget.value.replace(expressionRegex, '');
    },
    [],
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid
        container
        sx={{ display: 'flex', height: '100vh', width: '100%' }}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h5">Expression calculator</Typography>
        </Grid>
        <Grid item sx={{ width: '50%' }}>
          <TextField
            onChange={handleChange}
            required
            name="value"
            fullWidth
            placeholder="Enter expression, e.g. 2 + 3 * 7 / 2"
            InputProps={{
              startAdornment: <InputAdornment position="start"><CalculateIcon /></InputAdornment>,
            }}
          />
        </Grid>
        {result !== '' && (
          <Grid item>
            <Typography variant="h6">
              =
              {' '}
              <strong>{result}</strong>
            </Typography>
          </Grid>
        )}
        {error && (
        <Grid item>
          <Typography sx={{ color: 'red' }}>{error}</Typography>
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
