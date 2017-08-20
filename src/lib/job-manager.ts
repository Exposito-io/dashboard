
export class JobManager {

    private jobCompleteCallbacks: Map<string, Function[]> = new Map()
    private sock: any

    /**
     * 
     * @param io SocketIO client instance
     */
    constructor(io: any) {
        this.sock = io('/jobs')

    }


    subscribe(queue: string, fn: Function) {
        if (!this.jobCompleteCallbacks.has(queue)) {
            this.jobCompleteCallbacks.set(queue, [])
            this.socketSubscribe(queue)
        }

        this.jobCompleteCallbacks.get(queue).push(fn)
    }



    private socketSubscribe(queue: string) {
        this.sock.emit('subscribe', { queue })
        this.sock.on(`job-complete:${queue}`, data => this.onJobComplete(queue, data))        
    }


    private onJobComplete(queue: string, data) {
        let callbacks = this.jobCompleteCallbacks.get(queue)

        if (callbacks && callbacks.length > 0) {
            for (let cb of callbacks) {
                if (typeof cb === 'function')
                    cb(data)
            }
        }
    }


    


}