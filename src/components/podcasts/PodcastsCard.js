import React from 'react';
import { Link } from 'react-router-dom';
import { limiTitle } from '../utilities/Helpers';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import InterestsIcon from '@mui/icons-material/Interests';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Button from '@mui/material/Button';

import classes from '../../styles/podcasts/PodcastsCard.module.css';

const PodcastsCard = ({podcast, otherUser}) => {
    return (
        <div className={classes.podcastComponent}>
            <div className={classes.pic} title="open podcats in podcasts player">
                <Link to={`/podcast-player/${podcast._id}`}>
                    <img src={podcast.createdBy.photo} alt="user podcast" />
                </Link>
            </div>
            <div className={classes.description}> 
                <div className={classes.dFlex}>
                    <div className={classes.podcastName}>{limiTitle(podcast.name)}</div>
                    {!otherUser && <div className={classes.deletePod}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>}
                </div>

                <div className={classes.podcastDetails}>
                    <Typography>by: 
                        <span>
                            <Link to={`/user-profile/${podcast.createdBy._id}`}>
                                {podcast.createdBy.name}
                            </Link>
                        </span>
                    </Typography>
                    <div className={classes.likes}>
                        <Typography>{podcast.likes}</Typography>
                        <IconButton aria-label="favorite">
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
                        <Button variant='text' startIcon={<PlayArrowRoundedIcon /> }>
                        {/* Play */}
                            <Typography variant='p'>Play</Typography>
                        </Button>
                    </div> 

                </div>
            </div>  
        </div>
    )
}

export default PodcastsCard;