/*eslint-disable no-unused-vars */
import sinon from 'sinon';

import React, {Component} from 'react';
import Switchboard from '../switchboard';
import * as pageDir from '../page-directory';
import * as urlDir from '../url-directory';

var sandbox, app, getUser, className;

describe('Switchboard class', () => {

    var dummyAddPage, dummyAddRule, fakeWindowAddListener;

    beforeEach(() => {

        sandbox = sinon.sandbox.create();
        getUser = sinon.spy();

        sandbox.spy(pageDir, 'addPage');
        sandbox.spy(urlDir, 'addRule');
        fakeWindowAddListener = sandbox.spy(window, 'addEventListener');

        app = new Switchboard();

        @app.page('my-view', '/my/:viewId')
        @app.dependsOn({
            getUser
        })
        class MyNestedView extends Component {

            hello() {
                return 'Hello World';
            }
        }

        className = MyNestedView.name;
    });

    describe('Initialization', () => {
        it('should listen to window URL changes', () => {
            expect(window.addEventListener.calledTwice).to.be.true;
        });
    });

    describe('Tracking components', () => {
        it('should populate directories correctly', () => {
            expect(urlDir.addRule.calledWith('my-view', '/my/:viewId', app.urlDir)).to.be.true;
            expect(pageDir.addPage.getCall(0).args[0]).to.be.equal('my-view');
            expect(app.urlDir.length).to.be.equal(1);
        });
    });

    describe('Reactions to history', () => {

        var pageInstance, Page;
        beforeEach(() => {
            var popstateCb = fakeWindowAddListener.getCall(1).args[1];
            document.location.pathname = '/my/greeter';
            popstateCb();
            Page = app.currentpage;

            pageInstance = new Page();

        });

        it('should have correct URL', () => {
            expect(app.url).to.be.equal('/my/greeter');
            expect(pageInstance.hello()).to.be.equal('Hello World');
            expect(Page.name).to.be.equal(className);
        });
    });

    afterEach(() => {
        sandbox.restore();
    });
});
