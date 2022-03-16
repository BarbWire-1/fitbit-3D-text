// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";
import './widgets/fitbit-3D-text/debug';// 'debug' or 'release'
import { callDebug } from "./widgets/fitbit-3D-text/modules/callDebug";
import { inspectObject } from "./widgets/fitbit-3D-text/modules/devTools";


/**
 * DEBUG vs RELEASE
 * DEBUG:
 * To debug widget-instances: (development)
 * console.log:
 * import './widgets/fitbit-3D-text/debug';
 * 
 * To see allmost all info of widget-instance or array of widget-instances:
 * import { callDebug } from "./widgets/fitbit-3D-text/modules/callDebug";
 * use function callDebug('debug', obj) 
 * 
 * RELEASE:
 * The release version will not include getters on properties
 * or any of the debug files, so the values of widgetInstances can't be console.logged
 * (log as 'undefined')
 * 
 * import './widgets/fitbit-3D-text/release';
 * 
 * IF USED CALLDEBUG BEFORE:
 * comment-out your callDebug(calls) 
 * remove or comment-out callDebug import 
 */



// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");
// callDebug('debug', widget)//array 

let newUse = widgetUsesGroup.getElementById('newUse')
callDebug('debug', newUse)//single widget-instance

let newUse2 = widgetUsesGroup.getElementById('newUse2')
newUse2.text = 'blah'
newUse2.style.fill = 'black'

//newUse2.letterSpacing = 5;
let classEl1 = document.getElementById('classEl1')

inspectObject('newUse2.getBBox()',newUse2.getBBox())
console.log(newUse2.text.length)
// console.log(newUse2.main.text.length)






//TODO test all <set> 


