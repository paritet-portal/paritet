import { dbTranslation } from './prisma-translation.js';

describe('dbTranslation', () => {
  it('should work', () => {
    expect(dbTranslation()).toEqual('prisma-translation');
  });
});
