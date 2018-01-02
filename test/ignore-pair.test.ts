import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.ignorePair( field, field )', function() {

    function base() {
        return new MinimumSampleSet()
            .consider('letter')
            .consider('digit');
    }
    function test(mss) {
        addSamples(mss);
        return mss.selected();
    }
    function testCountIs( count: number, mss: MinimumSampleSet ) {
        let selected = test(mss);
        if ( selected.length !== count ) {
            console.log( selected );
        }
        expect( selected.length ).to.equal( count );
    }
    function testCountLessThan( count: number, mss: MinimumSampleSet ) {
        let selected = test(mss);
        expect( selected.length ).to.be.lessThan( count );
    }

    it( 'should ignore if field1 is null', function() {
        testCountIs( 9, base().ignorePair(null,'letter') );
    });
    it( 'should ignore if field2 is null', function() {
        testCountIs( 9, base().ignorePair('letter',null) );
    });
    it( 'should ignore if field1 is undefined', function() {
        testCountIs( 9, base().ignorePair(undefined,'letter') );
    });
    it( 'should ignore if field2 is undefined', function() {
        testCountIs( 9, base().ignorePair('letter',undefined) );
    });
    it( 'should ignore if field1 is an empty string', function() {
        testCountIs( 9, base().ignorePair('','letter') );
    });
    it( 'should ignore if field2 is an empty string', function() {
        testCountIs( 9, base().ignorePair('letter','') );
    });
    it( 'should ignore if field1 is not under consideration', function() {
        testCountIs( 9, base().ignorePair('other','letter') );
    });
    it( 'should ignore if field2 is not under consideration', function() {
        testCountIs( 9, base().ignorePair('letter','other') );
    });
    it( 'should filter out the pair', function() {
        testCountLessThan( 9, base().ignorePair('letter','digit') );
    });
    it( 'should filter out the pair regardless of pair order', function() {
        testCountLessThan( 9, base().ignorePair('digit','letter') );
    });
    it( 'should allow filtering out more than one pair', function() {
        testCountLessThan( 6, 
            base()
            .consider('symbol')
            .ignorePair('digit','letter')
            .ignorePair('letter','symbol')
            .ignorePair('digit','symbol')
        );
    });
    it( 'should allow filtering out a pair to be conditional', function() {
        testCountIs( 7, 
            new MinimumSampleSet()
            //.consider('letter')
            .consider('digit')
            .consider('symbol')
            //.consider('others')
            .ignorePair('digit','symbol','symbol==="@"')
            //.ignorePair('letter','symbol','symbol==="@"')
            //.ignorePair('other','symbol','symbol==="@"')
        )
    });

});