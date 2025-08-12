import { Link, useNavigate, useSearchParams } from "react-router";
import AddPlaylistIcon from "./icons/AddPlaylistIcon";
import TrashIcon from "./icons/TrashIcon";
import SwallDelete from "~/utils/SwallDelete";
import { useDispatch, useSelector } from "react-redux";
import { addtracktoplayList, fetchAllSongs } from "~/redux/features/music/musicSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";


export default function PlayLists({ playlistitem }) {
    const [params] = useSearchParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { track } = useSelector(state => state.songs)
    const searchParam = params.get('id')

    const deleteHandler = (item, event) => {
        event.stopPropagation();
        SwallDelete(dispatch, item)
    }
    useEffect(() => {
        dispatch(fetchAllSongs());
    }, [dispatch]);

    const addlistHandler = (index, event) => {
        event.stopPropagation()
        if (!track) {
            return
        } else {
            let findMusic = track.find(item => item.id === searchParam)

            if (findMusic) {
                dispatch(addtracktoplayList({ music: findMusic, index }))
                Swal.fire({
                    title: "با موفقیت اظافه شد",
                    icon: "success",
                    confirmButtonText: "باشه"
                }).then(() => {
                    navigate(-1)
                })
            }
        }

    }
    return (
        playlistitem.length &&
        playlistitem.map((item, index) =>
            <div className="flex items-center gap-10 w-full bg-[#e7e7e7] rounded-xl" key={item.id}>
                {
                    searchParam == null ?
                        <>
                            <div className=" cursor-pointer p-1 select-none" onClick={(event) => deleteHandler(item, event)}>
                                <TrashIcon />
                            </div>
                            <Link to={`/myPlayList/${item.id}`} className="hover:cursor-pointer w-full p-3" key={item.id} >{item.name}</Link>
                        </>
                        :
                        <>
                            <div className=" cursor-pointer p-1 select-none" onClick={(event) => addlistHandler(index, event)}>
                                <AddPlaylistIcon />
                            </div>
                            <span className="w-full p-3" key={item.id} >{item.name}</span>
                        </>
                }

            </div>)
    )
}
