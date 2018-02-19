class IceAndFireIceAndFireApiService {
    requestObject = {
        method: 'GET',
        headers: {
            'Accept':  'application/vnd.anapioficeandfire+json; version=1'
        }
    }
    async getFireAndIceDetail(type, id="",page="",pageSize="",queryParam=""){
        const url = `https://www.anapioficeandfire.com/api/${type}${"/"+id}${"?"+queryParam}`;

        let response = await fetch(url, this.requestObject).then(response=>response.json())

        return response;
    }
}

export default IceAndFireIceAndFireApiService