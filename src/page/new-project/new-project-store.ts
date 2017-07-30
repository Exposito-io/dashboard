import { observable, computed } from 'mobx'

export class NewProjectStore {

    /**
     * Total number of entries
     */
    @observable entryCount: number = 0

    /**
     * Current entry index
     */
    @observable currentEntryIndex: number = 0


    @computed get isFirstEntry(): boolean {
        return this.currentEntryIndex === 0
    }

    @computed get isLastEntry(): boolean {
        return this.currentEntryIndex === this.entryCount - 1
    }
    

}