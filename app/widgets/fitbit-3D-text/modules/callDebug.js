
export const callDebug = (mode, obj) => {
    if (mode == 'debug') {
        //import('./widgets/fitbit-3D-text/modules/devTools')
        import('./devTools')
            .then((devTools) => {
                // devTools.dumpProperties('newUse', newUse, 0;)//('objName', obj, boolean)
                // devTools.inspectObject('newUse.style', newUse.style);//('objName', obj) 
                devTools.logThroughWidget(obj)// forEach trhough array
                console.warn("You\'re in debug mode. Remove <callDebug> and change widget import to 'release' before publishing!")
            })
            .catch(err => {
                console.warn('Ooops, there went something wrong with your import!')
            })
    } else {
        console.warn("To use devTools functions, set <mode> to 'debug'.");
    }
}