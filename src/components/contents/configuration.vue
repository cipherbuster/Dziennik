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
          <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
           <h5> Konfiguracja konta </h5>
           <button class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthKonfiguracja, 'border-color': borderColor, 'border-style': borderStyle}" @click="konfiguracjaKontaClick()" title="Konfiguracja konta"><i class="fa fa-user"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthUzytkownik, 'border-color': borderColor, 'border-style': borderStyle}" @click="dodawanieUzytkownikaClick()" title="Dodawanie użytkownika"><i class="fa fa-plus-square"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthKlasa, 'border-color': borderColor, 'border-style': borderStyle}" @click="dodawanieKlasClick()" title="Dodawanie klas"><i class="fa fa-plus-square-o"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthPrzedmiot, 'border-color': borderColor, 'border-style': borderStyle}" @click="dodawaniePrzedmiotowClick()" title="Dodawanie przedmiotów"><i class="fa fa-check-square-o"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthRelacja, 'border-color': borderColor, 'border-style': borderStyle}" @click="dodawanieRelacjiClick()" title="Dodawanie relacji"><i class="fa fa-plus-square"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthOcena, 'border-color': borderColor, 'border-style': borderStyle}" @click="przegladanieOcenClick()" title="Przeglądanie ocen"><i class="fa fa-globe"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthObecnosc, 'border-color': borderColor, 'border-style': borderStyle}" @click="przegladanieObecnosciClick()" title="Przeglądanie obecności"><i class="fa fa-table"></i></button>
           <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthUwaga, 'border-color': borderColor, 'border-style': borderStyle}" @click="przegladanieUwagClick()" title="Przeglądanie uwag"><i class="fa fa-file-o"></i></button>

           <div class="w3-col" :class="kolumny">
            <div class="w3-card w3-round w3-white">

              <div v-if="konfiguracjaKonta" class="w3-container w3-padding">
                <h5> Edycja danych użytkownika: </h5>
                <br/>
                <label> Imię: </label>
                <input type="text" id="imie"  @input="imie()" class="w3-input w3-border w3-padding" :value="profil.imie">
                <br/>
                <label> Nazwisko: </label>
                <input type="text" id="nazwisko"  @input="nazwisko()" class="w3-input w3-border w3-padding" :value="profil.nazwisko">
                <br/>
                <label> Email: </label>
                <input type="email" id="email"  @input="email()" class="w3-input w3-border w3-padding" :value="profil.email">
                <br/>
                <label> Telefon: </label>
                <input type="text" id="telefon"  @input="telefon()" class="w3-input w3-border w3-padding" :value="profil.telefon">
                <br/>
                <label> Pokrewieństwo: </label>
                <input type="text" id="pokrewienstwo"  @input="pokrewienstwo()" class="w3-input w3-border w3-padding" :value="profil.pokrewienstwo">
                <br/>
                <button type="button" class="w3-button w3-theme" @click="zatwierdzZamianyProfil();"> Zatwierdź </button>
                <br/>
                <!-- Alert Box -->
                  <div v-if="zmienionoDaneProfil" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                    <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                      <i class="fa fa-remove"></i>
                    </span>
                    <p>Możesz kolejny raz zmodyfikować dane.</p>
                  </div>
              </div>

              <div v-if="dodawanieUzytkownika" class="w3-container w3-padding">
                <h5> Dodawanie użytkownika: </h5>
                <br/>
                <label> Imię: </label>
                <input type="text" id="imie2"  @input="imie2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Nazwisko: </label>
                <input type="text" id="nazwisko2"  @input="nazwisko2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Login dla zakładanego użytkownika: </label>
                <input type="text" id="login2"  @input="login2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Hasło dla zakładanego użytkownika: </label>
                <input type="text" id="haslo2"  @input="haslo2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Email: </label>
                <input type="email" id="email2"  @input="email2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Telefon: </label>
                <input type="text" id="telefon2"  @input="telefon2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Status: </label>
                <br/>
                <select id="status2" @change="status2($event)">
                  <option selected>---</option>
                  <option value="nauczyciel">nauczyciel</option>
                  <option value="uczen">uczen</option>
                  <option value="opiekun">opiekun</option>
                </select>
                <br/>
                <br/>
                <label> Pokrewieństwo: </label>
                <input type="text" id="pokrewienstwo2"  @input="pokrewienstwo2($event)" class="w3-input w3-border w3-padding">
                <br/>
                <button type="button" class="w3-button w3-theme" @click="dodawanieUzytkownikaAc()"> Zatwierdź </button>
                <br/>
                <!-- Alert Box -->
                  <div v-if="dodanoUzytkownik" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                    <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                      <i class="fa fa-remove"></i>
                    </span>
                    <p>Możesz dodać kolejnego użytkownika.</p>
                  </div>
              </div>

              <div v-if="dodawanieKlas" class="w3-container w3-padding">
                <h5> Dodawanie klas: </h5>
                <br/>
                <label> Wybierz numer klasy: </label>
                <select id="numerKlasy3" @input="numerKlasy3($event)" class="w3-border w3-padding">
                  <option slected> --- </option>
                  <option value="1"> 1 </option>
                  <option value="2"> 2 </option>
                  <option value="3"> 3 </option>
                  <option value="4"> 4 </option>
                  <option value="5"> 5 </option>
                  <option value="6"> 6 </option>
                  <option value="7"> 7 </option>
                  <option value="8"> 8 </option>
                </select>
                <label> Wybierz literę klasy: </label>
                <select id="literaKlasy3" @input="literaKlasy3($event)" class="w3-border w3-padding">
                  <option slected> --- </option>
                  <option value="A"> A </option>
                  <option value="B"> B </option>
                  <option value="C"> C </option>
                  <option value="D"> D </option>
                  <option value="E"> E </option>
                  <option value="F"> F </option>
                  <option value="G"> G </option>
                  <option value="I"> I </option>
                  <option value="J"> J </option>
                  <option value="K"> K </option>
                  <option value="L"> L </option>
                </select>
                <br/>
                <label> Rok szkolny: </label>
                <input type="text" id="rokSzkolny3"  @input="rokSzkolny3($event)" class="w3-input w3-border w3-padding">
                <br/>
                <button type="button" class="w3-button w3-theme" @click="dodawanieKlasyAc();"> Zatwierdź </button>
                <br/>
                <!-- Alert Box -->
                  <div v-if="dodanoKlasa" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                    <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                      <i class="fa fa-remove"></i>
                    </span>
                    <p>Możesz dodać kolejną klasę.</p>
                  </div>
              </div>

              <div v-if="dodawaniePrzedmiotow" class="w3-container w3-padding">
                <h5> Dodawanie przedmiotów: </h5>
                <br/>
                <label> Nazwa przedmiotu: </label>
                <input type="text" id="nazwaPrzedmiotu4"  @input="nazwaPrzedmiotu4($event)" class="w3-input w3-border w3-padding">
                <br/>
                <label> Wybierz nauczyciela prowadzącego: </label>
                <select id="nauczyciel4" @input="getNauczyciel($event)">
                  <option selected>---</option>
                  <option v-for="(nauczyciel, index) in wszyscyNauczyciele()" :value="nauczyciel.id_nauczyciel">{{nauczyciel.imie}} {{nauczyciel.nazwisko}}</option>
                </select>
                <br/>
                <br/>
                <button type="button" class="w3-button w3-theme" @click="dodawaniePrzedmiotowAc();"> Zatwierdź </button>
                <br/>
                <!-- Alert Box -->
                  <div v-if="dodanoPrzedmiot" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                    <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                      <i class="fa fa-remove"></i>
                    </span>
                    <p>Możesz dodać kolejny przedmiot.</p>
                  </div>
              </div>
              <div v-if="dodawanieRelacji" class="w3-container w3-padding">
                <div class="w3-bar w3-theme-d2 w3-left-align w3-large">
                 <h5> Wybierz relację </h5>
                 <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthUczenOpiekun, 'border-color': borderColor, 'border-style': borderStyle}" @click="uczenOpiekunClick()" title="Dodawanie relacji uczeń opiekun"><i class="fa fa-heart-o"></i></button>
                 <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthUczenKlasa, 'border-color': borderColor, 'border-style': borderStyle}" @click="uczenKlasaClick()" title="Dodawanie relacji uczeń klasa"><i class="fa fa-thumbs-o-up"></i></button>
                 <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthUczenPrzedmiot, 'border-color': borderColor, 'border-style': borderStyle}" @click="uczenPrzedmiotClick()" title="Dodawanie relacji uczeń przedmiot"><i class="fa fa-copy"></i></button>
                 <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthNauczycielKlasa, 'border-color': borderColor, 'border-style': borderStyle}" @click="nauczycielKlasaClick()" title="Dodawanie relacji nauczyciel klasa"><i class="fa fa-play-circle-o"></i></button>
                 <button v-if="czyDyrektorAdmin()" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" :style="{'border-width': borderWidthPrzedmiotKlasa, 'border-color': borderColor, 'border-style': borderStyle}" @click="przedmiotKlasaClick()" title="Dodawanie relacji przedmiot klasa"><i class="fa fa-eject"></i></button>
                </div>
                 <div v-if="uczenOpiekun && dodawanieRelacji" class="w3-container w3-padding">
                   <h5> Dodawanie relacji ucznia i opiekuna: </h5>
                   <br/>
                   <label> Wybierz ucznia: </label>
                   <br/>
                   <br>
                   <select id="uczenWybor" @input="getUczen($event)">
                     <option selected>---</option>
                     <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz opiekuna: </label>
                   <br/>
                   <br/>
                   <select id="opiekunWybor" @input="getOpiekun($event)">
                     <option selected>---</option>
                     <option v-for="(opiekun, index) in wszyscyOpiekunowie()" :value="opiekun.id_opiekun">{{opiekun.imie}} {{opiekun.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <button type="button" class="w3-button w3-theme" @click="dodawanieRelacjiUczenOpiekunAc();"> Zatwierdź </button>
                   <br/>
                   <!-- Alert Box -->
                     <div v-if="dodanoRelacjaUczenOpiekun" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                       <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                         <i class="fa fa-remove"></i>
                       </span>
                       <p>Możesz dodać kolejną relację.</p>
                     </div>
                 </div>
                 <div v-if="uczenKlasa && dodawanieRelacji" class="w3-container w3-padding">
                   <h5> Dodawanie relacji ucznia i klasy: </h5>
                   <br/>
                   <label> Wybierz ucznia: </label>
                   <br/>
                   <br>
                   <select id="uczenWybor2" @input="getUczen($event)">
                     <option selected>---</option>
                     <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz klasę: </label>
                   <br/>
                   <br/>
                   <select id="klasaWybor" @input="getKlasa($event)">
                     <option selected>---</option>
                     <option v-for="(klasa, index) in wszystkieKlasy()" :value="klasa.nazwa">{{klasa.nazwa}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wprowadź rok szkolny: </label>
                   <br/>
                   <br/>
                   <input type="text" id="rokSzkolny"  @input="rokSzkolnyRelacja($event)" class="w3-input w3-border w3-padding">
                   <br/>
                   <br/>
                   <button type="button" class="w3-button w3-theme" @click="dodawanieRelacjiUczenKlasaAc();"> Zatwierdź </button>
                   <br/>
                   <!-- Alert Box -->
                     <div v-if="dodanoRelacjaUczenKlasa" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                       <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                         <i class="fa fa-remove"></i>
                       </span>
                       <p>Możesz dodać kolejną relację.</p>
                     </div>
                 </div>
                 <div v-if="uczenPrzedmiot && dodawanieRelacji" class="w3-container w3-padding">
                   <h5> Dodawanie relacji ucznia i przedmiotu: </h5>
                   <br/>
                   <label> Wybierz ucznia: </label>
                   <br/>
                   <br>
                   <select id="uczenWybor3" @input="getUczen($event)">
                     <option selected>---</option>
                     <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz nauczyciela: </label>
                   <br/>
                   <br/>
                   <select id="nauczycielWybor" @input="getNauczycielRelacja($event)">
                     <option selected>---</option>
                     <option v-for="(nauczyciel, index) in wszyscyNauczyciele()" :value="nauczyciel.id_nauczyciel">{{nauczyciel.imie}} {{nauczyciel.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz przedmiot: </label>
                   <br/>
                   <br/>
                   <select id="przedmiotWybor" @input="getPrzedmiot($event)">
                     <option selected>---</option>
                     <option v-for="(przedmiot, index) in wszystkiePrzedmiotyNauczyciela()" :value="przedmiot.nazwa_przedmiotu">{{przedmiot.nazwa_przedmiotu}}</option>
                   </select>
                   <br/>
                   <br/>
                   <button type="button" class="w3-button w3-theme" @click="dodawanieRelacjiUczenPrzedmiotAc();"> Zatwierdź </button>
                   <br/>
                   <!-- Alert Box -->
                     <div v-if="dodanoRelacjaUczenPrzedmiot" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                       <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                         <i class="fa fa-remove"></i>
                       </span>
                       <p>Możesz dodać kolejną relację.</p>
                     </div>
                 </div>
                 <div v-if="nauczycielKlasa && dodawanieRelacji" class="w3-container w3-padding">
                   <h5> Dodawanie relacji nauczyciela i klasy: </h5>
                   <br/>
                   <br/>
                   <label> Wybierz nauczyciela: </label>
                   <br/>
                   <br/>
                   <select id="nauczycielWybor2" @input="getNauczycielRelacja($event)">
                     <option selected>---</option>
                     <option v-for="(nauczyciel, index) in wszyscyNauczyciele()" :value="nauczyciel.id_nauczyciel">{{nauczyciel.imie}} {{nauczyciel.nazwisko}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz klasę: </label>
                   <br/>
                   <br/>
                   <select id="klasaWybor" @input="getKlasa2($event)">
                     <option selected>---</option>
                     <option v-for="(klasa, index) in wszystkieKlasy()" :value="klasa.id_klasa">{{klasa.nazwa}}</option>
                   </select>
                   <br/>
                   <br/>
                   <button type="button" class="w3-button w3-theme" @click="dodawanieRelacjiNauczycielKlasaAc();"> Zatwierdź </button>
                   <br/>
                   <!-- Alert Box -->
                     <div v-if="dodanoRelacjaNauczycielKlasa" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                       <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                         <i class="fa fa-remove"></i>
                       </span>
                       <p>Możesz dodać kolejną relację.</p>
                     </div>
                 </div>
                 <div v-if="przedmiotKlasa && dodawanieRelacji" class="w3-container w3-padding">
                   <h5> Dodawanie relacji przedmiotu i klasy: </h5>
                   <br/>
                   <br/>
                   <label> Wybierz klasę: </label>
                   <br/>
                   <br/>
                   <select id="klasaWybor5" @input="getKlasa2($event)">
                     <option selected>---</option>
                     <option v-for="(klasa, index) in wszystkieKlasy()" :value="klasa.nazwa">{{klasa.nazwa}}</option>
                   </select>
                   <br/>
                   <br/>
                   <label> Wybierz przedmiot: </label>
                   <br/>
                   <br/>
                   <select id="przedmiotWybor5" @input="getPrzedmiot2($event)">
                     <option selected>---</option>
                     <option v-for="(przedmiot, index) in wszystkiePrzedmioty()" :value="przedmiot.nazwa_przedmiotu">{{przedmiot.nazwa_przedmiotu}}</option>
                   </select>
                   <br/>
                   <br/>
                   <button type="button" class="w3-button w3-theme" @click="dodawanieRelacjiPrzedmiotKlasaAc();"> Zatwierdź </button>
                   <br/>
                   <!-- Alert Box -->
                     <div v-if="dodanoRelacjaPrzedmiotKlasa" class="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
                       <span onclick="this.parentElement.style.display='none'" class="w3-button w3-theme-l3 w3-display-topright">
                         <i class="fa fa-remove"></i>
                       </span>
                       <p>Możesz dodać kolejną relację.</p>
                     </div>
                 </div>
                </div>
              <div v-if="przegladanieOcen" class="w3-container w3-padding">
                <h5> Przeglądanie ocen ucznia: </h5>
                <br/>
                <label> Wybierz ucznia: </label>
                <br/>
                <br>
                <select id="uczenWybor" @input="getUczen($event)">
                  <option selected>---</option>
                  <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                </select>
                <br/>
                <br/>
                <button type="button" class="w3-button w3-theme" @click="wyswietlOcenyDyrektorAc();"> Zatwierdź </button>
                <br/>
                <br/>
                <div v-if="czyWyswietlacTabelaOcen">
                  <table class="w3-table-all">
                    <thead>
                      <th> Lp. </th>
                      <th> Przedmiot </th>
                      <th> Data </th>
                      <th> Ocena </th>
                      <th> Ocena słownie </th>
                    </thead>
                    <tbody>
                      <tr v-for="(ocena, index) in wyswietlOcenyDyrektor()">
                        <td>{{index+1}}</td>
                        <td> {{ocena.nazwa_przedmiotu}} </td>
                        <td> {{formatDate(ocena.data)}} </td>
                        <td> {{ocena.waga}} </td>
                        <td> {{ocena.nazwa_oceny}} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-if="przegladanieObecnosci" class="w3-container w3-padding">
                <h5> Przeglądanie obecności ucznia: </h5>
                <br/>
                <label> Wybierz ucznia: </label>
                <br/>
                <br>
                <select id="uczenWybor22" @input="getUczen($event)">
                  <option selected>---</option>
                  <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                </select>
                <br/>
                <br/>
                <button type="button" class="w3-button w3-theme" @click="wyswietlObecnosciDyrektorAc();"> Zatwierdź </button>
                <br/>
                <br/>
                <div v-if="czyWyswietlacTabelaObecności">
                  <table class="w3-table-all">
                    <thead>
                      <th> Lp. </th>
                      <th> Przedmiot </th>
                      <th> Imie i nazwisko </th>
                      <th> Data </th>
                      <th> Czy obecny </th>
                    </thead>
                    <tbody>
                      <tr v-for="(obecnosc, index) in wyswietlObecnosciDyrektor()">
                        <td>{{index+1}}</td>
                        <td>{{obecnosc.nazwa_przedmiotu}}</td>
                        <td>{{obecnosc.imie}} {{obecnosc.nazwisko}}</td>
                        <td>{{formatDate(obecnosc.data)}}</td>
                        <td>{{obecnosc.czy_obecny}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-if="przegladanieUwag" class="w3-container w3-padding">
                <h5> Przeglądanie uwag ucznia: </h5>
                <br/>
                <label> Wybierz ucznia: </label>
                <br/>
                <br>
                <select id="uczenWybor11" @input="getUczen($event)">
                  <option selected>---</option>
                  <option v-for="(uczen, index) in wszyscyUczniowie()" :value="uczen.id_uczen">{{uczen.imie}} {{uczen.nazwisko}}</option>
                </select>
                <br/>
                <br/>
                <button type="button" class="w3-button w3-theme" @click="wyswietlUwagiDyrektorAc();"> Zatwierdź </button>
                <br/>
                <br/>
                <div v-if="czyWyswietlacTabelaUwag">
                  <div v-for="(uwaga, index) in uwagiDyrektor()" class="w3-container w3-card w3-white w3-round w3-margin"><br>
                    <img src="/w3images/avatar2.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">
                    <span class="w3-right w3-opacity">{{elapsedTime(uwaga.data)}}</span>
                    <h4>{{uwaga.imie}} {{uwaga.nazwisko}}</h4><br>
                    <h4>{{formatDate(uwaga.data)}}</h4><br>
                    <hr class="w3-clear">
                    <p>{{uwaga.tresc}}</p>
                    <div>
                      <p> Uwaga {{trescpotwierdzenia(uwaga.potwierdzenie)}}.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

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
  name: 'configuration',
  data(){
        return {
          konfiguracjaKonta : false,
          dodawanieUzytkownika : false,
          dodawanieKlas : false,
          dodawaniePrzedmiotow : false,
          dodawanieRelacji: false,
          przegladanieOcen : false,
          przegladanieObecnosci : false,
          przegladanieUwag : false,
          uczenOpiekun: false,
          uczenklasa: false,
          uczenPrzedmiot: false,
          nauczycielKlasa: false,
          przedmiotKlasa: false,
          borderWidthKonfiguracja : '0px',
          borderWidthUzytkownik : '0px',
          borderWidthKlasa : '0px',
          borderWidthPrzedmiot : '0px',
          borderWidthRelacja: '0px',
          borderWidthOcena : '0px',
          borderWidthObecnosc : '0px',
          borderWidthUwaga : '0px',
          borderWidthUczenOpiekun : '0px',
          borderWidthUczenKlasa : '0px',
          borderWidthUczenPrzedmiot : '0px',
          borderWidthNauczycielKlasa : '0px',
          borderWidthPrzedmiotKlasa : '0px',
          borderColor: 'white',
          borderStyle: 'solid',

          czyWyswietlacTabelaOcen: false,
          czyWyswietlacTabelaObecności: false,
          czyWyswietlacTabelaUwag: false,

          kolumny: 'm7',
          zmienionoDaneProfil: false,
          dodanoUzytkownik: false,
          dodanoKlasa: false,
          dodanoPrzedmiot: false,
          dodanoRelacjaUczenOpiekun: false,
          dodanoRelacjaUczenKlasa: false,
          dodanoRelacjaUczenPrzedmiot: false,
          dodanoRelacjaNauczycielKlasa: false,
          dodanoRelacjaPrzedmiotKlasa: false,
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

    profil() {
      return this.$store.getters.profil
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

    wszyscyNauczyciele: function() {
      return this.$store.getters.wszyscyNauczyciele
    },

    wszyscyUczniowie: function() {
      return this.$store.getters.wszyscyUczniowie
    },

    wszyscyOpiekunowie: function() {
      return this.$store.getters.wszyscyOpiekunowie
    },

    wszystkiePrzedmiotyNauczyciela: function() {
      return this.$store.getters.wszystkiePrzedmiotyNauczyciela
    },

    wszystkiePrzedmioty: function() {
      return this.$store.getters.wszystkiePrzedmioty
    },

    wszystkieKlasy: function() {
      return this.$store.getters.wszystkieKlasy
    },

    wyswietlOcenyDyrektor: function() {
      return this.$store.getters.wyswietlOcenyDyrektor
    },

    wyswietlObecnosciDyrektor: function() {
      return this.$store.getters.wyswietlObecnosciDyrektor
    },

    uwagiDyrektor: function() {
      return this.$store.getters.uwagiDyrektor
    },

    czyNauczyciel: function() {
      if (this.$store.state.profil[0].status == 'nauczyciel'){
        return true
      }else {
        return false
      }
    },

    czyDyrektorAdmin: function() {
      if (this.$store.state.profil[0].status == 'dyrektor' || this.$store.state.profil[0].status == 'admin'){
        this.kolumny = 'm12';
        return true
      }else {
        return false
      }
    },

    konfiguracjaKontaClick: function(){
      this.konfiguracjaKonta= true;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '2px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';
    },

    dodawanieUzytkownikaClick: function(){
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = true;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '2px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';
    },

    dodawanieKlasClick: function(){
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = true;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '2px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';
    },

    dodawaniePrzedmiotowClick: function(){
      this.$store.getters.getWszyscyNauczyciele;
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = true;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '2px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';
    },

    dodawanieRelacjiClick: function(){
      this.$store.getters.getWszyscyNauczyciele;
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = true;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '2px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';
    },

    przegladanieOcenClick: function(){
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = true;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '2px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '0px';

      this.$store.getters.getWszyscyUczniowie;
    },

    przegladanieObecnosciClick: function(){
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = true;
      this.przegladanieUwag = false;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '2px';
      this.borderWidthUwaga = '0px';

      this.$store.getters.getWszyscyUczniowie;
    },

    przegladanieUwagClick: function(){
      this.konfiguracjaKonta= false;
      this.dodawanieUzytkownika = false;
      this.dodawanieKlas = false;
      this.dodawaniePrzedmiotow = false;
      this.dodawanieRelacji = false;
      this.przegladanieOcen = false;
      this.przegladanieObecnosci = false;
      this.przegladanieUwag = true;
      this.borderWidthKonfiguracja = '0px';
      this.borderWidthUzytkownik = '0px';
      this.borderWidthKlasa = '0px';
      this.borderWidthPrzedmiot = '0px';
      this.borderWidthRelacja = '0px';
      this.borderWidthOcena = '0px';
      this.borderWidthObecnosc = '0px';
      this.borderWidthUwaga = '2px';

      this.$store.getters.getWszyscyUczniowie;
    },

    uczenOpiekunClick: function(){
      this.uczenOpiekun= true;
      this.uczenKlasa = false;
      this.uczenPrzedmiot = false;
      this.nauczycielKlasa = false;
      this.przedmiotKlasa = false;

      this.borderWidthUczenOpiekun = '2px';
      this.borderWidthUczenKlasa = '0px';
      this.borderWidthUczenPrzedmiot = '0px';
      this.borderWidthNauczycielKlasa = '0px';
      this.borderWidthPrzedmiotKlasa = '0px';
      this.$store.getters.getWszyscyUczniowie;
      this.$store.getters.getWszyscyOpiekunowie;
    },

    uczenKlasaClick: function(){
      this.uczenOpiekun= false;
      this.uczenKlasa = true;
      this.uczenPrzedmiot = false;
      this.nauczycielKlasa = false;
      this.przedmiotKlasa = false;

      this.borderWidthUczenOpiekun = '0px';
      this.borderWidthUczenKlasa = '2px';
      this.borderWidthUczenPrzedmiot = '0px';
      this.borderWidthNauczycielKlasa = '0px';
      this.borderWidthPrzedmiotKlasa = '0px';
      this.$store.getters.getWszyscyUczniowie;
      this.$store.getters.getWszystkieKlasy;
    },

    uczenPrzedmiotClick: function(){
      this.uczenOpiekun= false;
      this.uczenKlasa = false;
      this.uczenPrzedmiot = true;
      this.nauczycielKlasa = false;
      this.przedmiotKlasa = false;

      this.borderWidthUczenOpiekun = '0px';
      this.borderWidthUczenKlasa = '0px';
      this.borderWidthUczenPrzedmiot = '2px';
      this.borderWidthNauczycielKlasa = '0px';
      this.borderWidthPrzedmiotKlasa = '0px';
      this.$store.getters.getWszyscyUczniowie;
      this.$store.getters.getWszyscyNauczyciele;
    },

    nauczycielKlasaClick: function(){
      this.uczenOpiekun= false;
      this.uczenKlasa = false;
      this.uczenPrzedmiot = false;
      this.nauczycielKlasa = true;
      this.przedmiotKlasa = false;

      this.borderWidthUczenOpiekun = '0px';
      this.borderWidthUczenKlasa = '0px';
      this.borderWidthUczenPrzedmiot = '0px';
      this.borderWidthNauczycielKlasa = '2px';
      this.borderWidthPrzedmiotKlasa = '0px';
      this.$store.getters.getWszystkieKlasy;
      this.$store.getters.getWszyscyNauczyciele;
    },

    przedmiotKlasaClick: function(){
      this.uczenOpiekun= false;
      this.uczenKlasa = false;
      this.uczenPrzedmiot = false;
      this.nauczycielKlasa = false;
      this.przedmiotKlasa = true;

      this.borderWidthUczenOpiekun = '0px';
      this.borderWidthUczenKlasa = '0px';
      this.borderWidthUczenPrzedmiot = '0px';
      this.borderWidthNauczycielKlasa = '0px';
      this.borderWidthPrzedmiotKlasa = '2px';
      this.$store.getters.getWszystkieKlasy;
      this.$store.getters.getWszystkiePrzedmioty;
    },

    imie: function() {
      this.$store.state.profilHelp[0].imie = document.getElementById('imie').value
    },

    nazwisko: function() {
      this.$store.state.profilHelp[0].nazwisko = document.getElementById('nazwisko').value
    },

    email: function() {
      this.$store.state.profilHelp[0].email = document.getElementById('email').value
    },

    telefon: function() {
      this.$store.state.profilHelp[0].telefon = document.getElementById('telefon').value
    },

    pokrewienstwo: function() {
      this.$store.state.profilHelp[0].pokrewienstwo = document.getElementById('pokrewienstwo').value
    },

    imie2: function() {
      this.$store.state.nowyProfil[0].imie = document.getElementById('imie2').value
    },

    nazwisko2: function() {
      this.$store.state.nowyProfil[0].nazwisko = document.getElementById('nazwisko2').value
    },

    login2: function() {
      this.$store.state.noweKonto[0].login = document.getElementById('login2').value
    },

    haslo2: function() {
      this.$store.state.noweKonto[0].haslo = document.getElementById('haslo2').value
    },

    email2: function() {
      this.$store.state.nowyProfil[0].email = document.getElementById('email2').value
    },

    telefon2: function() {
      this.$store.state.nowyProfil[0].telefon = document.getElementById('telefon2').value
    },

    status2: function() {
      this.$store.state.nowyProfil[0].status = document.getElementById('status2').value
    },

    pokrewienstwo2: function() {
      this.$store.state.nowyProfil[0].pokrewienstwo = document.getElementById('pokrewienstwo2').value
    },

    numerKlasy3: function(e) {
      this.$store.state.nowaKlasa[0].numer_klasy = e.target.value
    },

    literaKlasy3: function(e) {
      this.$store.state.nowaKlasa[0].litera_klasy = e.target.value
    },

    rokSzkolny3: function() {
      this.$store.state.nowaKlasa[0].rok_szkolny = document.getElementById('rokSzkolny3').value
    },

    rokSzkolnyRelacja: function(e) {
      this.$store.state.klasyConfigRelacja[0].rok_szkolny = e.target.value
    },

    nazwaPrzedmiotu4: function(e) {
      this.$store.state.nowyPrzedmiot[0].nazwa_przedmiotu = e.target.value
    },

    czyNauczycielOpiekun: function() {
      if (this.$store.state.profil[0].status == 'nauczyciel' || this.$store.state.profil[0].status == 'opiekun'){
        return true
      }else {
        return false
      }
    },

    trescpotwierdzenia: function(potwierdzenie){
      if (potwierdzenie == 0){
        return 'nieprzeczytana'
      }else {
        return 'przeczytana'
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

    ...mapActions(["getKlasaCzlonkowieAction"]),
    getKlasaCzlonkowieAc: function (e, klasa) {
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

    ...mapActions(["dodawanieKontaAction", "dodawanieUzytkownikaAction"]),
    dodawanieUzytkownikaAc: function (e) {
      this.dodanoUzytkownik = true;
      this.dodawanieKontaAction({
        login:this.$store.state.noweKonto[0].login,
        haslo:this.$store.state.noweKonto[0].haslo,
        typ_konta:this.$store.state.nowyProfil[0].status,
      });
     this.dodawanieUzytkownikaAction({
        imie:this.$store.state.nowyProfil[0].imie,
        nazwisko:this.$store.state.nowyProfil[0].nazwisko,
        email:this.$store.state.nowyProfil[0].email,
        telefon:this.$store.state.nowyProfil[0].telefon,
        status:this.$store.state.nowyProfil[0].status,
        pokrewienstwo:this.$store.state.nowyProfil[0].pokrewienstwo,
      });
    },

    ...mapActions(["dodawaniePrzedmiotowAction"]),
    dodawaniePrzedmiotowAc: function (e) {
      this.dodanoPrzedmiot = true;
      this.dodawaniePrzedmiotowAction({
        nazwa_przedmiotu:this.$store.state.nowyPrzedmiot[0].nazwa_przedmiotu,
        id_nauczyciel:this.$store.state.nowyPrzedmiot[0].id_nauczyciel,
      });
    },

    ...mapActions(["dodawanieKlasyAction"]),
    dodawanieKlasyAc: function (e) {
      this.dodanoKlasa = true;
      this.$store.state.nowaKlasa[0].nazwa=this.$store.state.nowaKlasa[0].numer_klasy + this.$store.state.nowaKlasa[0].litera_klasy;
      this.dodawanieKlasyAction({
        nazwa: this.$store.state.nowaKlasa[0].nazwa,
        rok_szkolny: this.$store.state.nowaKlasa[0].rok_szkolny,
        });
    },

    ...mapActions(["getNauczycielAction"]),
    getNauczyciel: function (e) {
      this.getNauczycielAction({
        id_nauczyciel: e.target.value
      });
    },

    ...mapActions(["getUczenRelacjaAction"]),
    getUczen: function (e) {
      this.getUczenRelacjaAction({
        id_uczen: e.target.value
      });
    },

    ...mapActions(["getOpiekunRelacjaAction"]),
    getOpiekun: function (e) {
      this.getOpiekunRelacjaAction({
        id_opiekun: e.target.value
      });
    },

    ...mapActions(["getNauczycielRelacjaAction"]),
    getNauczycielRelacja: function (e) {
      this.getNauczycielRelacjaAction({
        id_nauczyciel: e.target.value
      });
      this.$store.getters.getWszystiePrzedmiotyNauczyciela
    },

    ...mapActions(["getPrzedmiotRelacjaAction"]),
    getPrzedmiot: function (e) {
      this.getPrzedmiotRelacjaAction({
        nazwa_przedmiotu: e.target.value
      });
    },

    ...mapActions(["getPrzedmiotRelacjaAction2"]),
    getPrzedmiot2: function (e) {
      this.getPrzedmiotRelacjaAction2({
        nazwa_przedmiotu: e.target.value
      });
      this.$store.getters.getWszystkiePrzedmiotyHelp;
    },

    ...mapActions(["getKlasaRelacjaAction"]),
    getKlasa: function (e) {
      this.getKlasaRelacjaAction({
        nazwa: e.target.value,
        rok_szkolny: this.$store.state.klasyConfigRelacja[0].rok_szkolny
      });
    },

    ...mapActions(["getKlasaRelacjaAction2", "getWszyscyUczniowieKlasy"]),
    getKlasa2: function (e) {
      this.getKlasaRelacjaAction2({
        nazwa: e.target.value,
      });
      this.getWszyscyUczniowieKlasy();
    },


    ...mapActions(["dodawanieRelacjiUczenOpiekunAction"]),
    dodawanieRelacjiUczenOpiekunAc: function (e) {
      this.dodanoRelacjaUczenOpiekun = true;
      this.dodawanieRelacjiUczenOpiekunAction({
        id_opiekun: this.$store.state.opiekunConfigRelacja[0].id_opiekun,
        id_uczen: this.$store.state.uczenConfigRelacja[0].id_uczen,
      });
    },

    ...mapActions(["dodawanieRelacjiUczenKlasaAction"]),
    dodawanieRelacjiUczenKlasaAc: function (e) {
      this.dodanoRelacjaUczenKlasa = true;
      this.dodawanieRelacjiUczenKlasaAction({
        id_klasa: this.$store.state.klasyConfigRelacja[0].id_klasa,
        nazwa: this.$store.state.klasyConfigRelacja[0].nazwa,
        rok_szkolny: this.$store.state.klasyConfigRelacja[0].rok_szkolny,
        id_uczen: this.$store.state.uczenConfigRelacja[0].id_uczen,
      });
    },

    ...mapActions(["dodawanieRelacjiUczenPrzedmiotAction"]),
    dodawanieRelacjiUczenPrzedmiotAc: function (e) {
      this.dodanoRelacjaUczenPrzedmiot = true;
      this.dodawanieRelacjiUczenPrzedmiotAction();
    },

    ...mapActions(["dodawanieRelacjiNauczycielKlasaAction"]),
    dodawanieRelacjiNauczycielKlasaAc: function (e) {
      this.dodanoRelacjaNauczycielKlasa = true;
      this.dodawanieRelacjiNauczycielKlasaAction({
        id_klasa: this.$store.state.klasyConfigRelacja[0].id_klasa,
        id_nauczyciel: this.$store.state.nauczycielConfigRelacja[0].id_nauczyciel
      });
    },

    ...mapActions(["dodawanieRelacjiPrzedmiotKlasaAction"]),
    dodawanieRelacjiPrzedmiotKlasaAc: function (e) {
      this.dodanoRelacjaPrzedmiotKlasa = true;
      this.dodawanieRelacjiPrzedmiotKlasaAction();
    },

    ...mapActions(["wyswietlOcenyDyrektorAction"]),
    wyswietlOcenyDyrektorAc: function (e) {
      this.czyWyswietlacTabelaOcen=true;
      this.wyswietlOcenyDyrektorAction();
    },

    ...mapActions(["wyswietlObecnosciDyrektorAction"]),
    wyswietlObecnosciDyrektorAc: function (e) {
      this.czyWyswietlacTabelaObecności=true;
      this.wyswietlObecnosciDyrektorAction();
    },

    ...mapActions(["wyswietlUwagiDyrektorAction"]),
    wyswietlUwagiDyrektorAc: function (e, klasa) {
      this.czyWyswietlacTabelaUwag= !this.czyWyswietlacTabelaUwag;
      this.wyswietlUwagiDyrektorAction();
    },

    ...mapActions(["zatwierdzZamianyProfilAction"]),
    zatwierdzZamianyProfil: function (e, klasa) {
      this.zmienionoDaneProfil = true;
      this.zatwierdzZamianyProfilAction();
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
