import {useParams} from "react-router-dom";

export const TodoForm = () => {
    const {id} = useParams();
    return <div>TodoForm. ID: {id}</div>
}