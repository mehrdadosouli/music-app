import { Link } from "react-router"

function Menu() {
    const items = [
        { id: 1, name: "خانه", link: "/" }, { id: 2, name: "درباره ما" , link:"aboutus" }, { id: 3, name: "ارتباط با ما" ,link:"contactus" },
    ]
    return (
        <div className="lg:flex hidden gap-5 mx-5 ">
            {items.map(menu => <ul className="flex items-center" key={menu.id}>
                <li><Link className="text-primarytxt hover:text-secondary inline-flex w-20" to={menu.link}>{menu.name}</Link></li>
            </ul>)}
        </div>
    )
}

export default Menu