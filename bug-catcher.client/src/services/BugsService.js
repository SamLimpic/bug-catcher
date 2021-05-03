import { AppState } from '../AppState'
import router from '../router'
import { api, pokeApi } from './AxiosService'

class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBugById(id) {
    const res = await api.get(`api/bugs/${id}`)
    AppState.activeBug = res.data
  }

  async getAllPokeBugs() {
    const res = await pokeApi.get('type/7')
    AppState.pokeBugs = res.data.pokemon
    AppState.pokeBugs = AppState.pokeBugs.filter(p => p.pokemon.name.indexOf('-') === -1)
  }

  async getPokeBug(name) {
    const res = await pokeApi.get(`pokemon/${name}`)
    AppState.activePokeBug = res.data
  }

  async catchPokeBug(name) {
    const res = await pokeApi.get(`pokemon-species/${name}`)
    const imgUrl = await pokeApi.get(`pokemon/${name}`)
    AppState.activePokeBug = res.data
    AppState.activeImg = imgUrl.data.sprites.other['official-artwork'].front_default
  }

  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes = res.data
  }

  async catchBug(data) {
    const res = await api.post('api/bugs', data)
    await this.getAllBugs()
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async editBug(bugId, edit) {
    await api.put(`api/bugs/${bugId}`, edit)
    await this.getAllBugs()
  }

  async releaseBug(bugId) {
    const edit = { closed: 'true' }
    await api.put(`api/bugs/${bugId}`, edit)
    await this.getAllBugs()
  }
}

export const bugsService = new BugsService()
