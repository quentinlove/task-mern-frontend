import { useDispatch } from "react-redux";
import {deleteTask} from '../features/task/taskSlice'

const TaskItem = ({task})=>{
    const dispatch = useDispatch()
    return(
        <div className="goal">
             <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
             <h2>{task.text}</h2>
             <button className="close" onClick={()=> dispatch(deleteTask(task._id))}>X</button>
        </div>
    )
}

export default TaskItem