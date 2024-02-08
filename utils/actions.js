exports.executeStep = async (test, element, action, description, data) => {
  await test.step(description, async () => {
    switch (action) {
      case 'hover':
        await element.hover();
        break;
      case 'click':
        await element.click();
        break;
      case 'forceClick':
        await element.click({ force: true });
        break;
      case 'fill':
        await element.fill(data);
        break;
      case 'navigate':
        await element.goto(data[0]);
        break;
      case 'type':
        await element.type(data);
        break;
      case 'check':
        await element.check();
        break;
      case 'tap':
        await element.tap();
        break;
    }
  });
};
