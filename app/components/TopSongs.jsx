import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTopSongs } from "~/redux/features/music/musicSlice"
import CardTopSongs from "./CardTopSongs"

export default function TopSongs({ title }) {
    const { isLoading, error, topSongs } = useSelector(state => state.songs)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTopSongs())
    }, [dispatch])
    if (isLoading) { return (<h1>IsLoading.....</h1>) }
    if (error) return <p>خطا: {error}</p>;
    return (
        <div className="flex flex-col my-10">
            <h3 className="text-primarytxt">{title}</h3>
            <div className="flex gap-10 mt-5">
                {
                    topSongs.map(song => <div key={song.id}><CardTopSongs song={song} /></div>)
                }
            </div>
        </div>
    )
}
