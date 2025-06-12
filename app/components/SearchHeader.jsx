
import { useCallback, useState } from 'react';
import SearchIcon from './icons/SearchIcon'

function SearchHeader() {
    const [search,setSearch]=useState("")
    const clickHandler = useCallback((e) => {
        e.preventDefault();
        if (search.trim()) {
            // اینجا می‌توانید جستجو رو انجام بدید (مثل درخواست API)
        }
    }, [search])
    return (
        <div className='relative w-[25rem]'>
            <input onChange={(e)=>setSearch(e.target.value)} className='w-full border rounded-full p-3 bg-bgcard text-white' type="text" placeholder="اهنگ مورد نظرتان را سرچ کنید" />
            <SearchIcon clickHandler={clickHandler} />
        </div>
    )
}

export default SearchHeader