<template>
<div>

  <!-- Page Container -->
  <div class="w3-container w3-content" style="max-width:1400px;margin-top:80px">
    <!-- The Grid -->
    <div class="w3-row">
      <!-- Left Column -->
      <div class="w3-col m3">
        <!-- Profile -->
        <div class="w3-card w3-round w3-white">
          <div class="w3-container">
           <h4 class="w3-center">Mój profil</h4>
           <p class="w3-center"><img :src="profileAvatar" class="w3-circle" style="height:106px;width:106px" alt="Avatar"></p>
           <hr>
           <p><i class="fas fa-user-shield fa-fw w3-margin-right w3-text-theme"></i>{{profile2().uprawnienia}}</p>
           <p><i class="fas fa-user-circle fa-fw w3-margin-right w3-text-theme"></i>{{profile2().nazwisko}}</p>
           <p><i class="fas fa-graduation-cap fa-fw w3-margin-right w3-text-theme"></i>{{profile2().przedmiot}}</p>
           <p><i class="fas fa-user-friends fa-fw w3-margin-right w3-text-theme"></i>{{profile2().klasa}}</p>
          </div>
        </div>
        <br>

        <!-- Accordion -->
        <div class="w3-card w3-round">
          <div class="w3-white">
            <button @click="myFunction('Demo1')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-circle-o-notch fa-fw w3-margin-right"></i> Klasa </button>
            <div id="Demo1" class="w3-hide w3-container">
              <p>{{accordion().klasa}}</p>
              <ul>
                <li v-for="(czlonek, index) in klasaCzlonkowie">{{czlonek.numer}}. {{czlonek.nazwisko}} </li>
              </ul>
            </div>
            <button @click="myFunction('Demo2')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-calendar-check-o fa-fw w3-margin-right"></i> Oceny </button>
            <div id="Demo2" class="w3-hide w3-container">
                <p>{{accordion().oceny}}</p>
            </div>
            <button @click="myFunction('Demo3')" class="w3-button w3-block w3-theme-l1 w3-left-align"><i class="fa fa-users fa-fw w3-margin-right"></i> Wydarzenia </button>
            <div id="Demo3" class="w3-hide w3-container">
           <div class="w3-row-padding">
             <p> {{accordion().wydarzenia}}</p>
              <ul>
                 <li v-for="(wydarzenie, index) in klasaWydarzenia">{{index+1}}. {{wydarzenie.opis}} {{formatDate(wydarzenie.data)}}</li>
               </ul>
           <br>


          </div>
         </div>
        </div>
      </div>
        <br>

        <!-- Interests -->
    <div class="w3-card w3-round w3-white w3-hide-small">
      <div class="w3-container">
        <p>Przedmioty</p>
        <p>
          <span v-for="(przedmiot, index) in przedmioty" class="w3-tag w3-small w3-theme-d5">{{przedmiot}}</span>
        </p>
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
      <div class="w3-col m7">

       <div v-for="(wiadomosc, index) in wiadomosci" class="w3-container w3-card w3-white w3-round w3-margin"><br>
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
          <!-- <button type="button" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-thumbs-up"></i>  Like</button>
          <button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button> -->
        </div>

      <!-- End Middle Column -->
      </div>

      <!-- Right Column -->
      <div class="w3-col m2">
        <div class="w3-card w3-round w3-white w3-center">
              <div class="w3-container">
                <p>Nadchodzące wydarzenia:</p>
                <div v-for="(wydarzenie, index) in wydarzenia" class="w3-container">
                  <img src="/w3images/forest.jpg" alt="Forest" style="width:100%;">
                  <p><strong>{{wydarzenie.rodzaj}}</strong></p>
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
export default {
  name: 'configuration',
  computed: {
    profileAvatar() {
      return this.$store.getters.profile.path
    },
    //Zwraca członków klasy danego ucznia
    klasaCzlonkowie() {
      return this.$store.getters.klasaCzlonkowie
    },
    klasaWydarzenia() {
      return this.$store.getters.klasaWydarzenia
    },
    przedmioty() {
      return this.$store.getters.przedmioty
    },
    noweOceny() {
      if (this.$store.getters.noweOceny.czyNoweOceny=="true"){
        return true
      }else {
        return false
      }
    },
    wiadomosci() {
      return this.$store.getters.wiadomosci
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

  // Accordion
    myFunction : function(id) {
      var x = document.getElementById(id);
      console.log(x);
      console.log(id);
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
},
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
