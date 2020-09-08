import {setOpenMenuAction} from "../actions";

describe('menu action:',() => {
    test('setOpenMenuAction',() => {
        expect(setOpenMenuAction(true)).toEqual({
            type: 'menu_isOpen',
            payload: true,
        })
    })
})
