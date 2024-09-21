<template>
  <div>
    <Dashboard />
    <div class="q-pa-md row items-start q-gutter-md">
    </div>
    <p><ChildComponentExample :propsMessage="propsMessage" /></p>
    <p><StoreExample /></p>
  </div>
</template>
<script>
import { ref } from "vue";
import ChildComponentExample from "../components/ChildComponentExample.vue";
import StoreExample from "../components/StoreExample.vue";
import { useTodoStore } from "../stores/todo";
import { onMounted } from "vue";
import Dashboard from '../pages/dashboard.vue';

export default {
  name: "HomePage",
   components: {
  //   ChildComponentExample,
  //   StoreExample,
   Dashboard
  },
  setup() {
    onMounted(async () => {
      const store = useTodoStore();
      await store.fetchTodos();
      console.log(store.todos);
    });
    // let propsMessageNumber = 1;
    // const propsMessage = ref("Ceci est le 1er message qui passe par la props");
    // const store = useTodoStore();
    // const changePropsMessage = () => {
    //   if (propsMessageNumber === 1) {
    //     propsMessage.value = "Ceci est le 2eme message qui passe par la props";
    //     propsMessageNumber = 2;
    //   } else {
    //     propsMessage.value = "Ceci est le 1er message qui passe par la props";
    //     propsMessageNumber = 1;
    //   }
    // };
    return {
      //changePropsMessage,
      //propsMessage,

    };
  },
};
</script>
<style></style>
