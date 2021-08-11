import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: require("../data/profile"),
    accordion: require("../data/accordion"),
    klasaCzlonkowie: require("../data/klasaCzlonkowie"),
    klasaWydarzenia: require("../data/klasaWydarzenia"),
    przedmioty: require("../data/przedmioty"),
    noweOceny: require("../data/noweOceny"),
    wiadomosci: require("../data/wiadomosci"),
    wydarzenia: require("../data/wydarzenia")
  },
  mutations,
  actions,
  getters,
})
