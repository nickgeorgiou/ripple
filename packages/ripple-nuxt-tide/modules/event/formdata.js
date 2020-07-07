export default {
    getFormData: async (setFilterOptionsv2, searchConfig) => {
      const eventCategoryValues = await setFilterOptionsv2({
        type: 'term',
        fields: ['field_event_category_name'],
      }, searchConfig, this);
    return {
      title: "What's on in Victoria",
      searchPlaceholder: 'Search by keyword or location',
      theme: 'light',
      allowBlank: true,
      filterForm: {
        tideId: 'tide_search_form',
        tag: 'rpl-fieldset',
        model: {
          // Multi-value fields should always be an array.
          field_event_category_name: [],
          field_event_date_end_value: '',
        },
        schema: {
          groups: [
            {
              fields: [
                {
                  type: 'rplchecklist',
                  styleClasses: ['form-group--col-two', 'rpl-event-filter--category'],
                  label: 'Select an event category',
                  model: 'field_event_category_name',
                  values: eventCategoryValues,
                  placeholder: 'Select a topic',
                  // TODO: Update 'filter' key to 'query' to make purpose clearer.
                  filter: {
                    type: 'term',
                    operator: ''
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rpldatepicker',
                  ranged: false,
                  styleClasses: ['form-group--col-two', 'rpl-event-filter--date'],
                  label: 'Select an event date',
                  model: 'field_event_date_end_value',
                  placeholder: 'DD/MM/YYYY',
                  filter: {
                    type: 'date',
                    operator: 'gte'
                  }
                }
              ]
            },
            {
              fields: [
                {
                  type: 'rplsubmitloader',
                  buttonText: 'Apply change',
                  loading: false,
                  autoUpdate: true,
                  styleClasses: ['form-group--inline']
                },
                {
                  type: 'rplclearform',
                  buttonText: 'Clear search filters',
                  styleClasses: ['form-group--inline']
                }
              ]
            }
          ]
        },
        formOptions: {
          validateAfterLoad: false,
          validateAfterChanged: false
        },
        formState: {}
      }
    }
  }
}
