export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation((subjucet: string, data: string, callback: () => void) => {
        callback();
      }),
  },
};
