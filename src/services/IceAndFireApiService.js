class IceAndFireApiService {
    requestObject = {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.anapioficeandfire+json; version=1'
        }
    }
    static getFireAndIceDetail(type, id = "", page = "", pageSize = "25", queryParam = "") {
        let url = `https://www.anapioficeandfire.com/api/${type}${"/" + id}${"?page=" + page + "&pageSize=" + pageSize}`;

        return fetch(url, this.requestObject).then(response => {
            let regex = /\?([a-zA-Z0-9.?=&:/">; ])+/g
            let paginationLink = response.headers.get('link') || ""
            let paginationList = paginationLink.match(regex) || []

            return response.json().then(items => {
                if ((Object.keys(items).length > 1 && items.constructor === Object)) {
                    items = [items]
                }
                return {
                    "items": items,
                    "next": paginationList.filter(item => item.search('next') > -1),
                    "prev": paginationList.filter(item => item.search('prev') > -1),
                    "first": paginationList.filter(item => item.search('first') > -1),
                    "last": paginationList.filter(item => item.search('last') > -1)
                }
            })

        }
        )
    }
}

export default IceAndFireApiService