import baseApi from './basePriorityApi';

const path = "/ORDERS";

export interface IOrder {
  customerId: string;
  items: Array<{ productId: string; amount: number }>;
}

export function buildOrder(order: IOrder) {
  return {
    CUSTNAME: order.customerId,
    ORDERITEMS_SUBFORM: order.items.map((item) => ({
      PARTNAME: item.productId,
      DUEDATE: new Date().toISOString(),
      QUANT: item.amount,
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