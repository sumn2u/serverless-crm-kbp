import baseApi from './basePriorityApi';
import { Item } from '../../common/responses';

const path = "/ORDERS";

export interface IOrder {
  customer_id: string;
  line_items: Item[];
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
  console.log('*** data', data);

  return baseApi().post(path, data)
    .then(response => {
      // console.log('*** response', response);
      // console.log('*** response.data', response.data);
      return response.data;
    })
    .catch(error => {
      console.error(error, 'error on create order in priority crm', data);
      throw error;
    })
}