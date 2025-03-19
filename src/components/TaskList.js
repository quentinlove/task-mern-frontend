import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTasks,reset } from "../features/task/taskSlice";
import TaskItem from "./TaskItem"
import Spinner from "./Spinner";

const TaskList =()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {tasks,isLoading,isError,message} = useSelector(state=>state.tasks)

    useEffect(()=>{
        if(isError) console.log(message);
        dispatch(getTasks())
        return ()=> dispatch(reset())
    },[navigate,dispatch,isError,message])
    return(
        isLoading ? <Spinner />:(
            <section className="content">
                {tasks.length >0 && (
                    <div className="tasks">
                        {tasks.map(task=> <TaskItem key={task.id} task={task}/>)}
                    </div>
                )}
            </section>
        )
    )
}

export default TaskList