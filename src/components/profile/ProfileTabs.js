import React ,{ useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import { TabPanel,a11yProps } from '../utilities/Tabs';
import ProfilePodcasts from './ProfilePodcasts';
import ProfileEvents from './ProfileEvents';


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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px 4px'
            }}>
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


export default function ProfileTabs({isMe, userData}) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ 
      //maxWidth: { xs: 320, sm: 480 }, 
      bgcolor: 'background.paper' }}>
      {/* <AppBar position="static"> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Podcasts" {...a11yProps(0)} />
          <Tab label="Events" {...a11yProps(1)} />
          {/* <Tab label="Likes" {...a11yProps(2)} /> */}
        </Tabs>
      {/* </AppBar> */}
    </Box>
    <Box>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ProfilePodcasts otherUser={!isMe} userData={userData} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
          <ProfileEvents otherUser={!isMe} userData={userData} />
      </TabPanel>
      {/* <TabPanel value={value} index={2} dir={theme.direction}>
          likes
      </TabPanel> */}
    </Box>
    </>
  );
}
