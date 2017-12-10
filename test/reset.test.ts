import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.reset()', function() {

    it( 'should clean out the stored samples', function() {
        let mss = new MinimumSampleSet()
            .consider('letter');
        addSamples(mss);
        expect( mss.selected().length ).to.equal(3);
        mss.reset();
        expect( mss.selected().length ).to.equal(0);
    });

    it( 'should not matter if there are no samples', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .reset();
        expect( mss.selected().length ).to.equal(0);
        addSamples(mss);
        expect( mss.selected().length ).to.equal(3);            
    });

});