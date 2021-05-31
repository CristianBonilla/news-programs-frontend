import { NewsBodyPipe } from './news-body.pipe';

describe('NewsBodyPipe', () => {
  it('create an instance', () => {
    const pipe = new NewsBodyPipe();
    expect(pipe).toBeTruthy();
  });
});
