import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async create(body) {
    return await dbContext.Notes.create(body)
  }

  async edit(body, creatorId) {
    const data = await dbContext.Notes.findOneAndUpdate({ _id: body.id, creatorId }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async delete(id, creatorId) {
    const data = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return 'Successfully Deleted'
  }
}

export const notesService = new NotesService()
