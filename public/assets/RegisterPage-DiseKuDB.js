import {
    u as p,
    a as b,
    r as n,
    c as x,
    b as t,
    w as i,
    v as d,
    d as f,
    o as g,
    e as v
} from "./index-Ccr9CJvR.js";
const w = {
        class: "flex items-center justify-center min-h-screen bg-white"
    },
    y = {
        class: "flex flex-col space-y-4"
    },
    k = {
        class: "flex items-center space-x-4"
    },
    _ = {
        class: "flex items-center space-x-4"
    },
    h = {
        class: "flex items-center space-x-4"
    },
    S = {
        __name: "RegisterPage",
        setup(E) {
            
            const m = p(),
                u = b(),
                r = n(""),
                o = n(""),
                l = n(""),
                c = async () => {
                    try {
                        const s = await v.post("http://10.109.2.112:8000/api/register", {
                            first_name: r.value,
                            last_name: o.value,
                            email: l.value
                        });
                        s.data && s.data.id && s.data.token ? (m.commit("setUserId", s.data.id), localStorage.setItem("applicant_token", s.data.token), localStorage.setItem("user_id", s.data.id), u.push("/gen-instruction")) : console.error("Unexpected response structure:", s.data)
                    } catch (s) {
                        console.error("Registration error:", s.response ? s.response.data : s.message)
                    }
                };
            return (s, e) => (g(), x("div", w, [t("form", {
                onSubmit: f(c, ["prevent"]),
                class: "bg-white p-6 rounded shadow-md w-full max-w-md"
            }, [e[7] || (e[7] = t("header", {
                class: "mb-4 text-center bg-blue-300"
            }, [t("h1", {
                class: "text-white text-xl font-semibold"
            }, " Register for STEP Non-Voice Assessment ")], -1)), t("div", y, [t("div", k, [e[3] || (e[3] = t("label", {
                for: "first-name",
                class: "block text-sm font-medium text-gray-700 w-1/3"
            }, "First name*:", -1)), i(t("input", {
                type: "text",
                "onUpdate:modelValue": e[0] || (e[0] = a => r.value = a),
                placeholder: "Enter Firstname",
                class: "block w-2/3 border border-gray-500 p-1 rounded"
            }, null, 512), [
                [d, r.value]
            ])]), t("div", _, [e[4] || (e[4] = t("label", {
                for: "last-name",
                class: "block text-sm font-medium text-gray-700 w-1/3"
            }, "Last name*:", -1)), i(t("input", {
                type: "text",
                "onUpdate:modelValue": e[1] || (e[1] = a => o.value = a),
                placeholder: "Enter Lastname",
                class: "block w-2/3 border border-gray-500 p-1 rounded"
            }, null, 512), [
                [d, o.value]
            ])]), t("div", h, [e[5] || (e[5] = t("label", {
                for: "email",
                class: "block text-sm font-medium text-gray-700 w-1/3"
            }, "Email Address*:", -1)), i(t("input", {
                type: "email",
                "onUpdate:modelValue": e[2] || (e[2] = a => l.value = a),
                placeholder: "Enter Email Address",
                class: "block w-2/3 border border-gray-500 p-1 rounded"
            }, null, 512), [
                [d, l.value]
            ])]), e[6] || (e[6] = t("div", null, [t("button", {
                type: "submit",
                class: "w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
            }, " Register ")], -1))])], 32)]))
        }
    };
export {
    S as
    default
};
