<template>

  <!-- <header class="navbar">

    <section class="navbar-section">
      <router-link to="/" class="btn btn-link" active-class="text-bold" exact>Home</router-link>
      <router-link to="/list" class="btn btn-link" active-class="text-bold" exact>Lista zadań</router-link>
    </section>

  </header> -->
<div name="navbar">
    <div class="w3-top">
     <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
      <button class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" @click="openNav()"><i class="fa fa-bars"></i></button>
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Dziennik szkolny</router-link>
      <router-link to="/presence" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Obecności"><i class="fa fa-globe"></i></router-link>
      <router-link to="/marks" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Oceny"><i class="fa fa-table"></i></router-link>
      <router-link to="/attention" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Uwagi"><i class="fa fa-file-o"></i></router-link>
      <router-link to="/configuration" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Konfiguracja konta"><i class="fa fa-user"></i></router-link>
      <router-link to="/messages" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Wiadomości"><i class="fa fa-envelope"></i></router-link>
      <router-link to="/logon" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Moje konto">
        <img src="/w3images/avatar2.png" class="w3-circle" style="height:23px;width:23px;display:inline" alt=""> <p style="display: inline">{{profile2().imie}} {{profile2().nazwisko}} </p>
      </router-link>
     </div>
    </div>

    <!-- Navbar on small screens -->
    <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
      <router-link to="/presence" class="w3-bar-item w3-button w3-padding-large">Obecności</router-link>
      <router-link to="/marks" class="w3-bar-item w3-button w3-padding-large">Oceny</router-link>
      <router-link to="/attention" class="w3-bar-item w3-button w3-padding-large">Uwagi</router-link>
      <router-link to="/configuration" class="w3-bar-item w3-button w3-padding-large">Konfiguracja</router-link>
      <router-link to="/messeges" class="w3-bar-item w3-button w3-padding-large">Wiadomosci</router-link>
      <router-link to="/logon" class="w3-bar-item w3-button w3-padding-large">Logowanie</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    methods: {
      //Metoda zwracająca profil użytkownika systemu
      profile2: function() {
        return this.$store.getters.profil
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
