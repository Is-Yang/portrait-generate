<template>
    <div class="loading" v-if="loading">
        <van-loading type="spinner" color="white" />
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {
            loading: false
        }
    },
    created() {
        this.$eventHub.$on('loading', (data)=> {
            this.loading = !!data;
        })
    }
}
</script>

