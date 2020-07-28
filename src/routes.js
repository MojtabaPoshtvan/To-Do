import addTodo from './components/addTodo.vue'
import login from './components/login.vue'

export default[
    {path: '/', component: login },
    {path: '/login', component: login },
    {path: '/my-todo', component: addTodo},
]