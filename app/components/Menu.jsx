import { Link } from "react-router"

function Menu() {
    const items = [
        { id: 1, name: "خانه", link: "/" }, { id: 2, name: "درباره ما" , link:"aboutus" }, { id: 3, name: "ارتباط با ما" ,link:"contactus" },
    ]
    return (
        <div className="flex gap-20 mx-10">
            {items.map(menu => <ul className="flex items-center" key={menu.id}>
                <li><Link className="text-white" to={menu.link}>{menu.name}</Link></li>
            </ul>)}
        </div>
    )
}

export default Menu