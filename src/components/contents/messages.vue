<template>
<div>

  <!-- Page Container -->
  <div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">
    <!-- The Grid -->
    <div class="w3-row">
      <!-- Left Column -->
      <div v-if="!czyDyrektorAdmin()" class="w3-col m3">
        <!-- Profile -->
        <div class="w3-card w3-round w3-white">
          <div class="w3-container">
           <h4 class="w3-center">Mój profil</h4>
           <p class="w3-center"><img :src="profileAvatar" class="w3-circle" style="height:106px;width:106px" alt="Avatar"></p>
           <hr>
           <p><i class="fa fa-spinner fa-fw w3-margin-right w3-text-theme"></i>{{profile2().uprawnienia}}</p>
           <p><i class="fa fa-mars-double fa-fw w3-margin-right w3-text-theme"></i>{{profile2().nazwisko}}</p>
           <p><i class="fa fa-dot-circle-o fa-fw w3-margin-right w3-text-theme"></i>{{profile2().przedmiot}}</p>
           <p><i class="fa fa-hand-stop-o fa-fw w3-margin-right w3-text-theme"></i>{{profile2().klasa}}</p>
          </div>
        </div>
        <br>

        <!-- Accordion -->
        <div class="w3-card w3-round">
          <div class="w3-white">
            <button @click="myFunction('Demo1')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i> Klasa </button>
            <div id="Demo1" class="w3-hide w3-container">
              <select v-if="czyNauczyciel()"  @change="getKlasaCzlonkowieAc($event, 1)">
                <option v-for="(wartosc, index) in klasy()" :value="wartosc.id_klasa">{{wartosc.nazwa}}</option>
              </select>
              <p v-else>{{accordion()[0].klasa}}</p>
              <ul>
                <li v-for="(czlonek, index) in klasaCzlonkowie()">{{czlonek.numer}}. {{czlonek.nazwisko}} </li>
              </ul>
            </div>
            <button v-if="!czyNauczyciel()" @click="myFunction('Demo2')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-calendar-check-o fa-fw w3-margin-right"></i> Oceny </button>
            <div v-if="!czyNauczyciel()" id="Demo2" class="w3-hide w3-container">
                <p>
                  <ul>
                    <li v-for="(acc, index) in accordion()">{{acc.oceny}} </li>
                  </ul>
                </p>
            </div>
            <button @click="myFunction('Demo3')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-users fa-fw w3-margin-right"></i> Wydarzenia </button>
            <div id="Demo3" class="w3-hide w3-container">
           <div class="w3-row-padding">
             <p> {{accordion().wydarzenia}}</p>
             <select v-if="czyNauczyciel()"  @change="getKlasaWydarzeniaAc($event)">
               <option v-for="(wartosc, index) in klasy()" :value="wartosc.id_klasa">{{wartosc.nazwa}}</option>
             </select>
              <ul>
                 <li v-for="(wydarzenie, index) in klasaWydarzenia">{{index+1}}. {{wydarzenie.opis}} {{formatDate(wydarzenie.data)}}</li>
               </ul>
           <br>


          </div>
         </div>
        </div>
      </div>
        <br>

      <!-- Alert Box -->
        <div v-if="noweOceny" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
          <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
            <i class="fa fa-remove"></i>
          </span>
          <p><strong>Hey!</strong></p>
          <p>Masz nowe oceny. Zajrzyj do dziennika.</p>
        </div>

      <!-- End Left Column -->
      </div>

      <!-- Middle Column -->

      <div class="w3-col" :class="kolumny">

        <div v-if="getLogon"class="w3-row-padding">
          <h5> Przeglądanie wiadomości </h5>
          <br/>
          <div class="w3-col m12">
            <div class="w3-card w3-round w3-white">
              <div class="w3-container w3-padding">
                <h6 class="w3-opacity">Dodaj nową wiadomość:</h6>
                <p id="titlewiadomosc" contenteditable="true" class="w3-border w3-padding">Wpisz tytuł</p>
                <p id="wpiszwiadomosc" contenteditable="true" class="w3-border w3-padding">Wpisz wiadomość</p>
                <br/>
                <div v-if="czyNauczycielOpiekun()">
                  <label> Wybierz ucznia: </label>
                  <br/>
                  <br/>
                  <select id="iduczen">
                    <option v-for="(uczen, index) in klasaCzlonkowie()" :value="uczen.id_uczen">{{uczen.nazwisko}}</option>
                  </select>
                </div>
                <div v-else>
                  <label> Wybierz nauczyciela: </label>
                  <br/>
                  <br/>
                  <select id="idnauczyciel">
                    <option v-for="(nauczyciel, index) in klasaNauczyciele()" :value="nauczyciel.id_nauczyciel">{{nauczyciel.nazwisko}}</option>
                  </select>
                </div>
                <br>
                <button type="button" class="w3-button w3-theme" @click="wyslijwiadomosc();">  Wyślij</button>
                </div>
            </div>
          </div>
        </div>
        <div v-if="getLogon">
        <div v-for="(wiadomosc, index) in wiadomosci()" class="w3-container w3-card w3-white w3-round w3-margin"><br>
          <img src="/w3images/avatar2.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
          <span class="w3-right w3-opacity">{{elapsedTime(wiadomosc.data)}}</span>
          <h4>{{wiadomosc.nazwisko}}</h4><br>
          <hr class="w3-clear">
          <p>{{wiadomosc.tresc}}</p>
            <div class="w3-row-padding" style="margin:0 -16px">
              <div class="w3-half">
                <img src="/w3images/lights.jpg" style="width:100%" alt="Northern Lights" class="w3-margin-bottom">
              </div>
              <div class="w3-half">
                <img src="/w3images/nature.jpg" style="width:100%" alt="Nature" class="w3-margin-bottom">
            </div>
          </div>
        </div>
          <!-- <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button>
          <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> -->
        </div>
        <div v-else class="w3-container w3-card w3-white w3-round w3-margin">
          <h2 class="w3-text-teal">Logowanie</h2>
          <p class="w3-serif">
            <form action="./logowanie.php" method="post">
              <label class="w3-text-teal"><b>Login: </b></label>
              <input type='text' name="login" title="Podaj swój login!" value="" class="w3-btn w3-white w3-border w3-border-teal w3-round-large">
              <br />
              <label class="w3-text-teal"><b>Hasło: </b></label>
              <input type='password' name="password" title="Wprowadź hasło!" value="" class="w3-btn w3-white w3-border w3-border-teal w3-round-large">
              <br /><br />
              <input id="logonbox" type="submit" name="submit" value="Zaloguj się!" class="w3-button w3-white w3-border w3-border-teal w3-round-large w3-hover-teal">
            </form>
          </p>
        </div>
      <!-- End Middle Column -->
      </div>

      <!-- Right Column -->
      <div v-if="!czyDyrektorAdmin()" class="w3-col m2">
        <div class="w3-card w3-round w3-white w3-center">
              <div class="w3-container">
                <p>Nadchodzące wydarzenia:</p>
                <div v-for="(wydarzenie, index) in klasaWydarzenia" class="w3-container">
                  <img src="/w3images/forest.jpg" alt="Forest" style="width:100%;">
                  <p><strong>{{wydarzenie.opis}}</strong></p>
                  <p>{{formatDate(wydarzenie.data)}}</p>
                  <p><button class="w3-button w3-block w3-theme-l4">Info</button></p>
                </div>
              </div>
        </div>
      <br>

      <!-- End Right Column -->
      </div>

    <!-- End Grid -->
    </div>

  <!-- End Page Container -->
  </div>
  <br>
