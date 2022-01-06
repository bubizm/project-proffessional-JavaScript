Vue.component('cart',
    {
      template: `
        <div class="cart">
          <div class="cartRectangle">
            <table class="cartRectangle__table">
              <tr class="table-row__top">
                <th>Название товара</th>
                <th>Количество</th>
                <th>Цена за штуку</th>
                <th>Итого</th>
                <th></th>
              </tr>
              <add v-for='item of list' v-bind:key="item.id" v-bind:good='item'></add>
            </table>
          </div>
        </div>
            `,
      props: ['list']
    }
)