import { getQueryParams } from './lib/card-collection-utils'

import get from 'lodash.get'
export default {
  cardCollection: async (context, pageData) => {
    if (pageData.tidePage) {
      // Automated card listing.
      const automatedCardRequests = []
      // Find automated card listings and make Elasticsearch requests.
      for (const key in pageData.tidePage.appDComponents) {
        const component = pageData.tidePage.appDComponents[key]
        if (component.name === 'automated-card-listing') {
          const sitesDomainMap = get(context, ['store', 'state', 'tideSite', 'sitesDomainMap'])
          if (!sitesDomainMap) {
            const domains = await context.app.$tide.getSitesDomainMap()
            context.store.commit('tideSite/setSitesDomainMap', domains)
          }
          const filterFormMock = {
            form: {
              columns: 2,
              submit: {
                onChange: false,
                button: true,
                buttonText: 'Submit before me'
              },
              clear: {
                buttonText: 'Clear form'
              },
              titleFields: ['title', 'body'],
              fields: [
                {
                  label: 'Event requirements',
                  placeholder: 'Select an item',
                  type: 'select',
                  field: 'field_event_details_event_requirements_name'
                },
                {
                  label: 'Event Category',
                  placeholder: 'Select an item',
                  type: 'select',
                  field: 'field_event_category_name'
                }
              ]
            }
          }
          component.data.config = {
            ...component.data.config,
            ...filterFormMock
          }
          // Request listings for all automated card listings.
          automatedCardRequests.push({
            key,
            promise: context.app.$tideSearchApi.search('/cards', {
              site: context.store.state.tideSite.siteId,
              ...getQueryParams(component.data.config)
            })
          })
        }
      }
      // Set initial card data on all resolved automated card listings promises.
      if (automatedCardRequests.length > 0) {
        const automatedCardResults = await Promise.all(automatedCardRequests.map(item => item.promise))
        automatedCardResults.forEach((response, index) => {
          const request = automatedCardRequests[index]
          const component = pageData.tidePage.appDComponents[request.key]
          component.data.initialResults = response.results
          component.data.initialTotal = response.total
          component.data.aggregations = response.aggregations
        })
      }
    }
  }
}
