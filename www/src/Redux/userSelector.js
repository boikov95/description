import { createSelector } from 'reselect'

const getTree = (state) => {
    return (state.auth.tree)
}

const getTeg = (state) => {
    return (state.instructions.tegi)
}

const getSearch = (state) => {
    return (state.instructions.search)
}

const getInstruction = (state) => {
    return (state.instructions.instructions)
}

export const instructionsSelector = createSelector(getTeg, getInstruction, getSearch, (tegi, instructions, search) => {
    let instruction = tegi.filter(u => u.flag);
    if (instruction.length == 0 && search.length == 0)
        return instructions;

    return (instructions.filter((el) => {
        if (instruction.reduce((acc, prev) => {
            if (el.teg.indexOf(prev.name) != -1) {
                return acc + 1;
            }
        }, 0) === instruction.length && el.text.toUpperCase().indexOf(search.toUpperCase()) != -1) return el
    }))

})

export const loadTree = createSelector(getTree, (tree) => {
    let usetree = [];

    let poisk = (el, searchId) => {
        if (el.id === searchId.parent) {
            el.children.push({ "id": searchId.id, "text": searchId.text, "photo": "http://description/src/php/index.php?action=load_countryimage&id=" + searchId.id, "children": [] });
        }
        else if (el.children) {
            el.children.map((array) => poisk(array, searchId));
        }
    }

    tree.map((element) => {
        if (element.parent == "#") {
            usetree.push({ "id": element.id, "text": element.text, "photo": "http://description/src/php/index.php?action=load_countryimage&id=" + element.id, "children": [] });
        }
        else {
            usetree.map(position => {
                poisk(position, element)
            })
        }
    })

    debugger;
    return (usetree);
})




