import { useState } from "react"

function SearchIcon({ searchClickHandler, setSearch, search, width }) {

    const [openDiv, setOpenDiv] = useState(false);
    const clickHandler = () => {
        setOpenDiv(!openDiv)
    }
    return (
        width > 1024 ?
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                onClick={searchClickHandler}
                className="size-6 hover:cursor-pointer"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            :
            <>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    onClick={clickHandler}
                    className="size-6 hover:cursor-pointer"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <div className="fixed w-[85%] bg-red-500">
                    <input
                        type="text"
                        placeholder="جستجو کنید ..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={(event) => {
                            if (event.code === "Enter") {
                                searchClickHandler(event)
                            }
                        }}
                        className={`lg:hidden absolute top-10 right-5 p-2 text-white outline-none transition-all duration-300 rounded-2xl ${openDiv ? ' min-w-[80vw] h-16 opacity-100' : ' min-w-[80vw] h-0 opacity-0'} bg-slate-500`}
                    />
                    { openDiv && <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        onClick={searchClickHandler}
                        className="size-6 hover:cursor-pointer absolute top-[4.5rem] left-5 bottom-0 my-auto "
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>}
                </div>
            </>
    )
}

export default SearchIcon


