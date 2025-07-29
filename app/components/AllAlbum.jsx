import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbum } from "~/redux/features/music/musicSlice";
import CardSongs from "./CardSongs";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function AllAlbum({ title }) {
    const { isLoading, error, allAlbum } = useSelector(state => state.songs);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [albumDetails, setAlbumDetails] = useState(null); // State for track details
    const dispatch = useDispatch();

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slides: { perView: 1, spacing: 10 },
        breakpoints: {
            "(min-width :200px)": {
                slides: {
                    perView: 1,
                    spacing: 10
                }
            },
            "(min-width :510px)": {
                slides: {
                    perView: 2,
                    spacing: 10
                }
            },
            "(min-width :768px)": {
                slides: {
                    perView: 4,
                    spacing: 20
                }
            }
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created(slider) {
            setLoaded(true);
            setAlbumDetails(slider.track.details); // Store track details
        },
    });

    useEffect(() => {
        dispatch(fetchAllAlbum());
    }, [dispatch]);

    // استفاده از useMemo برای جلوگیری از ساخت مجدد keen-slider
    const sliderContent = useMemo(() => {
        return (
            <>
                <div ref={sliderRef} className="keen-slider">
                    { allAlbum?.map(song => (
                        <div key={song.id} className="keen-slider__slide overflow-hidden rounded-xl">
                            <CardSongs song={song} w="12rem" h='12rem' bg="inherit" rounded="full" txt="center" />
                        </div>
                    ))}
                </div>
                {loaded && albumDetails && ( // Check if albumDetails is available
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                albumDetails.slides.length - 1
                            }
                        />
                    </>
                )}
            </>
        );
    }, [allAlbum, loaded, currentSlide, instanceRef, sliderRef, albumDetails]); // dependencies for memoization

    if (error) return <p>خطا: {error}</p>;

    return (
        <div className="flex flex-col min-h-[400px] my-10">
            <h3 className="text-primarytxt text-2xl font-bold my-6">{title}</h3>
            {isLoading ? (
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex flex-col bg-bgcard rounded-xl gap-3 animate-pulse">
                            <div className="w-full h-56 bg-gray-300 rounded-t-xl"></div>
                            <div className="p-4 h-28">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="navigation-wrapper">
                    {sliderContent}
                </div>
            )}
        </div>
    );
}


function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
}
