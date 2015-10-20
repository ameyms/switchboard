/* @flow */

import {reportError, ERR_NO_URL_FOUND} from './util';

type RuleEntry = {
    url: string,
    template: string,
    page: string,
    pattern: RegExp,
    variables: Array<string>
};


const _dir = [];

function _urlVarRegex(): RegExp {
    return /:([a-zA-Z0-9_]+)/g;
};

export function addRule(page: string, url: string, localDir: Array = _dir): RuleEntry {

    const R_URL_VAR = _urlVarRegex();

    var pattern = new RegExp(`^${url.replace(/\//g, '\\/').replace(R_URL_VAR, '[\\w\\-]+')}$`);
    var template = url.replace(R_URL_VAR, match => {
        return match.replace(/(:)([a-zA-Z0-9_]+)/, '$${params.$2}');
    });
    var varMatches = null;
    var variables = [];

    while ((varMatches = R_URL_VAR.exec(url)) !== null) {
        variables.push(varMatches[1]);
    }

    var entry: RuleEntry = {
        url,
        template,
        page,
        pattern,
        variables
    };

    localDir.push(entry);

    return entry;
};


export function matchUrl(url: string, localDir: Array = _dir): ?RuleEntry {
    var rule = null;

    for (let e of localDir) {
        if (e.pattern.test(url)) {
            rule = e;
        }
    }

    return rule;
};

export function listRules(localDir: Array = _dir): Array<RuleEntry> {
    return localDir;
}

export function buildUrl(pageName: string, params: Object, localDir: Array = _dir): string {

    const R_URL_VAR = _urlVarRegex();
    var result = null;

    for (let e of localDir) {
        if (e.page === pageName) {

            result = e.url.replace(R_URL_VAR, match => {
                var v = match.replace(':', '');
                if (params.hasOwnProperty(v)) {
                    return params[v];
                } else {
                    reportError(ERR_NO_URL_FOUND);
                }

            });
        }
    }
    return result;
}

export function truncateRules(localDir: Array = _dir): void {
    localDir.splice(0, _dir.length);
}
