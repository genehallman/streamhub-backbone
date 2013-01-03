define(['views/ContentView', 'models/Content', 'test/fixtures/sdkContentData'],
function (ContentView, Content, sdkContentData) {
    describe ("ContentView", function () {
        // Set up HTML fixture
        beforeEach(function () {
            setFixtures('<div id="hub"></container>');
            this.$el = $('#hub');
        })
        // Users should be able to pass any HTML to display
        // custom (non-hosted) Content
        describe ("with model from raw html", function () {
          beforeEach(function () {
            this.c = new Content("<p>Woo</p>")
          });
          testContentView();
        });
        // Users should be able to create Content from
        // items returned from the StreamHub JavaScript SDK
        describe ("with model .fromSdk", function () {
          beforeEach(function () {
            this.c = new Content.fromSdk(sdkContentData)
          })
          testContentView();
        });
        function testContentView () {
            beforeEach(function () {
                this.cv = new ContentView({
                    model: this.c,
                    el: '#hub'
                });
            })
            it ("can be constructed", function () {
               expect(this.cv).toBeDefined;
               expect(this.cv instanceof ContentView).toBe(true);
            });
            it ("can be constructed without an element", function () {
                var cv = new ContentView({
                    model: this.c
                })
                expect(cv instanceof ContentView).toBe(true);
            });
            it ("el has class of .hub-content", function () {
                expect(this.$el).toBe('.hub-content');  
            });
            it ("contains the provided html", function () {
                var providedHtml = this.c.get('html');
                expect(this.$el.html().indexOf(providedHtml)).not.toBe(-1);
            });
        }
    });
});
