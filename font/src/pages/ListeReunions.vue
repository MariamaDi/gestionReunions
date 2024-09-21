<template>
  <q-page padding class="reunions-container">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">Liste des réunions</div>
      </q-card-section>

      <q-separator />

      <q-list bordered separator>
        <q-item
          v-for="reunion in reunions"
          :key="reunion.id"
          clickable
          @click="goToDetails(reunion.id)"
        >
          <q-item-section>
            <q-item-label>{{ reunion.titre }}</q-item-label>
            <q-item-label caption>{{ formatDate(reunion.date_reunion) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { onBeforeMount, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { date } from "quasar";
import { useReunionStore } from "src/stores/reunions/reunion.store";

export default {
  name: "ListeReunions",
  setup() {
    const router = useRouter();
    const reunionStore = useReunionStore();
    const state = reactive({
      reunions:[]
        })


  function formatDate(dateStr, format) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
}


    const goToDetails = (id) => {
      // Redirige vers la page de détails avec l'ID de la réunion
      router.push({ name: "DetailsReunion", params: { id } });
    };

    onBeforeMount(async () => {
      state.reunions=await reunionStore.getReunions();;
      //console.log(state.reunions);
    })
    return {
      ...toRefs(state),
      goToDetails,
      formatDate
    };
  }
};
</script>

<style scoped>
.reunions-container {
  display: flex;
  justify-content: center;
}

.my-card {
  width: 80%;
  max-width: 1000px;
}

.text-center {
  text-align: center;
}
</style>
