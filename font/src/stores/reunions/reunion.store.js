import { defineStore } from "pinia";
import { getReunions } from "./reunion.API";

const getters={};

const actions={
  async getReunions(){
    try {
      const reunions=getReunions();
      return reunions;
    } catch (error) {
      console.error(`erreur lors de la recuperation des reunions: ${error}`);
    }
   }
};
const state=()=>({});
export const useReunionStore = defineStore("reunion", {state, getters,actions});
