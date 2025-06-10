import { Link } from "react-router"
import Menu from "~/components/Menu"
import SearchHeader from "~/components/SearchHeader"

function Header() {
  const clickHandler = () => {
    let theme=document.querySelector('html').className
    if(theme == "dark"){
      document.querySelector('html').classList.remove("dark")
      document.querySelector('html').classList.add("light")
      console.log(document.querySelector('html').className);
      
    }else{
      document.querySelector('html').classList.remove("light")
      document.querySelector('html').classList.add("dark")
      console.log(document.querySelector('html').className);
    }    
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-5">
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-white bg-primary hover:text-primary hover:bg-white border border-primary transition-all" to="/signup">Sign Up</Link>
        <Link className="w-40 h-8 rounded-sm flex justify-center items-center text-primary border border-primary hover:text-white hover:bg-primary transition-all" to="/login">Login</Link>
      </div>
      <Menu />
      <SearchHeader />
      <button className='dark:text-white text-black' onClick={clickHandler}>theme</button>
    </div>
  )
}

export default Header