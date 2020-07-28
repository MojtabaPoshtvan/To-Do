<template>
  <div class="todo-container" id="add-todo">
    <form class="form" v-on:submit.prevent="post();">
        <input class="form__input" type="text" placeholder="My Task" v-model="todo.description"/>
        <input class="form__input" type="date" v-model="todo.dueDate"/>
        <input class="form__input" type="text" placeholder="important back-end" v-model="todo.tags"/>
        <button class="btn form__submit-btn" type="submit">Add</button>
    </form>
    
    <transition-group tag="ol" name="list" class="todo-list">
      <li class="todo-list__item" v-bind:class="{ complete: todo.complete }" v-bind:key="index" v-for="(todo,index) in todos">
        <button class="todo-list__item-content" v-on:click="toggleTodo(todo,index);">
          {{ todo.description }}
        </button>

        <button class="btn todo-list__item-remove" v-on:click="deleteTodo(todo, index)">
          <i class="fa" v-bind:class="[todo.complete ? 'fa-check' : 'fa-times']"></i>
        </button>
      </li>
    </transition-group>

    <div class="filters">
      <div class="btn-container-tags" v-bind:key="index" v-for="(category,index) in categories">
        <button class="btn filters__btn filters__btn--all" v-on:click="filterTodos(category.name)">
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todo: {
            description: '',
            tags: '',
            dueDate: ''
      },
      todos: [],
      categories: [{
          name: 'all',
          list: []
        },
        {
          name: 'done',
          list: []
        },
        {
          name: 'undone',
          list: []
        },
        {
          name: 'tag1',
          list: []
        },
        {
          name: 'tag2',
          list: []
        },
        {
          name: 'tag3',
          list: []
        },
        {
          name: 'tag4',
          list: []
        },
        {
        name: 'tag5',
        list: []
      }],
      alltodos: [],
      visibility: 'all',
    }
  },

  methods: {
    toggleTodo: function(todo,i) {
      this.todos[i].tags.forEach((element,index, self) =>{
        if(element === 'done'){
          self[index] = "undone";
        }
        else if(element === 'undone'){
          self[index] = "done";
        }
      });
    },

    filterTodos: function(filter) {
      this.visibility = filter;
      if(this.visibility === 'all'){
        this.todos = this.alltodos;
      }
      else {
        this.categories.forEach(element => {
          if(this.visibility === element.name){
            this.todos = element.list;
          }
        })
      }
      return this.todos;
    },

    deleteTodo: function(todo, index) {
      this.todos.splice(index, 1);
    },

    textToArray: function(tags){
      var temp = tags
      this.todo.tags = temp.split(" ");
    },
      
    post: function() {
      this.textToArray(this.todo.tags);
      this.alltodos.push({
           description: this.todo.description,
           tags: this.todo.tags,
           dueDate: this.todo.dueDate,
      });
      this.categories.forEach(element =>{
        this.todo.tags.forEach(e =>{
          if(element.name === e){
              element.list.push({
              description: this.todo.description,
              tags: this.todo.tags,
              dueDate: this.todo.dueDate,
          });
          }
        });
      });
      this.todos = this.alltodos;
      this.todo.description = '';
      this.todo.dueDate = '';
      this.todo.tags = [];
     },
  }
}
</script>

<style>

div#app {
    width: unset;
    height: unset;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga", "kern";
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
}

body {
  overflow: hidden;
  height: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  font-family: "Source Sans Pro", sans-serif;
    background: #E2E2E5;

}

button {
  background: none;
  border: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
}
button:focus {
  outline: none;
}
button:hover {
  cursor: pointer;
}

.todo-container {
     min-height: 50vh;
     display: -webkit-box;
     display: flex;
     -webkit-box-orient: vertical;
     -webkit-box-direction: normal;
     flex-direction: column;
     -webkit-box-align: center;
     align-items: center;
     -webkit-box-pack: justify;
     justify-content: space-between;
     border-radius: 1em;
     background: #fff;
     overflow: hidden;
     box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
 }

.btn {
  font-size: 14px;
  margin: 0 .5em;
  border-radius: 2em;
  padding: 0.75em 1.5em;
  cursor: pointer;
  background: none;
  color: #34495E;
  border: 1px solid;
  letter-spacing: 1px;
  font-family: "Source Sans Pro", sans-serif;
  color: #34495E;
  border: #34495E 1px solid;
  -webkit-transition: 250ms ease-out;
  transition: 250ms ease-out;
}
.btn:hover, .btn:focus {
  color: #fff;
  background: #34495E;
}

.btn-container-tags {
    width: 20%;
    justify-content: center;
    align-items: center;
    display: inline-flex;
    margin: 1% 0;
}

.form {
  width: 100%;
  padding: 1.5rem 1rem 0 1rem;
  display: -webkit-box;
  display: flex;
}
.form__input {
  width: 100%;
  font-size: 14px;
  margin: 0 .5em;
  border-radius: 2em;
  padding: 0.75em 1.5em;
  background: none;
  font-family: "Source Sans Pro", sans-serif;
  border: #e3e3e3 1px solid;
  -webkit-transition: border 250ms ease-out;
  transition: border 250ms ease-out;
}
.form__input:focus {
  border: #34495E 1px solid;
  outline: none;
}

.todo-list {
  width: 100%;
  padding: 0 1rem;
  -webkit-box-flex: 1;
          flex: 1;
}
.todo-list__item {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
          align-items: center;
  padding: .5em;
  margin-bottom: .5em;
  border-radius: 3px;
  -webkit-transition: 200ms;
  transition: 200ms;
  color: #34495E;
  margin: 2% 0;
}
.todo-list__item:last-child {
  margin-bottom: 0;
}
.todo-list__item.complete {
  color: #34495E;
}
.todo-list__item.complete .todo-list__item-content:after {
  background: #34495E;
}
.todo-list__item-content {
  position: relative;
}
.todo-list__item-content:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 1px;
  background: #34495E;
  -webkit-transition: 250ms ease-out;
  transition: 250ms ease-out;
  -webkit-transform-origin: center;
          transform-origin: center;
  -webkit-transform: scalex(0);
          transform: scalex(0);
}
.todo-list__item-content:hover:after, .todo-list__item-content:focus:after {
  -webkit-transform: scalex(1);
          transform: scalex(1);
}
.todo-list__item-remove {
  margin-left: .5em;
  background: none;
  border: 1px solid;
  color: inherit;
  padding: 0;
  line-height: 1;
  width: 2em;
  height: 2em;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
  border-radius: 50%;
  font-size: 80%;
}

.filters {
  width: 100%;
  padding: 0 1rem 1.5rem 1rem;
}

.list-move,
.list-leave-active,
.list-enter-active {
  -webkit-transition: 500ms cubic-bezier(0.87, -0.41, 0.19, 1.44);
  transition: 500ms cubic-bezier(0.87, -0.41, 0.19, 1.44);
}

.list-enter,
.list-leave-active {
  -webkit-transform: translate(100%, 0);
          transform: translate(100%, 0);
  opacity: 0;
}
</style>