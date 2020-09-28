<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner title="Redirecting" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <p>Please wait while we redirect you.</p>
      </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

export default {
  name: 'Redirect',
  components: {
    RplHeroBanner,
    RplRow,
    RplCol,
    RplPageLayout
  },
  async asyncData ({ app, route, store, redirect }) {
    store.dispatch('tide/setPageHead', { title: 'Redirecting' })
  },
  created () {
    const destination = this.$route.query.destination
    if (destination) {
      this.$router.replace({ path: destination })
    } else {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
