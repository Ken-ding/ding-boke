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
                text: "框架篇",
                items: [
                    { text: "vue-数据驱动", link: "/框架/vue/数据驱动/案例代码/" },
                    { text: "vue-编译流程", link: "/框架/vue/编译流程/回顾/" },
                    { text: "vue-响应式原理", link: "/框架/vue/响应式原理/案例/" },
                    { text: "vue-组件化", link: "/框架/vue/组件化/案例/" },
                    { text: "vue-扩展", link: "/框架/vue/扩展/keep-alive/" },
                    // { text: "react", link: "/framework/react/" },
                    { text: "snabbdom", link: "/框架/snabbdom/" },
                    { text: "babel", link: "/框架/babel/" },
                    { text: "webpack", link: "/框架/webpack/初始化阶段/" }
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
                    { text: "计算机基础", link: "/promote/计算机基础/" },
                    { text: "常用算法", link: "/promote/常用算法/" },
                    { text: "前端框架", link: "/promote/前端框架/" },
                    { text: "前端基础", link: "/promote/前端基础/" },
                    { text: "其他", link: "/promote/其他/" }
                ]
            },
            {
                text: "算法篇",
                items: [
                    { text: "数据结构", link: "/算法/数据结构/时间复杂度和空间复杂度/" },
                    { text: "排序算法", link: "/算法/排序算法/冒泡排序/" },
                    { text: "基础算法", link: "/算法/基础算法/两数之和/" },
                    { text: "深度优先", link: "/算法/深度优先/二叉树的最大深度/" },
                    { text: "回溯算法", link: "/算法/回溯算法/括号生成/" },
                    { text: "分治算法", link: "/算法/分治算法/搜索二维矩阵II/" },
                    { text: "动态规划", link: "/算法/动态规划/使用最小花费爬楼梯/" }
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
            ...handlePath("框架", framework()),
            ...handlePathB("project", { "cli": [["", "前端脚手架方案"]], "code": [["", "前端代码规范"]], "component": [["", "组件库方案"]], "deploy": [["", "自动化部署流程方案"]], "monitor": [["", "前端监控方案"]], "page": [["", "多页面打包方案"]], "technology": [["", "前端技术方案"]] }),
            ...handlePathB("算法", algorithm()),
            ...handlePathB("document", document()),
        },
    },
};

function algorithm() {
    return {
        "数据结构": [["时间复杂度和空间复杂度", "时间复杂度和空间复杂度"]],
        "排序算法": [["冒泡排序", "冒泡排序"], ["选择排序", "选择排序"]],
        "基础算法": [["两数之和", "两数之和"]],
        "深度优先": [["二叉树的最大深度", "二叉树的最大深度"]],
        "回溯算法": [["括号生成", "括号生成"]],
        "分治算法": [["搜索二维矩阵II", "搜索二维矩阵II"]],
        "动态规划": [["使用最小花费爬楼梯", "使用最小花费爬楼梯"]]
    }
}

function framework() {
    return {
        "vue": {
            "数据驱动": [["案例代码", "案例代码"], ["构造函数处理", "构造函数处理"], ["初始化", "初始化"], ["挂载", "挂载"], ["_render", "_render"], ["_update", "_update"], ["总结", "总结"]],
            "编译流程": [["回顾", "回顾"], ["编译器入口处理", "编译器入口处理"], ["pars流程", "pars流程"], ["优化流程", "优化流程"], ["代码生成", "代码生成"]],
            "响应式原理": [["案例", "案例"], ["响应式原理", "响应式原理"], ["依赖收集", "依赖收集"], ["派发更新", "派发更新"], ["原理图", "原理图"]],
            "组件化": [["案例", "案例"], ["回顾渲染流程", "回顾渲染流程"], ["组件创建时机", "组件创建时机"], ["创建组件vnode", "创建组件vnode"], ["组件patch", "组件patch"]],
            "扩展": [["keep-alive", "keep-alive"], ["set和delete", "set和delete"], ["computed原理", "computed原理"], ["nextTick", "nextTick"], ["watcher原理", "watcher原理"], ["slot", "slot"]]
        },
        "webpack": [["webpack调试", "webpack调试"], ["初始化阶段", "初始化阶段"], ["编译阶段", "编译阶段"], ["输出阶段", "输出阶段"], ["总结", "总结"]],
        "snabbdom": [["", "源码分析"]],
        "react": [["", "自定义"]],
        "babel": [["", "bable主流程"], ["bable源码冷知识", "bable源码冷知识"]],
    }
}

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

function handlePathB(root, pathObj) {
    let obj = {};
    let paths = Object.keys(pathObj)
    for (const path of paths) {
        let allPth = "/" + root + "/" + path + "/";
        obj[allPth] = getThemeSidebarB(path, pathObj[path]);
    }
    return obj;
}

function handlePath(root, pathObj) {
    let obj = {};
    let paths = Object.keys(pathObj)
    for (const path of paths) {
        if (Array.isArray(pathObj[path])) {
            let allPth = "/" + root + "/" + path + "/";
            obj[allPth] = getThemeSidebarB(path, pathObj[path]);
        } else {
            let items = Object.keys(pathObj[path])
            for (const item of items) {
                let allPth = "/" + root + "/" + path + "/" + item + "/";
                obj[allPth] = getThemeSidebarB(path, pathObj[path][item]);
            }
        }
    }

    return obj;
}

function getThemeSidebarB(groupB, children) {

    return [
        {
            title: groupB,
            collapsable: false,
            sidebarDepth: 3,
            children: children
        }
    ]
}
