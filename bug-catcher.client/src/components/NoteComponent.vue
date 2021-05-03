<template>
  <div class="note-component row align-items-center table-border-mid">
    <div class="col-md-3 col-8 order-md-1 order-1">
      <h4 class="py-2 m-0">
        <span><img class="img-icon rounded-circle my-auto" :src="noteProp.creator.picture" alt=""></span> <i>{{ noteProp.creator.name.split('@')[0] }}</i>
      </h4>
    </div>
    <div class="col-md-7 col-12 order-md-2 order-3">
      <h4>{{ noteProp.body }}</h4>
    </div>
    <div class="col-md-2 col-4 order-md-3 order-2 text-md-center text-left px-md-0 px-2">
      <button class="btn btn-lg btn-transparent" @click="deleteNote(noteProp.id)" v-if="noteProp.creator.id === account.id">
        <i class="fas fa-ban text-danger"></i>
      </button>
      <button class="btn btn-lg btn-transparent" disabled v-else>
        <i class="fas fa-ban text-dark"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'

export default {
  name: 'NoteComponent',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async deleteNote(id) {
        try {
          await notesService.deleteNote(id)
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.img-icon {
  height: 2rem;
  width: auto;
}
</style>
