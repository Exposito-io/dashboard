import { autorun, observable, computed, action } from 'mobx'
import { Project } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'
import config from '../config'

export class ProjectStore extends Store {

    private static instance: ProjectStore

    @observable availableProjects: Project[] = []

    private client: ExpositoClient


    static getStore(): ProjectStore {

        if (!this.instance)
            this.instance = new ProjectStore()

        return this.instance
    }



    private constructor() {
        super()
        this.init()
    }

    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        this.availableProjects = await this.client.projects.getProjects()
        this.isLoading = false
    }

}