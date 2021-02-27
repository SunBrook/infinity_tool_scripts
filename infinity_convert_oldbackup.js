/* 本脚本仅供个人学习交流使用，请勿商用!!!
 *
 * 作者：曦源  QQ: 1724464648
 * 版本：v0.0.1
 * 时间：2020/9/12
 * 功能：将用户网站数据生成旧版迁移数据文件，然后用户手动上传备份数据，以实现 infinity pro 插件的导出备份文件 和 还原备份文件的功能
 *
 *
 * 准备工作说明：
 * 1. 确保数据处于最新状态，请手动备份数据
 * 2. 请先使用导入excel脚本，保存导出excel文件，以免其他意外发生
 *
 *
 * 导出备份文件说明：
 * 1. 在浏览器新标签页，打开浏览器开发者工具，键盘快捷按键 F12，并点击Console, 打开控制台
 * 2. 全选本脚本，快捷键 Ctrl + A, 然后复制本脚本 快捷键 Ctrl + C, 然后到浏览器控制台，粘贴脚本代码，快捷键 Crtl + V，最后按回车 Enter ,即可导出备份文件
 *
 *
 * 还原备份说明：
 * 1. 打开插件的立即迁移功能
 * 2. 选择右边的根据本地备份文件还原，选择上面说明导出的备份文件，即可导出备份
 * 3. 此脚本不能做到文件夹分类，但是会根据文件夹名称单独分页面展示，需要用户手动创建文件夹
 *
 */


