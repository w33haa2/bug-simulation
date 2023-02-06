<template>
  <div class="border rounded-lg shadow-md bg-white mx-4 p-4 flex flex-col">
    <ag-grid
      ref="grid"
      :default-col-def="defaultColDef"
      :column-defs="columns"
      :pagination="true"
      :row-height="50"
      :pagination-page-size="10"
      row-model-type="serverSide"
      :max-blocks-in-cache="1"
      :cache-block-size="10"
      :data-source-method="agGridASNItemsFetch"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      page: 1,
      rowData: [],
      columns: [
        {
          headerName: 'Menu',
          field: 'pk',
          width: 100,
          filter: 'text',
          sortable: false,
          suppressMenu: true,
          suppressSorting: true,
          suppressSizeToFit: true,
          pinned: 'left',
          cellRenderer: 'TestPageComponentsButtonRenderer',
        },
        { field: 'fields.name', headerName: 'Name' },
        { field: 'fields.sku', headerName: 'SKU' },
      ],
      defaultColDef: {
        enablePivot: true,
        sortable: true,
        filter: true,
        resizable: true,
        width: 80,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      },
    }
  },
  computed: {
    agGridASNItemsFetch() {
      return {
        getRows: async (params) => {
          let endRow = params.request.endRow.toString()
          endRow = endRow.slice(0, endRow.length - 3)
          this.page = endRow
          await axios.get('https://beestock-backend-dev.azurewebsites.net/api/mock-product?page=1').then((e) => {
            console.log(e.data.success.product)
            params.success({
              rowData: e.data.success.product,
              rowCount:e.data.success.max,
            })
          })
        },
      }
    },
  },
}
</script>
