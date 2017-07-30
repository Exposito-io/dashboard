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