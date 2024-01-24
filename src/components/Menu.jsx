// always pass the children 
const Menu = ({ children }) => {
    return (
        <div className="w-full border-t border-stone-400 justify-around pt-2 flex fixed bottom-0 md:bottom-[unset] md:flex-col md:w-[90px] md:h-screen md:justify-start md:relative order-1 md:border-r md:border-gray-200 bg-gray-50 z-30">
            {children}
        </div>
    )
}

export default Menu