const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/HomePage.vue") },
      {
        path: "ListeReunions",
        name: 'ListeReunions',
        component: () => import("src/pages/ListeReunions.vue"),
      },
      {
        path: "CreerReunion",
        name:'CreerReunion',
        component: () => import("src/pages/CreerReunion.vue"),

      },
      {
        path: '/reunions/:id',
        name: 'DetailsReunion',
        component: () => import("src/pages/DetailsReunions.vue"),
      },
      {
        path: "/participants",
        name: 'participants',
        component: () => import("src/pages/GestionParticipants.vue"),
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
