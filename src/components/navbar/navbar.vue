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
      <router-link to="/" class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" @click="openNav()"><i class="fa fa-bars"></i></router-link>
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Dziennik szkolny</router-link>
      <router-link to="/news" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Aktualności"><i class="fa fa-globe"></i></router-link>
      <router-link to="/configuration" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Konfiguracja konta"><i class="fa fa-user"></i></router-link>
      <router-link to="/messages" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Wiadomości"><i class="fa fa-envelope"></i></router-link>
      <div class="w3-dropdown-hover w3-hide-small">
        <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span class="w3-badge w3-right w3-small w3-green">3</span></button>
        <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">
          <router-link to="/" class="w3-bar-item w3-button">One new friend request</router-link>
          <router-link to="/" class="w3-bar-item w3-button">John Doe posted on your wall</router-link>
          <router-link to="/" class="w3-bar-item w3-button">Jane likes your post</router-link>
        </div>
      </div>
      <router-link to="/" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Moje konto">
        <img src="#" class="w3-circle" style="height:23px;width:23px" alt="Avatar">
      </router-link>
     </div>
    </div>

    <!-- Navbar on small screens -->
    <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large">Aktualności</router-link>
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large">Konfiguracja konta</router-link>
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large">Wiadomości</router-link>
      <router-link to="/" class="w3-bar-item w3-button w3-padding-large">Mój profil</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>
