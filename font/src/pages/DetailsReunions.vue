<template>
  <q-page padding class="details-container">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 text-center">Détails de la réunion</div>
      </q-card-section>
      <q-separator />
      <!-- Affichage des détails de la réunion -->
      <q-card-section>
        <div class="q-mb-md"><strong>Titre :</strong> {{ reunion.titre }}</div>
        <div class="q-mb-md"><strong>Date :</strong> {{ formatDate(reunion.date) }}</div>
        <div class="q-mb-md"><strong>Heure de début :</strong> {{ reunion.heure_de_debut }}</div>
        <div class="q-mb-md"><strong>Heure de fin :</strong> {{ reunion.heure_de_fin }}</div>
        <div class="q-mb-md"><strong>Participants :</strong>
          <ul>
            <li v-for="(participant, index) in reunion.participants" :key="index">
              {{ participant }}
            </li>
          </ul>
        </div>
        <div class="q-mb-md"><strong>Notes :</strong> {{ reunion.notes }}</div>
      </q-card-section>

      <q-separator />

      <!-- Boutons pour éditer et supprimer -->
      <q-card-section class="row justify-end">
        <q-btn color="primary" @click="openEditModal">Éditer</q-btn>
        <q-btn color="negative" @click="deleteReunion" class="q-ml-sm">Supprimer</q-btn>
      </q-card-section>

      <!-- Bouton retour à la liste -->
      <q-btn color="secondary" @click="goBack">Retour à la liste</q-btn>
    </q-card>

    <!-- Modal pour éditer la réunion -->
    <q-dialog v-model="editModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">Modifier la réunion</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="editedReunion.titre" label="Titre" />
          <q-input v-model="editedReunion.date" label="Date" type="date" />
          <q-input v-model="editedReunion.heure_de_debut" label="Heure de début" type="time" />
          <q-input v-model="editedReunion.heure_de_fin" label="Heure de fin" type="time" />
          <q-input v-model="editedReunion.participants" label="Participants (séparés par une virgule)" />
          <q-input v-model="editedReunion.notes" label="Notes" type="textarea" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" v-close-popup />
          <q-btn flat label="Sauvegarder" color="primary" @click="saveChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { date } from "quasar";

export default {
  name: "DetailsReunion",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const reunion = ref({});
    const editModal = ref(false);
    const editedReunion = ref({});

    const reunions = [
      {
        id: 1,
        titre: "Réunion de projet",
        heure_de_debut: "10:00",
        heure_de_fin: "12:00",
        date: "2023-09-01",
        notes: "Détails sur la réunion de projet.",
        participants: ["Alice", "Bob", "Charlie"]
      },
      {
        id: 2,
        titre: "Réunion d'équipe",
        heure_de_debut: "14:00",
        heure_de_fin: "16:00",
        date: "2023-09-15",
        notes: "Détails sur la réunion d'équipe.",
        participants: ["David", "Eva", "Frank"]
      },
      {
        id: 3,
        titre: "Réunion stratégique",
        heure_de_debut: "09:00",
        heure_de_fin: "11:00",
        date: "2023-10-01",
        notes: "Détails sur la réunion stratégique.",
        participants: ["George", "Hannah", "Irene"]
      },
      {
        id: 4,
        titre: "Réunion de clôture",
        heure_de_debut: "13:00",
        heure_de_fin: "15:00",
        date: "2023-10-15",
        notes: "Détails sur la réunion de clôture.",
        participants: ["John", "Kara", "Leo"]
      }
    ];

    onMounted(() => {
      const id = route.params.id;
      const selectedReunion = reunions.find((r) => r.id === parseInt(id));
      reunion.value = selectedReunion;
      editedReunion.value = { ...selectedReunion }; // Clone les détails pour l'édition
    });

    const formatDate = (dateStr) => {
      return date.formatDate(dateStr, "MMMM D, YYYY");
    };

    const goBack = () => {
      router.push({ name: "ListeReunions" });
    };

    const openEditModal = () => {
      editModal.value = true;
    };

    const saveChanges = () => {
      Object.assign(reunion.value, editedReunion.value); // Sauvegarde les modifications
      editModal.value = false;
    };

    const deleteReunion = () => {
      // Logique de suppression (pour l'instant, rediriger vers la liste)
      router.push({ name: "ListeReunions" });
      alert("Réunion supprimée");
    };

    return {
      reunion,
      editedReunion,
      editModal,
      openEditModal,
      saveChanges,
      deleteReunion,
      formatDate,
      goBack
    };
  }
};
</script>

<style scoped>
.details-container {
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

.q-ml-sm {
  margin-left: 8px;
}
</style>
