import axios from 'axios';
import Vue from 'vue';
export default {
  wyslijwiadomoscAction ({ commit, state }, payload) {
     if (state.profil[0].status=='opiekun'){
        var opiekun = state.profil[0].id_uzytkownik;
        var nauczyciel = payload.id_nauczyciel;
        var uczen = state.profil[0].id_relacja

        axios({
          method: 'post',
          url: './PDO_QUERY/wiadomosc.php',
          data: {
          tytul:payload.title,
          tresc:payload.content,
          data:new Date(),
          status:"nieprzeczytane",
          id_uzytkownik:state.profil[0].id_uzytkownik,
          id_nauczyciel:nauczyciel,
          id_uczen: uczen,
          id_opiekun: opiekun
        }}).then( res => {

        });

     }else if (state.profil[0].status=='uczen'){
        var uczen = state.profil[0].id_uzytkownik;
        var nauczyciel = payload.id_nauczyciel;
        var opiekun = state.profil[0].id_relacja;

        axios({
          method: 'post',
          url: './PDO_QUERY/wiadomosc.php',
          data: {
          tytul:payload.title,
          tresc:payload.content,
          data:new Date(),
          status:"nieprzeczytane",
          id_uzytkownik:state.profil[0].id_uzytkownik,
          id_nauczyciel:nauczyciel,
          id_uczen: uczen,
          id_opiekun: opiekun
        }}).then( res => {

        });

     }else if (state.profil[0].status=='nauczyciel'){
        var nauczyciel = state.profil[0].id_uzytkownik;
        var uczen = payload.id_uczen;
        axios.post("./PDO_QUERY/getuczenopiekun.php",{
          id_uczen: uczen
        }).then(res => {
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);
          var opiekun = resp[0].id_relacja;

          axios({
            method: 'post',
            url: './PDO_QUERY/wiadomosc.php',
            data: {
            tytul:payload.title,
            tresc:payload.content,
            data:new Date(),
            status:"nieprzeczytane",
            id_uzytkownik:state.profil[0].id_uzytkownik,
            id_nauczyciel:nauczyciel,
            id_uczen: uczen,
            id_opiekun: opiekun
          }}).then( res => {

          });

        });
     };
    commit("wyslijwiadomoscMutation", payload);
  },

  getKlasaCzlonkowieAction({ commit, state }, payload){
  axios.post('./PDO_QUERY/klasaczlonkowie.php',{
    id_klasa: payload.id_klasa
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id : resp[i].id_klasa,
        id_uczen:resp[i].id_uzytkownik,
        nazwisko : resp[i].imie + " " + resp[i].nazwisko,
        numer: i+1
      }
    }

    switch (payload.klasa){
      case 1:{
        state.klasaCzlonkowie.length = 0;
        for (var i=0; i < table.length; i++){
        Vue.set(state.klasaCzlonkowie, i, table[i]);
        }
      }; break;
      case 2:{
        state.klasaCzlonkowie2.length = 0;
        for (var i=0; i < table.length; i++){
        Vue.set(state.klasaCzlonkowie2, i, table[i]);
        }
      }; break;
    }
  }
  });

  },

  getKlasaWydarzeniaAction({ commit, state }, payload){
  axios.post('./PDO_QUERY/klasawydarzenia.php',{
    id_klasa: payload.id_klasa
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id : resp[i].id_wydarzenia,
        klasa : resp[i].nazwa,
        data : resp[i].data,
        opis : resp[i].opis
      }
    }
    state.klasaWydarzenia.length=0;
    for (var i=0; i < table.length; i++){
    Vue.set(state.klasaWydarzenia, i, table[i]);
    }
  }
  });

  },

  getPrzedmiotAction({commit, state}, payload) {
    var nowyObjekt ={
      id_przedmiot:payload.id_przedmiot
    }
    Vue.set(state.przedmiotConfig,0,nowyObjekt);
  },

  getNauczycielAction({commit, state}, payload) {
    var nowyObjekt ={
      id_nauczyciel:payload.id_nauczyciel
    }
    Vue.set(state.nowyPrzedmiot,0,nowyObjekt);
  },

  getUczenRelacjaAction({commit, state}, payload) {
    var nowyObjekt ={
      id_uczen:payload.id_uczen
    }
    Vue.set(state.uczenConfigRelacja,0,nowyObjekt);
  },

  getOpiekunRelacjaAction({commit, state}, payload) {
    var nowyObjekt ={
      id_opiekun:payload.id_opiekun
    }
    Vue.set(state.opiekunConfigRelacja,0,nowyObjekt);
  },

  getNauczycielRelacjaAction({commit, state}, payload) {
    var nowyObjekt ={
      id_nauczyciel:payload.id_nauczyciel
    }
    Vue.set(state.nauczycielConfigRelacja,0,nowyObjekt);
  },

  getPrzedmiotRelacjaAction({commit, state}, payload) {
    var nowyObjekt ={
      nazwa_przedmiotu:payload.nazwa_przedmiotu
    }
    Vue.set(state.przedmiotConfigRelacja,0,nowyObjekt);
  },

  getPrzedmiotRelacjaAction2({commit, state}, payload) {
    var nowyObjekt ={
      nazwa_przedmiotu:payload.nazwa_przedmiotu
    }
    Vue.set(state.przedmiotConfigRelacja,0,nowyObjekt);
    console.log(state.przedmiotConfigRelacja[0]);
  },

  getKlasaRelacjaAction({commit, state}, payload) {
    var nowyObjekt ={
      nazwa:payload.nazwa,
      rok_szkolny:payload.rok_szkolny
    }
    Vue.set(state.klasyConfigRelacja,0,nowyObjekt);
  },

  getKlasaRelacjaAction2({commit, state}, payload) {
    var nowyObjekt ={
      nazwa:payload.nazwa,
    }
    Vue.set(state.klasyConfigRelacja,0,nowyObjekt);
  },

  getKlasyAction({commit, state}, payload) {
    var nowyObjekt ={
      id_klasa:payload.id_klasa
    }
    Vue.set(state.klasaConfig,0,nowyObjekt);
  },

  getWszyscyUczniowieKlasy({commit, state}, payload){
  axios.post('./PDO_QUERY/wszyscyuczniowieklasy.php',{
    nazwa: state.klasyConfigRelacja[0].nazwa
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_uczen : resp[i].id_uzytkownik,
        imie:resp[i].imie,
        nazwisko : resp[i].nazwisko,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszyscyUczniowieKlasy, i, table[i]);
    }
  });
  },

  wyswietlOcenyAction({commit, state}, payload){
    axios.post('./PDO_QUERY/wyswietlOceny.php',{
      id_przedmiot: state.przedmiotConfig[0].id_przedmiot,
      id_nauczyciel: state.nauczycielConfig[0].id_nauczyciel,
      id_uczen: state.uczenConfig[0].id_uczen,
    })
    .then(res => {
    if (res.status == 200){
      if ( res.data.length == 0){
        state.wyswietlOceny.splice(0, state.wyswietlOceny.length);
      }else {
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        var table = [];
        for (var i=0; i < resp.length; i++){
          table[i] = {
            id_ocena : resp[i].id_ocena,
            nazwa_oceny:resp[i].nazwa_oceny,
            waga:resp[i].waga,
            data : resp[i].data,
            nazwa_przedmiotu: resp[i].nazwa_przedmiotu
          }
        }
        state.wyswietlOceny.splice(0, state.wyswietlOceny.length);
        for (var i=0; i < table.length; i++){
        Vue.set(state.wyswietlOceny, i, table[i]);
        }
      }
    }
    });
  },

  wyswietlOcenyDyrektorAction({commit, state}, payload){
    axios.post('./PDO_QUERY/wyswietlOcenyDyrektor.php',{
      id_uczen: state.uczenConfigRelacja[0].id_uczen,
    })
    .then(res => {
    if (res.status == 200){
      if ( res.data.length == 0){
        state.wyswietlOcenyDyrektor.splice(0, state.wyswietlOcenyDyrektor.length);
      }else {
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        var table = [];
        for (var i=0; i < resp.length; i++){
          table[i] = {
            id_ocena : resp[i].id_ocena,
            nazwa_oceny:resp[i].nazwa_oceny,
            waga:resp[i].waga,
            data : resp[i].data,
            nazwa_przedmiotu: resp[i].nazwa_przedmiotu
          }
        }
        state.wyswietlOcenyDyrektor.splice(0, state.wyswietlOcenyDyrektor.length);
        for (var i=0; i < table.length; i++){
        Vue.set(state.wyswietlOcenyDyrektor, i, table[i]);
        }
      }
    }
    });
  },

  wyswietlObecnoscAction({commit, state}, payload){
    axios.post('./PDO_QUERY/obecnoscinauczyciel.php',{
      id_klasa: state.klasaConfig[0].id_klasa,
      id_przedmiot: state.przedmiotConfig[0].id_przedmiot,
      id_uzytkownik: state.profil[0].id_uzytkownik
    })
    .then(res => {
    if (res.status == 200){
      if ( res.data.length == 0){
        state.wyswietlObecnosci.splice(0, state.wyswietlObecnosci.length);
      }else {
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        var table = [];
        for (var i=0; i < resp.length; i++){
          table[i] = {
            id_obecnosc : resp[i].id_obecnosc,
            czy_obecny : resp[i].czy_obecny,
            data : resp[i].data,
            id_uczen : resp[i].id_uczen,
            id_przedmiot: resp[i].id_przedmiot,
            id_nauczyciel : resp[i].id_nauczyciel,
            imie: resp[i].imie,
            nazwisko: resp[i].nazwisko,
            nazwa_przedmiotu: resp[i].nazwa_przedmiotu
          }
        };
        state.wyswietlObecnosci.splice(0, state.wyswietlObecnosci.length);
        for (var i=0; i < table.length; i++){
        Vue.set(state.wyswietlObecnosci, i, table[i]);
        }
      }
    }
    });
  },

  wyswietlObecnosciDyrektorAction({commit, state}, payload){
    axios.post('./PDO_QUERY/obecnosciDyrektor.php',{
      id_uzytkownik: state.uczenConfigRelacja[0].id_uczen
    })
    .then(res => {
    if (res.status == 200){
      if ( res.data.length == 0){
        state.wyswietlObecnosciDyrektor.splice(0, state.wyswietlObecnosciDyrektor.length);
      }else {
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        var table = [];
        for (var i=0; i < resp.length; i++){
          table[i] = {
            id_obecnosc : resp[i].id_obecnosc,
            czy_obecny : resp[i].czy_obecny,
            data : resp[i].data,
            id_uczen : resp[i].id_uczen,
            id_przedmiot: resp[i].id_przedmiot,
            id_nauczyciel : resp[i].id_nauczyciel,
            imie: resp[i].imie,
            nazwisko: resp[i].nazwisko,
            nazwa_przedmiotu: resp[i].nazwa_przedmiotu
          }
        };
        state.wyswietlObecnosciDyrektor.splice(0, state.wyswietlObecnosciDyrektor.length);
        for (var i=0; i < table.length; i++){
        Vue.set(state.wyswietlObecnosciDyrektor, i, table[i]);
        }
      }
    }
    });
  },

  wyswietlObecnoscUczenAction({commit, state}, payload){
    var id_uczen;
    if(state.profil[0].status=='opiekun'){
      id_uczen = state.profil[0].id_relacja;
    }else {
      id_uczen = state.profil[0].id_uzytkownik;
    };
    axios.post('./PDO_QUERY/obecnosciuczen.php',{
      id_klasa: state.profil[0].id_klasa,
      id_przedmiot: state.przedmiotConfig[0].id_przedmiot,
      id_uzytkownik: id_uczen
    })
    .then(res => {
    if (res.status == 200){
      if ( res.data.length == 0){
        state.wyswietlObecnosci.splice(0, state.wyswietlObecnosci.length);
      }else {
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        var table = [];
        for (var i=0; i < resp.length; i++){
          table[i] = {
            id_obecnosc : resp[i].id_obecnosc,
            czy_obecny : resp[i].czy_obecny,
            data : resp[i].data,
            id_uczen : resp[i].id_uczen,
            id_przedmiot: resp[i].id_przedmiot,
            id_nauczyciel : resp[i].id_nauczyciel,
            imie: resp[i].imie,
            nazwisko: resp[i].nazwisko,
            nazwa_przedmiotu: resp[i].nazwa_przedmiotu
          }
        };
        state.wyswietlObecnosci.splice(0, state.wyswietlObecnosci.length);
        for (var i=0; i < table.length; i++){
        Vue.set(state.wyswietlObecnosci, i, table[i]);
        }
      }
    }
    });
  },

  wyszukajUwagAction({commit, state}, payload){
    if(state.profil[0].status=='opiekun'){
      state.uwagaConfig[0].id_uzytkownik = state.profil[0].id_relacja;
    }else if( (state.profil[0].status=='nauczyciel') || (state.profil[0].status=='uczen')) {
      state.uwagaConfig[0].id_uzytkownik = state.profil[0].id_uzytkownik;
    }else {

    };
    if (state.profil[0].status=='nauczyciel'){

      axios.post('./PDO_QUERY/wyszukajuwagnauczyciel.php',{
        id_uzytkownik: state.uwagaConfig[0].id_uzytkownik,
        id_uczen: state.uwagaConfig[0].id_uczen,
      })
      .then(res => {
      if (res.status == 200){
        if ( res.data.length == 0){
          state.uwagi.splice(0, state.uwagi.length);
        }else {
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);
          var table = [];
          for (var i=0; i < resp.length; i++){
            table[i] = {
              imie : resp[i].imie,
              nazwisko : resp[i].nazwisko,
              id_uwagi : resp[i].id_uwagi,
              tresc : resp[i].tresc,
              data: resp[i].data,
              potwierdzenie : resp[i].potwierdzenie,
            }
          };
          state.uwagi.splice(0, state.uwagi.length);
          for (var i=0; i < table.length; i++){
          Vue.set(state.uwagi, i, table[i]);
          }
        }
      }
      });
    } else {
      axios.post('./PDO_QUERY/wyszukajuwaguczen.php',{
        id_uzytkownik: state.uwagaConfig[0].id_uzytkownik,
      })
      .then(res => {
      if (res.status == 200){
        if ( res.data.length == 0){
          state.uwagi.splice(0, state.uwagi.length);
        }else {
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);
          var table = [];
          for (var i=0; i < resp.length; i++){
            table[i] = {
              imie : resp[i].imie,
              nazwisko : resp[i].nazwisko,
              id_uwagi : resp[i].id_uwagi,
              tresc : resp[i].tresc,
              data: resp[i].data,
              potwierdzenie : resp[i].potwierdzenie,
            }
          };
          state.uwagi.splice(0, state.uwagi.length);
          for (var i=0; i < table.length; i++){
          Vue.set(state.uwagi, i, table[i]);
          }
        }
      }
      });
    }
  },

  wyswietlUwagiDyrektorAction({commit, state}, payload){
      axios.post('./PDO_QUERY/wyszukajuwagDyrektor.php',{
        id_uzytkownik: state.uczenConfigRelacja[0].id_uczen,
      })
      .then(res => {
      if (res.status == 200){
        if ( res.data.length == 0){
          state.uwagiDyrektor.splice(0, state.uwagiDyrektor.length);
        }else {
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);
          var table = [];
          for (var i=0; i < resp.length; i++){
            table[i] = {
              imie : resp[i].imie,
              nazwisko : resp[i].nazwisko,
              id_uwagi : resp[i].id_uwagi,
              tresc : resp[i].tresc,
              data: resp[i].data,
              potwierdzenie : resp[i].potwierdzenie,
            }
          };
          state.uwagiDyrektor.splice(0, state.uwagiDyrektor.length);
          for (var i=0; i < table.length; i++){
          Vue.set(state.uwagiDyrektor, i, table[i]);
          }
        }
      }
      });
  },

  potwierdzeniePrzeczytaniaAction({commit, state}, payload){
    if (state.profil[0].status=='opiekun'){
      axios.post('./PDO_QUERY/zapiszzmianepotwierdzenia.php',{
        id_uwagi: payload.id_uwagi,
        potwierdzenie: payload.potwierdzenie,
      })
      .then(res => {
      });
    } else {
    }
  },

  dodajOcenaAction({commit, state}, payload){
    var ocena_nazwa;
    switch (payload.waga){
      case "1": {ocena_nazwa = 'Niedostateczny'; break;}
      case "2": {ocena_nazwa = 'Dopuszczajacy'; break;}
      case "3": {ocena_nazwa = 'Dostateczny'; break;}
      case "4": {ocena_nazwa = 'Dobry'; break;}
      case "5": {ocena_nazwa = 'Bardzo dobry'; break;}
      case "6": {ocena_nazwa = 'Celujacy'; break;}
    };
    axios.post('./PDO_QUERY/dodajocena.php',{
      id_przedmiot: payload.id_przedmiot,
      id_nauczyciel: payload.id_nauczyciel,
      id_uczen: payload.id_uczen,
      waga: payload.waga,
      data: payload.data,
      nazwa: ocena_nazwa
    })
    .then(res => {
    });

  },

  dodajObecnoscAction({commit, state}, payload){
    axios.post('./PDO_QUERY/dodajobecnosc.php',{
      id_przedmiot: payload.id_przedmiot,
      id_nauczyciel: payload.id_nauczyciel,
      id_uczen: payload.id_uczen,
      czy_obecny: payload.czy_obecny,
      data: payload.data,
    })
    .then(res => {
    });

  },

  zatwierdzZamianyProfilAction({commit, state}, payload){
    axios.post('./PDO_QUERY/zmianadanychuzytkownika.php',{
      id_uzytkownik:state.profil[0].id_uzytkownik,
      imie:state.profilHelp[0].imie,
      nazwisko:state.profilHelp[0].nazwisko,
      email:state.profilHelp[0].email,
      telefon:state.profilHelp[0].telefon,
      status:state.profil[0].status,
      pokrewienstwo:state.profilHelp[0].pokrewienstwo,
      id_relacja:state.profil[0].id_relacja,
      id_klasa:state.profil[0].id_klasa,
      id_konto:state.profil[0].id_konto,
    })
    .then(res => {
    });
    commit('zatwierdzZamianyProfilMutation', payload);
  },

  dodawanieKontaAction({commit, state}, payload){
    axios.post('./PDO_QUERY/dodawaniekonta.php',{
      login:payload.login,
      haslo:payload.haslo,
      typ_konta:payload.typ_konta
    })
    .then(res => {
    });

  },

  dodawanieUzytkownikaAction({commit, state}, payload){
    axios.post('./PDO_QUERY/sprawdzidkonto.php',{
      login:state.noweKonto[0].login
    })
    .then(res => {
      if (res.status == 200){
        var data = res.data;
        var respHelp = JSON.stringify(data);
        var resp = JSON.parse(respHelp);
        state.noweKonto[0].id_konto = resp[0].id_konto;
        axios.post('./PDO_QUERY/dodawanieuzytkownika.php',{
          imie:payload.imie,
          nazwisko:payload.nazwisko,
          email:payload.email,
          telefon:payload.telefon,
          status:payload.status,
          pokrewienstwo:payload.pokrewienstwo,
          id_konto: state.noweKonto[0].id_konto,
        })
        .then(res => {
        });
    } //if
    });
  },

  dodawanieKlasyAction({commit, state}, payload){
    axios.post('./PDO_QUERY/dodawanieklasy.php',{
      nazwa:payload.nazwa,
      rok_szkolny:payload.rok_szkolny
    })
    .then(res => {
    });
  },

  dodawaniePrzedmiotowAction({commit, state}, payload){
    axios.post('./PDO_QUERY/dodawanieprzedmiot.php',{
      nazwa_przedmiotu: payload.nazwa_przedmiotu,
      id_nauczyciel: payload.id_nauczyciel,
    })
    .then(res => {
    });
  },

  potwierdzeniePrzeczytaniaMutation({commit, state}, payload){
    commit('potwierdzeniePrzeczytaniaMutation', payload);
  },

  dodajUwagaAction({commit, state}, payload){
    axios.post('./PDO_QUERY/dodajuwaga.php',{
      id_nauczyciel: payload.id_nauczyciel,
      id_uczen: payload.id_uczen,
      tresc: payload.tresc,
      data: payload.data,
      potwierdzenie: payload.potwierdzenie
    })
    .then(res => {
    });

  },

  dodawanieRelacjiUczenOpiekunAction({commit, state}, payload){
      axios.post('./PDO_QUERY/dodawanierelacjiopiekun.php',{
        id_relacja: payload.id_uczen,
        id_opiekun: payload.id_opiekun,
      })
      .then(res => {
      });
      axios.post('./PDO_QUERY/dodawanierelacjiuczen.php',{
        id_relacja: payload.id_opiekun,
        id_uczen: payload.id_uczen,
      })
      .then(res => {
      });
  },

  dodawanieRelacjiUczenKlasaAction({commit, state}, payload){
      axios.post('./PDO_QUERY/dodawanierelacjiklasa.php',{
        nazwa: payload.nazwa,
        rok_szkolny: payload.rok_szkolny,
        id_uczen: payload.id_uczen,
      })
      .then(res => {
      });
      axios.post('./PDO_QUERY/sprawdzenieidklasa.php',{
        nazwa: payload.nazwa,
        id_uczen: payload.id_uczen,
      })
      .then(res => {
        if (res.status == 200){
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);
          var id = resp[0].id_klasa;
          axios.post('./PDO_QUERY/dodawanierelacjiuczenklasa.php',{
            id_klasa: id,
            id_uczen: payload.id_uczen,
          })
          .then(res => {
          });
      }//if
      });
  },

  dodawanieRelacjiUczenPrzedmiotAction({commit, state}, payload){
      axios.post('./PDO_QUERY/dodawanierelacjiuczenprzedmiot.php',{
        nazwa_przedmiotu: state.przedmiotConfigRelacja[0].nazwa_przedmiotu,
        id_uczen: state.uczenConfigRelacja[0].id_uczen,
        id_nauczyciel: state.nauczycielConfigRelacja[0].id_nauczyciel,
      })
      .then(res => {
      });
  },

  dodawanieRelacjiNauczycielKlasaAction({commit, state}, payload){
      axios.post('./PDO_QUERY/dodawanierelacjinauczycielklasa.php',{
        id_klasa: state.klasyConfigRelacja[0].id_klasa,
        id_nauczyciel: state.nauczycielConfigRelacja[0].id_nauczyciel,
      })
      .then(res => {
      });
      axios.post('./PDO_QUERY/dodawanierelacjinauczycielklasa2.php',{
        id_klasa: state.uczenConfigRelacja[0].id_uczen,
        id_nauczyciel: state.nauczycielConfigRelacja[0].id_nauczyciel,
      })
      .then(res => {
      });
  },

  dodawanieRelacjiPrzedmiotKlasaAction({commit, state}, payload){
    console.log(state.wszystkiePrzedmiotyHelp);
    for (var i=0; i < state.wszystkiePrzedmiotyHelp.length; i++){
      var id = state.wszystkiePrzedmiotyHelp[i].id_przedmiot;
      axios.post('./PDO_QUERY/sprawdzenieidklasa.php',{
        id_uczen: state.wszystkiePrzedmiotyHelp[i].id_uczen,
        nazwa: state.klasyConfigRelacja[0].nazwa
      })
      .then(res => {
        if (res.status == 200){
          var data = res.data;
          var respHelp = JSON.stringify(data);
          var resp = JSON.parse(respHelp);

          axios.post('./PDO_QUERY/dodawanierelacjiprzedmiotklasa.php',{
            id_klasa: resp[0].id_klasa,
            id_przedmiot: id,
          })
          .then(res => {
          });
        }
      });
    }
  },

};