//备用模版
var inf_old_backup_model = {
    "type": "theNew__INFINITY",
    "backupType": "local",
    "time": 1599896774580,
    "version": 10,
    "icons": [],
    "searches": {
        "current": {
            "name": "baidu",
            "seId": "0c47016a8cd2d631bc618d4f3a741335",
            "logo": "https://basic-static-server.infinitynewtab.com/search-logos/baidu.png",
            "types": [{
                "name": "web",
                "url": "https://www.baidu.com/s?tn=02003390_43_hao_pg&isource=infinity&iname=baidu&itype=web&ie=utf-8&wd=%s"
            }, {
                "name": "images",
                "url": "https://image.baidu.com/search/index?isource=infinity&iname=baidu&tn=baiduimage&word=%s"
            }, {
                "name": "news",
                "url": "https://news.baidu.com/ns?isource=infinity&iname=baidu&tn=news&ie=utf-8&word=%s"
            }, {
                "name": "videos",
                "url": "https://video.baidu.com/v?isource=infinity&iname=baidu&ie=utf-8&word=%s"
            }, {
                "name": "maps",
                "url": "http://map.baidu.com/?isource=infinity&iname=baidu&newmap=1&ie=utf-8&s=s%26wd%3D%s"
            }]
        },
        "all": [{
            "name": "yahoo",
            "seId": "c26068f55492ef9e93e05e34a3b31139",
            "logo": "https://basic-static-server.infinitynewtab.com/search-logos/yahoo-v3-200.png",
            "types": [{
                "name": "web",
                "url": "https://i.infinitynewtab.com/yahoo/?q=%s"
            }, {
                "name": "images",
                "url": "https://images.search.yahoo.com/search?p=%s"
            }, {
                "name": "news",
                "url": "https://news.search.yahoo.com/search?p=%"
            }, {
                "name": "videos",
                "url": "https://video.search.yahoo.com/search/video?isource=infinity&iname=yahoo&p=%s"
            }]
        }, {
            "name": "baidu",
            "seId": "0c47016a8cd2d631bc618d4f3a741335",
            "logo": "https://basic-static-server.infinitynewtab.com/search-logos/baidu.png",
            "types": [{
                "name": "web",
                "url": "https://www.baidu.com/s?tn=02003390_43_hao_pg&isource=infinity&iname=baidu&itype=web&ie=utf-8&wd=%s"
            }, {
                "name": "images",
                "url": "https://image.baidu.com/search/index?isource=infinity&iname=baidu&tn=baiduimage&word=%s"
            }, {
                "name": "news",
                "url": "https://news.baidu.com/ns?isource=infinity&iname=baidu&tn=news&ie=utf-8&word=%s"
            }, {
                "name": "videos",
                "url": "https://video.baidu.com/v?isource=infinity&iname=baidu&ie=utf-8&word=%s"
            }, {
                "name": "maps",
                "url": "http://map.baidu.com/?isource=infinity&iname=baidu&newmap=1&ie=utf-8&s=s%26wd%3D%s"
            }]
        }, {
            "name": "bing",
            "seId": "5a6afaa65c95a841f6149c4e1591a637",
            "logo": "https://basic-static-server.infinitynewtab.com/search-logos/bing.png",
            "types": [{
                "name": "web",
                "url": "https://cn.bing.com/search?q=%s"
            }, {
                "name": "images",
                "url": "https://cn.bing.com/images/search?q=%s"
            }, {
                "name": "news",
                "url": "https://global.bing.com/news/search?q=%s"
            }, {
                "name": "videos",
                "url": "https://www.bing.com/videos/search?q=%s"
            }, {
                "name": "maps",
                "url": "https://cn.bing.com/ditu/?q=%s"
            }]
        }, {
            "name": "YandexRU",
            "seId": "ff1ca8c4e6661d52440b7f2e15cb6a13",
            "logo": "https://basic-static-server.infinitynewtab.com/search-logos/russia-yandex.png",
            "types": [{
                "name": "web",
                "url": "https://www.yandex.ru/search/?clid=2324058&text=%s"
            }, {
                "name": "images",
                "url": "https://yandex.ru/images/search?text=%s"
            }, {
                "name": "news",
                "url": "https://news.yandex.ru/yandsearch?text=%s"
            }, {
                "name": "videos",
                "url": "https://yandex.ru/video/search?text=%s"
            }]
        }],
        "additions": [],
        "customEngines": []
    },
    "settings": {
        "column": column,
        "row": row,
        "isAutoBackUp": false,
        "isOpenLinkInNewTab": false,
        "isSearchInNewTab": true,
        "isOpenBookmarkInNewTab": false,
        "isOpentGmailNotication": false,
        "isOpentGmailRingNotication": true,
        "isShowGmailNum": false,
        "gmailUnreadNum": 0,
        "isShowToDoNumbersInIco": true,
        "toDoNumber": 1,
        "isHideIconName": false,
        "isShowSearchBox": true,
        "isShowSearchType": true,
        "isShowSearchBtn": false,
        "iconBorderRadius": 100,
        "iconOpacity": 100,
        "isOpenStartAnimation": false,
        "tempUnitC": true,
        "isShowRandomWallpaperBtn": true,
        "fontColor": "rgba(255,255,255,0.9)",
        "isShowTopBar": false,
        "topBarType": "bookmarks",
        "wallpaperType": "local",
        "isBlurWallpaper": false,
        "bingMd5": "7d0f43b73d2e05669f7c39285ae04fa1",
        "isMinimalistMode": false,
        "viewZoom": 1,
        "woeid": 2151330,
        "autoWallpaper": false
    },
    "otherData": {
        "todos": {
            "todos": [{
                "text": "欢迎使用Infinity新标签页，这是一条示例待办事项。",
                "todoId": "todo-id1ehs4cb378gb8w9nbs5p0r5xbhw"
            }],
            "dones": []
        },
        "notes": [{
            "text": "",
            "time": 1599745698919
        }]
    },
    "main": "%5B%5B%7B%22type%22%3A%22custom%22%2C%22url%22%3A%22https%3A%2F%2Fwww.baidu.com%2F%3Ftn%3D02003390_43_hao_pg%22%2C%22name%22%3A%22%E7%99%BE%E5%BA%A6%E4%B8%80%E4%B8%8B%EF%BC%8C%E4%BD%A0%E5%B0%B1%E7%9F%A5%E9%81%93%22%2C%22bgColor%22%3A%22rgb(255%2C%20235%2C%2059)%22%2C%22ico%22%3A%22%22%2C%22title%22%3A%22%E7%99%BE%E5%BA%A6%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fwww.booking.com%2Findex.html%3Faid%3D1267011%22%2C%22name%22%3A%22%E7%BC%A4%E5%AE%A2%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Faa6c65cbabe2773c9460b1a20e071b33.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fwww.infinitynewtab.com%2Fjd.basic.html%22%2C%22name%22%3A%22%E4%BA%AC%E4%B8%9C%E5%95%86%E5%9F%8E%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fcee009549b352def723ba09d6da4b742.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fs.click.taobao.com%2Ft%3FinfinityType%3Dtmall%26e%3Dm%253D2%2526s%253DV5ucSP%252F1kT4cQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMRBynALhehQ4RitN3%252FurF3xNWm%252FATOfjswMAKinyMfntv%252FFgqkVH8133BMlVy3qlGE2srC8Mk09eQgZss1jm63jcHtRpEUy6RPalRWTdFmFpJPwiig1bxLMnyi1UQ%252F17I10hO9fBPG8oXH%252BQH9e66Y4%253D%22%2C%22name%22%3A%22%E5%A4%A9%E7%8C%AB%E7%B2%BE%E9%80%89%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2Fbe0ab26cf4dc6239c98791f7b18b633a.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.ctrip.com%2F%3Fallianceid%3D1050724%26sid%3D1786019%22%2C%22name%22%3A%22%E6%90%BA%E7%A8%8B%E7%BD%91%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2F1502895222082.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Famazon.cn%2F%3F_encoding%3DUTF8%26camp%3D536%26creative%3D3200%26linkCode%3Dur2%26tag%3Dinfinity06-23%22%2C%22name%22%3A%22%E4%BA%9A%E9%A9%AC%E9%80%8A%E4%B8%AD%E5%9B%BD%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Ff855675d2dfe35fad631c6a959b42d80.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fgames.infinitynewtab.com%2F%22%2C%22name%22%3A%22Infinity%E6%B8%B8%E6%88%8F%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2F5001b4d70b1c62f14859b51a6e8abd6f.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fextfans.com%2F%22%2C%22name%22%3A%22%E6%89%A9%E5%B1%95%E8%BF%B7%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2F6474696c6646280df5c4faa9b7fcae39.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fs.click.taobao.com%2Ft%3FinfinityType%3Dtmall%26e%3Dm%253D2%2526s%253DV5ucSP%252F1kT4cQipKwQzePCperVdZeJviK7Vc7tFgwiFRAdhuF14FMRBynALhehQ4RitN3%252FurF3xNWm%252FATOfjswMAKinyMfntv%252FFgqkVH8133BMlVy3qlGE2srC8Mk09eQgZss1jm63jcHtRpEUy6RPalRWTdFmFpJPwiig1bxLMnyi1UQ%252F17I10hO9fBPG8oXH%252BQH9e66Y4%253D%22%2C%22name%22%3A%22%E5%A4%A9%E7%8C%AB%E7%B2%BE%E9%80%89%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2Fbe0ab26cf4dc6239c98791f7b18b633a.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.ctrip.com%2F%3Fallianceid%3D1050724%26sid%3D1786019%22%2C%22name%22%3A%22%E6%90%BA%E7%A8%8B%E7%BD%91%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2F1502895222082.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Famazon.cn%2F%3F_encoding%3DUTF8%26camp%3D536%26creative%3D3200%26linkCode%3Dur2%26tag%3Dinfinity06-23%22%2C%22name%22%3A%22%E4%BA%9A%E9%A9%AC%E9%80%8A%E4%B8%AD%E5%9B%BD%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Ff855675d2dfe35fad631c6a959b42d80.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fai.taobao.com%2F%3Fpid%3Dmm_50570328_39070332_145428725%22%2C%22name%22%3A%22%E7%88%B1%E6%B7%98%E5%AE%9D%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F346647fb95fbac4d303c93fa0a4936d3.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fc.duomai.com%2Ftrack.php%3Fk%3DTPklWYmkTMwkDNx0DZp9VZ0l2cmYSe0lmbpZmbp1DZpVXZmcDOwM%26t%3Dhttp%253A%252F%252Fyou.163.com%252F%22%2C%22name%22%3A%22%E7%BD%91%E6%98%93%E4%B8%A5%E9%80%89%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Ficon%2Fc4ba1648d4014bad7fdea130cd421589.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.bilibili.com%2F%22%2C%22name%22%3A%22%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%20(%E3%82%9C-%E3%82%9C)%E3%81%A4%E3%83%AD%20%E5%B9%B2%E6%9D%AF~-bilibili%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fd8b62f4d64bda8800b1c788cd5ba3c68.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fwww.zhihu.com%2F%22%2C%22name%22%3A%22%E7%9F%A5%E4%B9%8E%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F2b89ebe968d8cafe77a5c587daa79c7f.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fweibo.com%2F%22%2C%22name%22%3A%22%E6%96%B0%E6%B5%AA%E5%BE%AE%E5%8D%9A%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F0f2ab700f8fff5b6e9ebc7d6a976981f.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.iqiyi.com%22%2C%22name%22%3A%22%E7%88%B1%E5%A5%87%E8%89%BA%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F226c6aff617dbc253ce26d23be07c446.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fai.taobao.com%2F%3Fpid%3Dmm_50570328_39070332_145428725%22%2C%22name%22%3A%22%E6%B7%98%E5%AE%9D%E7%BD%91%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F05dfef464cb99231a44521fde12adc80.png%22%7D%5D%2C%5B%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fpan.baidu.com%2Fdisk%2Fhome%23from%3Dshare_pan_logo%22%2C%22name%22%3A%22%E7%99%BE%E5%BA%A6%E4%BA%91%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F692fd23fab11afe84dd13d84f6e10e24.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.youku.com%22%2C%22name%22%3A%22%E4%BC%98%E9%85%B7%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F50eba406967b6980e8f90d2431406ca8.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fmail.qq.com%22%2C%22name%22%3A%22QQ%E9%82%AE%E7%AE%B1%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F3a9abce9ff5c6d6f6fa07c3eb60a2805.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Ftieba.baidu.com%2F%22%2C%22name%22%3A%22%E7%99%BE%E5%BA%A6%E8%B4%B4%E5%90%A7%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F6eb77504f38f45d16f761662b4a1cd3e.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.douban.com%22%2C%22name%22%3A%22%E8%B1%86%E7%93%A3%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fe9b0df13819c1029fdc4287a6a83bf6c.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fmusic.163.com%2F%3Ffrom%3Dinfinity%22%2C%22name%22%3A%22%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F610959ecfad2fb3368d13aa1c25e3ec3.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fv.qq.com%2F%22%2C%22name%22%3A%22%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F5d40694f54e8e3a42f42a6d4187ff6f5.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.52pojie.cn%2F%22%2C%22name%22%3A%22%E5%90%BE%E7%88%B1%E7%A0%B4%E8%A7%A3%E8%AE%BA%E5%9D%9B%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F3728b318be8340b410e36931dee26fbc.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fzuimeia.com%2F%3Futm_source%3Dwwwd%26utm_campaign%3Dreferral%26utm_medium%3Dwwwd%22%2C%22name%22%3A%22%E6%9C%80%E7%BE%8E%E5%BA%94%E7%94%A8%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fe83e603c576bc666030c3f046e5e5a0f.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.huya.com%2F%22%2C%22name%22%3A%22%E8%99%8E%E7%89%99%E7%9B%B4%E6%92%AD%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fb5cee0e42107beeb4c20aca9d72ac52c.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.dy2018.com%22%2C%22name%22%3A%22%E7%94%B5%E5%BD%B1%E5%A4%A9%E5%A0%82%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F681aa26228615d0124055fdb07cadfd5.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fwww.baidu.com%2Fbaidu%3Ftn%3D64075107_1_dg%26ie%3Dutf-8%22%2C%22name%22%3A%22%E7%99%BE%E5%BA%A6%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fc9f7546ad597dd7fb53e8129b6c07877.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fwww.csdn.net%2F%22%2C%22name%22%3A%22CSDN%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2F226d9bd6e7176a22d1696d751947a178.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22https%3A%2F%2Fsspai.com%2F%3Futm_source%3Dinfinitynewtab%22%2C%22name%22%3A%22%E5%B0%91%E6%95%B0%E6%B4%BE%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fab397474a68cae01968ea26324f239c2.png%22%7D%2C%7B%22type%22%3A%22ico%22%2C%22url%22%3A%22http%3A%2F%2Fmail.163.com%2F%22%2C%22name%22%3A%22163%E9%82%AE%E7%AE%B1%22%2C%22ico%22%3A%22https%3A%2F%2Finfinityicon.infinitynewtab.com%2Fuser-share-icon%2Fe783a83edc8c4f2c1d96a8dec0a32870.png%22%7D%2C%7B%22type%22%3A%22custom%22%2C%22url%22%3A%22https%3A%2F%2Fwww.youku.com%2F%22%2C%22name%22%3A%22%E4%BC%98%E9%85%B7%20-%20%E8%BF%99%E4%B8%96%E7%95%8C%E5%BE%88%E9%85%B7%22%2C%22bgColor%22%3A%22rgb(241%2C%20196%2C%2015)%22%2C%22ico%22%3A%22%22%2C%22title%22%3A%22%E4%BC%98%E9%85%B7%22%7D%2C%7B%22type%22%3A%22custom%22%2C%22url%22%3A%22http%3A%2F%2Fai777.com%22%2C%22name%22%3A%22%E7%88%B177%22%2C%22bgColor%22%3A%22%23f1c40f%22%2C%22ico%22%3A%22%22%2C%22title%22%3A%22%E7%88%B17%22%7D%5D%5D",
    "setting": "%7B%22autoWallpaper%22%3Afalse%2C%22minimalistMode%22%3Afalse%2C%22startAnimation%22%3Afalse%2C%22openInNewtab%22%3Afalse%2C%22displayAtTop%22%3Afalse%2C%22displayTopType%22%3A%22Bookmarksbar%22%2C%22OpenBookmarksInNewtab%22%3Afalse%2C%22searchBox%22%3Atrue%2C%22searchType%22%3Atrue%2C%22searchInNewtab%22%3Atrue%2C%22GmailMessage%22%3Afalse%2C%22blurWallpaper%22%3Afalse%2C%22notificationSound%22%3Atrue%2C%22iconOpacity%22%3A100%2C%22iconFillet%22%3A100%2C%22iconNum%22%3A%223x6%22%2C%22temperatureUnit%22%3A%22Celsius%22%2C%22fontColor%22%3A%22rgba(255%2C255%2C255%2C0.9)%22%2C%22todosfalse%22%3A%5B%5D%2C%22todostrue%22%3A%5B%22%E6%AC%A2%E8%BF%8E%E4%BD%BF%E7%94%A8Infinity%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5%EF%BC%8C%E8%BF%99%E6%98%AF%E4%B8%80%E6%9D%A1%E7%A4%BA%E4%BE%8B%E5%BE%85%E5%8A%9E%E4%BA%8B%E9%A1%B9%E3%80%82%22%5D%2C%22notes%22%3A%5B%7B%22text%22%3A%22%22%2C%22time%22%3A1599745698919%2C%22title%22%3A%22%E6%96%B0%E7%9A%84%E7%AC%94%E8%AE%B0%22%7D%5D%2C%22searchBottom%22%3A%5B%5D%7D"
};

