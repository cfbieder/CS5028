const TestCollector = require("../config/testing")

test('Check if Mock data supported',  () => {

   
    process.env.NODE_ENV = 'test';
    const testCollector1 = new TestCollector
    const source1 = testCollector1.getSource();
    expect(source1).toBe(TestCollector.Types.Mock)
    
})

test('Check if Live data supported',  () => {

    
    process.env.NODE_ENV = 'live';
    const testCollector2 = new TestCollector
    const source2 = testCollector2.getSource();
    expect(source2).toBe(TestCollector.Types.Live)

})
