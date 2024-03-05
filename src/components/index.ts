
const allGlobalComponents = {}
export default {
    install(app: any) {
        Object.keys(allGlobalComponents).forEach((key) => {
            app.use(key)
        })

    }
}