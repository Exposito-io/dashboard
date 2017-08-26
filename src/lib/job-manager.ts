
/**
 * JobManager launches an event when a job is
 * completed on a specific queue. To receive a 
 * notification, use the subscribe method
 */
export class JobManager {

    private static instance: JobManager
    private jobCompleteCallbacks: Map<string, Function[]> = new Map()
    private sock: any


    /**
     * Will call the fn function each time a job
     * is completed on the specified job queue
     * 
     * @param queue
     * @param fn 
     */
    subscribe(queue: string, fn: Function) {
        if (!this.jobCompleteCallbacks.has(queue)) {
            this.jobCompleteCallbacks.set(queue, [])
            this.socketSubscribe(queue)
        }

        this.jobCompleteCallbacks.get(queue).push(fn)
    }


    /**
     * Will stop receiving job-complete notifications 
     * on the specified job queue
     * 
     * @param queue 
     * @param fn 
     */
    unsubscribe(queue: string, fn: Function) {
        let callbacks = this.jobCompleteCallbacks.get(queue)

        if (callbacks && callbacks.length > 0) {
            let filteredCallbacks = callbacks.filter(f => f !== fn)

            if (filteredCallbacks.length !== callbacks.length) {
                this.jobCompleteCallbacks.set(queue, filteredCallbacks)

                if (filteredCallbacks.length === 0)
                    this.socketUnsubscribe(queue)
            }
        }
    }


    /**
     * 
     * @param io SocketIO client instance
     */
    private constructor(io: any) {
        this.sock = io('/jobs')

    }    



    private socketSubscribe(queue: string) {
        this.sock.emit('subscribe', { queue })
        this.sock.on(`job-complete:${queue}`, data => this.onJobComplete(queue, data))        
    }

    private socketUnsubscribe(queue: string) {
        this.sock.emit('unsubscribe', { queue })
    }


    private onJobComplete(queue: string, data: any) {
        let callbacks = this.jobCompleteCallbacks.get(queue)

        if (callbacks && callbacks.length > 0) {
            for (let cb of callbacks) {
                if (typeof cb === 'function')
                    cb(data)
            }
        }
    }


    static getManager(io: any) {
        if (JobManager.instance == null)
            JobManager.instance = new JobManager(io)

        return JobManager.instance
    }


}