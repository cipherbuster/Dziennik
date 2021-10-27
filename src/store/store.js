import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profil:require("../data/profil"),
    profilHelp: require("../data/profilHelp"),
    profile:require("../data/profile"),
    nowyProfil: require("../data/nowyProfil"),
    noweKonto: require("../data/noweKonto"),
    accordion: require("../data/accordion"),
    klasaCzlonkowie: require("../data/klasaCzlonkowie"),
    klasaCzlonkowie2: require("../data/klasaCzlonkowie2"),
    klasaWydarzenia: require("../data/klasaWydarzenia"),
    noweOceny: require("../data/noweOceny"),
    wiadomosci: require("../data/wiadomosci"),
    wydarzenia: require("../data/wydarzenia"),
    klasy: require("../data/klasy"),
    klasaNauczyciele: require("../data/klasaNauczyciele"),
    przedmioty: require("../data/przedmioty"),
    przedmiotConfig: require("../data/przedmiotConfig"),
    nauczycielConfig: require("../data/nauczycielConfig"),
    uczenConfig: require("../data/uczenConfig"),
    wyswietlOceny: require("../data/wyswietlOceny"),
    klasaConfig: require("../data/klasaConfig"),
    wyswietlObecnosci: require("../data/wyswietlObecnosci"),
    nowaKlasa: require("../data/nowaKlasa"),
    wszyscyNauczyciele: require("../data/wszyscyNauczyciele"),
    nowyPrzedmiot: require("../data/nowyPrzedmiot"),
    uwagaConfig: require("../data/uwagaConfig"),
    uwagaConfig2: require("../data/uwagaConfig2"),
    uczenNauczyciel: require ("../data/uczenNauczyciel"),
    uczenNauczyciel2: require ("../data/uczenNauczyciel2"),
    uwagi: require ("../data/uwagi"),
    uwagaTresc: require ("../data/uwagaTresc"),
    uczenConfigRelacja: require ("../data/uczenConfigRelacja"),
    opiekunConfigRelacja: require ("../data/opiekunConfigRelacja"),
    wszyscyUczniowie: require ("../data/wszyscyUczniowie"),
    wszyscyOpiekunowie: require ("../data/wszyscyOpiekunowie"),
    klasyConfigRelacja: require ("../data/klasyConfigRelacja"),
    wszystkieKlasy: require ("../data/wszystkieKlasy"),
    przedmiotConfigRelacja: require ("../data/przedmiotConfigRelacja"),
    nauczycielConfigRelacja: require ("../data/nauczycielConfigRelacja"),
    wszystkiePrzedmiotyNauczyciela: require ("../data/wszystkiePrzedmiotyNauczyciela"),
    wszystkiePrzedmioty: require ("../data/wszystkiePrzedmioty"),
    wszyscyUczniowieKlasy: require ("../data/wszyscyUczniowieKlasy"),
    wszystkiePrzedmiotyHelp: require ("../data/wszystkiePrzedmiotyHelp"),
    wyswietlOcenyDyrektor: require ("../data/wyswietlOcenyDyrektor"),
    wyswietlObecnosciDyrektor: require ("../data/wyswietlObecnosciDyrektor"),
    uwagiDyrektor: require ("../data/uwagiDyrektor")
  },
  mutations,
  actions,
  getters,
})
