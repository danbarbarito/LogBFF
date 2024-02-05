const pino = require("pino");
const baseLogger = pino();

const start = async () => {
  let messageCount = 1;
  while (true) {
    const randomNum = Math.floor(Math.random() * 10);
    const randomNum2 = Math.floor(Math.random() * 3);
    const log = baseLogger.child({ module: `Module ${randomNum}` });
    switch (randomNum2) {
      case 0:
        log.info({
          msg: "My Response",
          responseJson: {
            data: [
              {
                testKey: "key",
              },
            ],
          },
          messageCount,
        });
      case 1:
        log.warn({
          msg: "My Warning",
          responseJson: {
            warning: [
              {
                message: "This is the warning message",
              },
            ],
          },
          messageCount,
        });
      default:
        log.error({ msg: "This is an error", messageCount });
    }
    messageCount++;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
};

start();
