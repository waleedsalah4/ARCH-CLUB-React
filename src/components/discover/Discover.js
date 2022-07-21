import * as React from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { podcastsList } from '../dummyfile';
import PodcastsCard from '../podcasts/PodcastsCard';
import DiscoverUsers from './DiscoverUsers';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
      {value === index && (
        <Box sx={{ 
            pt: 3,
        }}>
            <div style={{ 
            display:'flex', 
            flexDirection: 'column', 
            alignItems: 'center' }}>
                {children}

            </div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Discover =() => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

//   const handleChangeIndex = (index) => {
//     setValue(index);
//   };

    return (
        <Box 
            sx={{ 
                bgcolor: 'background.paper', 
                //width: 500 
            }}
        >
        <AppBar 
            position="static"
            color='default'>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
            <Tab label="Podcasts" {...a11yProps(0)} />
            <Tab label="Users" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        {/* <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        > */}
            <TabPanel value={value} index={0} dir={theme.direction}>
                {podcastsList.map(podcast => (
                    <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
                ))}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>

                <DiscoverUsers  />

            </TabPanel>
        {/* </SwipeableViews> */}
        </Box>
    );
}

export default Discover;