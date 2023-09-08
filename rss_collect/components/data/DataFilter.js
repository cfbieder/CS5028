class DateFileter {


    clean(feed) {
        console.log("Cleaning the data")
        let cleanFeed = [];

        var json = JSON.stringify(feed);
        json = json.replace(/\\n/g, '');

        feed = JSON.parse(json);    

        feed.forEach(element => {
            let newItem = {}
            newItem.title = element.title;
            newItem.author = element.creator;
            newItem.datePub = element.date;
            newItem.content = element['content:encodedSnippet'];
            newItem.guid = element.guid;
            newItem.source = 'PubMed'
            cleanFeed.push(newItem);
        });

        return cleanFeed;
    }
}
module.exports = DateFileter