<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header">
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>
        
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row id="map">
        <gmap-map :center="{lat: 56.18, lng: 36.97}" :zoom="14" style="width: 100%; height: 500px">
          <gmap-polygon :paths="initialPaths" :editable="true" @paths_changed="updateEdited($event)">
          </gmap-polygon>
        </gmap-map>
      </b-row>
      <b-row>
        <b-col xl="8" class="mx-auto mt-5">
            <card>
              <b-row align-v="center" slot="header" >
                <b-col cols="8">
                  <h3 class="mb-0">Введите информацию о задании </h3>
                </b-col>     
              </b-row>

              <b-form @submit.prevent="handleCreate">
                <div class="pl-lg-4">
                  <b-row>
                    <b-col lg="12">
                      <base-input
                        type="text"
                        label="Название"
                        placeholder=""
                        v-model="task.title"
                      >
                      </base-input>
                    </b-col>
                  </b-row>
                  <b-row >
                    <b-col lg="6">
                      <div class="">
                        <b-form-group label="Категория" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
                          <b-form-select v-model="task.category" label="Категория" :options="categoriesList"></b-form-select>
                        </b-form-group>
                     </div>
                    </b-col>
                  </b-row>
                </div>
                <div class="pl-lg-4 mt-3">
                  <b-form-group label="Описание" label-class="form-control-label" class="mb-0" label-for="about-form-textaria">
                    <b-form-textarea rows="4" v-model="task.description" value="" id="about-form-textaria" placeholder=""></b-form-textarea>
                  </b-form-group>
                </div>
                <b-row class="pl-lg-4">
                  <b-col lg="6"> 
                    <base-input
                            type="text"
                            label="Вознаграждение"
                            placeholder=""
                            v-model="task.reward"
                          >
                    </base-input>
                  </b-col>
                </b-row>
                <div class="pl-lg-4"> <b-button variant="primary" type="submit"> Создать </b-button> </div>
              </b-form>
            </card>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  
  export default {
    components: {
    },
    data() {
        return {
            
            initialPaths: [ {lat: 56.18, lng: 36.97},  {lat: 56.18, lng: 36.98}, {lat:56.187, lng: 36.98}, {lat: 56.187, lng: 36.97} ],
            task: {
              finalPaths: null,
              title: '',
              category: '',
              creator: '',
              creationdate: '',
              description: '',
              reward: 0,
              
            }
        }
    },
    computed: {
      categoriesList() {
        return ['Экология', 'Опросы', 'Сбор информации']
      },    
    },
    mounted() {
      let creatorInfo = JSON.parse(localStorage.getItem('user'));
      this.task.creator = creatorInfo.login;

      const current = new Date();
      this.task.creationdate = `${current.getMonth()+1}-${current.getDate()}-${current.getFullYear()}`;
    },
    methods: {
          updateEdited(mvcArray) {
            let paths = [];
            for (let i=0; i<mvcArray.getLength(); i++) {
              let path = [];
              for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
                let point = mvcArray.getAt(i).getAt(j);
                path.push({lat: point.lat(), lng: point.lng()});
              }
              paths.push(path);
            }
            this.task.finalPaths = paths[0];
          },
          handleCreate() {
            
            this.task.finalPaths = JSON.stringify(this.task.finalPaths);
            console.log(this.task);
            this.$http.post('api/tasks/create', this.task,
            {
              headers: {
              // remove headers
            }
            })
            .then(response => {
              console.log(response.data);
              this.$router.push('/admin/tasks/');
                  
            })
            .catch (error => {
              console.log('aaa');              
            })
          }
    }
  }

        
   
  
</script>
<style>
</style>
