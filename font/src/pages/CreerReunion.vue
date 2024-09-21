<template>
  <q-page padding class="form-container">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">Créer une Réunion</div>
      </q-card-section>

      <q-separator />

      <!-- Formulaire de création de réunion -->
      <q-card-section>
        <q-form @submit="submitForm">
          <q-input v-model="reunion.titre" label="Titre" class="q-mb-md" required />
          <q-input v-model="reunion.date" label="Date" type="date" class="q-mb-md" required />
          <q-input v-model="reunion.heure_de_debut" label="Heure de début" type="time" class="q-mb-md" required />
          <q-input v-model="reunion.heure_de_fin" label="Heure de fin" type="time" class="q-mb-md" required />
          <q-input v-model="reunion.notes" label="Notes" type="textarea" class="q-mb-md" />

          <!-- Sélection des participants avec champ de recherche -->
          <q-select
            v-model="reunion.participants"
            :options="optionsParticipants"
            label="Participants"
            multiple
            emit-value
            map-options
            use-input
            input-debounce="300"
            fill-input
            class="q-mb-md"
            hint="Commencez à taper pour rechercher des participants"
          />

          <q-card-actions align="right">
            <q-btn type="submit" label="Créer" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CreerReunion',
  setup() {
    // Données de la réunion
    const reunion = ref({
      titre: '',
      date: '',
      heure_de_debut: '',
      heure_de_fin: '',
      notes: '',
      participants: [] // Pour stocker les participants sélectionnés
    });

    // Options des participants (pour la liste déroulante)
    const optionsParticipants = ref([
      { label: 'Alice', value: 'Alice' },
      { label: 'Bob', value: 'Bob' },
      { label: 'Charlie', value: 'Charlie' },
      { label: 'David', value: 'David' },
      { label: 'Eva', value: 'Eva' },
      { label: 'Frank', value: 'Frank' }
    ]);

    // Fonction de soumission du formulaire
    const submitForm = () => {
      // Logique pour sauvegarder la réunion (en local ou via une API)
      console.log('Réunion créée:', reunion.value);
      alert('Réunion créée avec succès !');
    };

    return {
      reunion,
      optionsParticipants,
      submitForm
    };
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}

.my-card {
  width: 80%;
  max-width: 1000px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.text-center {
  text-align: center;
}
</style>
