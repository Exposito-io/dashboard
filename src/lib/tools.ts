/**
 * Sets a component property as a ref element
 * e.g: <div ref={setRef(this, 'myDiv')}></div>
 * would set this.myDiv as the div element inside
 * the component
 * 
 * @param classRef 
 * @param propertyName 
 */
export function setRef(classRef: Object, propertyName: string) {
    return element => classRef[propertyName] = element
}


export function getGithubRepoFromFullName(fullName: string): { owner: string, repo: string } {
    if (typeof fullName !== 'string')
        throw('Invalid Github repository full name')

    let parts = fullName.split('/')

    if (parts.length !== 2)
        throw('Invalid Github repository full name')

    return {
        owner: parts[0],
        repo: parts[1]
    }
}


/**
 * Returns true if the argument is a queue job
 * @param obj 
 */
export function isQueueJob(obj: any): boolean {
    return obj.id != null
        && obj.data != null
}