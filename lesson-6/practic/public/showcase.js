Vue.component('showcase',
    {
        template: `
            <div class="goods-list">
                <card v-for='item of list' v-bind:good='item' v-bind:key="item.id" v-bind:actionName="'Добавить в корзину'" v-on:cardaction='onAdd'></card>
            </div>
            `,
        props: ['list'],
        methods: {
            onAdd(id) {
                this.$emit('addtocart', id);
            }
        }
    }
)