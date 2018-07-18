import IsgClient from '../lib/isg-client';

test('can create isg-client instance without constructor argument', () => {
  const client = new IsgClient();
  expect(client.username).toBeUndefined();
  expect(client.password).toBeUndefined();
  expect(client.url).toBe('http://servicewelt');
  expect(client.version).toBe('2.1');
});
