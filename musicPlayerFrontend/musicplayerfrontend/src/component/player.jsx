import React, { useRef, useState, useEffect } from 'react';
import { BsPauseCircleFill, BsSkipStartCircle, BsSkipEndCircle, BsPlay, BsPlayCircleFill, BsFillVolumeDownFill } from "react-icons/bs";
import Stack from 'react-bootstrap/Stack';
import { Row, Col, Container } from 'react-bootstrap';
export default function Player({
    playlist,


}) {
    const [currentSong, setCurrent] = useState({ src: "", title: "", artist: [] });
    const [currentIndex, setCurrentIndex] = useState("");

    const [nextIndex, setNextIndex] = useState("");
    const [paused, setpaused] = useState(true);
    const audioRef = useRef(null);
    useEffect(() => {
        console.log('player works', playlist)
    }, []);
    function findSongById(list, id) {
        return list.find((obj) => obj._id === id);
    }
    const changeAudio = async (fileName,_id,id) => {

        

        // If the audioRef is not loaded, log a message
        if (audioRef.current === null) {
            console.log("Audio component is not loaded yet.");
            return;
        }

        // Pause the current audio
        audioRef.current.pause();
        setpaused(true); // set pause state the audio
        console.log('before changing', playlist[id])

        // Set the new audio source  using id 
        var songselected = playlist[id]
        await setCurrent({ id: songselected.id, src: './songs/' + fileName, artist: songselected.artist, title: songselected.title });
        console.log('_id', _id, 'artist', songselected.artist, 'title', songselected.title,playlist[id])
        setCurrentIndex(id);
        
        await console.log('current song', currentSong.title);

        // Play the new audio
        await audioRef.current.play();
        setpaused(false); // set pause state the audio

    }



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
    const nextSong = () => {

        console.log('nextSong');
        console.log('index',currentIndex,'length',playlist.length)
        if (currentIndex + 1 < playlist.length) {
            setCurrentIndex(currentIndex + 1)
            var song = playlist[currentIndex + 1]
            setCurrent(song);
            console.log(song)
            changeAudio(song.fileName, song._id, song.id);
        }
    }

    const prevSong = () => {

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            var song = playlist[currentIndex - 1]
            setCurrent(song);
            console.log("current song", currentSong)
            changeAudio(song.fileName, song._id, song.id);
        }
    }

    return (
        <div class="row">
            <div class="row song-table-container" >
                <table class="table table-dark song-table ">
                    <thead class="bg-light sticky-top top-0">
                        <tr >
                            <th class="col-1"> </th>
                            <th class="col-5">Title</th>
                            <th class="col-4">Artists</th>
                            <th class="col-2">Language</th>

                        </tr>
                    </thead>
                    <tbody  >
                    
                        {playlist.map((song,key) => (

                            <tr key={song._id} class="trow">
                                <td class="col-1" >
                                    <BsPlay
                                        color='white'
                                        className='icons'
                                        size={30}
                                        onClick={() => changeAudio(song.fileName, song._id,song.id)} />
                                </td>
                                <td class="col-5">{song.title}</td>
                                <td class="col-4">
                                    {song.artist !== undefined ? (
                                        <p>{song.artist.join(', ')}</p>
                                    ) : (
                                        <p></p>
                                    )}
                                </td >
                                <td class="col-2">{song.language}</td>

                            </tr>
                        ))}
                        
                    </tbody>
                </table>

            </div>

            <div class="row   player-card" >
                <div class="col-4 volume-bar">

                    <audio ref={audioRef} src={currentSong.src} volume />
                    <BsFillVolumeDownFill
                        color={'white'}
                        size={20} />
                    <input
                        type="range"
                        defaultValue="40"
                        className="mx-2 progressBarvolume bar volume"
                        onChange={changevolume}
                    />

                </div>
                
                <div class="col-2">
                <div class="row">
                    <div class="col-3 ">
                    <BsSkipStartCircle
                        color='white'
                        
                        className='icons'
                        size={40}
                        onClick={prevSong}

                        />
                    </div>
                    <div class="col-3 ">
                    {paused ? (
                        <BsPlayCircleFill
                            color='white'
                            className='icons'
                            size={40}
                                  
                            onClick={toggleAudio}
                        />
                    ) : (
                        <BsPauseCircleFill
                            color='white'
                            className='icons'
                            size={40}
                     
                            onClick={toggleAudio}
                        />
                        )}
                    </div>
                    <div class="col-3 ">
                    <BsSkipEndCircle
                        color='white'
                        size={40}
                        className='icons'
                        onClick={nextSong}
                       
                        /></div>
                   
                    </div></div>
                <div class="col-5" style={{ color: "white" }}>
                    <div class="row">

                    <p >{currentSong.title.toLocaleUpperCase()}</p>
                    <p>{currentSong.artist.join(', ')}</p>
                </div>
                </div>

            </div>
        </div>

    );
}