//每页行数
var column = 0;
//每页列数
var row = 0;
//每页总个数 = 每页行数 * 每页列数
var pageCount = 0;

//用户网站列表，原始数据
var new_user_icons_pages = [];
//原始数据转换之后得到的旧数组
var old_link_array = []; //icon先收集，然后按每页 pageCount 个分拆，考虑文件夹内容
//整理旧数组之后得到的标准数据
var old_link_page_array = []; //分页整理，每 pageCount 个分页一次，遇到文件夹开始，开始分页，遇到文件夹结束，开始分页

//执行入口
function inf_convert_oldbackup_main() {
    //0. 先导出Excel 确保数据安全，以及后续步骤创建文件夹分组
    //1. infinity Pro 获取用户基础配置，网站数据
    //2. 根据用户网站数据，生成旧版本备份文件，并提示用户 手动根据旧数据迁移

    //获取基础数据并设置
    if(!initData()){
        alert("生成失败，请先手动同步数据，然后再次执行此脚本");
        return;
    }

    //装换新数据，装填进旧数据 old_link_array
    dispose_get_oldlinkarray();

    //装换旧数据，分页整理
    oldLink_to_pageLink();

    //导出旧备份数据
    var fileName = "infinity转旧版备份文件_" + getCurrentDate(2) + ".infinity";
    exportFile(inf_old_backup_model, fileName);
}

