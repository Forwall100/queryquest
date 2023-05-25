<template>
  <the-header/>
  <RouterView></RouterView>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
export default {
    components: {
        TheHeader,
    }
}
</script>