import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { DiscoverUserList } from '../dummyfile';
// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

// const Demo = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
// }));

export default function DiscoverUsers() {

  return (
    <>
    {/* // <Box sx={{ 
    //     flexGrow: 1,
    //     //maxWidth: 752 
    // }}> */}
         <div style={{width: '100%'}}>
            {/* <div> */}
                {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Avatar with text and icon
                </Typography> */}
                {/* <Demo> */}
                    <List>
                        {DiscoverUserList.map(user=>(
                        <ListItem
                            key={user._id}
                            secondaryAction={
                                <Button variant='outlined'>
                                    Following
                                </Button>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar 
                                    alt='user avatar'
                                    src={user.photo}
                                    sx={{ width: 50, height: 50 }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={`${user.followers >= 1? user.followers : '0'} follower`}
                            />
                        </ListItem>
                        ))}
                        
                    </List>
                {/* </Demo> */}
            {/* </div> */}
         </div>
    {/* // </Box> */}
    </>
  );
}
