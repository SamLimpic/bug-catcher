import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
      .populate('creator', 'name picture')
    return bugs
  }

  async findBugById(id) {
    const bug = await dbContext.Bugs.findOne({ _id: id })
      .populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async findNotesByBugId(id) {
    return await dbContext.Notes.find({ bug: id })
      .populate('creator', 'name picture')
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async edit(body) {
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: body.id, closed: false }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }

  async closeBug(id) {
    const body = { closed: 'true' }
    const data = await dbContext.Bugs.findOneAndUpdate({ _id: id }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    return data
  }
}
export const bugsService = new BugsService()
