export default class IceAndFireUtils {
    
    getRouteUrl = (url) => {
        const apiRegex = /\/[a-z]+\/[0-9]+/g

        const matchArray = apiRegex.exec(url) || []

        if (matchArray.length > 0) {
            return matchArray[0]
        } else {
            return ""
        }
    }

}