import React, { Component, audio, useRef ,useState} from 'react';
import { useEffect } from 'react';
                  
export default function Player({
    playlist
}) {
    
    useEffect(()=>{
        console.log('player wroks', playlist)
    },[]);
    return (
        
                <table className="song-table ">
                    <thead>
                        <tr >
                            <th class="col-5">Title</th>
                            <th class="col-4">Artists</th>
                            <th class="col-2">Language</th>
                            <th class="col-1">Play</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playlist.map(({ _id, fileName, title, language,artist }) => (

                            <tr key={_id}>
                                <td>{title}</td>
                                <td>
                                    {artist !== undefined ? (
                                        <p>{artist.join(', ')}</p>
                                    ) : (
                                        <p></p>
                                    )}
                                </td>
                                <td>{language}</td>
                                <td>
                                    <MediaComponent audioSrc={fileName} type="audio/mp3" />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
              
           
        );
    }
    


const MediaComponent = ({audioSrc }) => {
 
    let mp3Src = './songs/' + audioSrc;
    console.log('mp3Src - ',mp3Src);
    const audioRef = useRef(null);
    const [paused, setpaused] = useState(true);
 
    const changevolume = (e) => {
        audioRef.current.volume = e.target.value / 100;
    }
    const toggleAudio = () => {
        setpaused(!paused);
        audioRef.current === null
            ? console.log("Audio component is not loaded yet.")
            : audioRef.current.paused
                ? 
                    audioRef.current.play()
                : audioRef.current.pause();
    }

    
    return (
        <div >

            <button onClick={toggleAudio} >
                {paused ? ('play') : ('pause')}</button>
            <audio ref={audioRef} src={mp3Src} volume/>
            {paused ? (null) : (
                <input
                    type="range"
                    defaultValue="40"
                    className="mx-2 progressBarvolume bar volume"
                    onChange={changevolume} />
                
            )}
        </div>
    );
};