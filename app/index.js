// this widget gets integrated by the widget-factory written by Gondwanasoft:  https://github.com/gondwanasoft/fitbit-simple-widget
import document from "document";

//import { inspectObject, dumpProperties } from "./devTools";
import { startFactory } from "./widgets/construct-widgets";
import './widgets/fitbit-3D-text';

//const devTools = await import('./devTools.js')
const mode = 'debug'|'release' 
mode = 'release'
//TODO this works 'somehow',  but not, what I was actually looking for.
// how to provide devTools for ALL file, instead of only inside function?   
if (mode == 'debug') {
        import('./devTools')
            .then((devTools) => {
                devTools.dumpProperties('newUse', newUse, 0)
                devTools.inspectObject('newUse.style', newUse.style);
                console.warn("You\'re in debug mode. Set <mode> (line 10) to 'release' before publishing!")
            })
            .catch(err => {
                console.warn('Ooops, there went something wron with your import!')
        })
} else {
    console.warn("To use devTools functions, set <mode> (line 10) to 'debug'.");
}
//TODO possible to do similar for getters INSIDE module's closure?

//TODO this is NOT working: Unhandled exception: TypeError: Expected a function. line 10 (??)
    // (async () => {
    //     if (mode == 'debug') {
    //         try {
    //             const { default:  devTools, dumpProperties, inspectObject } = await import('./devTools')
    //             console.log(devTools)
    //         } catch (err) {
    //             console.log('you can await the await, but it will not do anything')
    //         }
    //     }
    // })();

 


console.log(`6. startApp ${Date.now() - startFactory}ms from start`)
console.log('-------------------------------')
// single widget-uses

let widgetUsesGroup = document.getElementById('widgetUsesGroup')
let widget = widgetUsesGroup.getElementsByClassName("widget-auto");

let newUse = widgetUsesGroup.getElementById('newUse')
//newUse.shadow.x = newUse.shadow.y = 2;
//newUse.style.fill = 'magenta'
let newUse2 = widgetUsesGroup.getElementById('newUse2')
newUse2.text = 'blah'
newUse2.style.fill = 'black'

//newUse2.letterSpacing = 5;
let classEl1 = document.getElementById('classEl1')
console.log(newUse2.getBBox().width)
console.log(newUse2.main.getBBox().width)
console.log(newUse2.text.length)

// console.log(newUse2.getBBox().width)
// console.log(newUse2.main.getBBox().x)

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


