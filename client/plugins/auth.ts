import { frontendStore } from '@/store'

export default function ({ app, redirect }: any) {
    const oldLogout = app.$auth.logout.bind(app.$auth)
    const oldLogin = app.$auth.login.bind(app.$auth)


    app.$auth.logout = (...args: any[]) => {
        const _ = oldLogout(...args)

        _.then(() => {
            frontendStore.setNavbar(false);
            frontendStore.setSidebar(false);
            app.$auth.redirect('logout')
            redirect('/')
        })
        return _
    }

    app.$auth.login = (...args: any[]) => {
        // sometimes doesn't work when the user tries to get to the admin page
        // before being logged in.
        const _ = oldLogin(...args)
        _.then(() => {
            frontendStore.setNavbar(true);
            frontendStore.setSidebar(true);
            app.$auth.redirect('home')
            redirect('/dashboard')
        })
        return _
    }
}