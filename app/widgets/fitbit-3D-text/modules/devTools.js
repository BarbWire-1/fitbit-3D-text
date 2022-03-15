
// INSPECT PROTOTYPE CHAIN ©️ Gondwana
export function dumpProperties(name, obj, types) {
    // types: try to determine type of each property: can cause hard crashes with some objects.
    let proto = obj
    let level = 0
    let type = '?'
    console.log(`Members of ${name}:`)
    do {
        console.log(`  Level ${level++}:`)
        for (const memberName in proto) {
            //console.log('in for()')
            if (proto.hasOwnProperty(memberName)) {
                //console.log(`in if() ${memberName}`)
                // memberName 'text' crashes sim
                if (types)
                    try {
                        //console.log('before obj[]')
                        const member = obj[ memberName ]  // get member from top-level obj rather than proto, as the latter crashes if not a function
                        //console.log(`in try member=${member}`)
                        type = typeof member
                    } catch (e) {
                        //console.log('in catch')
                        type = 'INACCESSIBLE'
                    }
                console.log(`    ${memberName} (${type})`)
            }
        }
        proto = Object.getPrototypeOf(proto)
        console.log('  ---------------')
    } while (proto)
};
//call like: dumpProperties('obj', obj, boolean)

export function inspectObject(objName,obj) {
//const prettyOut = e => JSON.parse(JSON.stringify(e))
    console.log(`${objName} keys: ${Object.keys(obj)}`)
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            //console.log(`${prettyOut(objName)}.${prettyOut(prop)}: ${JSON.stringify(obj[ prop ])}`)
            console.log(`${objName}.${[ prop ]}: ${JSON.stringify(obj[ prop ])}`)
        }
       // else { console.log(`inherit: ${objName}.${[ prop ]}`) }
        
    };
    console.log('----------------------------')
};
//call like: inspectObject('objName',obj)

export const logThroughWidget = (obj) => {
    //TODO how to access all properties functional?
    const logStuff = (el) => {  
        console.log(`${el.id}.text: ${el.text}`)
        console.log(`${el.id}.x: ${el.x}`)
        console.log(`${el.id}.y: ${el.y}`)
        console.log(`${el.id}.style.fill: ${el.style.fill}`)//undefined. why? main also undefined
        console.log(`${el.id}.style.fontFamily: ${el.style.fontFamily}`)
        console.log(`${el.id}.style.fontSize: ${el.style.fontSize}`)//new.fontSize: -32768  ??? (set to 30 in css) applies correct
        console.log(`${el.id}.light.x: ${el.light.x}`)
        console.log(`${el.id}.light.y: ${el.light.y}`)
        console.log(`${el.id}.light.style.fill: ${el.light.style.fill}`)
        console.log(`${el.id}.shadow.x: ${el.shadow.x}`)
        console.log(`${el.id}.shadow.x: ${el.shadow.x}`)
        console.log(`${el.id}.shadow.fill: ${el.shadow.style.fill}`)
        console.log('-------------------------------')
    }
    if (obj.length > 1) {
        obj.forEach(el => { //if object .isArray()
            logStuff(el)
        })
    } else {
        logStuff(obj)
    }
};

//call like: inspectObject('objName',obj)
//TODO Make recursive?
//TODO how to reach main.getBBOX() values here? - working for el.getBBOX as separately defined?
//TODO why doesn't el.style get listed? CHECK implementation of style and fill on el/ or test above function. One of both or both must be wrong
// need to inherit from main, instead of just assigning? any importance?

 