
import { useCallback, useEffect, useState } from 'react';
import SearchIcon from './icons/SearchIcon'

function SearchHeader() {
    const [width, setWidth] = useState(null)
    const [search, setSearch] = useState("")
    const clickHandler = useCallback((e) => {
        e.preventDefault();
        if (search.trim()) {
            // اینجا می‌توانید جستجو رو انجام بدید (مثل درخواست API)
        }
    }, [search])
    useEffect(() => {
        setWidth(window.innerWidth);
    }, [])

    return (
        width > 1024 ?
            <div className='w-full border-green-300 border-solid relative'>
                <input onChange={(e) => setSearch(e.target.value)} className='w-full border rounded-full p-3 bg-bgcard text-white' type="text" placeholder="اهنگ مورد نظرتان را سرچ کنید" />
                <SearchIcon clickHandler={clickHandler} left='5' top="20" />
            </div>
            :
            <SearchIcon clickHandler={clickHandler} left="500" top="20" />
    )
}

export default SearchHeader