//初始化，获取用户基础数据并设置值，返回获取是否成功，不成功提示用户先手动同步数据，然后再次执行此脚本
function initData() {
    //行数列数
    var infinity_settings = localStorage.getItem("infinity-settings");
    var inf_settings = JSON.parse(infinity_settings);
    column = inf_settings.column;
    row = inf_settings.row;
    pageCount = column * row;

    //模版装载行数列数
    inf_old_backup_model.settings.column = column;
    inf_old_backup_model.settings.row = row;

    //旧数据
    var new_user_icons = localStorage.getItem("infinity-icons");
    new_user_icons_pages = JSON.parse(new_user_icons);

    return infinity_settings != null && new_user_icons != null;
}

//初步获取得到 old_link_array
function dispose_get_oldlinkarray(){
    for (var i = 0; i < new_user_icons_pages.length; i++) {
        //每页集合
        var page_array = new_user_icons_pages[i];
        //每页具体网站列表
        for (var j = 0; j < page_array.length; j++) {
            var linkModel = page_array[j];
            //判断是否是文件夹、或者是单个网站
            if (linkModel.items != undefined && linkModel.items.length > 0) {
                //文件夹

                var user_folder_start = {
                    "bgColor": "rgb(0, 0, 0)",
                    "customType": "text",
                    "iconType": "custom",
                    "name": linkModel.name,
                    "showText": "夹开始",
                    "src": "",
                    "uid": uuid30(),
                    "url": "chrome://newtab/"
                };
                old_link_array.push(user_folder_start);

                //文件夹内容
                var folder_array = linkModel.items;
                for (var k = 0; k < folder_array.length; k++) {
                    var folder_link_model = folder_array[k];
                    insert_oldlinkarray(folder_link_model);
                }


                //文件夹结束
                var user_folder_end = {
                    "bgColor": "rgb(0, 0, 0)",
                    "customType": "text",
                    "iconType": "custom",
                    "name": linkModel.name,
                    "showText": "夹结束",
                    "src": "",
                    "uid": uuid30(),
                    "url": "chrome://newtab/"
                };
                old_link_array.push(user_folder_end);


            } else {
                //单个文件
                insert_oldlinkarray(linkModel);
            }

        }
    }
}

