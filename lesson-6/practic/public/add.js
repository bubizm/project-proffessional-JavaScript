Vue.component('add',
    {
        template: `
        <tr class="table-row__middle" v-bind:data-id="good.id">
          <th>{{ good.title }}</th>
          <th>{{ this.count() }}</th>
          <th>{{ good.price }}</th>
          <th>{{ this.getPrice() }}</th>
          <th><button class="plus">+</button> | <button class="minus">-</button></th>
        </tr>
            `,
        props: ['good'],
        methods: {
            count() {
                let count = 0
                console.log(count);
                count++
            },
            getPrice() {
                console.log(this.count * goodsListEl.price);
                this.count * good.price
            }
        }
    }
)