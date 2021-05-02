<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center pt-3 pb-1">
      <p> Made with <i class="fab fa-vuejs text-success my-auto"></i> by Samwise</p>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
p {
  font-size: 1.25rem
}
i {
font-size: 1.5rem
}
</style>
