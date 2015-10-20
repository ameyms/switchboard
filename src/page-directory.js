import {reportError, ERR_NO_SUCH_COMPONENT} from './util';

type PageEntry = {
    page: string,
    component: Object
};

const _dir = {};

export function addPage(page: string, component: Object, localDir: Array = _dir): PageEntry {
    var entry = {
        page,
        component
    };
    localDir[page] = entry;

    return entry;
};


export function findPage(page: string, localDir: Array = _dir): Object {
    if (localDir.hasOwnProperty(page)) {
        return localDir[page];
    } else {
        reportError(ERR_NO_SUCH_COMPONENT);
    }
};
