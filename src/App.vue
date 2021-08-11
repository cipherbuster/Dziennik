<template>
  <div id="app">
    <!-- Pasek manu na górze -->
    <router-view name="navbar"></router-view>


    <!-- Page Container -->
    <router-view name="contents"></router-view>

    <!-- Footer -->
    <footer class="w3-container w3-theme-d3 w3-padding-16">
      <h5>Dziennik szkolny 2021</h5>
    </footer>

  </div>
</template>
