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
          <div class="col-md-4 col-12 text-md-left text-center py-1">
            <h1>
              <u> {{ state.activeBug.title }}</u>
            </h1>
            <h2 class="mt-3">
              <span class="font-sm"> Caught by: <br></span>
              <span><img class="img-icon rounded-circle my-auto" :src="state.activeBug.creator.picture" alt="">
              </span>
              {{ state.activeBug.creator.name.split('@')[0] }}
            </h2>
          </div>
          <div class="col-md-4 col-12 text-md-left text-center mb-2">
            <h2>
              <span class="font-sm"> Last Updated: <br></span>{{ `${state.activeBug.updatedAt.slice(5, 7)}/${state.activeBug.updatedAt.slice(8, 10)}/${state.activeBug.updatedAt.slice(0, 4)}` }}
            </h2>
          </div>
          <div class="col-md-2 col-12 text-md-left text-center mb-2">
            <button type="button" class="btn btn-lg btn-danger font-md mb-md-3 my-2" v-if="user.id === state.activeBug.creatorId">
              Release
            </button>
            <h2 v-if="state.activeBug.closed">
              <span class="font-sm">Status: <br></span><span class="text-danger">Released</span>
            </h2>
            <h2 v-else>
              <span class="font-sm">Status: <br></span><span class="text-success">Caught</span>
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
          <div class="col-md-8 col-6">
            <h3 class="font-xl mb-md-0 mb-3">
              Notes
            </h3>
          </div>
          <div class="col-md-4 col-6 text-right">
            <button type="button" class="btn btn-lg btn-success font-md mb-3" @click="addNote()" v-if="user.isAuthenticated">
              Add
            </button>
            <button
              class="btn btn-lg btn-primary font-md mb-3"
              @click="login"
              v-if="!user.isAuthenticated"
            >
              Login
            </button>
          </div>
        </div>
        <div class="row justify-content-between table-border" v-if="state.notes[0]">
          <div class="col-12">
            <div class="row">
              <div class="col-md-3 col-7">
                <h3>Name</h3>
              </div>
              <div class="col-7 d-md-block d-none">
                <h3>Message</h3>
              </div>
              <div class="col-md-2 col-5 text-center">
                <h3>Delete</h3>
              </div>
            </div>
            <div class="row table-border-top">
              <div class="col-12">
                <NoteComponent v-for="n in state.notes" :key="n.id" :note-prop="n" />
              </div>
            </div>
          </div>
        </div>
        <h2 class="text-center table-border-top mt-4 pt-3" v-if="!state.notes[0] && user.isAuthenticated">
          This bug has no notes!  Would you like to add one?
        </h2>
        <h2 class="text-center table-border-top mt-4 pt-3" v-if="!state.notes[0] && !user.isAuthenticated">
          This bug has no notes!  Log in to add one!
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
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
      notes: computed(() => AppState.notes),
      bugs: computed(() => AppState.bugs)
    })
    onMounted(async() => {
      try {
        await bugsService.getBugById(route.params.id)
        const name = state.activeBug.title.toLowerCase()
        await bugsService.getPokeBug(name)
        await bugsService.getNotesByBugId(route.params.id)
        state.loading = false
      } catch (error) {
        Notification.toast('Error: ', +error, 'error')
      }
    })
    return {
      state,
      user: computed(() => AppState.user),
      async addNote() {
        try {
          await Notification.textArea()
          await notesService.createNote(AppState.activeBug.id, AppState.activePost)
        } catch (error) {
          Notification.toast('Error: ', +error, 'error')
        }
      },
      async login() {
        AuthService.loginWithPopup()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.img-icon {
  height: 2rem;
  width: auto;
}
</style>
