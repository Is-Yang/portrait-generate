<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive && isRouterAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive && isRouterAlive"></router-view>
        <Loading />
    </div>
</template>

<script>
    import Loading from '@/components/Loading';
    export default {
        name: 'app',
        components: {
            Loading
        },
        provide () {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            // 当前页面刷新
            reload () {
                this.isRouterAlive = false;
                this.$nextTick(()=> {
                    this.isRouterAlive = true;
                })
            }
        }
    }
</script>