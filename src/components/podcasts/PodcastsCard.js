import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/reducers/modalSlice';
import { openFixedModal,closeFixedModal } from '../../store/reducers/fixedModalSlice';
import { likePod, disLikePod } from '../../store/reducers/likeSlice';
import { limiTitle } from '../utilities/Helpers';
import { Toast } from '../utilities/sweetAlert';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InterestsIcon from '@mui/icons-material/Interests';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import classes from '../../styles/podcasts/PodcastsCard.module.css';

const PodcastsCard = ({podcast, otherUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isRoomOpen } = useSelector((state) => state.fixedModalSlice)

    const handleDeletePodcast = (podcast) => {
        dispatch(openModal({
            name: 'DeletePodcast',
            childrenProps: podcast
        }))
    }
    
    const handlePlayerModal = () => {
        if(isRoomOpen) {
            Toast.fire({
                icon: 'info',
                title: 'can not open the podcast as there is a room running'
            })
        } else{
            //close old player first if it was running
            dispatch(closeFixedModal())
            //then open it
            dispatch(openFixedModal({
                name: 'PlayerLogic',
                childrenProps: {item: podcast},
                isPlayerOpen: true,
                isRoomOpen: false
            }))
        }
        
    }

    const handleLikePodcasts = () => {
        podcast.isLiked ? dispatch(disLikePod(podcast._id)): dispatch(likePod(podcast._id))
    }

    let userImg = podcast.createdBy.photo.includes('herokuapp') ? 'https://audiocomms-podcast-api.onrender.com/img/users/default.jpg': podcast.createdBy.photo;
   

    return (
        <div className={classes.podcastComponent}>
            <div 
                title="open brodcaster profile">
                <IconButton sx={{ p: 0 }} onClick={() => navigate(`/user-profile/${podcast.createdBy._id}`)}>
                    <Avatar 
                        alt='user avatar'
                        src={userImg}
                        sx={{ width: 56, height: 56 }} 
                    />
                </IconButton> 
            </div>
            <div className={classes.description}> 
                <div className={classes.dFlex}>
                    <div className={classes.podcastName}>{limiTitle(podcast.name)}</div>
                    {!otherUser && <div className={classes.deletePod}>
                        <IconButton aria-label="delete" onClick={() => handleDeletePodcast(podcast)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>}
                </div>

                <div className={classes.podcastDetails}>
                    <Typography variant='caption'>by: 
                        <span>
                            <Link to={`/user-profile/${podcast.createdBy._id}`}>
                                {podcast.createdBy.name}
                            </Link>
                        </span>
                    </Typography>
                    <div className={classes.likes}>
                        <Typography>{podcast.likes}</Typography>
                        <IconButton aria-label="favorite" onClick={handleLikePodcasts}>
                            <FavoriteIcon  
                                className={`${classes.likesIcon} ${podcast.isLiked ? classes.isLiked : ''}`}
                            />
                        </IconButton>
                    </div>
                </div>
                <hr />
                <div className={classes.innerInfos}>
                    <div className={classes.dFlex}> 
                        <div className={classes.dFlex}>
                            <IconButton aria-label="category">
                                <InterestsIcon />
                            </IconButton>
                            <Typography className={classes.categoryName}>
                                {podcast.category}
                            </Typography>
                        </div>
                        <a href={podcast.audio.url} download={podcast.name}>
                            <IconButton aria-label="download">
                                <CloudDownloadIcon />
                            </IconButton>
                        </a>
                    </div>

                    <div className={classes.dFlex}> 
                        <div className={classes.dFlex}>
                            <IconButton aria-label="time">
                                <AccessTimeIcon />
                            </IconButton>
                            <Typography className={classes.duration}>
                                {Math.floor(podcast.audio.duration / 60)} : { Math.floor(podcast.audio.duration - Math.floor(podcast.audio.duration / 60) * 60)}
                            </Typography>
                        </div>
                        <button 
                            className={classes.playPodcastBtn}
                            onClick={handlePlayerModal}
                        >
                            <PlayArrowRoundedIcon />
                            <Typography variant='p'>Play</Typography>
                        </button>
                    </div> 

                </div>
            </div>  
        </div>
    )
}

export default PodcastsCard;