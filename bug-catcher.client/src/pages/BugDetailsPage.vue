<template>
  <div class="bug-details container">
    <div class="row justify-content-center" v-if="state.loading">
      <div class="col-12 text-center p-3 m-md-4 my-md-3 my-4">
        <i class="fas fa-bug fa-spin text-success large-icon mx-1"></i>
      </div>
    </div>
    <div class="row bg-light shadow rounded p-3 m-md-0 m-2 my-md-5 my-4" v-else>
      <div class="col-12">
        <div class="row justify-content-between align-items-end">
          <div class="col-md-2 col-12 my-auto">
            <img class="img-fluid" :src="state.activeBug.imgUrl" alt="">
          </div>
          <div class="col-md-3 col-12 text-md-left text-center py-1">
            <h1>
              <u> {{ state.activeBug.title }}</u>
            </h1>
            <h2 class="mb-2 mt-3">
              <span class="font-sm"> Caught by: <br></span>{{ state.activeBug.creator.name.split('@')[0] }}
            </h2>
          </div>
          <div class="col-md-3 col-12 text-md-left text-center pb-1">
            <h2 class="mb-2">
              <span class="font-sm"> Last Updated: <br></span>{{ `${state.activeBug.updatedAt.slice(5, 7)} / ${state.activeBug.updatedAt.slice(8, 10)} / ${state.activeBug.updatedAt.slice(0, 4)}` }}
            </h2>
          </div>
          <div class="col-md-4 col-12 text-md-right text-center">
            <button type="button" class="btn btn-lg btn-danger w-50 font-md mb-md-3 my-2">
              Release
            </button>
            <h2 v-if="state.activeBug.closed">
              <span class="font-sm">Status: </span><span class="text-danger">Released</span>
            </h2>
            <h2 v-else>
              <span class="font-sm">Status: </span><span class="text-success">Caught</span>
            </h2>
          </div>
        </div>
        <div class="row justify-content-center table-border mt-3">
          <div class="col-12 my-2">
            <p>{{ state.activeBug.description }}</p>
            <div class="row justify-content-between table-border-top pt-2">
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Health: </span><b> {{ state.activePokeBug.stats[0].base_stat }} </b></h3>
              </div>
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Speed: </span><b> {{ state.activePokeBug.stats[5].base_stat }} </b></h3>
              </div>
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Attack: </span><b> {{ state.activePokeBug.stats[1].base_stat }} </b></h3>
              </div>
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Special Attack: </span><b> {{ state.activePokeBug.stats[3].base_stat }} </b></h3>
              </div>
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Defense: </span><b> {{ state.activePokeBug.stats[2].base_stat }} </b></h3>
              </div>
              <div class="col-md-4 col-12">
                <h3><span class="font-sm"> Special Defense: </span><b> {{ state.activePokeBug.stats[4].base_stat }} </b></h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-between align-items-end mt-5">
          <div class="col-8">
            <h3 class="font-xl">
              Notes
            </h3>
          </div>
          <div class="col-4 text-right">
            <button type="button" class="btn btn-lg btn-success w-50 font-md mb-3">
              Add Note
            </button>
          </div>
        </div>
        <div class="row justify-content-between table-border" v-if="state.notes">
          <div class="col-12">
            <div class="row">
              <div class="col-3">
                <h3>Name</h3>
              </div>
              <div class="col-7">
                <h3>Message</h3>
              </div>
              <div class="col-2">
                <h3>Delete</h3>
              </div>
            </div>
            <div class="row table-border-top">
              <div class="col-12">
              <!-- <NoteComponent v-for="n in state.notes" :key="n.id" :bug-prop="n" /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import Notification from '../utils/Notification'

export default {
  name: 'Bugs',
  setup() {
    const route = useRoute()
    const state = reactive({
      loading: true,
      newPost: computed(() => AppState.newPost),
      activeBug: computed(() => AppState.activeBug),
      activePokeBug: computed(() => AppState.activePokeBug),
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        const name = state.activeBug.title.toLowerCase()
        await bugsService.getPokeBug(name)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', +error, 'error')
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">

</style>
