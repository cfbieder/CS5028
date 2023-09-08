const DataSource = {
    Mock: 'Mock',
    Live: "Live"
}

class TestCollector {

    constructor() {
        var test = process.env.NODE_ENV;
        if (test == "test") {
            console.log("Using Mock Data")
            this.datasource = DataSource.Mock
        }
        else {
            console.log("Using Live Data")
            this.datasource = DataSource.Live
        }
    }

    //datasource for RSS [Mock or Live from RSS Feed]
    getSource() {
        return this.datasource;
    }

    static get Types() {
        return DataSource;
    }

}

module.exports = TestCollector


