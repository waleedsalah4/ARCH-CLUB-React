import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel, a11yProps} from '../utilities/Tabs';
import SearchUser from './SearchUser';
import SearchPodcasts from './SearchPodcasts';
import SearchRooms from './SearchRooms';

function SearchPage() {
    const theme = useTheme();
    const params = useParams();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <>
        <Box sx={{ 
            // bgcolor: 'background.paper' ,
            backgroundColor: '#f1f1f1'
        }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
              <Tab label="Users" {...a11yProps(0)} />
              <Tab label="Podcats" {...a11yProps(1)} />
              <Tab label="Rooms" {...a11yProps(2)} />
            </Tabs>
        </Box>
        <Box>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <SearchUser value={params.text} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <SearchPodcasts value={params.text} />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
               <SearchRooms value={params.text}/>
            </TabPanel>
        </Box>
        </>
    )
}

export default SearchPage