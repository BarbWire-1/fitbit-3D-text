"use strict"
import { constructWidgets, startFactory } from '../construct-widgets';
import { dumpProperties, inspectObject } from '../../devTools';
import document from 'document'


const construct = (el) => {
    
    // ELEMENTS
    let mainEl = el.getElementById('main');
    let lightEl = el.getElementById('light');
    let shadowEl = el.getElementById('shadow');
    let _style = el.style;   // keep a reference to the REAL .style because we're going to redefine .style
    
    
    // FUNCTIONS------------------------------------------------------------------------
   /**
    * FUNCTION TO DEFINE PROPERTY
    * (getter/setter optional bound to different objects)
    * @param {*} obj    object to set prop on. Depending on use case this or el
    * @param {*} prop   property
    * @param {*} target outer object to apply property
    * @param {*} source optional object to read property, if not set = target
    */
    const defineProp = (obj, prop, target, source = target) => {
        Object.defineProperty(obj, prop, {
            set(newValue) { target[ prop ] = newValue; },
            //TODO add mode: debug/release for getters?
            //comment out following line to remove getters
            get() { return source[ prop ] },
        });
    };
    // FUNCTION TO DEFINE TEXTPROPERTIES
    // pass to all subElements
    //TODO un-nest these functions?
    function passTextToAll(obj, prop) {
        const equalAll = (prop, value) => {
            el.children.forEach(sub => {
                sub[ prop ] = value;
            })
        };

        Object.defineProperty(obj, prop, {
            set(newValue) { equalAll(prop, newValue) },
            //comment out following line to remove getters
            get() { return mainEl[ prop ] },
            enumerable: true
        });
    };
    
    
    // CREATE STYLE CLASSES------------------------------------------------------------
    /**
     * styleBase: the Fitbit API style object that implements things.
     * We're using the constructor as a closure; ie, local variables (including the parameter) shouldn't be exposed publicly.
     * This necessitates putting properties and functions that need such variables in the constructor, which is a bit ugly.
     */
    
     // style properties common to all elements
    class StyleCommon {     
        constructor(styleBase) {
            defineProp(this, 'opacity', styleBase)
            defineProp(this, 'display', styleBase)
        }
    };
    
    // style properties applicable light,shadow
    // as main.fill gets directly set on use
    class StyleSubText extends StyleCommon {  
        constructor(styleBase) {
            super(styleBase);
            defineProp(this, 'fill', styleBase)
        }
    };
    
    // text/style properties applicable to widget (useElement)
    class StyleWidget extends StyleCommon {   
        constructor(_style) {
            super(_style);
            //pass text-style from el._style to all
            passTextToAll(this, 'fontFamily');
            passTextToAll(this, 'fontSize');
            //set main.style.fill at el._style.fill
            defineProp(this, 'fill', mainEl.style)
        }
    };
    
    // TEXT ON USE
    // and pass to all subElements
    class TextWidget  {
        constructor() {
            passTextToAll(el, 'text');
            passTextToAll(el, 'textAnchor');
            passTextToAll(el, 'letterSpacing');
        }
    };
  
    // CREATE API's-------------------------------------------------------------------
    // FUNCTION TO EXPOSE TO CORRESPONDING OBJECT
    function connectAPI(subElement, API) {
        Object.defineProperty(el, subElement, {
            get() { return API; },
        });
    };

    //creates main: opacity, display, getBBox()
    let mainAPI = Object.seal({
        style: Object.seal(new StyleCommon(mainEl.style)),
        getBBox: () => mainEl.getBBox(),
        enumerable: true
    });
    connectAPI('main', mainAPI);
    
    //creates light/shadow: x, y, fill, opacity, display
    const createEffectsAPI = (effectEl) => Object.seal({
        style: Object.seal(new StyleSubText(effectEl.style)),
        set x(newValue) { effectEl.x = newValue; },
        get x() { return effectEl.x; },
        set y(newValue) { effectEl.y = newValue; },
        get y() { return effectEl.y; },
        enumerable: true

    });
    connectAPI('light', createEffectsAPI(lightEl));
    connectAPI('shadow', createEffectsAPI(shadowEl));

    // CONNECT OUTER TO VIRTUAL STYLE
    // creates widget-use(instance): text-related, mainEl.fill, el.getBBox(), all useOwn
    let widgetStyleAPI = Object.seal({
        //we kept a reference to the real .style in _style
        style: Object.seal(new StyleWidget(_style)),
        text: Object.seal(new TextWidget()),
        set fill(newValue) { mainEl.style.fill = newValue },
        get() { return widgetStyleAPI; },
        enumerable: true,
    });
    
     // GETBBOX() ON USE (!)--------------------------------------------------------------
    el.getBBox = () => {

        const mainBBox = mainEl.getBBox();  // we assume el and mainEl don't have display==='none'


        let lightX = 0, lightY = 0, shadowX = 0, shadowY = 0;
        if (lightEl.style.display !== 'none') {
            lightX = lightEl.x;
            lightY = lightEl.y;
        };
        if (shadowEl.style.display !== 'none') {
            shadowX = shadowEl.x;
            shadowY = shadowEl.y;
        };

        const leftExtra = Math.min(Math.min(lightX, 0), Math.min(shadowX, 0));    // will be 0 or negative
        const topExtra = Math.min(Math.min(lightY, 0), Math.min(shadowY, 0));    // will be 0 or negative
        const rightExtra = Math.max(Math.max(lightX, 0), Math.max(shadowX, 0));
        const bottomExtra = Math.max(Math.max(lightY, 0), Math.max(shadowY, 0));

        const bbox = {
            bottom: mainBBox.bottom + bottomExtra,
            height: mainBBox.height - topExtra + bottomExtra,
            left: mainBBox.x + leftExtra,
            right: mainBBox.right + rightExtra,
            top: mainBBox.y + topExtra,
            width: mainBBox.width - leftExtra + rightExtra,
            x: mainBBox.x + leftExtra,
            y: mainBBox.y + topExtra
        }
        return bbox;

    };
    
     // INITIALISATION---------------------------------------------------------------
    (function () {  // IIFE

        // PARSE AND PROCESS SVG CONFIG ATTRIBUTES
        const attributes = el.getElementById('config').text.split(';')
        attributes.forEach(attribute => {
            const colonIndex = attribute.indexOf(':')
            const attributeName = attribute.substring(0, colonIndex).trim();
            let attributeValue = attribute.substring(colonIndex + 1).trim();

            switch (attributeName) {
                case 'text':
                    el.text = attributeValue   // this won't like embedded semi-colons, and quotes will require care
                    break;
                case 'letter-spacing':
                    el.letterSpacing = Number(attributeValue);
                    break;
                case 'text-anchor':
                    el.textAnchor = attributeValue;
                    break;
            }
        });
        
        // DEFINES RELATIONS BETWEEN SUBTEXTELEMENTS
        // Note that text, letter-spacing and text-anchor are set on useEl using config (see above), and are not copied from mainEl.
        //defaults
        //TODO search for a nicer way to set defaults
        lightEl.style.fill = lightEl.style.fill ?? "white";
        shadowEl.style.fill = shadowEl.style.fill ?? "red";

        lightEl.x = lightEl.x ?? -1;
        lightEl.y = lightEl.y ?? -1;
        shadowEl.x = shadowEl.x ?? 1;
        shadowEl.y = shadowEl.y ?? 1;

        const allSubTextElements = el.getElementsByClassName('_3DText');
        allSubTextElements.forEach(sub => {
            sub.style.fontFamily = _style.fontFamily;
            // this is really ugly, but doesn'work without using vars
            let fSPublic = sub.style.fontSize;                      // font-size can be set on useEl; if fontSize is undefined its value is -32768
            let fSPrivate = _style.fontSize;                         // font-family can be set on useEl
            fSPublic = fSPublic <= 0 ? fSPrivate ?? fSPrivate : 30;
            sub.letterSpacing = mainEl.letterSpacing ?? 0;
            try {     // textEl.textAnchor throws an error if textAnchor not defined
                sub.textAnchor = mainEl.textAnchor;
            } catch (e) {
                sub.textAnchor = 'start';  // default
            }
        });
    })();   // end of initialisation IIFE


    //INSPECT OBJECTS ***************************************************************
    //inspectObject('mainEl.style',mainEl.style)
    //console.log(mainEl.text) // here only logs if set in widget

    //prototype chain
    //dumpProperties('lightEl.style.fill', lightEl.style.fill, false)

    //INSPECT OBJECTS END*************************************************************

    return el;
};

constructWidgets('fitbit-3D-text', construct);

