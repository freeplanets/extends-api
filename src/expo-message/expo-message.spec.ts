import { ExpoMessage } from './expo-message';

describe('ExpoMessage', () => {
  it('should be defined', () => {
    expect(new ExpoMessage(`${process.env.EXPO_ACCESS_TOKEN}`)).toBeDefined();
  });
});
