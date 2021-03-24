module.exports = {
    port: "3000",
    base: "/",
    dest: './dist',
    ga: "UA-xxxxx-1",
    title: "茶余饭后",
    description: "docs",
    // theme:'reform',
    markdown: {
        lineNumbers: true,
        externalLinks: {
            target: "_blank",
            rel: "noopener noreferrer",
        },
    },
    head: [
        // ico
        ["link", { rel: "icon", href: `/favicon.ico` }],
        // meta
        ["meta", { name: "robots", content: "all" }],
        ["meta", { name: "author", content: "pdai" }],
        [
            "meta",
            {
                name: "keywords",
                content:
                    "Java javascript全栈知识体系, java体系, java知识体系, java框架,java详解,java学习路线,java spring, java面试, 知识体系, java技术体系, java编程, java编程指南,java开发体系, java开发,java教程,java,java数据结构, 算法, 开发基础",
            },
        ],
        ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
        [
            "script",
            {
                type: "text/javascript",
                src: "https://s4.cnzz.com/z_stat.php?id=1278919995&web_id=1278919995",
            },
        ],
    ],
    plugins: [],
    themeConfig: {
        repo: "https://github.com/Ken-ding/ding-boke.git",
        repoLabel: "GitHub",
        docsDir: "docs",
        editLinks: true,
        editLinkText: "错别字纠正",
        sidebarDepth: 3,
        smoothScroll: true,
        nav: [
            { text: "主页", link: "/" },
            {
                text: "基础篇",
                items: [
                    { text: "js", link: "/base/js/" },
                    { text: "es6", link: "/base/es6/" },
                    { text: "http", link: "/base/http/" },
                    { text: "html", link: "/base/html/" },
                    { text: "css", link: "/base/css/" },
                    { text: "css3", link: "/base/css3/" },
                ],
            },
            {
                text: "提升篇",
                items: [
                    { text: "html", link: "/promote/html/" },
                    { text: "css", link: "/promote/css/" },
                    { text: "js", link: "/promote/js/" },
                    { text: "http", link: "/promote/http/" }
                ]
            },
            {
                text: "框架篇",
                items: [
                    { text: "vue", link: "/framework/vue/" },
                    { text: "react", link: "/framework/react/" },
                    { text: "babel", link: "/framework/babel/" },
                    { text: "webpack", link: "/framework/webpack/" }
                ],
            },
            {
                text: "项目篇",
                items: [
                    { text: "脚手架方案", link: "/project/cli/" },
                    { text: "多页面方案", link: "/project/page/" },
                    { text: "部署方案", link: "/project/deploy/" },
                    { text: "代码规范方案", link: "/project/code/" },
                    { text: "技术方案", link: "/project/technology/" },
                    { text: "组件库方案", link: "/project/component/" },
                    { text: "监控方案", link: "/project/monitor/" }
                ],
            },
            {
                text: "算法篇",
                items: [
                    { text: "算法基础", link: "/algorithm/base/" },
                    { text: "初级算法", link: "/algorithm/primaryRank/" },
                    { text: "中级算法", link: "/algorithm/middleRank/" },
                    { text: "高级算法", link: "/algorithm/highRank/" }
                ],
            },
            {
                text: "文档篇",
                items: [
                    { text: "lodash文档", link: "/document/lodash/" },
                    { text: "axios文档", link: "/document/axios/" },
                    { text: "vue文档", link: "/document/vue/" },
                    { text: "moment文档", link: "/document/moment/" }
                ]
            },
        ],
        sidebar: {
            ...handlePathB("base", base()),
            ...handlePathB("promote", { "html": [["", "自定义"]], "css": [["", "自定义"]], "js": [["", "自定义"]], "http": [["", "自定义"]] }),
            ...handlePathB("framework", { "vue": [["", "自定义"]], "react": [["", "自定义"]], "babel": [["", "自定义"]], "webapck": [["", "自定义"]] }),
            ...handlePathB("project", { "cli": [["", "前端脚手架方案"]], "code": [["", "前端代码规范"]], "component": [["", "组件库方案"]], "deploy": [["", "自动化部署流程方案"]], "monitor": [["", "前端监控方案"]], "page": [["", "多页面打包方案"]], "technology": [["", "前端技术方案"]] }),
            ...handlePathB("algorithm", { "base": [["", "自定义"]], "primaryRank": [["", "自定义"]], "middleRank": [["", "自定义"]], "highRank": [["", "自定义"]] }),
            ...handlePathB("document", document()),
        },
    },
};

function base() {
    return {
        "html": [
            ["", "概括"],
            ["one", "第一章"],
            ["two", "第二章"],
            ["three", "第三章"]
        ],
        "css": [
            ["", "概括"],
            ["ten", "第十章"],
            ["eleven", "第十一章"]
        ],
        "css3": [
            ["", "自定义"]
        ],
        "js": [
            ["", "概括"],
            ["one", "第一章"],
            ["two", "第二章"],
            ["three", "第三章"],
            ["four", "第四章"],
            ["five", "第五章"],
            ["six", "第六章"],
            ["seven", "第七章"],
            ["ECMAScript", "ECMAScript篇复盘"],
            ["eight", "第八章"],
            ["nine", "第九章"],
            ["BOM", "BOM篇复盘"],
            ["ten", "第十章"],
            ["eleven", "第十一章"],
        ],
        "es6": [
            ["", "概括"],
            ["two", "第二章"]
        ],
        "http": [
            ["", "概括"],
            ["one", "第一章"],
            ["two", "第二章"],
            ["three", "第三章"],
            ["four", "第四章"],
            ["five", "第五章"],
            ["six", "第六章"],
            ["seven", "第七章"],
            ["eight", "第八章"],
        ]
    }
}

function document() {
    return {
        "lodash": [
            ["", "概览"],
            ["安装", "安装"],
            ["版本定制", "版本定制"],
            ["Array", "Array"],
            ["Collection和Date", "Collection和Date"],
        ],
        "axios": [
            ["", "axios文档"],
        ],
        "vue": [
            ["", "概括"]
        ],
        "moment": [
            ["", "概括"],
        ]
    }
}

function handlePathA(root, pathArr) {
    let obj = {};
    for (const path of pathArr) {
        let allPth = "/" + root + "/" + path + "/";
        obj[allPth] = getThemeSidebarA(path);
    }
    return obj;
}

function handlePathB(root, pathObj) {
    let obj = {};
    let paths = Object.keys(pathObj)
    for (const path of paths) {
        let allPth = "/" + root + "/" + path + "/";
        obj[allPth] = getThemeSidebarB(path, pathObj[path]);
    }
    return obj;
}

function getThemeSidebarA(groupA, introductionA) {
    introductionA = "概括";
    return [
        {
            title: groupA,
            collapsable: false,
            sidebarDepth: 2,
            children: [
                ['', introductionA],
                ['one', "第一章"],
                ['two', "第二章"],
                ['three', "第三章"],
                ['four', "第四章"],
            ]
        }
    ]
}
function getThemeSidebarB(groupB, children) {
    return [
        {
            title: groupB,
            collapsable: false,
            sidebarDepth: 2,
            children: children
        }
    ]
}
