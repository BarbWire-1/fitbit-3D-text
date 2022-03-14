
export const callDebug = (mode, obj) => {
    if (mode == 'debug') {
        //import('./widgets/fitbit-3D-text/modules/devTools')
       // let devTools = await import('./devTools')//TODO this throws 'yield' why??
        import('./devTools')
            .then((devTools) => {
                // devTools.dumpProperties('newUse', newUse, 0;)//('objName', obj, boolean)
                // devTools.inspectObject('newUse.style', newUse.style);//('objName', obj) 
                devTools.logThroughWidget(obj)// forEach trhough array
                console.warn("You\'re in debug mode. Before publishing change widget import to 'release'\n                 AND: Remove/comment-out callDebug import and <callDebug> calls!")
            })
            .catch(err => {
                console.warn('Ooops, there went something wrong with your import!')
            })
    } else {
        console.warn("To console.log or  inspect widget-instances, set <mode> to 'debug'.");
    }
}
//Cant' callDebug twice, so how to use different functions optional/parallel?