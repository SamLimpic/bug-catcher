<template>
  <div class="about container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-8 text-center">
        <h2 class="my-3">
          <u> Accessibility Test Page </u>
        </h2>
        <div class="row justify-content-around p-3 my-3 shadow bg-light">
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-primary">
              Primary
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-secondary">
              Secondary
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-success">
              Success
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-warning">
              Warning
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-danger">
              Danger
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-info">
              Info
            </button>
          </div>
        </div>
        <div class="row justify-content-around p-3 my-3 shadow bg-light">
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-primary">
              Primary
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-secondary" disabled>
              <strike> Secondary </strike>
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-success">
              Success
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-warning" disabled>
              <strike> Warning </strike>
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-danger">
              Danger
            </button>
          </div>
          <div class="col-md-2 col-12 my-2">
            <button type="button" class="btn btn-lg btn-outline-info">
              Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>
