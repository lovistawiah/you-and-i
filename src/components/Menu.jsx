// always pass the children 
const Menu = ({ children }) => {
    return (
        <div className="w-full bg-white border-t border-stone-400 justify-around pt-2 flex absolute bottom-3">

            {children}
        </div>
    )
}

export default Menu