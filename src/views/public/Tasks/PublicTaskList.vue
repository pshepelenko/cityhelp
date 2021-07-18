<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Список заданий</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="projects">
            
            <el-table-column label="Название"
                             prop="title"
                             min-width="342px">
                <template v-slot="{row}">
                        <router-link :to="'/tasks/'+ row.id" class="font-weight-600 name mb-0 text-sm">{{row.title}}</router-link>                    
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
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>

            <el-table-column label="Создан" 
                min-width="120px"
                prop="creationDate"
                >
                <template v-slot="{row}">
                    {{row.creationDate}}
                </template>
            </el-table-column>

            <el-table-column label="Отчетов ожидает"
                             
                             min-width="110px">
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.reportsUnchecked}}</span>                        
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="Отчетов всего"
                min-width="110px"
                >
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.reportsTotal}}</span>                        
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="currentPage" :per-page="10" :total="50"></base-pagination>
        </b-card-footer>
    </b-card>
</template>
<script>
  
  import { Table, TableColumn} from 'element-ui'
  export default {
    name: 'light-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn
    },
    data() {
      return {
        projects: [
        {
            id: 123,
            category: 'Сбор мусора',
            title: 'Убрать мусор на улице Московской',
            creationDate: '22.11.2021',
            status: 'В работе',
            statusType: 'warning',
            reportsUnchecked: 3,
            reportsTotal: 10
        },
        {
            id: 111,
            category: 'Сбор информации',
            title: 'Опрос по поводу изменения транспортной развязки на ул. Кирова',
            creationDate: '01.06.2021',
            status: 'Завершено',
            statusType: 'success',
            reportsUnchecked: 0,
            reportsTotal: 12
        },
         {
            id: 222,
            category: 'Сбор мусора',
            title: 'Сфотографировать состояние дорожного полотна на ул. Мяснцикой',
            creationDate: '22.11.2021',
            status: 'Завершено',
            statusType: 'success',
            reportsUnchecked: 2,
            reportsTotal: 8
        },	

        ],
        currentPage: 1
      };
    }
  }
</script>
