/* @flow */

import {addPage, listRules, buildUrl, matchUrl, truncateRules} from '../url-directory';

describe('URL Directory', () => {

    describe('Adding new URLs', () => {

        var fooRule, barRule;

        beforeEach(() => {
            fooRule = addPage('foo', '/foo/:fooId');
            barRule = addPage('bar', '/my/awesome/bar/:barId/is/open/:open');
        });

        it('should create correct regex for one var URL', () => {

            let {pattern} = fooRule;
            expect(pattern.test('/foo/2')).to.be.true;
            expect(pattern.test('/bar/1')).to.be.false;
        });

        it('should track variable in one var URL', () => {

            let {variables} = fooRule;
            expect(variables.length).to.be.equal(1);
            expect(variables).to.eql(['fooId']);
        });

        it('should create correct regex for multi var URL', () => {

            let {pattern} = barRule;
            expect(pattern.test('/my/awesome/bar/1/is/open/yes')).to.be.true;
            expect(pattern.test('/bar/1')).to.be.false;
        });

        it('should track variables in multi var URL', () => {

            let {variables} = barRule;
            expect(variables.length).to.be.equal(2);
            expect(variables).to.eql(['barId', 'open']);
        });
    });

    describe('Listing all URL patterns', () => {

        beforeEach(() => {
            addPage('foo', '/foo/:fooId');
            addPage('bar', '/my/awesome/bar/:barId/is/open/:open');
            addPage('baz', '/the/answer/is/:baz');
        });

        it('should list added URL patterns', () => {
            var urlList = listRules();
            expect(urlList.length).to.be.equal(3);
        });
    });

    describe('Matching URLs to rules', () => {
        beforeEach(() => {
            addPage('foo', '/foo/:fooId');
            addPage('bar', '/my/awesome/bar/:barId/is/open/:open');
            addPage('baz', '/the/answer/is/:baz');
        });

        it('correctly match URL to one var rule', () => {
            var fooRule = matchUrl('/foo/99');
            expect(fooRule.page).to.be.equal('foo');
        });
    });

    describe('Generate URL from page name and params', () => {
        beforeEach(() => {
            addPage('foo', '/foo/:fooId');
            addPage('bar', '/my/awesome/bar/:barId/is/open/:open');
            addPage('baz', '/the/answer/is/:baz');
        });

        it('should correctly create URLs', () => {
            var fooUrl = buildUrl('foo', {fooId: 99});
            var barUrl = buildUrl('bar', {barId: 1, open: 'yes'});
            var bazUrl = buildUrl('baz', {baz: 42});

            expect(fooUrl).to.be.equal('/foo/99');
            expect(barUrl).to.be.equal('/my/awesome/bar/1/is/open/yes');
            expect(bazUrl).to.be.equal('/the/answer/is/42');
        });
    });

    describe('Truncation', () => {
        beforeEach(() => {
            addPage('foo', '/foo/:fooId');
            addPage('bar', '/my/awesome/bar/:barId/is/open/:open');
            addPage('baz', '/the/answer/is/:baz');
        });

        it('should clear directory when truncate is called', () => {
            expect(listRules().length).to.be.equal(3);
            truncateRules();
            expect(listRules().length).to.be.equal(0);
        });
    });

    afterEach(() => {
        truncateRules();
    });

});
