import { autorun, observable, computed, action } from 'mobx'
import { Project } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'
import config from '../config'
import { preferencesStore } from './preferences-store'
import * as moment from 'moment'


export class NotificationStore extends Store {

    private static instance: NotificationStore

    @observable notifications: any[] = [{
        user: {
          name: 'Ashley',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '02/13/95 9:00',
        relativeTime: moment('02/13/95').fromNow(),
      },
      {
        user: {
          name: 'Nick',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '07/13/16 12:00',
        relativeTime: moment('07/13/16 12:00').fromNow(),
      },
      {
        user: {
          name: 'Matt',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '04/20/15 9:00',
        relativeTime: moment('04/20/15 9:00').fromNow(),
      },
      {
        user: {
          name: 'Jon',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '07/19/16 8:00',
        relativeTime: moment('07/19/16 8:00').fromNow(),
      },
      {
        user: {
          name: 'Jacob',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '05/23/16 2:00',
        relativeTime: moment('05/23/16 2:00').fromNow(),
      },
      {
        user: {
          name: 'Jason',
          // picture: Person,
        },
        subject: 'This is a notification alert',
        timeStamp: '05/01/16 4:00',
        relativeTime: moment('05/01/16 4:00').fromNow(),
      }]


    private client: ExpositoClient


    static getStore(): NotificationStore {

        if (!this.instance)
            this.instance = new NotificationStore()

        return this.instance
    }



    private constructor() {
        super()
        this.init()
    }

    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        this.isLoading = false
    }

}