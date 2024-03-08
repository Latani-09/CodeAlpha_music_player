
import { useState, useEffect } from 'react';
import * as data1 from './songsData.json';
import Player from './component/player';
import { Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState({});
    const [songsnotFound, setSongsFound] = useState(false);
    const [playlist, setplaylist] = useState(data1.songs);
    const [q, setQ] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    var selectedOption = null;   
    const searchParam = ['title']; 

    useEffect(() => {

        const songs = data1.songs;
        var i = 0;
        songs.map((song, key) => {
            song.id = i;
            i++;
        })
        console.log(songs); // output 'testing'

        setplaylist(songs)
        setCurrentSong(songs[0]);
        setCurrentIndex(0);
    }, [songsnotFound]);

                                            //function to filter by language
    const filterCombiner = (d, filterArray) => {
        for (let fn of filterArray) {
            if (!fn(d)) {
                return false;
            }
        }
        return true;
    }

    const filterByLanguage = async () => {
        console.log('filter by', selectedOption);
        if (selectedOption != 'Any Language') {
            const filterArray1 = [
                d => d.language === selectedOption,
            ];
            console.log(typeof (data1.songs), "type of songs")
            const arr1 = data1.songs.filter(d => filterCombiner(d, filterArray1));   
            var i = 0;
            arr1.map((song, key) => {
                song.id = i;
                i++;
            })

            console.log('arr1', arr1);
            setplaylist(arr1);
            console.log('playlist set to', playlist);
        }
        else if (selectedOption == 'Any Language') {
            setplaylist(data1.songs);
        }
    }

                                                    //dropdown for Language filter
    const options = ['Tamil', 'Hindi', 'English'];

    const handleDropdownChange = async (event) => {
        console.log('filter by', event.target.value);
        selectedOption = event.target.value;
        await filterByLanguage();
    };

                                                   //search component
    const handleSearch = () => {
        const results = playlist.filter((song) =>
            song.title
                .toString()
                .toLowerCase()
                .includes(q.toLowerCase())
        );
        var i = 0;
        results.map((song, key) => {
            song.id = i;
            i++;
        })

        setSearchResults(results);
        setplaylist(results);

    };
    return (
        <div class="container"  >
            {/* Search  & Language Filter*/ }
            <nav class="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: 'hsl(240,60%,10%)', minHeight: "15vh", width: "100%" }}>
                <div class="container-fluid" >
                    <a class="navbar-brand" > Music Player</a>
                </div>
                <div class="col-2 "  >
                    <select class="form-select bg-dark " style={{ color: "white" }} aria-label="Default select example" id="dropdown" value={selectedOption} onChange={handleDropdownChange}>
                        <option selected>Any Language</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="col-3">
                </div>
                <div class="col-3 ">
                    <div class="container-flex">
                        <div class="row">
                            <div class="col-6">
                                <input class="form-control text-wrap"
                                    style={{ borderRadius: "5px" }}
                                    type="text"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Search by title"
                                />
                            </div>
                            <div class="col-4 ">
                                <Button variant="dark text-wrap" onClick={handleSearch}>Search</Button>
                            </div>
                            <div class="col-4">
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            
            <Player playlist={playlist} /> {/*Play list and player component */}
        </div>
    );
}

export default App;