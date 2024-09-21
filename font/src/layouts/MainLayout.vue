<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 1200px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-cyan">
        <q-toolbar>
          <q-btn flat round dense to="/" icon="home" />
          <q-btn color="white" flat to="/ListeReunions" label="liste Reunions" />

          <q-btn color="white" flat to="/CreerReunion" label="Reunion" />
          <q-btn color="white" flat to="/participants" label="Participant" />
          <q-space />
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            Asso les anges
          </q-chip>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  setup() {
    return {};
  },
};
</script>
