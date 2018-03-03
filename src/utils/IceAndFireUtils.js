export default class IceAndFireUtils {

    static getRouteUrl = (url) => {
        const apiRegex = /\/[a-z]+\/[0-9]+/g

        let matchArray = apiRegex.exec(url) || []

        return matchArray.length > 0 ? matchArray[0] : ""
    }

    static getIdFromUrl = (url) => {
        const idRegex = /(\d+)/g

        let match = idRegex.exec(url) || []

        return match.length > 0 ? match[0] : ""
    }

}