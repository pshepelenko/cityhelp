<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Список заданий</h3>
        </b-card-header>
        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="tasks">
            
            <el-table-column label="Название"
                             prop="title"
                             min-width="342px">
                <template v-slot="{row}">
                        <router-link :to="'/admin/tasks/'+ row.taskid" class="font-weight-600 name mb-0 text-sm">{{row.title}}</router-link>                    
                </template>
            </el-table-column>

            <el-table-column label="Категория"
                             min-width="130px"
                             prop="category">
            </el-table-column>

            <el-table-column label="Статус"
                             min-width="150px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <StatusText :status="row.status"/>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Создан" 
                min-width="120px"
                prop="creationdate"
                >
                <template v-slot="{row}">
                    {{moment(row.creationdate).format('DD/MM/YYYY')}}
                </template>
            </el-table-column>

            <el-table-column label="Отчетов ожидает"
                             
                             min-width="110px">
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.reportsunchecked}}</span>                        
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Отчетов всего"
                min-width="110px"
                >
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.reportstotal}}</span>                        
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
        </b-card-footer>
    </b-card>
</template>
<script>
  
  import { Table, TableColumn} from 'element-ui'
  import StatusText from '@/components/StatusText.vue'  

  export default {
    name: 'light-table',
    props: {
        tasks: []
    },
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      StatusText,
    },
    mounted() {
        console.log(this.tasks)
    },
    data() {
      return {        
        currentPage: 1
      };
    }
  }
</script>
