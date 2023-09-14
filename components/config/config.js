module.exports = {
  mongoURI:
    //"mongodb+srv://coursera:DPivdTteAiNyR95U@cluster0.vub0zll.mongodb.net/?retryWrites=true&w=majority",
    //"mongodb://127.0.0.1:27016/RSS",
    //"mongodb://mongo/RSS",
    "mongodb://127.0.0.1:27016/RSS",
  mongoURI_docker:
    "mongodb://mongo/RSS",
  rabbitURI:
    "amqp://localhost",
  rabbitURI_docker:
    "amqp://guest:guest@rabbitmq:5672/",
  rssURI:
    "https://pubmed.ncbi.nlm.nih.gov/rss/search/1pk-02YRTTMOVRBTJ6t0Y9P_AnxW2ZS1wDrmeg5B964lUNU9nD/?limit=50&utm_campaign=pubmed-2&fc=20230905084008",
  messageQueue:
    "rssFeeds"
};