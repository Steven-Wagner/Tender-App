const yourProductsService = {
    getProfitColor(profit) {
        //Style profit red or green depending on positive or negative
        let profitColor = {color: 'green'}
        if (parseFloat(profit) < 0) {
            profitColor = {color: 'red'};
        }
        return profitColor;
    }
}

export default yourProductsService;