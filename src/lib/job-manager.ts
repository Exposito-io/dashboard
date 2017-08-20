export class JobManager {

    private jobCompleteCallbacks: Map<string, Function[]> = new Map()
    private sock: any

    /**
     * 
     * @param io SocketIO client instance
     */
    constructor(io: any) {
        this.sock = new io()
    }


    subscribe(queue: string, fn: Function) {
        if (!this.jobCompleteCallbacks.has(queue)) {
            this.jobCompleteCallbacks.set(queue, [])
            this.sock.emit('subscribe', { queue: queue })
        }

        this.jobCompleteCallbacks.get(queue).push(fn)
    }



}