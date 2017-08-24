/**
 * Created by yangyangyu on 17/8/22
 */
//更改登录状态
export const changeLogin = ({
    commit
}, value) => {
    commit('CHANGE_Login', value)
}

export const changeUser = ({
    commit
}, value) => {
    commit('CHANGE_USER', value)
}

export const changeOrientation = ({
    commit
}, value) => {
    commit('CHANGE_ORIENTATION', value)
}