export { default as Checkout } from '../../components/checkout.vue'
export { default as Disclaimer } from '../../components/disclaimer.vue'
export { default as EventCard } from '../../components/event-card.vue'
export { default as EventsSidebar } from '../../components/events-sidebar.vue'
export { default as FeaturedEvent } from '../../components/featured-event.vue'
export { default as FullscreenLoader } from '../../components/fullscreen-loader.vue'
export { default as Hero } from '../../components/hero.vue'
export { default as InputField } from '../../components/input-field.vue'
export { default as MainFooter } from '../../components/main-footer.vue'
export { default as Navbar } from '../../components/navbar.vue'
export { default as Pagination } from '../../components/pagination.vue'
export { default as PrimaryButton } from '../../components/primary-button.vue'
export { default as Search } from '../../components/search.vue'
export { default as SecondaryButton } from '../../components/secondary-button.vue'
export { default as Tag } from '../../components/tag.vue'
export { default as TicketSelection } from '../../components/ticket-selection.vue'
export { default as DashboardEventDetails } from '../../components/dashboard/event-details.vue'
export { default as DashboardEventsCard } from '../../components/dashboard/events-card.vue'
export { default as DashboardEventsMenu } from '../../components/dashboard/events-menu.vue'
export { default as DashboardMenu } from '../../components/dashboard/menu.vue'
export { default as DashboardMobileNavmenu } from '../../components/dashboard/mobile-navmenu.vue'
export { default as DashboardNavbar } from '../../components/dashboard/navbar.vue'
export { default as DashboardTotalEventSales } from '../../components/dashboard/total-event-sales.vue'
export { default as EventFormsBasic } from '../../components/event-forms/basic.vue'
export { default as EventFormsDetails } from '../../components/event-forms/details.vue'
export { default as EventFormsSales } from '../../components/event-forms/sales.vue'
export { default as EventFormsSchedules } from '../../components/event-forms/schedules.vue'
export { default as EventFormsSummary } from '../../components/event-forms/summary.vue'
export { default as EventFormsTickets } from '../../components/event-forms/tickets.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
