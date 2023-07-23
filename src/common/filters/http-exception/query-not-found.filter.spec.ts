import { QueryNotFoundFilter } from './query-not-found.filter';

describe('HttpExceptionFilterFilter', () => {
  it('should be defined', () => {
    expect(new QueryNotFoundFilter()).toBeDefined();
  });
});
