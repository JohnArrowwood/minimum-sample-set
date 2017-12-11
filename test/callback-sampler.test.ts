import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';

describe( "MinimumSampleSet.callbackSampler()", function() {

    function generator( callback: Function ) {
        for ( let letter of ['A','B','C'] ) {
            for ( let digit of ['1','2','3'] ) {
                for ( let symbol of ['!','@','#'] ) {
                    callback({
                        letter: letter,
                        digit: digit,
                        symbol: symbol
                    });
                }
            }
        }
    }

    it( 'should return a function that can be passed into another function to use as a callback', function() {
        let mss = new MinimumSampleSet()
            .considerAll(['letter','digit','symbol']);
        generator( mss.callbackSampler() );
        let output = mss.selected();
        expect( output.length ).to.be.lessThan( 27 );
    });
});