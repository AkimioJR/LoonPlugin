const $ = new Env("📺 BiliBili: 💎 Modified VIP v0.0.1");
const URL = new URLs();
const DataBase = {
    "Modified": {
        "Settings": {
            "Switch": true,
            "Private": {
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

        if (HOST === "api.bilibili.com" || HOST === "api.biliapi.net") {
            switch (PATH) {
                case "x/vip/web/vip_center/combine": // 会员页
                    if (Settings?.Private?.vip) {
                        data.user.vip.theme_type = 0;
                        data.user.vip.label = {
                            img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
                            use_img_label: true,
                            img_label_uri_hant_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
                            bg_color: "#FB7299",
                            bg_style: 1,
                            text: "年度大会员",
                            border_color: "",
                            img_label_uri_hans: "",
                            img_label_uri_hant: "",
                            label_theme: "hundred_annual_vip",
                            text_color: "#FFFFFF"
                        }
                        data.user.vip.vip_pay_type = 0,
                            data.user.vip.vip_due_date = 4102329600000,
                            data.user.vip.avatar_subscript = 1,
                            data.user.vip.is_new_user = false,
                            data.user.vip.tip_material = null,
                            data.user.vip.vip_type = 2,
                            data.user.vip.avatar_subscript_url = "https://i0.hdslb.com/bfs/vip/icon_Certification_big_member_22_3x.png",
                            data.user.vip.vip_status = 1,
                            data.user.vip.nickname_color = "#FB7299"
                        data.user.account_exception_text = "",
                            data.user.vip_keep_time = 946656000,
                            data.user.notice = {
                                tv_text: "",
                                surplus_seconds: 0,
                                tv_surplus_seconds: 0,
                                type: 0,
                                can_close: false,
                                text: ""
                            },
                            data.user.background_image_small = "",
                            data.user.is_auto_renew = false,
                            data.user.panel_sub_title = "",
                            data.user.tv = {
                                vip_pay_type: 0,
                                status: 1,
                                type: 1,
                                due_date: 4102329600000
                            },
                            data.user.background_image_big = "",
                            data.user.vip_overdue_explain = "年度大会员有效期 2099/12/31",
                            data.user.tv_overdue_explain = "超级大会员有效期 2099/12/31",
                            data.user.renew = {
                                link: "",
                                text: ""
                            }
                    }
                    body.data = data;
                    break;
                case "x/vip/price/panel/lexi": // 会员页
                    if (Settings?.Private?.vip) {
                        data.basic.user_info = {
                            vip_status: 1,
                            vip_type: 2,
                            vip_overdue_time: 4102329600000,
                            tv_vip_overdue_time: 4102329600000,
                            tv_vip_status: 1
                        }
                    }
                    body.data = data;
                    break;
                case "x/vip/top_panel_info": // 续费页
                    if (Settings?.Private?.vip) {
                        data.ever_vip = false;
                        data.vip_overdue_time = 0;
                        data.vip_type = 2;
                        data.tv = "超级大会员：有效期至2099-12-31";
                        data.vip_status = 1;
                        data.vip = "大会员：有效期至2099-12-31";
                        data.tv_vip_status = 1;
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
