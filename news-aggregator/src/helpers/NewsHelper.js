const axios = require('axios');

const fetchNewsByPreferences = async (userPreferences) => {
    const apiKey = process.env.API_KEY;
    const apiUrl = 'https://newsapi.org/v2/everything';
    //q=' + userPreferences.join('&') + 'apiKey=' + apiKey;

    try {
        const response = await axios.get(apiUrl, {
            params: {
                apiKey,
                q: userPreferences.join('&'),
            },
        });
        const articles = response.data.articles;
        return articles;

    } catch (error) {
        console.error('Error fetching news:', error);
    }
};


module.exports = { fetchNewsByPreferences, };