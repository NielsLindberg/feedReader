/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has url defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('has name defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

         /*When not calling any triggers or similar the state of the dom is the default,
         hence we just need to check if the class menu-hidden is on the body tag, as this
         is hov the 3dtransformation is applied to the menu.*/
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('visibility changes on icon click', function() {

            /* just checking an arbitrary number of clicks, that atleast ensures the toggle going back and forth a couple of times */
            var bodyClassHasMenuHidden;
            var newBodyClassHasMenuHidden;
            for (x = 1; x < 5; x++) {
                bodyClassHasMenuHidden = $('body').hasClass('menu-hidden');
                $('.menu-icon-link').trigger('click');
                newBodyClassHasMenuHidden = $('body').hasClass('menu-hidden');
                if (bodyClassHasMenuHidden === true) {
                    expect(newBodyClassHasMenuHidden).not.toBeTruthy();
                } else {
                    expect(newBodyClassHasMenuHidden).toBeTruthy();
                }
                expect(bodyClassHasMenuHidden).toBeDefined();
                expect(newBodyClassHasMenuHidden).toBeDefined();
            }
        });
    });

    describe('Initial Entries', function() {

        /* check if the length of the descendants .entry of .feed is larger than 0 */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('at least one entry on load done', function(done) {
            expect($('.feed .entry').length > 0).toBeTruthy();
            expect($('.feed .entry')).toBeDefined();
            done();
        });
    });

    describe('New Feed Selection', function() {

        var initFeed;
        var newFeed;

        /* check that allFeeds[1] results in a different html than allFeeds[0] */
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeed = $('.feed').html();
                expect(initFeed).toBeDefined();
                done();
            });
        });

        it('feed is different than previous feed on load feed', function() {
            loadFeed(1, function(done) {
                newFeed = $('.feed').html();
                expect(newFeed).toBeDefined();
                expect(initFeed).toBeDefined();
                expect(newFeed).not.toBe(initFeed);
            });
        });
    });
}());