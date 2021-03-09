<template>
    <ag-grid-vue style="width: 500px; height: 500px;"
                 class="ag-theme-alpine"
                 :columnDefs="columnDefs"
                 :rowData="rowData"
                 rowSelection="multiple">
    </ag-grid-vue>
</template>

<script>
    import { AgGridVue } from "ag-grid-vue";

    export default {
        name: 'ag-grid-sample',
        data()
        {
            return {
                columnDefs: null,
                rowData: null
            }
        },
        components: {
            AgGridVue
        },
        methods: {},
        beforeMount()
        {
            this.columnDefs = [
                { field: 'make', sortable: true, filter: true, checkboxSelection: true },
                { field: 'model', sortable: true, filter: true },
                { field: 'price', sortable: true, filter: true }
            ];

            this.rowData = [
                { make: 'Toyota', model: 'Celica', price: 35000 },
                { make: 'Ford', model: 'Mondeo', price: 32000 },
                { make: 'Porsche', model: 'Boxter', price: 72000 }
            ];
        }
    }
</script>
