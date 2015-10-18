/*eslint-disable */

export default class Switchboard {
    page(stateName, url) {
        return function(Klass) {
            let constructorFn = Klass.prototype.constructor;
            Klass.prototype.constructor = function() {

            };
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
