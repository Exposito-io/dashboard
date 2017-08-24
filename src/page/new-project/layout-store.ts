import { observable, computed, action } from 'mobx'

export class LayoutStore {

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

    @action nextEntry() {
        this.currentEntryIndex = (this.currentEntryIndex + 1) % this.entryCount
    }
    
    @action prevEntry() {
        this.currentEntryIndex = (this.currentEntryIndex - 1 + this.entryCount) % this.entryCount
    }

}