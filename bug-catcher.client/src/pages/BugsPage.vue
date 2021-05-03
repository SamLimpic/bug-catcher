<template>
  <div class="home container">
    <div class="row justify-content-center" v-if="state.loading">
      <div class="col-12 text-center p-3 m-md-4 my-md-3 my-4">
        <i class="fas fa-bug fa-spin text-success large-icon mx-1"></i>
      </div>
    </div>
    <div class="row justify-content-center bg-light shadow rounded p-3 m-md-0 m-2 my-md-5 my-4" v-else>
      <div class="col-12">
        <div class="row justify-content-between align-items-end ">
          <div class="col-md-3 col-12 order-md-1 order-2 text-md-left text-center pl-md-0 my-md-0 my-3">
            <button type="button" class="btn btn-lg btn-primary" @click="getPokeBug">
              Catch a Bug
            </button>
          </div>
          <div class="col-md-6 col-12 order-md-2 order-1 text-center">
            <h2 class="m-0 font-xl">
              Current Collection
            </h2>
          </div>
          <div class="col-md-3 col-12 order-md-3 order-3 text-md-right text-center">
            <div class="form-check row align-items-center pr-md-1">
              <input class="form-check-input checkbox-2x" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label font-sm" for="defaultCheck1">
                Hide Released
              </label>
            </div>
          </div>
        </div>
        <div class="row justify-content-between table-border mt-3" v-if="state.bugs[0]">
          <div class="col-12">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-3 col-7">
                <h3>Name</h3>
              </div>
              <div class="col-3 d-md-block d-none">
                <h3>Catcher</h3>
              </div>
              <div class="col-md-2 col-5 text-md-left text-right">
                <h3>Status</h3>
              </div>
              <div class="col-3 d-md-block d-none">
                <h3>Last Updated</h3>
              </div>
            </div>
            <div class="row table-border-top">
              <div class="col-12">
                <BugComponent v-for="b in state.bugs" :key="b.id" :bug-prop="b" />
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-center table-border-top mt-4 pt-3" v-else>
          We're all out of bugs!  Why not help us add some?
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'Bugs',
  setup() {
    const state = reactive({
      loading: true,
      newPost: computed(() => AppState.newPost),
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
      try {
        await bugsService.getAllPokeBugs()
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      state,
      async getPokeBug() {
        try {
          const index = Math.floor(Math.random() * 96)
          AppState.activePokeBug = AppState.pokeBugs[index].pokemon
          const name = AppState.activePokeBug.name
          await bugsService.catchPokeBug(name)
          const pokeBug = AppState.activePokeBug
          const text = pokeBug.flavor_text_entries.findIndex(p => p.language.name === 'en')
          await Notification.image()
          AppState.newPost = {
            title: `${pokeBug.name[0].toUpperCase() + pokeBug.name.slice(1)}`,
            description: `${pokeBug.flavor_text_entries[text].flavor_text.replaceAll('', ' ')}`,
            imgUrl: `${AppState.activeImg}`
          }
          await bugsService.catchBug(AppState.newPost)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.checkbox-2x {
    transform: scale(1.5);
    -webkit-transform: scale(1.5);
    margin-top: .7rem;
}
</style>
