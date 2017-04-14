/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /*
     * This suite is for testing the sliding menu used to display all
     * the available RSS feeds.
     */
    describe('The Menu', function () {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default (JS)', function () {
            var hideClass = document.body.getAttribute('class');
            expect(hideClass).toContain('menu-hidden');
        });

        it('is hidden by default (jQuery)', function () {
            var hiddenClass = $('body').hasClass('menu-hidden');
            expect(hiddenClass).toBe(true);
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('becomes visible when menu icon is clicked (JS)', function () {
            var menuLink = document.getElementsByClassName('menu-icon-link');
            menuLink[0].click();
            var hideClass = document.body.getAttribute('class');
            expect(hideClass).not.toContain('menu-hidden');
            menuLink[0].click();
            hideClass = document.body.getAttribute('class');
            expect(hideClass).toContain('menu-hidden');
        });

        it('becomes visible when menu icon is clicked (jQuery)', function () {
            var menuLink = $('.menu-icon-link');
            menuLink.click();
            var hiddenClass = $('body').hasClass('menu-hidden');
            expect(hiddenClass).toBe(false);
            menuLink.click();
            hiddenClass = $('body').hasClass('menu-hidden');
            expect(hiddenClass).toBe(true);
        });

    });

    /*
     * This suite is for testing what happens when the page first loads.
     */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            // load first feed in allFeeds array
            // Since callback function only contains one call to done, it can
            // be shortened to loadFeed(0, done); instead of commented out code
            loadFeed(0, done);
            // loadFeed(0, function () {
            //     done();
            // });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('contain at least one entry (JS)', function () {
            var feedContainer = document.getElementsByClassName('feed');
            var entries = feedContainer[0].getElementsByClassName('entry');
            expect(entries.length).toBeGreaterThan(0);
        });

        it('contain at least one entry (jQuery)', function () {
            var entries = $('.feed .entry');
            console.log(entries);
            expect(entries.length).toBeGreaterThan(0);
        });

    });

    /*
     * This suite is for testing what happens when you select a new
     * feed from the RSS menu.
     */
    describe('New Feed Selection (JS)', function () {
        var feed0,
            feed1;

        beforeEach(function (done) {
            // load first feed from allFeeds array
            loadFeed(0, function () {
                // Get the text content of the first article from the first feed
                feed0 = document.getElementsByClassName('entry')[0].textContent;
                // load second feed from allFeeds array
                loadFeed(1, function () {
                    // Get the text content of the first article from the second feed
                    feed1 = document.getElementsByClassName('entry')[0].textContent;
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('loads new content', function () {
            // Compare the text content from the first article for each feed
            expect(feed0).not.toEqual(feed1);
        });
    });

    describe('New Feed Selection (jQuery)', function () {
        var feed0,
            feed1;

        beforeEach(function (done) {
            // load first feed from allFeeds array
            loadFeed(0, function () {
                // Get the text content of the first article from the first feed
                feed0 = $('.entry:first').text();
                console.log(feed0);
                // load second feed from allFeeds array
                loadFeed(1, function () {
                    // Get the text content of the first article from the second feed
                    feed1 = $('.entry:first').text();
                    console.log(feed1);
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('loads new content', function () {
            // Compare the text content from the first article for each feed
            expect(feed0).not.toEqual(feed1);
        });
    });
}());
