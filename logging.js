const stringifyData = (data) => (_.map(data, (item) => JSON.stringify(item))).join('\n')

module.exports = {
    debug: (...data) => {
        console.debug('[DEBUG]', Game.time, stringifyData(data));
    }
}
