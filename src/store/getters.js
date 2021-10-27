import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "vuex";
import axios from "axios";
export default {

  getProfil(state){
    function showCookie(name) {
      if (document.cookie !== "") {
      const cookies = document.cookie.split(/; */);

      for (let cookie of cookies) {
          const [ cookieName, cookieVal ] = cookie.split("=");
          if (cookieName === decodeURIComponent(name)) {
              return decodeURIComponent(cookieVal);
          }
      }
    }
    return false;
  };
  async function checkProfile(){
  let res = await axios.post('./PDO_QUERY/profil.php',{
    id_uzytkownik:showCookie('id_uzytkownik')
  });
  if (res.status==200){
    let data = res.data
    let respHelp = JSON.stringify(data);

    var resp = JSON.parse(respHelp);

    var nowyObjekt ={};
    nowyObjekt.id_uzytkownik = showCookie('id_uzytkownik');
    nowyObjekt.imie = resp[0].imie;
    nowyObjekt.nazwisko = resp[0].nazwisko;
    nowyObjekt.email = resp[0].email;
    nowyObjekt.telefon = resp[0].telefon;
    nowyObjekt.status = resp[0].status;
    nowyObjekt.pokrewienstwo = resp[0].pokrewienstwo;
    nowyObjekt.id_relacja = resp[0].id_relacja;
    nowyObjekt.id_klasa = resp[0].id_klasa;
    nowyObjekt.id_konto = resp[0].id_konto;
    nowyObjekt.path = "/w3images/avatar2.png"
    Vue.set(state.profil, 0, nowyObjekt);
  }
  };
  checkProfile();
  },

  getProfile(state){
    function showCookie(name) {
      if (document.cookie !== "") {
      const cookies = document.cookie.split(/; */);

      for (let cookie of cookies) {
          const [ cookieName, cookieVal ] = cookie.split("=");
          if (cookieName === decodeURIComponent(name)) {
              return decodeURIComponent(cookieVal);
          }
      }
    }
    return false;
  };
  if (state.profil[0].status == 'admin' || state.profil[0].status == 'dyrektor'){
      var nowyObjekt ={};
      nowyObjekt.id = state.profil[0].id_uzytkownik;
      nowyObjekt.path = "/w3images/avatar2.png";
      nowyObjekt.uprawnienia = state.profil[0].status;
      nowyObjekt.nazwisko = state.profil[0].imie + " " + state.profil[0].nazwisko;
      nowyObjekt.przedmiot = "";
      nowyObjekt.klasa = "";

      Vue.set(state.profile, 0, nowyObjekt);
  }else {
    async function checkProfile(){
      var id_uzytkownik;
      if (state.profil[0].status == 'opiekun'){
        id_uzytkownik = state.profil[0].id_relacja
      }else {
        id_uzytkownik = state.profil[0].id_uzytkownik
      };
    let res = await axios.post('./PDO_QUERY/profile.php',{
      id_uzytkownik:id_uzytkownik
    });
    if (res.status==200){
      let data = res.data
      let respHelp = JSON.stringify(data);

      var resp = JSON.parse(respHelp);

      var nowyObjekt ={};
      nowyObjekt.id = state.profil[0].id_uzytkownik;
      nowyObjekt.path = "/w3images/avatar2.png";
      nowyObjekt.uprawnienia = state.profil[0].status;
      nowyObjekt.nazwisko = state.profil[0].imie + " " + state.profil[0].nazwisko;
      nowyObjekt.przedmiot = resp[0].nazwa_przedmiotu;
      nowyObjekt.klasa = "Klasa" + resp[0].nazwa;

      Vue.set(state.profile, 0, nowyObjekt);
    }
    };
    checkProfile();
  }//else
  },

  getKlasy(state){
    axios.post('./PDO_QUERY/klasy.php',{
      id_uzytkownik: state.profil[0].id_uzytkownik
    })
    .then(res => {
    if (res.status == 200){
      var data = res.data;
      var respHelp = JSON.stringify(data);
      var resp = JSON.parse(respHelp);
      var table = [];
      for (var i=0; i < resp.length; i++){
        table[i] = {
          id_klasa : resp[i].id_klasa,
          nazwa : resp[i].nazwa,
        }
      }
      for (var i=0; i < table.length; i++)
      Vue.set(state.klasy, i, table[i]);
      }
    });
  },

  getKlasaCzlonkowie(state){
  axios.post('./PDO_QUERY/klasaczlonkowie.php',{
    id_klasa: state.profil[0].id_klasa
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
    for (var i=0; i < table.length; i++)
    Vue.set(state.klasaCzlonkowie, i, table[i]);
    }
  });
  },



  getKlasaWydarzenia(state){
  axios.post('./PDO_QUERY/klasaWydarzenia.php',{
    nazwa:state.profil[0].id_klasa
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
    for (var i=0; i < table.length; i++)
    Vue.set(state.klasaWydarzenia, i, table[i]);
    }
  });
  },

  getOceny(state){
  axios.post('./PDO_QUERY/oceny.php',{
    id_uzytkownik:state.profil[0].id_uzytkownik
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id : resp[i].id_ocena,
        klasa : "Klasa " + resp[i].nazwa,
        oceny : resp[i].nazwa_przedmiotu + " " + resp[i].waga,
        wydarzenia : "Najbliższe wydarzenia"
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.accordion, i, table[i]);
    }
  });
  },

  getWiadomosci(state){
  var table = [];
  axios.post('./PDO_QUERY/getwiadomosci.php',{
    id_uzytkownik:state.profil[0].id_uzytkownik
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
  }
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id : resp[i].id_wiadomosc,
        data : resp[i].data,
        nazwisko : resp[i].imie + " " + resp[i].nazwisko,
        tresc : resp[i].tresc
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wiadomosci, i, table[i]);
  });
  },

  getklasaNauczyciele(state){
    var id_uzytkownik;
    if (state.profil[0].status == 'opiekun'){
      id_uzytkownik = state.profil[0].id_relacja
    }else {
      id_uzytkownik = state.profil[0].id_uzytkownik
    };
  axios.post('./PDO_QUERY/klasanauczyciele.php',{
    id_uczen: id_uzytkownik
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_nauczyciel:resp[i].id_uzytkownik,
        nazwisko : resp[i].imie + " " + resp[i].nazwisko,
      }
    }
    for (var i=0; i < table.length; i++){
    Vue.set(state.klasaNauczyciele, i, table[i]);
    }
    }
  });
  },

  getPrzedmioty(state){
  var id_uzytkownik;
  if (state.profil[0].status == 'opiekun'){
    id_uzytkownik = state.profil[0].id_relacja
  }else {
    id_uzytkownik = state.profil[0].id_uzytkownik
  };
  axios.post('./PDO_QUERY/przedmioty.php',{
    id_uzytkownik: id_uzytkownik
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_przedmiot:resp[i].id_przedmiot,
        nazwa_przedmiotu : resp[i].nazwa_przedmiotu,
      }
    }
    for (var i=0; i < table.length; i++){
    Vue.set(state.przedmioty, i, table[i]);
    }
    }
  });
  },

  getWszyscyNauczyciele(state){
  axios.post('./PDO_QUERY/wszyscynauczyciele.php')
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_nauczyciel : resp[i].id_uzytkownik,
        imie:resp[i].imie,
        nazwisko : resp[i].nazwisko,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszyscyNauczyciele, i, table[i]);
    }
  });
  },

  getWszyscyUczniowie(state){
  axios.post('./PDO_QUERY/wszyscyuczniowie.php')
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
    Vue.set(state.wszyscyUczniowie, i, table[i]);
    }
  });
  },

  getWszyscyOpiekunowie(state){
  axios.post('./PDO_QUERY/wszyscyopiekunowie.php')
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_opiekun : resp[i].id_uzytkownik,
        imie:resp[i].imie,
        nazwisko : resp[i].nazwisko,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszyscyOpiekunowie, i, table[i]);
    }
  });
  },

  getWszystiePrzedmiotyNauczyciela(state){
  axios.post('./PDO_QUERY/wszystkieprzedmiotynauczyciela.php',{
    id_nauczyciel:state.nauczycielConfigRelacja[0].id_nauczyciel
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        nazwa_przedmiotu:resp[i].nazwa_przedmiotu,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszystkiePrzedmiotyNauczyciela, i, table[i]);
    }
  });
  },

  getWszystkiePrzedmioty(state){
  axios.post('./PDO_QUERY/wszystkieprzedmioty.php')
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_przedmiot: resp[i].id_przedmiot,
        nazwa_przedmiotu:resp[i].nazwa_przedmiotu,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszystkiePrzedmioty, i, table[i]);
    }
  });
  },

  getWszystkiePrzedmiotyHelp(state){
  axios.post('./PDO_QUERY/wszystkieprzedmiotyHelp.php',{
    nazwa_przedmiotu : state.przedmiotConfigRelacja[0].nazwa_przedmiotu
  })
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    var imie;
    var nazwisko;
    var nowyObjekt ={};

    for (var i=0; i < resp.length; i++){
      for (var j=0; j < state.wszyscyUczniowieKlasy.length; j++){
        if (state.wszyscyUczniowieKlasy[j].id_uczen == resp[i].id_uczen){
          imie = state.wszyscyUczniowieKlasy[j].imie;
          nazwisko = state.wszyscyUczniowieKlasy[j].nazwisko;

          nowyObjekt = {
            id_przedmiot: resp[i].id_przedmiot,
            nazwa_przedmiotu:resp[i].nazwa_przedmiotu,
            id_uzytkownik: resp[i].id_uzytkownik,
            imie_nauczyciel: resp[i].imie,
            nazwisko_nauczyciel: resp[i].nazwisko,
            imie_uczen: imie,
            nazwisko_uczen: nazwisko,
            id_uczen:resp[i].id_uczen
          }
          table.push(nowyObjekt);
        }
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszystkiePrzedmiotyHelp, i, table[i]);
    }
  });
  },

  getWszystkieKlasy(state){
  axios.post('./PDO_QUERY/wszystkieKlasy.php')
  .then(res => {
  if (res.status == 200){
    var data = res.data;
    var respHelp = JSON.stringify(data);
    var resp = JSON.parse(respHelp);
    var table = [];
    for (var i=0; i < resp.length; i++){
      table[i] = {
        id_klasa : resp[i].id_klasa,
        nazwa:resp[i].nazwa,
        rok_szkolny : resp[i].rok_szkolny,
      }
    }
    for (var i=0; i < table.length; i++)
    Vue.set(state.wszystkieKlasy, i, table[i]);
    }
  });
  },

  getUczenNauczyciel(state){
  if (state.profil[0].status == 'nauczyciel'){
    axios.post('./PDO_QUERY/uczennauczyciel.php', {
      id_uzytkownik:state.profil[0].id_uzytkownik
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
      Vue.set(state.uczenNauczyciel, i, table[i]);
      }
    });
  }
  },

  getUczenNauczyciel2(state){
  if (state.profil[0].status == 'nauczyciel'){
    axios.post('./PDO_QUERY/uczennauczyciel.php', {
      id_uzytkownik:state.profil[0].id_uzytkownik
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
      Vue.set(state.uczenNauczyciel2, i, table[i]);
      }
    });
  }
  },

  getConfig(state){
    if (state.profil.status == 'uczen'){
      state.uczenConfig[0].id_uczen = state.profil[0].id_uzytkownik
    }else if (state.profil.status == 'nauczyciel'){
      state.nauczycielConfig[0].id_nauczyciel = state.profil[0].id_uzytkownik
    }else if (state.profil.status == 'opiekun'){
      state.uczenConfig[0].id_uczen = state.profil[0].id_relacja
    }
  },

    profil(state){
      return state.profil[0]
    },

    profile(state){
      return state.profile[0]
    },

    accordion(state){
      return state.accordion
    },

    klasaCzlonkowie(state){

    return state.klasaCzlonkowie
    },

    klasaCzlonkowie2(state){

    return state.klasaCzlonkowie2
    },

    klasaWydarzenia(state){
      return state.klasaWydarzenia
    },

    klasaNauczyciele(state){
      return state.klasaNauczyciele
    },

    noweOceny(state){
      return state.noweOceny
    },

    wiadomosci(state){
      return state.wiadomosci
    },

    wydarzenia(state){
      return state.wydarzenia
    },

    klasy(state){
      return state.klasy
    },

    przedmioty(state){
      return state.przedmioty
    },

    wyswietlOceny(state){
      return state.wyswietlOceny
    },

    wyswietlObecnosci(state){
      return state.wyswietlObecnosci
    },

    wszyscyNauczyciele(state){
      return state.wszyscyNauczyciele
    },

    wszyscyUczniowie(state){
      return state.wszyscyUczniowie
    },

    wszyscyOpiekunowie(state){
      return state.wszyscyOpiekunowie
    },

    wszystkiePrzedmiotyNauczyciela(state){
      return state.wszystkiePrzedmiotyNauczyciela
    },

    wszystkiePrzedmioty(state){
      return state.wszystkiePrzedmioty
    },

    wszystkieKlasy(state){
      return state.wszystkieKlasy
    },

    uczenNauczyciel(state){
      return state.uczenNauczyciel
    },

    uczenNauczyciel2(state){
      return state.uczenNauczyciel2
    },

    uwagi(state){
      return state.uwagi
    },

    uwagiDyrektor(state){
      return state.uwagiDyrektor
    },

    wyswietlOcenyDyrektor(state){
      return state.wyswietlOcenyDyrektor
    },

    wyswietlObecnosciDyrektor(state){
      return state.wyswietlObecnosciDyrektor
    },

};
