<template>
  <q-page padding class="participants-container">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">Gestion des Participants</div>
      </q-card-section>

      <q-separator />

      <!-- Bouton pour ajouter un participant -->
      <q-card-section>
        <q-btn color="primary" label="Ajouter un participant" @click="openAddModal" />
      </q-card-section>

      <q-separator />

      <!-- Table de gestion des participants -->
      <q-table
        :rows="participants"
        :columns="columns"
        row-key="id"
        flat
        bordered
      >
        <template v-slot:body-cell-actions="props">
          <q-td>
            <q-btn color="primary" label="Modifier" @click="openEditModal(props.row)" />
            <q-btn color="negative" label="Supprimer" class="q-ml-sm" @click="deleteParticipant(props.row)" />
          </q-td>
        </template>
      </q-table>

      <!-- Modal pour ajouter ou modifier un participant -->
      <q-dialog v-model="participantModal">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ editMode ? 'Modifier' : 'Ajouter' }} un Participant</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="form.name" label="Nom" required />
            <q-input v-model="form.email" label="Email" required />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annuler" v-close-popup />
            <q-btn flat label="Sauvegarder" color="primary" @click="saveParticipant" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'GestionParticipants',
  setup() {
    // Liste des participants avec email
    const participants = ref([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' }
    ]);

    // Colonnes de la table avec une nouvelle colonne email
    const columns = [
      { name: 'name', label: 'Nom', field: 'name', align: 'left' },
      { name: 'email', label: 'Email', field: 'email', align: 'left' },
      { name: 'actions', label: 'Actions', align: 'center' }
    ];

    // Données pour le formulaire
    const form = ref({
      id: null,
      name: '',
      email: ''
    });

    // État de la modal et mode d'édition
    const participantModal = ref(false);
    const editMode = ref(false);

    // Fonction pour ouvrir la modal pour ajouter un participant
    const openAddModal = () => {
      form.value = { id: null, name: '', email: '' }; // Réinitialise le formulaire
      editMode.value = false;
      participantModal.value = true;
    };

    // Fonction pour ouvrir la modal pour éditer un participant
    const openEditModal = (participant) => {
      form.value = { ...participant }; // Charge les données du participant dans le formulaire
      editMode.value = true;
      participantModal.value = true;
    };

    // Fonction pour sauvegarder un participant (ajouter ou modifier)
    const saveParticipant = () => {
      if (editMode.value) {
        // Modifier un participant
        const index = participants.value.findIndex((p) => p.id === form.value.id);
        if (index !== -1) {
          participants.value[index] = { ...form.value };
        }
      } else {
        // Ajouter un participant
        form.value.id = participants.value.length + 1;
        participants.value.push({ ...form.value });
      }
      participantModal.value = false; // Ferme la modal
    };

    // Fonction pour supprimer un participant
    const deleteParticipant = (participant) => {
      participants.value = participants.value.filter((p) => p.id !== participant.id);
    };

    return {
      participants,
      columns,
      form,
      participantModal,
      editMode,
      openAddModal,
      openEditModal,
      saveParticipant,
      deleteParticipant
    };
  }
};
</script>

<style scoped>
.participants-container {
  display: flex;
  justify-content: center;
}

.my-card {
  width: 80%;
  max-width: 1000px;
}

.q-ml-sm {
  margin-left: 8px;
}

.text-center {
  text-align: center;
}
</style>