</div>


</template>

<script>

import store from "vuex";
import { mapActions } from "vuex";
export default {
  name: 'messages',
  data (){
    return {
      kolumny: 'm7'
    }
  },
  computed: {
    getLogon() {
      let session='';
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
    if (showCookie("PHPSESSID")!==false && session==''){
      this.$store.getters.getProfil;
      this.$store.getters.getProfile;
      this.$store.getters.getKlasy;
      this.$store.getters.getKlasaCzlonkowie;
      this.$store.getters.getKlasaWydarzenia;
      this.$store.getters.getOceny;
      this.$store.getters.getWiadomosci;
      this.$store.getters.getklasaNauczyciele;
      this.$store.getters.getConfig;
      this.$store.getters.getUczenNauczyciel;
      session=showCookie("PHPSESSID");
      return true
    }else if (session!==''){
      return true
    }else {
      return false
    }
  },

    profileAvatar() {
      return this.$store.getters.profile.path
    },

    klasaWydarzenia() {
      return this.$store.getters.klasaWydarzenia
    },

    noweOceny() {
      if (this.$store.getters.noweOceny.czyNoweOceny=="true"){
        return true
      }else {
        return false
      }
    },

    wydarzenia() {
      return this.$store.getters.wydarzenia
    },
  },
  methods: {
    //Metoda zwracająca profil użytkownika systemu
    profile2: function() {
      return this.$store.getters.profile
    },
    //Metoda zwracająca dane do wyświetlenia accordion
    accordion: function() {
      return this.$store.getters.accordion
    },
    //Zwraca członków klasy danego ucznia
    klasaCzlonkowie: function() {
      return this.$store.getters.klasaCzlonkowie
    },

    klasaNauczyciele: function() {
      return this.$store.getters.klasaNauczyciele
    },

    czyNauczyciel: function() {
      if (this.$store.state.profil[0].status == 'nauczyciel'){
        return true
      }else {
        return false
      }
    },

    czyNauczycielOpiekun: function() {
      if (this.$store.state.profil[0].status == 'nauczyciel' || this.$store.state.profil[0].status == 'opiekun'){
        return true
      }else {
        return false
      }
    },

    czyDyrektorAdmin: function() {
      if (this.$store.state.profil[0].status == 'dyrektor' || this.$store.state.profil[0].status == 'admin'){
        this.kolumny = 'm12'
        return true
      }else {
        return false
      }
    },

    klasy: function() {
      return this.$store.getters.klasy
    },
    //Metoda wyświetlająca prawidłowo datę
    formatDate: function (deadline){
      var d = new Date(deadline);

      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      return year + "-" + month + "-" + day;
    },
    elapsedTime: function (data)
    {
      var d = new Date(data);
      var now = new Date();
      var czas = now.getTime() - d.getTime();
      var elapsedDays = Math.floor(czas/1000/60/60/24);
      var elapsedHours = Math.floor((czas - Math.floor(elapsedDays)*1000*60*60*24)/1000/60/60);
      var elapsedMinutes = Math.floor((czas - Math.floor(elapsedDays)*1000*60*60*24 - Math.floor(elapsedHours)*1000*60*60)/1000/60);
      if (elapsedDays > 0) {
      return elapsedDays + " dni " + elapsedHours + " godzin " + elapsedMinutes + " minut"
    } else if (elapsedHours > 0) {
      return elapsedHours + " godzin " + elapsedMinutes + " minut"
    } else {
      return elapsedMinutes + " minut"
    }
    },
    wiadomosci: function () {
      return this.$store.getters.wiadomosci
    },

    ...mapActions(["getKlasaCzlonkowieAction"]),
    getKlasaCzlonkowieAc: function (e, klasa) {
      this.$store.state.klasaConfig[0].id_klasa = e.target.value;
      this.getKlasaCzlonkowieAction({
        id_klasa: e.target.value,
        klasa: klasa
      });
    },

    ...mapActions(["getKlasaWydarzeniaAction"]),
    getKlasaWydarzeniaAc: function (e) {
      this.getKlasaWydarzeniaAction({
        id_klasa: e.target.value
      });
    },

   ...mapActions(["wyslijwiadomoscAction"]),
    wyslijwiadomosc: function ()
    {
      var content = document.getElementById('wpiszwiadomosc').innerHTML;
      var title = document.getElementById('titlewiadomosc').innerHTML;
      var idnauczyciel = 0;
      var iduczen = 0;

      if (document.getElementById('idnauczyciel') == null){
        iduczen = document.getElementById('iduczen').value;
      }else {
        idnauczyciel = document.getElementById('idnauczyciel').value;
      };

      if (idnauczyciel == 0){
        this.wyslijwiadomoscAction({
              content: content,
              title: title,
              id_uczen: iduczen
            });
      }else {
        this.wyslijwiadomoscAction({
              content: content,
              title: title,
              id_nauczyciel: idnauczyciel
            });
      };
    },

  // Accordion
    myFunction : function(id) {
      var x = document.getElementById(id);

      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
      } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
        x.previousElementSibling.className.replace(" w3-theme-d1", "");
      }
    },

    // Used to toggle the menu on smaller screens when clicking on the menu button
    openNav: function() {
      var x = document.getElementById("navDemo");
      if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
      } else {
        x.className = x.className.replace(" w3-show", "");
      }
    }
 }
}


</script>

<style scope>
 li {
   list-style-type: none;
   margin-left: -30px;
 }
 span {
   margin-right : 10px;
 }
</style>
