
document.getElementById('tweet-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action
    const message = document.getElementById('toast-tab').value;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(tweetUrl, '_blank'); // Open the tweet URL in a new tab
});

