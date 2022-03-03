import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'

const prisma = new PrismaClient()

async function register(req: Request, res: Response) {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String(md5(req.body.password, process.env.SECRET as string & { asBytes: true })),
      },
    })

    return res.status(201).send({ msg: 'User Created!!', user })
  } catch (error) {
    return res.status(400).json({ msg: 'Error!!', error })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await prisma.user.findMany()

    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function getOne(req: Request, res: Response) {
  try {
    const { id } = req.params

    const data = await prisma.user.findFirst({
      where: { id: id },
    })

    return res.status(200).send({ data })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.user.update({
      where: { id: id },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    })

    return res.status(200).send({ msg: 'User EDITADO!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.user.delete({
      where: { id: id },
    })

    return res.status(200).send({ msg: 'User Apagado!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!!', error })
  }
}

export default { register, remove, getOne, getAll, update }
