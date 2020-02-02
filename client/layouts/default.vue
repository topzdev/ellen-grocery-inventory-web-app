<template>
  <v-app>
    <navbar/>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./Navbar";
import {Vue, Component} from 'vue-property-decorator'

@Component({
  components: {
    Navbar
  }
})
export default class Default extends Vue {
  
}

</script>
