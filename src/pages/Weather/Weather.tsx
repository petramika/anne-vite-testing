import { Box, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { Card } from 'components';
import _ from 'lodash';
import { Search } from 'models/Search';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { getWeatherData } from 'utils/api';

import { VariantTypography } from '../../utils/constants';

const Weather = () => {
  const [search, setSearch] = useState<string>('L1 8JQ');
  const [searchWeather, setSearchWeather] = useState<Search[]>([]);

  const initData = useCallback(async () => {
    setSearchWeather(await getWeatherData(search));
  }, [search]);

  useEffect(() => {
    initData();
  }, [initData]);

  const onChangeSearch = (inputSearch: string) => {
    setSearch(inputSearch);
  };

  return (
    <Box sx={{px: 3}}>
      <Typography variant={VariantTypography.h1}>Vite + React</Typography>
      <Typography variant={VariantTypography.h2}>Anne&apos;s testing stuffs</Typography>
      <Divider />
      <Box>
        <Typography variant={VariantTypography.body1}>
        Introduce the Zip Code to get the city!
        </Typography>
        <TextField
          id="outlined input"
          label="Zip Code"
          defaultValue="L1 8JQ"
          onChange={(event) => onChangeSearch(event.target.value)}
        />
      </Box> 
      <Divider />
      <Box>
        { searchWeather &&  
          searchWeather.length > 0 &&
          <Card 
          	title={`Data for CP ${search}`}
          	description={(
          		<>
          			{_.map(searchWeather, ({name, country}) => (
          				<Box key={name}>
          					<Typography variant={VariantTypography.body1}>{name}</Typography>
          					<Divider />
          					<Typography variant={VariantTypography.body1}>{country}</Typography>
          				</Box>
          			))}
          		</>
          	)}
          />}

        <Suspense fallback={<CircularProgress />}>
          <Card 
            title={`Data with suspense ${search}`}
            description={(
              <>
                {_.map(searchWeather, ({name, country}) => (
                  <Box key={name}>
                    <Typography variant={VariantTypography.body1}>{name}</Typography>
                    <Divider />
                    <Typography variant={VariantTypography.body1}>{country}</Typography>
                  </Box>
                ))}
              </>
            )}
          />
        </Suspense>
      </Box>
      <Box>
        Test Rendering!
        <Box>{[1, 2, 3].reduce((partialSum, a) => partialSum + a, 0)}</Box>
      </Box>
      <Divider />
    </Box>
    
  );
};

export default Weather;
