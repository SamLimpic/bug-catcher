import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findBugById(id) {
    const bug = await dbContext.Bugs.findById({ _id: id })
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async findNotesByBugId(id) {
    return await dbContext.Notes.find({ bug: id }) // NOTE .populate('creator', 'name', etc)
  }

  async create(body) {
    return await dbContext.Boards.create(body)
  }

  async edit(body, creatorId) {
    const data = await dbContext.Boards.findOneAndUpdate({ _id: body.id, creatorId, closed: false }, body, { new: true })
    if (!data) {
      throw new BadRequest('Invalid Id')
    }
    if (data.closed) {
      throw new BadRequest('This bug has already been released!')
    }
    return data
  }
}
export const bugsService = new BugsService()
