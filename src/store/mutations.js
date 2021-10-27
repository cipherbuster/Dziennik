import VueRouter from 'vue-router';
import Vue from 'vue';


export default {
  wyslijwiadomoscMutation(state, payload) {

    for (var i=0; i < state.wiadomosci.length; i++){
      Vue.set(state.wiadomosci, state.wiadomosci.length - i, state.wiadomosci[state.wiadomosci.length - i -1]);
    };

    var newMessage = {
    tresc:payload.content,
    data:new Date(),
    nazwisko: state.profil[0].imie + " " + state.profil[0].nazwisko
    }

    Vue.set(state.wiadomosci, 0, newMessage);

    },

    zatwierdzZamianyProfilMutation(state, payload) {

    var nowyObjekt =  {};
        nowyObjekt.id_uzytkownik=state.profil[0].id_uzytkownik;
        nowyObjekt.imie=state.profilHelp[0].imie;
        nowyObjekt.nazwisko=state.profilHelp[0].nazwisko;
        nowyObjekt.email=state.profilHelp[0].email;
        nowyObjekt.telefon=state.profilHelp[0].telefon;
        nowyObjekt.status=state.profil[0].status;
        nowyObjekt.pokrewienstwo=state.profilHelp[0].pokrewienstwo;
        nowyObjekt.id_relacja=state.profil[0].id_relacja;
        nowyObjekt.id_klasa=state.profil[0].id_klasa;
        nowyObjekt.id_konto=state.profil[0].id_konto;

      var nowyObjekt2 = {};
        nowyObjekt2.id = state.profile[0].id;
        nowyObjekt2.path = "/w3images/avatar2.png";
        nowyObjekt2.uprawnienia = state.profile[0].uprawnienia;
        nowyObjekt2.nazwisko = state.profilHelp[0].imie + " " + state.profilHelp[0].nazwisko;
        nowyObjekt2.przedmiot = state.profile[0].nazwa_przedmiotu;
        nowyObjekt2.klasa = state.profile[0].nazwa;

      Vue.set(state.profil, 0, nowyObjekt);
      Vue.set(state.profile, 0, nowyObjekt2);
      },

      potwierdzeniePrzeczytaniaMutation(state, payload) {
          for (var i = 0; i < state.uwagi.length; i++) {
            if (state.uwagi[i].id_uwagi == payload.id_uwagi){
              state.uwagi[i].potwierdzenie = payload.potwierdzenie
            }
          }
      },

  }