//根据新数据添加旧数据
function insert_oldlinkarray(linkModel) {
    //判断类型
    //1.新版 isCustom 官方添加 false、用户自定义 true
    if (linkModel.isCustom) {
        //用户自定义
        //判断是否有图片
        if (linkModel.imageType == "color") {
            //无图片
            var user_link_nopic = {
                "bgColor": linkModel.bgColor,
                "customType": "text",
                "iconType": "custom",
                "name": linkModel.name,
                "showText": linkModel.showText,
                "src": "",
                "uid": linkModel.uid,
                "url": linkModel.url
            };
            old_link_array.push(user_link_nopic);
        } else {
            //有图片
            var user_link_haspic = {
                "customType": "image",
                "name": linkModel.name,
                "url": linkModel.url,
                "showText": linkModel.showText,
                "bgColor": linkModel.bgColor,
                "uid": linkModel.uid,
                "src": linkModel.src,
                "iconType": "custom",
                "isAdded": true
            };
            old_link_array.push(user_link_haspic);
        }
    } else {
        //官方
        var officical_link = {
            "uid": linkModel.uid,
            "name": linkModel.name,
            "url": linkModel.url,
            "src": linkModel.src,
            "iconType": "official",
            "updateTime": linkModel.updateTime
        };
        old_link_array.push(officical_link);
    }
}

