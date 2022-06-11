Vue.component('card',
    {
        template: `
            <div>
                <div class="goods-item" style='border: 1px solid black; max-width: 200px' v-bind:data-id='good.id'>
                    <h3>{{ good.title }}</h3>
                    <p>{{ good.price }} $</p>
                </div>
                <button class="goods-item__button" v-on:click='onClick' type='button'>{{ actionName }}</button>
            </div>
            `,
        props: ['good', 'actionName'],
        methods: {
            onClick() {
                console.log(this.good.id);
                this.$emit('cardaction', this.good.id);
            }
        }
    }
)