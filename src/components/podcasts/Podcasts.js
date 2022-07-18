import React from 'react';
import { podcastsList } from '../dummyfile';
import PodcastsCard from './PodcastsCard';

import classes from '../../styles/podcasts/Podcasts.module.css';
function Podcasts() {
    return (
        <div className={classes.podcastscontainer}>
            {podcastsList.map(podcast => (
                <PodcastsCard key={podcast._id} podcast={podcast} otherUser={true} />
            ))}
        </div>
    )
}

export default Podcasts