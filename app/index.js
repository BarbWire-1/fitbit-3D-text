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
 * callDebug(mode, obj) mode(fix!)
 * 
 * RELEASE:
 * The release version will not include getters on properties
 * or any of the debug files, so the values of widgetInstances can't be console.logged
 * as 'undefined'
 * 
 * import './widgets/fitbit-3D-text/release';
 * comment-out your callDebug(calls) 
 * 
 */


const mode ='debug'
console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");
callDebug('debug', widget)//array 

let newUse = widgetUsesGroup.getElementById('newUse')
callDebug('debug', newUse)//single widget-instance

let newUse2 = widgetUsesGroup.getElementById('newUse2')
newUse2.text = 'blah'
newUse2.style.fill = 'black'

//newUse2.letterSpacing = 5;
let classEl1 = document.getElementById('classEl1')
console.log(newUse2.getBBox().width)
console.log(newUse2.main.getBBox().width)
console.log(newUse2.text.length)



console.log(`7. endApp ${Date.now() - startFactory}ms from start`)


//TODO test all <set> 


