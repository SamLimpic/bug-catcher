import { AppState } from '../AppState'
import { api } from './AxiosService'
import { bugsService } from './BugsService'

class NotesService {
  async createNote(bugId, data) {
    await api.post('api/notes', data)
    await bugsService.getNotesByBugId(bugId)
  }

  async editNote(noteId, edit) {
    await api.put(`api/notes/${noteId}`, edit)
  }

  async deleteNote(noteId) {
    await api.delete(`api/notes/${noteId}`)
    AppState.notes = AppState.notes.filter(n => n.id !== noteId)
  }
}

export const notesService = new NotesService()
