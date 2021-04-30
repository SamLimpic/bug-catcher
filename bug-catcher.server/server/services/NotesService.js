import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query)
    return notes
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}

export const notesService = new NotesService()
