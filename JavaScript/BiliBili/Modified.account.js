const $ = new Env("📺 BiliBili: 👤 Modified Account v0.0.1");
const URL = new URLs();
const DataBase = {
    "Modified": {
        "Settings": {
            "Switch": true,
            "Private": {
                "coin": "",
                "bcoin": "",
                "follower": "",
                "level": "",
                "like": "",
                "vip": false
            }
        }
    }
};

(async () => {
    const { Settings } = setENV("BiliBili", "Modified", DataBase);
    $.log(`⚠ ${$.name}`, `Settings.Switch: ${Settings?.Switch}`);

    if (Settings?.Switch !== true) {
        return $.done($response);
    }

    let url = URL.parse($request?.url);
    const HOST = url?.host, PATH = url?.path;
    const FORMAT = ($response?.headers?.["Content-Type"] ?? $response?.headers?.["content-type"])?.split(";")?.[0];

    $.log(`⚠ ${$.name}`, `HOST: ${HOST}`, `PATH: ${PATH}`, `FORMAT: ${FORMAT}`);

    if (FORMAT === "text/json" || FORMAT === "application/json") {
        let body = JSON.parse($response.body);
        let data = body.data;

        if (HOST === "app.bilibili.com" || HOST === "app.biliapi.net") {
            switch (PATH) {
                case "x/v2/account/myinfo": // 信息页
                    if (Settings?.Private?.coin) {
                        data.coins = Settings.Private.coin;
                    }
                    if (Settings?.Private.bcoin) {
                        data.bcoin = Settings.Private.bcoin;
                    }
                    if (Settings?.Private.level) {
                        data.level = Settings.Private.level;
                    }
                    if (Settings?.Private.vip) {
                        data.vip = {
                            type: 2,
                            status: 1,
                            due_date: 4102329600000,
                            vip_pay_type: 0,
                            theme_type: 0,
                            label: {
                                path: "",
                                text: "年度大会员",
                                label_theme: "hundred_annual_vip",
                                text_color: "#FFFFFF",
                                bg_style: 1,
                                bg_color: "#FB7299",
                                border_color: "",
                                use_img_label: true,
                                img_label_uri_hans: "",
                                img_label_uri_hant: "",
                                img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
                                img_label_uri_hant_static: "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png"
                            },
                            avatar_subscript: 1,
                            nickname_color: "#FB7299",
                            role: 3,
                            avatar_subscript_url: "",
                            tv_vip_status: 1,
                            tv_vip_pay_type: 0
                        }
                    }
                    body.data = data;
                    break;
                case "x/v2/account/mine": // 我的页
                    if (Settings?.Private?.coin) {
                        data.coin = Settings.Private.coin;
                    }
                    if (Settings?.Private?.bcoin) {
                        data.bcoin = Settings.Private.bcoin;
                    }
                    if (Settings?.Private?.follower) {
                        data.follower = Settings.Private.follower;
                    }
                    if (Settings?.Private?.level) {
                        data.level = Settings.Private.level;
                    }
                    if (Settings?.Private?.vip) {
                        data.senior_gate.identity = 2;
                        data.senior_gate.member_text = "硬核会员";
                        data.vip_type = 2;
                        data.achievement = {
                            senior_gate_flash:
                                { icon: "https://i0.hdslb.com/bfs/activity-plat/static/20220818/367d27000e27de458c114d7ca4ded948/6TQojRgCjO.webp" },
                            top_level_flash:
                                { icon: "https://i0.hdslb.com/bfs/activity-plat/static/20220818/367d27000e27de458c114d7ca4ded948/t5iD0zNIbM.webp" }
                        };
                        delete data.vip_section_v2;
                        delete data.vip_section;
                        data.vip = {
                            status: 1,
                            avatar_subscript: 1,
                            nickname_color: "#FB7299",
                            due_date: 4102329600000,
                            role: 3,
                            vip_pay_type: 0,
                            avatar_subscript_url: "",
                            label: {
                                bg_color: "#FB7299",
                                bg_style: 1,
                                text: "年度大会员",
                                border_color: "",
                                path: "",
                                image: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
                                label_theme: "hundred_annual_vip",
                                text_color: "#FFFFFF"
                            },
                            type: 2,
                            themeType: 0,
                            theme_type: 0
                        };
                    }
                    body.data = data;
                    break;
                case "x/v2/space": // 空间页
                    if ($request.headers['x-bili-mid'] === data.card.mid) {
                        if (Settings?.Private?.follower) {
                            data.card.fans = Settings.Private.follower;
                        }
                        if (Settings?.Private?.level) {
                            data.card.level_info.current_level = Settings.Private.level;
                        }
                        if (Settings?.Private?.vip) {
                            data.card.level_info.senior_inquiry.inquiry_text = "硬核会员";
                            data.card.vip = {
                                vipStatusWarn: "",
                                vipType: 2,
                                dueRemark: "",
                                vipDueDate: 4102329600000,
                                accessStatus: 0,
                                vipStatus: 1,
                                themeType: 0,
                                label: {
                                    bg_color: "#FB7299",
                                    bg_style: 1,
                                    text: "年度大会员",
                                    border_color: "",
                                    path: "",
                                    image: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
                                    label_theme: "annual_vip",
                                    text_color: "#FFFFFF"
                                }
                            };
                        }
                        if (Settings?.Private?.like) {
                            data.card.likes.like_num = Settings.Private.like;
                        }
                    }
                    body.data = data;
                    break;
            }
        }

        $response.body = JSON.stringify(body);
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => {
        if ($response?.headers?.["Content-Encoding"]) $response.headers["Content-Encoding"] = "identity";
        if ($response?.headers?.["content-encoding"]) $response.headers["content-encoding"] = "identity";
        $.done($response);
    });

function setENV(name, platforms, database) {
    $.log(`☑️ ${$.name}, Set Environment Variables`);
    let Settings = database?.[platforms]?.Settings || {};
    return { Settings, Caches: {}, Configs: {} };
}
