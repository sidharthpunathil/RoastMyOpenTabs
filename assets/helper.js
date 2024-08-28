document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('tweet-link').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default action
        alert("tweet link clicked")
        let message = document.getElementById('toast-tab').innerText;
        message = encodeURIComponent(message + " #RoastMyOpenTabs");
        const tweetUrl = `https://x.com/intent/post?text=${message}`;
        chrome.tabs.create({url: tweetUrl, active: true});
    });


    function getTabs() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({}, (tabs) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(tabs);
            });
        });
    }

    document.getElementById('submit').addEventListener('click', async function () {
        try {
            const tabs = await getTabs();
            const tabTitle = tabs.map(tab => tab.title).join(', ');
            const tabLinks = tabs.map(tab => tab.url).join(', ');
            const t = [tabTitle, tabLinks];
            alert(JSON.stringify(tabTitle));
            const apiKey = document.getElementById('api-key').value;
            roastMeAndMyTabs(t, apiKey);
        } catch (error) {
            console.error('Error fetching tabs:', error);
        }
    });

    function tweet() {
        
    }


    async function roastMeAndMyTabs(userText, apiKey) {
        startRoasting();
    
        const data = {
            model: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
            messages: [
                { role: "system", content: "You are a witty and humorous assistant that was made to roast tabs!" },
                { role: "user", content: `Roast my open tabs in my browser and my tabs! Think of intelligent and hilarious ways of roasting me, these are my open tabs, !ALWAYS GIVE ME A SINGLE PARAGRAPH: ${userText}` }
            ],
            temperature: 0.7
        };
    
        try {
            const response = await fetch('https://api.together.xyz/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result, "result")    
            const roast = await result.choices[0].message.content;
            finishRoasting(roast);
        } catch (error) {
            console.error('Error:', error);
        }
    
    }

    function startRoasting() {
        document.querySelector('.roast-tab').textContent = `Loading...`;
    }

    function finishRoasting(text) {
        console.log("roast insie finishroasting", text)
        document.querySelector('.roast-tab').textContent = `${text}`}

       
});