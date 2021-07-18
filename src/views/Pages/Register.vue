<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success pb-7">
           <div class="pt-4 pb-7 pr-lg-6 pr-4  pl-lg-6 pl-3">
          <div class="top-navbar">
            <img class="logo" src="img/brand/logo.jpg">
            <div class="menu-right">
              <div >
                <router-link class="link mr-lg-3" to="/register">
                    <i class="ni ni-circle-08 pr-1"></i>
                    <span class="nav-link-inner--text">Регистрация</span>
                </router-link>
              </div>
              <div>
                <router-link class="link" to="/login">
                <i class="ni ni-key-25 pr-1"></i>
                <span class="nav-link-inner--text">Вход</span>
                </router-link>
              </div>
            </div>
          </div>
          </div>

      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Создайте аккаунт</h1>
              <p class="text-lead text-white">Выполняйте задания и получайте награды от администрации вашего города</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Создайте учетные данные для входа</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Имя"
                              name="Name"
                              :rules="{required: true}"
                              v-model="model.name">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-hat-3"
                              placeholder="Фамилия"
                              name="Surname"
                              :rules="{required: true}"
                              v-model="model.surname">
                  </base-input>
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="Email"
                              :rules="{required: true, email: true}"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Пароль"
                              type="password"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              v-model="model.password">
                  </base-input>
                 
                  <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted">Я согласен с <a href="#!">Правилами сервиса</a></span>
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row>
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4">Зарегистрироваться</b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          surname: '',
          email: '',
          password: '',
          agree: false
        }
      }
    },
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do an api call here to register users
      }
    }

  };
</script>
<style scoped>
  .top-navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 32px;
   
    
  }
.menu-right{
    display: flex;
    align-items: center;
}
.link {
  color: white;
  
  align-items: center;
  font-size: 15px;
}
</style>