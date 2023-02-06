<template>
  <div class="flex gap-2 items-center mt-2">
    <button
      class="text-white font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center bg-green-500 focus:ring-4 focus:ring-green-300 hover:bg-green-600"
      @click="handleUpdate"
    >
      edit
    </button>
    <button
      class="text-white font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center bg-red-500 focus:ring-4 focus:ring-red-300 hover:bg-red-600"
      @click="handleDelete"
    >
      delete
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cellValue: null,
    }
  },
  beforeMount() {
    this.cellValue = this.params.value
  },
  methods: {
    handleUpdate() {
      this.$root.$emit('edit-product', this.cellValue)
    },
    handleDelete() {
      this.$root.$emit('delete-product', this.cellValue)
    },
  },
}
</script>
