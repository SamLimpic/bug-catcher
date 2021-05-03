<template>
  <div class="home container">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="col-md-8 col-10 shadow bg-light text-center p-4 m-5">
        <h2><u>Welcome to Bug Catcher</u>!</h2>
        <div class="row justify-content-center">
          <div class="col-11">
            <p>Here we have our pristine collection of arthropods!  Users are welcome to contribute their own catches to the database, as well as comment on existing entries!</p>
            <router-link :to="{name: 'Bugs'}">
              <button type="button" class="btn btn-lg btn-primary mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Bugs Button">
                View the Collection
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-else>
      <div class="col-md-6 col-10 shadow bg-light text-center p-4 m-5">
        <h2><u>Log in to view our collection!</u></h2>
        <h1 class="m-0 p-0">
          <i class="fas fa-bug fa-spin text-info text-success large-icon"></i>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>

<style scoped lang="scss">
p {
  font-size: 1.5rem
}
</style>
