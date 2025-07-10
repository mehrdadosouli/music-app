import { Link } from "react-router"
import HomeIcon from "./icons/HomeIcon"
import AboutUs from "./icons/AboutUs"
import PhoneIcon from "./icons/PhoneIcon"

function Menu() {
    const items = [
        { id: 1, name: "خانه", link: "/" ,icon:<HomeIcon />}, { id: 2, name: "درباره ما" , link:"aboutus",icon:<AboutUs /> }, { id: 3, name: "ارتباط با ما" ,link:"contactus",icon:<PhoneIcon /> },
    ]
    return (
        <div className="w-full lg:static fixed bottom-0 left-0 right-0 mx-auto flex justify-center items-center z-[9999999999] lg:bg-transparent bg-bgcard py-2 gap-5 lg:mx-5 ">
            {items.map(menu => <ul className="flex lg:flex-row flex-col items-center" key={menu.id}>
                <span className="lg:hidden flex pb-2 text-primarytxt">{menu.icon}</span>
                <li><Link className="text-primarytxt hover:text-secondary flex justify-center items-center w-20 z-0" to={menu.link}>{menu.name}</Link></li>
            </ul>)}
        </div>
    )
}

export default Menu