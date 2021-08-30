<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Список отчетов по заданиям</h3>
        </b-card-header>

        

        <el-table 
                  class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="reports">
            

            <el-table-column label="ID отчета"
                min-width="130px"
                prop="reportid">
            </el-table-column>

            <el-table-column label="Название задания"
                             prop="title"
                             min-width="342px">
                <template v-slot="{row}">
                        <router-link :to="'/admin/tasks/'+ row.taskid" :key="taskTitleMounted" class="font-weight-600 name mb-0 text-sm">{{getTaskTitle(row.taskid)}}{{taskTitle}}</router-link>                    
                </template>
            </el-table-column>

            <el-table-column label="Статус"
                             min-width="150px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <StatusText :status="row.status" />
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

            <el-table-column label=""
                min-width="220px">
                <template v-slot="{row}">
                    <b-button variant="secondary" :to="'/admin/reports/'+row.reportid">Посмотреть </b-button>
                </template>
            </el-table-column>

            <template slot="empty">
                <div style="width: 700px;" v-if="noReports"> Отчеты по данному заданию пока что не поступали ... </div>
            </template>    
            
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
        taskId: String,
    },
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      StatusText
    },
    data() {
      return {
        noReports: true,
        taskTitleMounted: 0,
        taskTitle:'',
        reports: [],
        currentPage: 1
      };
    },
    methods: {
        getParticularReports(taskId) {
        this.$http.get('http://127.0.0.1:3000/reports/tasks/' + taskId,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.reports = response.data;
            this.noReports = false;
          })
          .catch (error => {
              console.log('aaa');
              this.authStatus=false;
          })
        },
        getTaskTitle(taskId) {
            this.$http.get('http://127.0.0.1:3000/tasks/' + taskId,null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.taskTitle = response.data[0].title;
          })
          .catch (error => {
              console.log('aaa');             
          })        
        },
        getAllReports() {
        this.$http.get('http://127.0.0.1:3000/reports/',null,
         {
            headers: {
              // remove headers
            }
          })
          .then(response => {
            this.reports = response.data;
            this.noReports = false;
          })
          .catch (error => {
              console.log('aaa');
              this.authStatus=false;
          })
        }
    },
    mounted() {
        (this.taskId) ? this.getParticularReports(this.taskId) : this.getAllReports();        
    }
  }
</script>
