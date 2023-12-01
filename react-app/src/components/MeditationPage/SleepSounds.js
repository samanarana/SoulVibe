import React, { useEffect, useState, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './SleepSounds.css';

const spotifyApi = new SpotifyWebApi();

function SleepSounds() {
    const [meditativeSounds, setMeditativeSounds] = useState([]);

    const fetchMeditativeSounds = () => {
        const playlistId = '37i9dQZF1DWZqd5JICZI0u';
        spotifyApi.getPlaylist(playlistId)
            .then(data => {
                setMeditativeSounds(data.body.tracks.items);
            })
            .catch(err => console.error(err));
    };

    const fetchAccessToken = useCallback(async () => {
        const response = await fetch('http://localhost:3000/api/spotify-token');
        const data = await response.json();
        if (data.access_token) {
            spotifyApi.setAccessToken(data.access_token);
            fetchMeditativeSounds();
        }
    }, []);

    useEffect(() => {
        fetchAccessToken();
    }, [fetchAccessToken]);

    const openSpotifyPlaylist = () => {
        window.open("https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u?si=a4b5f27d30eb41e0", "_blank");
    };


    return (
        <div className="playlist-container">

            <div className="title-open-container">
                <p>Calming Sleep Music</p>
                <button onClick={openSpotifyPlaylist} className="play-button">▶</button>
            </div>

            <div className="tracks-container">
                {meditativeSounds.slice(0, 20).map((track, index) => (
                    <div key={index} className="track">
                        <div className="track-details">
                            <img src={track.track.album.images[2].url} alt="Album Cover" className="album-cover" />
                            <div className="track-info">
                                <strong>{track.track.name}</strong>
                                <small>{track.track.artists.map(artist => artist.name).join(', ')}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default SleepSounds;
