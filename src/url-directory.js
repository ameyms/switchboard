/* @flow */
type RuleEntry = {
    url: string,
    template: string,
    page: string,
    pattern: RegExp,
    variables: Array<string>,
    component: ?Object
};


const _dir = [];

function _urlVarRegex(): RegExp {
    return /:([a-zA-Z0-9_]+)/g;
};

export function addPage(page: string, url: string, component?: Object = {}): RuleEntry {

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
        variables,
        component
    };

    _dir.push(entry);

    return entry;
};


export function matchUrl(url: string): ?RuleEntry {
    var rule = null;

    for (let e of _dir) {
        if (e.pattern.test(url)) {
            rule = e;
        }
    }

    return rule;
};

export function listRules(): Array<RuleEntry> {
    return _dir;
}

export function buildUrl(pageName: string, params: Object): string {

    const R_URL_VAR = _urlVarRegex();
    var result = null;

    for (let e of _dir) {
        if (e.page === pageName) {

            result = e.url.replace(R_URL_VAR, match => {
                var v = match.replace(':', '');
                if (params.hasOwnProperty(v)) {
                    return params[v];
                } else {
                    throw Error('key value not found');
                }

            });
        }
    }
    return result;
}

export function truncateRules(): void {
    _dir.splice(0, _dir.length);
}
