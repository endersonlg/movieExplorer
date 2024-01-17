import { Realm } from '@realm/react'
import { ObjectSchema } from 'realm'

type GenerateProps = {
  user_id: string
  movie_id: string
  title: string
  overview: string
  vote_average: number
  img: string
  release_date: string
}

// eslint-disable-next-line no-use-before-define
export class Favorite extends Realm.Object<Favorite> {
  _id!: string
  user_id!: string
  movie_id!: string
  title!: string
  overview!: string
  vote_average!: number
  img!: string
  release_date!: string
  created_at!: Date
  updated_at!: Date

  static generate({
    movie_id,
    user_id,
    title,
    overview,
    img,
    vote_average,
    release_date,
  }: GenerateProps) {
    console.log({
      _id: new Realm.BSON.UUID(),
      movie_id,
      user_id,
      title,
      overview,
      img,
      vote_average,
      release_date,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return {
      _id: new Realm.BSON.UUID(),
      movie_id,
      user_id,
      title,
      overview,
      img,
      vote_average,
      release_date,
      created_at: new Date(),
      updated_at: new Date(),
    }
  }

  static schema: ObjectSchema = {
    name: 'Favorite',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      movie_id: {
        type: 'string',
        indexed: true,
      },
      user_id: {
        type: 'string',
        indexed: true,
      },
      title: 'string',
      overview: 'string',
      img: 'string',
      vote_average: 'float',
      release_date: 'string',
      created_at: 'date',
      updated_at: 'date',
    },
  }
}
