import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DiscoverPodcasts from './DiscoverPodcasts';
import DiscoverUsers from './DiscoverUsers';
import classes from '../../styles/discover/Discover.module.css'

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
            <div className={classes.discoverContainer}>
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


    return (
        <Box 
            sx={{ 
                bgcolor: 'background.paper', 
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
            <TabPanel value={value} index={0} dir={theme.direction}>
                <DiscoverPodcasts />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>

                <DiscoverUsers  />

            </TabPanel>
        </Box>
    );
}

export default Discover;