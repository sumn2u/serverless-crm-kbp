import baseApi from './basePriorityApi';

const path = "/ORDERS";

export interface IOrder {
  customer_id: string;
  line_items: Array<{ product_id: string; quantity: number }>;
}

export function buildOrder(order: IOrder) {
  return {
    CUSTNAME: order.customer_id,
    ORDERITEMS_SUBFORM: order.line_items.map((item) => ({
      PARTNAME: item.product_id,
      DUEDATE: new Date().toISOString(),
      QUANT: item.quantity,
    })),
  };
}

export async function create(order: IOrder): Promise<any> {
  const data = buildOrder(order);
  // console.log('*** data', data);

  return baseApi.post(path, data)
    .then(response => {
      // console.log('*** response', response);
      // console.log('*** response.data', response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error, 'error on create order');
    })
}