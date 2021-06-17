import { AppState } from '../AppState'
import router from '../router'
import { api, pokeApi } from './AxiosService'
import Notification from '../utils/Notification'

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

  async formatPokeBug() {
    // STUB Beefy function to add a Random Bug from the API to the database
    // NOTE Generates a random number between 1 and 82, and pulls a Bug Pokemon from AppState.pokeBugs whose index matches that number
    const index = Math.floor(Math.random() * 82)
    AppState.activePokeBug = AppState.pokeBugs[index].pokemon
    const name = AppState.activePokeBug.name
    // NOTE Calls the Pokemon API by the name of the indexed PokeBug
    await this.catchPokeBug(name)
    const pokeBug = AppState.activePokeBug
    // NOTE Ensures the Bug that is pulled from the API is in English
    const text = pokeBug.flavor_text_entries.findIndex(p => p.language.name === 'en')
    // NOTE Removes nonsense characters from the Bug Description
    const description = pokeBug.flavor_text_entries[text].flavor_text.replaceAll('', ' ')
    await Notification.image()
    AppState.activePost = {
      // NOTE Formats the API Data to match the consistent format in the Database
      title: `${pokeBug.name[0].toUpperCase() + pokeBug.name.slice(1)}`,
      description: `${description.replaceAll('\n', ' ')}`,
      imgUrl: `${AppState.activeImg}`,
      origin: `${pokeBug.name}`
    }
    // NOTE Adds the formatted Bug to the Database
    await this.catchBug(AppState.activePost)
  }

  async getPokeBug(name) {
    const res = await pokeApi.get(`pokemon/${name}`)
    AppState.activePokeBug = res.data
  }

  async catchPokeBug(name) {
    // NOTE Calls the Pokemon API by the name of the indexed PokeBug
    const res = await pokeApi.get(`pokemon-species/${name}`)
    const imgUrl = await pokeApi.get(`pokemon/${name}`)
    AppState.activePokeBug = res.data
    AppState.activeImg = imgUrl.data.sprites.other['official-artwork'].front_default
  }

  async catchBug(data) {
    // NOTE Adds the formatted Bug to the Database
    const res = await api.post('api/bugs', data)
    await this.getAllBugs()
    router.push({ name: 'BugDetails', params: { id: res.data.id } })
  }

  async editBug(bugId, edit) {
    await api.put(`api/bugs/${bugId}`, edit)
    await this.getBugById(bugId)
  }

  async releaseBug(bugId) {
    // NOTE The 'Delete' function of this App still needs to leave a record of the Bug, so it functions more like an Edit
    const edit = { closed: 'true' }
    await api.delete(`api/bugs/${bugId}`, edit)
    await this.getBugById(bugId)
  }

  async hideReleased() {
    AppState.bugs = AppState.bugs.filter(b => !b.closed)
  }
}

export const bugsService = new BugsService()
