let url;

if (process.env.NODE_ENV !== 'production') {
    url = "http://localhost:8000/api"
}
else {
    url = "https://cryptic-depths-79803.herokuapp.com/api"
}

module.exports = {
    PORT: process.env.PORT || 8000,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
        "http://localhost:8000/api",
    TOKEN_KEY: 'authToken',
    user_id: 'user_id'
};