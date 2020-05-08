import {getOrderById} from '../getOrder';

describe('Wordpress API', function () {
  test('getOrder', async () => {
    const order  = await getOrderById('156');
    expect(order.id).toEqual(156);
  })
});
