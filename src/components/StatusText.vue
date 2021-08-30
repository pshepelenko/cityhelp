<template>
    <div>
        <span v-if="status == 'Не запущено'" class="status" :class="`text-warning`">{{status}}</span>                    
        <span v-if="status == 'В работе'" class="status" :class="`text-success`">{{status}}</span>                    
        <span v-if="status == 'На обработке'" class="status" :class="`text-warning`">{{status}}</span>
        <span v-if="status == 'Подтвержден'" class="status" :class="`text-success`">{{status}}</span>
        <span v-if="status == 'Отклонен'" class="status" :class="`text-danger`">{{status}}</span>                    
    
    </div>
</template>
<script>
export default {
    name: 'StatusText',
    props: {
        status,
    }
}
</script>