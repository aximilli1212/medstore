<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <book-form>
          </book-form>
        </div>
        <div class="col-md-4">
          <user-card>
          </user-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BookForm from './Book/BookForm.vue'
  import UserCard from './UserProfile/UserCard.vue'

  export default {
    components: {
      BookForm,
      UserCard
    }
  }

</script>
<style>

</style>
