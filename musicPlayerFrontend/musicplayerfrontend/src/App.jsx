
import { useState ,useEffect} from 'react';
import './App.css';
import * as data1 from './songsData.json';
import Player from './component/player';
import { Button,Dropdown } from 'react-bootstrap';


function App() {
    const [selectedOption, setSelectedOption] = useState('Any');

    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState({});
    const [songsnotFound, setSongsFound] = useState(false);
    const [playlist, setplaylist] = useState(data1.songs);
    const [q, setQ] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchParam = ['title']; // Add more parameters if needed

    useEffect(() => {

        const songs = data1.songs;
        console.log(songs); // output 'testing'
        
        setplaylist(songs)
        setCurrentSong(songs[0]);
        setCurrentIndex(0);
    }, [songsnotFound]);
    const filterCombiner = (d, filterArray) => {
        for (let fn of filterArray) {
            if (!fn(d)) {
                return false;
            }
        }
        return true;
    }
    const filterByLanguage = () => {
        console.log('filter by', selectedOption);
        if (selectedOption != 'Any') {
            const filterArray1 = [
                d => d.language === selectedOption,
            ];
            console.log(typeof (data1.songs), "type of songs")
            const arr1 = data1.songs.filter(d => filterCombiner(d, filterArray1));
            console.log('arr1', arr1);
            setplaylist(arr1);
        }
        else if (selectedOption=='Any'){
            setplaylist(data1.songs);
        }
    }
    const nextSong = () => {
        if (songsnotFound) {
            setSongsFound(True);
        }
        if (currentIndex + 1 < songs.length) {
            setCurrentIndex(currentIndex + 1)
            setCurrentSong(songs[currentIndex + 1])
        }
    }

    const prevSong = () => {
        if (songsnotFound) {
            setSongsFound(True);
        }
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setCurrentSong(songs[currentIndex - 1])
            console.log("current song",currentSong)
        }
    }
  
        // Example array of values
        const options = ['Any','Tamil','Hindi', 'English'];

        

        const handleDropdownChange = (event) => {
            setSelectedOption(event.target.value);
        };


    const handleSearch = () => {
        const results = playlist.filter((song) =>
            song.title
                .toString()
                .toLowerCase()
                .includes(q.toLowerCase())
        );
       

        setSearchResults(results);
        setplaylist(results);

    };
    return (
        
        <div className="container">
            <h3>Music Player</h3>
            <div className="search-and-filter-wrapper">
                <div className="filter-wrapper">
                <label htmlFor="dropdown">Language:</label>
                <select id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                    <Button onClick={filterByLanguage}>Filter</Button>
                </div>
                <div className="search-wrapper">
                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search by title"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </div>
            </div>
        <div className='player-main'>

            <Player playlist={playlist} />
        </div>
            
       </div>
    );
}

export default App;