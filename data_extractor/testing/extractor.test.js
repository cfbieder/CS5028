const MockData = require("./mockRSS.json")
const DataSource = require("../../components/config/dataSource");

test('Check configuration',  () => {
    const dataSource = new DataSource
    const source = dataSource.getSource();
    expect(source).toBe(DataSource.Types.Mock)
    
})


test('Check if Mock data supported',  () => {
    process.env.DATA_TYPE = 'mock';
    const dataSource = new DataSource
    const source = dataSource.getSource();
    expect(source).toBe(DataSource.Types.Mock)
    
})

test('Check if Live data supported',  () => {
    process.env.DATA_TYPE = 'live';
    const dataSource = new DataSource
    const source = dataSource.getSource();
    expect(source).toBe(DataSource.Types.Live)

})

test('Çheck RSS Collector with mock data', async () => {
    process.env.DATA_TYPE = 'mock';
    const rssCollector = require("../../components/data/RSSCollector");
    let feed = await rssCollector.rssGetFeed();
    expect(feed).toContain(MockData[0]);
})

test('Çheck RSS Collector with live data', async () => {
    process.env.DATA_TYPE = 'live';
    const rssCollector = require("../../components/data/RSSCollector");
    let feed = await rssCollector.rssGetFeed();
    expect(feed.length).toBeGreaterThan(0);

})

