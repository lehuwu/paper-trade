module.exports = function({ sequelize, statistic, ctt, express, config }) {
    const router = express.Router();
    /**获取精选头部列表 */
    router.get('/ChoicenessBannerList', async(req, res) => {
        try {
            let result = await redisClient.getAsync("cacheResult:bannerChoice")
            res.send('{"Status":0,"Explain":"ok","Data":' + result + '}')
        } catch (ex) {
            res.send({ Status: 500, Explain: ex })
        }
    });
    /**获取精选列 */
    router.get('/ChoicenessList', ctt, async(req, res) => {
        try {
            let result = await redisClient.getAsync("cacheResult:normalChoice");
            //埋点
            //statistic.module({ LoginId: req.memberCode, TypeId: 4, IsLogin: req.memberCode != null })
            res.send('{"Status":0,"Explain":"ok","Data":' + result + '}')
        } catch (ex) {
            res.send({ Status: 500, Explain: ex })
        }
    })
    return router
}