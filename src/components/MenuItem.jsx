import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const MenuItem = ({ iconName, iconText }) => {
    return (
        <section className="flex p-1 flex-col text-zinc-600 font-rale font-medium bg-blue-400">
            <FontAwesomeIcon icon={iconName} />
            {iconText}
        </section>
    )
}

export default MenuItem