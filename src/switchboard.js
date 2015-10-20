import {addPage, findPage} from './page-directory';
import {addRule, matchUrl} from './url-directory';

export default class Switchboard {
    constructor() {
        this.urlDir = [];
        this.pageDir = [];
        this.addListeners();
    }

    addListeners() {
        window.addEventListener('hashchange', () => {
            this.changeUrl(document.location.hash.replace(/^#/, ''));
        });

        window.addEventListener('popstate', () => {
            this.changeUrl(document.location.pathname);
        });
    }

    changeUrl(url) {
        this.url = url;
        var rule = matchUrl(url, this.urlDir);
        this.currentpage = findPage(rule.page, this.pageDir).component;
    }

    page(stateName, url) {
        var that = this;

        addRule(stateName, url, that.urlDir);
        return function(Klass) {

            class ViewClass extends Klass {
                constructor() {
                    super(arguments);
                }
            }

            Object.defineProperty(ViewClass, 'name', {
                value: Klass.name
            });

            addPage(stateName, ViewClass, that.pageDir);
            return ViewClass;
        };
    }

    dependsOn(deps) {
        return function(Klass) {
            Object.defineProperty(Klass.prototype, '__definedDependencies', {
                value: deps,
                enumerable: false
            });
        };
    }
}
