import { AppState } from '../AppState'
// import router from '../router'
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
  }

  async getPokeBug() {
    const index = Math.floor(Math.random() * 96)
    AppState.activePokeBug = AppState.pokeBugs[index].pokemon
    const res = await pokeApi.get(`pokemon-species/${AppState.activePokeBug.name}`)
    const imgUrl = await pokeApi.get(`pokemon/${AppState.activePokeBug.name}`)
    AppState.activePokeBug = res.data
    AppState.activeImg = imgUrl.data.sprites.other['official-artwork'].front_default
  }

  async getNotesByBugId(bugId) {
    const res = await api.get(`api/bugs/${bugId}/notes`)
    AppState.notes[bugId] = res.data
  }

  async catchBug(data) {
    const res = await api.post('api/bugs', data)
    AppState.bugs.push(res.data)
    // router.push({ name: 'Bug', params: { id: res.data.id } })
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
