import { createRealmContext } from '@realm/react'

import { SyncConfiguration } from 'realm'

import { Favorite } from './schemas/Favorite'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const syncConfig: Partial<SyncConfiguration> = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior,
  existingRealmFileBehavior: realmAccessBehavior,
}

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [Favorite],
    schemaVersion: 2,
  })
