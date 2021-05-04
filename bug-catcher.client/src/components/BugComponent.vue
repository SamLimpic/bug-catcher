<template>
  <router-link :to="{ name: 'BugDetails', params: { id:bugProp.id } }">
    <div class="bug-component row align-items-center table-border-mid py-2">
      <div class="col-1 d-md-block d-none pl-3 pr-1">
        <img class="img-fluid mx-auto" :src="bugProp.imgUrl" label="Who's that bug?!" alt="It's {{bugProp.title}}!">
      </div>
      <div class="col-md-3 col-8">
        <h3>{{ bugProp.title }}</h3>
      </div>
      <div class="col-md-1 col-2 text-md-right text-left px-0">
        <img class="img-icon rounded-circle mx-auto" :src="bugProp.creator.picture" alt="Creator Icon">
      </div>
      <div class="col-3 d-md-block d-none">
        <h3>
          {{ bugProp.creator.name.split('@')[0] }}
        </h3>
      </div>
      <div class="col-2 d-md-block d-none text-left">
        <h3 class="text-danger" v-if="bugProp.closed">
          Released
        </h3>
        <h3 class="text-success" v-else>
          Caught
        </h3>
      </div>
      <div class="col-2 d-md-none d-block text-md-left px-0 my-auto">
        <i class="fas fa-bug text-danger mx-1" title="Released" v-if="bugProp.closed"></i>
        <i class="fas fa-bug text-success mx-1" title="Caught" v-else></i>
      </div>
      <div class="col-2 d-md-block d-none">
        <h3>{{ `${bugProp.updatedAt.slice(5, 7)}/${bugProp.updatedAt.slice(8, 10)}/${bugProp.updatedAt.slice(0, 4)}` }}</h3>
      </div>
    </div>
  </router-link>
</template>

<script>

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

<style scoped lang="scss">
.img-icon {
  height: 2rem;
  width: auto;
}
</style>
