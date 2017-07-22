import { observable, computed } from 'mobx'

export abstract class Store {

    @observable isLoading = true

}