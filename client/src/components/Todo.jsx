import React from 'react';
import moment from 'moment/moment';
import { deleteTodoApi, MarkTodoApi } from '../services/api.js';
import { ToastContainer, toast } from 'react-toastify';


function Todo({todo,setRefreshList}) {
    const handleDelete = async () =>{
       const result = await deleteTodoApi({
        todo_id: todo._id
       })
       if(result.data.status === 200){
        setRefreshList(new Date())
        toast('Deleted')
       }else{
        toast('Failed to delete, please try again')
       }
    }

    const handleMarkTodo = async () =>{
        const result = await MarkTodoApi({
         todo_id: todo._id
        })

        if(result.data.status === 200){
         setRefreshList(new Date())
         toast(result.data.message)
        }else{
         toast('Failed to Mark, please try again')
        }
     }
    return (
        <div className="col-sm-3 mx-3 my-2 alert bg-light">
            <div className="card-header">
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </div>
            <div className="card-body">
                <h4 className="card-tile">{todo.desc}</h4>
                <p className="card-text">{moment(todo.date).fromNow()}</p>
               
            </div>
            <div className="actionButton" style={{display: 'flex', justifyContent:'end', alignItems:"center"}}>
                    <div className="deleteButton">
                        <button style={{background:"red"}} onClick={handleDelete}>Delete</button>
                    </div>
                    {/* <div className="marktodo">
                        <button onClick={handleMarkTodo} style={{background:""}}>{todo.isCompleted ? 'mark uncompleted' : 'Mark Completed'}</button>
                    </div> */}
                </div>

        </div>
    )
}

export default Todo;