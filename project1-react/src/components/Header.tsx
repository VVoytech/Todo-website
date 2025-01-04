import {Link} from "react-router-dom"

export const Header = () => {
    return (
        <div>
            <Link to={'/todo'}>Lista TODO</Link> | <Link to={'/todo/new'}>Dodaj</Link>
        </div>
    )
}