//旧数据分页处理，最后装填到模版
function oldLink_to_pageLink() {
    //每页 pageCount 个
    var countIndex = 0;
    //每页容器
    var pageList = [];
    for (var i = 0; i < old_link_array.length; i++) {
        var linkModel = old_link_array[i];
        if (countIndex == pageCount || linkModel.showText == "夹开始") {
            if (countIndex == 0) {
                //刚刚翻页，不用翻页
                pageList.push(linkModel);
                countIndex++;
            } else {
                //需要翻页
                old_link_page_array.push(pageList);
                countIndex = 0;
                pageList = [];
                pageList.push(linkModel);
                countIndex++;
            }
        } else if (linkModel.showText == "夹结束") {
            pageList.push(linkModel);
            old_link_page_array.push(pageList);
            countIndex = 0;
            pageList = [];
        } else {
            pageList.push(linkModel);
            countIndex++;
        }
    }

    inf_old_backup_model.icons = old_link_page_array;
}

//导出json格式的infinity文件
function exportFile(data, filename) {
    if (!data) {
        alert('保存的数据为空');
        return;
    }
    if (!filename)
        filename = 'json.json'
    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4)
    }
    var blob = new Blob([data], {
            type: 'text/json'
        }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a')
    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
}

//30位uuid
function uuid30() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var str32 = S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
    return str32.substring(0, 30);
}

//时间类
function getCurrentDate(format) {
    var now = new Date();
    var year = now.getFullYear(); //年份
    var month = now.getMonth(); //月份
    var date = now.getDate(); //日期
    var day = now.getDay(); //周几
    var hour = now.getHours(); //小时
    var minu = now.getMinutes(); //分钟
    var sec = now.getSeconds(); //秒
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var time = "";
    //精确到天
    if (format == 1) {
        time = year + "-" + month + "-" + date;
    }
    //精确到分
    else if (format == 2) {
        time = year + "/" + month + "/" + date + " " + hour + ":" + minu + ":" + sec;
    }
    return time;
}


//执行
inf_convert_oldbackup_main();
