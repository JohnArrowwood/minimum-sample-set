import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.sample( data )', function() {

    it( 'should handle the case of two data fields considered', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit');
        addSamples( mss );
        let samples = mss.selected();
        expect( samples.length ).to.equal( 9 );
    });

});