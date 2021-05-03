<template>
  <router-link :to="{ name: 'BugDetails', params: { id:bugProp.id } }">
    <div class="bug-component row my-1">
      <div class="col-md-4 col-7">
        <h3>{{ bugProp.title }}</h3>
      </div>
      <div class="col-3 d-md-block d-none">
        <h3>{{ bugProp.creator.name.split('@')[0] }}</h3>
      </div>
      <div class="col-3 d-md-block d-none text-left">
        <h3 class="text-danger" v-if="bugProp.closed">
          Released
        </h3>
        <h3 class="text-success" v-else>
          Caught
        </h3>
      </div>
      <div class="col-5 d-md-none d-block text-left pl-4">
        <h3 class="text-danger" v-if="bugProp.closed">
          <i class="fas fa-bug text-danger mx-1 pl-4" title="Released"></i>
        </h3>
        <h3 class="text-success" v-else>
          <i class="fas fa-bug text-success mx-1 pl-4" title="Caught"></i>
        </h3>
      </div>
      <div class="col-2 d-md-block d-none">
        <h3>{{ `${bugProp.updatedAt.slice(6, 10)} ${bugProp.updatedAt.slice(0, 4)}` }}</h3>
      </div>
    </div>
  </router-link>
</template>

<script>
// import { AppState } from '../AppState'
// import { bugsService } from '../services/BugsService'
// import Notification from '../utils/Notification'

export default {
  name: 'BugComponent',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {

    }
  },
  components: {}
}
</script>

<style>

</style>
