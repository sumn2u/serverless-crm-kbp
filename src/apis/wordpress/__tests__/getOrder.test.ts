import {getOrderById} from '../getOrder';

jest.setTimeout(10000); // 1 second

describe('Wordpress API', function () {
  test('getOrder', async () => {
    const order  = await getOrderById('156');
    expect(order.id).toEqual(156);
  })
});
