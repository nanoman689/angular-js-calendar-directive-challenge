describe('Calendar Directive', function(){
    var $compile, $rootScope, element, elm;
    
    beforeEach(module('calendarDemoApp'));
    
    beforeEach(module('template.html'));
    
    beforeEach(inject(function(_$compile_, _$rootScope_ ){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        
        element = $compile("<calendar></calendar>")($rootScope);
        $rootScope.$digest();
        elm = element[0]; // grab raw html
    }));
    
    it('should have a select input', function(){
        var selectElement = elm.querySelector('select');
        expect(selectElement).not.toBe(null);
    });
    
});