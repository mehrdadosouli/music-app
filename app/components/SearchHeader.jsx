import { useCallback, useEffect, useState } from 'react';
import SearchIcon from './icons/SearchIcon'
import { albums, tracks, artists } from '~/data/mockData';

function SearchHeader() {
    const [width, setWidth] = useState(null)
    const [search, setSearch] = useState("")
    const clickHandler = useCallback((e) => {
        e.preventDefault();
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            const trackResults = tracks.filter(t => t.title.toLowerCase().includes(q));
            const artistResults = artists.filter(a => a.name.toLowerCase().includes(q));
            const albumResults = albums.filter(a => a.title.toLowerCase().includes(q));
            // فعلاً فقط نمایش در کنسول
            console.log({ tracks: trackResults, artists: artistResults, albums: albumResults });
        }
    }, [search])
    useEffect(() => {
        setWidth(window.innerWidth);
    }, [])

    return (
        width > 1024 ?
            <div className='w-full border-green-300 border-solid relative'>
                <input onChange={(e) => setSearch(e.target.value)} className='w-full border rounded-full p-3 pr-12 bg-bgcard text-white' type="text" placeholder="اهنگ مورد نظرتان را سرچ کنید" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <SearchIcon clickHandler={clickHandler} />
                </div>
            </div>
            :
            null
    )
}

export default SearchHeader