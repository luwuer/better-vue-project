export default {
  user_view_a_1: () =>
    import(/* webpackChunkName: "user/views/a/1" */ '@/modules/user/views/a/1'),
  user_view_a_2: () =>
    import(/* webpackChunkName: "user/views/a/2" */ '@/modules/user/views/a/2')
}
