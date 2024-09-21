<template>
  <q-page padding class="dashboard-container">
    <!-- Dashboard avec onglets pour Réunions passées et à venir -->
    <q-card flat bordered class="my-card">
      <q-tabs v-model="selectedTab" class="text-center">
        <q-tab name="upcoming" label="Réunions à venir" />
        <q-tab name="past" label="Réunions passées" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="selectedTab" animated>
        <!-- Réunions à venir -->
        <q-tab-panel name="upcoming">
          <q-table
            :rows="reunionsAVenir"
            :columns="columns"
            row-key="nom"
            flat
            bordered
          >
            <template v-slot:body-cell-date="props">
              {{ formatDate(props.row.date) }}
            </template>
          </q-table>
        </q-tab-panel>

        <!-- Réunions passées -->
        <q-tab-panel name="past">
          <q-table
            :rows="reunionsPassees"
            :columns="columns"
            row-key="nom"
            flat
            bordered
          >
            <template v-slot:body-cell-date="props">
              {{ formatDate(props.row.date) }}
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { date } from 'quasar';

export default {
  name: 'Dashboard',
  setup() {
    const selectedTab = ref('upcoming');

    const reunionsAVenir = ref([
      { nom: 'Réunion stratégique', date: '2023-10-01' },
      { nom: 'Réunion de clôture', date: '2023-10-15' }
    ]);

    const reunionsPassees = ref([
      { nom: 'Réunion de projet', date: '2023-09-01' },
      { nom: 'Réunion d\'équipe', date: '2023-09-15' }
    ]);

    const columns = [
      { name: 'nom', label: 'Titre', field: 'nom', align: 'left' },
      { name: 'date', label: 'Date', field: 'date', align: 'left' }
    ];

    const formatDate = (dateStr) => {
      return date.formatDate(dateStr, 'MMMM D, YYYY');
    };

    return {
      selectedTab,
      reunionsAVenir,
      reunionsPassees,
      columns,
      formatDate
    };
  }
};
</script>

<style scoped>
/* Centrer le tableau horizontalement */
.dashboard-container {
  display: flex;
  justify-content: center;
}

.my-card {
  width: 80%; /* Pour que le tableau ne prenne pas toute la largeur de l'écran */
  max-width: 1000px; /* Limite la taille maximale du tableau */
}

.q-table {
  min-width: 100%;
}

.text-center {
  text-align: center;
}
</style>
