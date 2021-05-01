<template>
  <div class="home container">
    <div class="row justify-content-center" v-if="user.isAuthenticated">
      <div class="col-md-6 col-10 shadow bg-light text-center p-4 m-5">
        <h1><u>Welcome to Bug Catcher</u>!</h1>
        <div class="row justify-content-center">
          <div class="col-11">
            <p>Here we have our pristine collection of bugs, insects, and arachnids!  Users are welcome to contribute their own catches to the Insectapedia, as well as comment on existing entries!  But be sure that our exoskeletal friends are properly cared for, or they may find better accomodations!</p>
            <router-link :to="{name: 'Bugs'}">
              <button type="button" class="btn btn-lg btn-dark mx-auto text-light mt-md-2 mt-3 mb-md-2" title="View Bugs Button">
                Visit the Insectapedia
              </button>
            </router-link>
          </div>
        </div>
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
