class IceAndFireApiService {
    requestObject = {
        method: 'GET',
        headers: {
            'Accept': 'application/vnd.anapioficeandfire+json; version=1'
        }
    }
    static getFireAndIceDetail(type, id = "", page = "", pageSize = "", queryParam = "") {
        let url = `https://www.anapioficeandfire.com/api/${type}${"/" + id}${"?" + queryParam}`;

        return fetch(url, this.requestObject).then(response => response.json())
    }
}

export default IceAndFireApiService