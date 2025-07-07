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
    if (error) return <p>خطا: {error}</p>;
    return (
        <div className="flex flex-col min-h-[400px]">
            <h3 className="text-primarytxt text-2xl font-bold my-6">{title}</h3>
            {isLoading ? (
                <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-5">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="flex flex-col bg-bgcard rounded-xl gap-3 animate-pulse">
                            <div className="w-full aspect-square bg-gray-300 rounded-t-xl"></div>
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-5">
                    {topSongs.map(song => <CardTopSongs key={song.id} song={song} />)}
                </div>
            )}
        </div>
    )
}
