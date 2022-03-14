// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import { startFactory } from "./widgets/construct-widgets";
import './widgets/fitbit-3D-text/debug';// 'debug' or 'release'
import { callDebug } from "./widgets/fitbit-3D-text/modules/callDebug";

/**
 * DEBUG vs RELEASE
 * DEBUG:
 * To debug widget-instances: (development)
 * console.log:
 * import './widgets/fitbit-3D-text/debug';
 * 
 * see all(most) info of object:
 * import { callDebug } from "./widgets/fitbit-3D-text/modules/callDebug";
 * callDebug(mode, obj) mode = 'debug'
 * 
 * RELEASE:
 * The release version will not include getters on properties
 * or any of the debug files, so the values of widgetInstances can't be console.logged
 * as 'undefined'
 * 
 * import './widgets/fitbit-3D-text/release';
 * comment-out your callDebug(calls)
 */

console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");
callDebug('debug', widget)

let newUse = widgetUsesGroup.getElementById('newUse')
//callDebug('debug', newUse)//TODO not working this way, as can't import twice
//newUse.shadow.x = newUse.shadow.y = 2;
//newUse.style.fill = 'magenta'
let newUse2 = widgetUsesGroup.getElementById('newUse2')
newUse2.text = 'blah'
newUse2.style.fill = 'black'

//newUse2.letterSpacing = 5;
let classEl1 = document.getElementById('classEl1')
console.log(newUse2.getBBox().width)
console.log(newUse2.main.getBBox().width)
//console.log(newUse2.text.length)//TODO TypeError: Cannot read property 'length' of undefined in 'release'

// console.log(newUse2.getBBox().width)
// console.log(newUse2.main.getBBox().x)

//dumpProperties('newUse2', newUse2, 0)//TypeError: Argument cannot be converted to an object. ????
//newUse.text='blah'

// const logThroughWidget = (array) => {
//     array.forEach(el => {
//         console.log(`${el.id}.fill: ${el.style.fill}`)//undefined. why? main also undefined
//         console.log(`${el.id}.fontFamily: ${el.style.fontFamily}`)
//         console.log(`${el.id}.fontSize: ${el.style.fontSize}`)//new.fontSize: -32768  ??? (set to 30 in css) applies correct
//         console.log(`${el.id}.light.fill: ${el.light.style.fill}`)
//         console.log(`${el.id}.light.x: ${el.light.x}`)
//         console.log(`${el.id}.shadow.fill: ${el.shadow.style.fill}`)
//         console.log(`${el.id}.shadow.x: ${el.shadow.x}`)
//         console.log('-------------------------------')
//     })
// };
//logThroughWidget(widget)

console.log(`7. endApp ${Date.now() - startFactory}ms from start`)


//TODO test all <set> 


