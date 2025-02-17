<template>
  <router-view />
</template>
<script>
export default {
  mounted() {
    document.title = this.$t('Header');
  },
  watch: {
    '$i18n.locale'() {
      document.title = this.$t('Header');
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

body {
  font-family: 'Montserrat', sans-serif;
}
</style>
