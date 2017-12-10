import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.sample( data )', function() {

    it( 'should handle the case of three data fields considered', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol');
        addSamples( mss );
        let samples = mss.selected();
        // should return less than it would
        // if we were doing permutations, e.g. 3*3*3
        // note, actual value is around 13 or so
        expect( samples.length ).to.be.lessThan( 27 );
    });

});