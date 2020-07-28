<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import addTodo from './components/addTodo.vue';
import login from './components/login.vue';

export default {
  components: {
        'add-todo': addTodo
    },
  data () {
      return {
      
      }
  },
  methods: {
    
  }
}
</script>

<style>

</style>
