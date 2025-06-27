import { prismaAuth } from './prisma-auth.js';

describe('prismaAuth', () => {
  it('should work', () => {
    expect(prismaAuth()).toEqual('prisma-auth');
  });
});
