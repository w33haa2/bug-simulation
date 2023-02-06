<template>
  <div class="w-full ag-theme-balham" :style="computedHeight">
    <client-only>
      <ag-grid-vue
        :style="fullView ? 'height: calc(100vh - 130px)' : 'height: 100%'"
        class="ag-theme-balham"
        :column-defs="columnDefs"
        :suppress-menu-hide="true"
        :row-data="rowData"
        :default-col-def="defaultColDef"
        :side-bar="sideBar"
        :components="frameworkComponents"
        :overlay-loading-template="overlayTemplate"
        :suppress-row-click-selection="suppressRowClickSelection"
        :is-row-selectable="isRowSelectable"
        :row-selection="rowSelection"
        :single-click-edit="singleClickEdit"
        :pagination="pagination"
        :tooltip-show-delay="tooltipShowDelay"
        :tooltip-hide-delay="tooltipHideDelay"
        :row-model-type="rowModelType"
        :pagination-page-size="paginationPageSize"
        :cache-block-size="cacheBlockSize"
        :max-blocks-in-cache="maxBlocksInCache"
        :server-side-store-type="serverSideStoreType"
        :row-height="rowHeight"
        :row-class-rules="rowClassRules"
        :enable-range-selection="enableRangeSelection"
        row-group-panel-show="always"
        @firstDataRendered="handleState"
        @grid-ready="onGridReady"
        @cellEditingStopped="cellChanged"
        @row-selected="onRowSelected"
        @cellKeyDown="(e) => $emit('edit', e)"
      >
        <!--        @cellValueChanged="cellChanged"-->
      </ag-grid-vue>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    /*
      * Sample param
    [
      { field: 'make' },
      { field: 'model' },
      {
        field: 'price',
        filterParams: {
          comparator: (a, b) => {
            const valA = parseInt(a)
            const valB = parseInt(b)
            if (valA === valB) return 0
            return valA > valB ? 1 : -1
          },
        },
      },
    ]
     */
    columnDefs: {
      type: Array,
      required: true,
    },
    dataSourceMethod: {
      type: Object,
      default: () => {},
    },
    rowClassRules: {
      type: Object,
      default: () => {},
    },
    suppressMenuHide: {
      type: Boolean,
      default: true,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    enableRangeSelection: {
      type: Boolean,
      default: false,
    },
    singleClickEdit: {
      type: Boolean,
      default: true,
    },
    rowModelType: {
      type: String,
      default: 'serverSide',
    },
    frameworkComponents: {
      type: Object,
      default: () => {},
    },
    rowHeight: {
      type: Number,
      default: 43,
    },
    serverSideStoreType: {
      type: String,
      default: 'partial',
    },
    paginationPageSize: {
      type: Number,
      default: 10,
    },
    maxBlocksInCache: {
      type: Number,
      default: 10,
    },
    cacheBlockSize: {
      type: Number,
      default: 10,
    },
    fullView: {
      type: Boolean,
      default: false,
    },
    /*
     * Sample Payload
      [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Nissan', model: 'Skyline', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
      ]
     */
    rowData: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    busy: {
      type: Boolean,
      default: false,
    },
    tooltipShowDelay: {
      type: Number,
      default: 0,
    },
    tooltipHideDelay: {
      type: Number,
      default: 2000,
    },
    suppressRowClickSelection: {
      type: Boolean,
      default: false,
    },
    isRowSelectable: {
      type: Function,
      default: () => {},
    },
    defaultColDef: {
      type: Object,
      default: () => {
        return {
          // flex: 1,
          // minWidth: 50,
          // allow every column to be aggregated
          enableValue: true,
          // allow every column to be grouped
          enableRowGroup: true,
          // allow every column to be pivoted
          enablePivot: true,
          sortable: true,
          filter: true,
          resizable: true,
          width: 80,
          wrapHeaderText: true,
          autoHeaderHeight: true,
        }
      },
    },
    rowSelection: {
      type: String,
      default: 'multiple',
    },
    height: {
      type: [String, Number],
      default: 600,
    },
  },
  data() {
    return {
      sideBar: null,
    }
  },
  computed: {
    overlayTemplate() {
      return `<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>`
    },
    computedHeight() {
      return `height: ${this.height}px; max-height: ${this.height}px; `
    },
  },
  watch: {
    busy: {
      immediate: true,
      deep: true,
      handler(data) {
        if (this.gridApi) {
          if (data) {
            this.gridApi.showLoadingOverlay()
          } else {
            this.gridApi.hideOverlay()
          }
        }
      },
    },
  },
  beforeMount() {
    // sample config for sidebar
    // this.sideBar = {
    //   toolPanels: [
    //     {
    //       id: 'columns',
    //       labelDefault: 'Columns',
    //       labelKey: 'columns',
    //       iconKey: 'columns',
    //       toolPanel: 'agColumnsToolPanel',
    //     },
    //     {
    //       id: 'filters',
    //       labelDefault: 'Filters',
    //       labelKey: 'filters',
    //       iconKey: 'filter',
    //       toolPanel: 'agFiltersToolPanel',
    //     },
    //   ],
    //   position: 'left',
    //   // defaultToolPanel: 'filters',
    // }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
      this.gridApi.sizeColumnsToFit({
        defaultMinWidth: 100,
        columnLimits: [{ key: 'action', maxWidth: 50 }],
      })
      // this.gridApi.sizeColumnsToFit({
      //   defaultMinWidth: 80,
      // })
      // SAMPLE METHOD FOR GETTING SSR ON AG GRID
      /*
        return {
          getRows: (params) => {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            var response = server.getData(params.request);
            // adding delay to simulate real server call
            setTimeout(function () {
              if (response.success) {
                // call the success callback
                params.success({
                  rowData: response.rows,
                  rowCount: response.lastRow,
                });
              } else {
                // inform the grid request failed
                params.fail();
              }
            }, 200);
          },
        }
       */
      this.gridApi.setServerSideDatasource(this.dataSourceMethod)
      if (this.busy) {
        this.gridApi.showLoadingOverlay()
      }
    },
    sizeColumnsToFit() {
      this.gridApi.sizeColumnsToFit()
    },
    refreshServerSide() {
      this.gridApi.refreshServerSide({ purge: true })
      this.gridApi.purgeInfiniteCache()
    },
    handleState(e) {
      console.log(e)
    },
    onRowSelected(e) {
      const dataId = e.data.id
      const valArray = this.value
      if (e.node.selected) {
        if (!this.value.find(({ id }) => id === dataId)) {
          valArray.push(e.data)
          this.$emit('input', valArray)
        }
      } else {
        const index = valArray.map((e) => e.id).indexOf(dataId)
        if (index !== -1) {
          valArray.splice(index, 1)
        }
        this.$emit('input', valArray)
      }
    },
    setRowData(data) {
      this.gridApi.setRowData(data)
    },
    refreshCells() {
      this.gridApi.refreshCells()
      this.gridApi.redrawRows()
    },
    cellChanged(e) {
      const data = this.rowData.map((y) => {
        if (y.id === e.data.id) {
          return {
            ...e.data,
          }
        }
        return {
          ...y,
        }
      })
      this.$emit('cell-changed', {
        data,
        changedData: e.data,
        column: e.column.colId,
      })
    },
  },
}
</script>
