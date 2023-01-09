import { Request, Response } from 'express'
import ListUserService from '../services/ListUserService'
import CreateUserService from '../services/CreateUserService'
import ShowUserService from '../services/ShowUserService'
import UpdateUserService from '../services/UpdateUserService'
import DeleteUserService from '../services/DeleteUserService'

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService()

    const users = await listUser.execute()

    return response.json(users)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showUser = new ShowUserService()

    const user = await showUser.execute({ id })

    return response.json(user)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
    })
    return response.json(user)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { name, email } = request.body

    const updateUser = new UpdateUserService()

    const User = await updateUser.execute({ id, name, email })

    return response.json(User)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteUser = new DeleteUserService()

    await deleteUser.execute({ id })

    return response.json([])
  }
}
