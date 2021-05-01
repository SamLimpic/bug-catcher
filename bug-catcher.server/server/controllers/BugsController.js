import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAllBugs)
      .get('/:id', this.getBugById)
      .get('/:id/notes', this.getNotesByBugId)
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.catchBug)
      .put('/:id', this.editBug)
      .delete('/:id', this.releaseBug)
  }

  async getAllBugs(req, res, next) {
    try {
      const bugs = await bugsService.find(req.query)
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(req, res, next) {
    try {
      const bug = await bugsService.findBugById({ _id: req.params.id })
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await bugsService.findNotesByBugId({ _id: req.params.id })
      // NOTE query may not be required
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async catchBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.create(req.body)
      res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.id = req.params.id
      delete req.body.closed
      const data = await bugsService.edit(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async releaseBug(req, res, next) {
    try {
      const data = await bugsService.release(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
