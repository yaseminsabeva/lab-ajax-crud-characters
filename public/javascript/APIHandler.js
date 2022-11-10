class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList () {
    return axios.get(`${this.BASE_URL}/characters`)
  }

  async getOneRegister (id) {
    return axios.get(`${this.BASE_URL}/characters/${id}`)
  }

  async createOneRegister (character) {
    return axios.post(`${this.BASE_URL}/characters`, character)
  }

  async updateOneRegister (id, character) {
    return axios.patch(`${this.BASE_URL}/characters/${id}`, character)
  }

  async deleteOneRegister (id) {
    return axios.delete(`${this.BASE_URL}/characters/${id}`)
  }
}


// axios.get(url)
// .then(responseFromApi => /* do something with response */)
// .catch(error => /* do something with the error */)
