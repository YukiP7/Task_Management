import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    status: false ,
    tasks: [{
        id: 1 ,
        title: "Task-1" ,
        description : "Add new task" ,
        startFrom : Date.now() ,
        endAt : Date.now() ,
        typeOf_task: "Personal" ,
            }] ,
}
 
const taskSlice = createSlice({
    name: "task" ,
    initialState ,
    reducers: {
        addTask: (state , action) => {
            state.status = true;

            const task = { 
            id : nanoid() ,
            title : action.payload.title,
            description : action.payload.description ,
            startFrom : action.payload.startFrom ,
            endAt : action.payload.endAt ,
            typeOf_task : action.payload.typeOf_task ,
            }

            state.tasks.push(task) 
        } , 

        deleteTask: (state , action) => {
            state.status = false ;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload.id) ;
        },

        editTask: (state , action) => {

        }


    }
})

