<template>
  <v-layout>
    <VBtn class="ma-5 pa-1 elevation-10" color="success" @click="teste()">Restart no IIS</VBtn>
    <VBtn class="ma-5 pa-1 elevation-10" color="success" @click="fabio()">Teste</VBtn>
  </v-layout>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'App',

  methods: {
    teste() {
      ipcRenderer.send('msg', 'estou no processo do renderer')

      ipcRenderer.on('respostaMain', (event, data) => {
        console.warn(data)
      })
    },
    fabio(){
      ipcRenderer.send('teste', "apertei o botao teste")
    }
  }
}
</script>

<style scoped>
.v-layout {
  /* border: 1px solid silver; */
  height: 100vh;
}
</style>
<!-- <script setup>
import Versions from './components/Versions.vue'

const { ipcRenderer } = require('electron')
function teste() {
  ipcRenderer.send('msg', 'estou no processo do renderer')
  //console.log('testando')
}
function teste02() {
  //ipcRenderer.send('msg', 'estou no processo do renderer')

  console.log('estou fazendo outra coisa enquanto o renderer nao recebe a resposta')
}
ipcRenderer.on('respostaMain', (event, data) => {
  console.warn(data)
  // console.warn(event)
})
</script> -->

