const helper = require("./components/data/RSSCollector");

async function main() {
    console.log("Getting RSS Feed");
    let feed = await helper.rssGetFeed();
    console.log(`Items retreived: ${feed.length}`);
}

main()



