import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.selected()', function() {

    it( 'initially returns an empty array', function() {
        let mss = new MinimumSampleSet()
            .consider('letter');
        expect( mss.selected() ).to.be.empty;
    });

    it( 'is empty after a reset', function() {
        let mss = new MinimumSampleSet()
            .consider('letter');
        addSamples(mss);
        mss.reset();
        expect( mss.selected() ).to.be.empty;
    });

    it( 'returns the set of distinct samples', function() {
        let mss = new MinimumSampleSet()
            .consider('letter');
        addSamples(mss);
        expect( mss.selected().map( (d) => d.letter ) )
            .to.have.same.members( ['a','b','c'] );        
    });

    it( 'can be called twice - calling it does not modify anything', function() {
        it( 'returns the set of distinct samples', function() {
            let mss = new MinimumSampleSet()
                .consider('letter');
            addSamples(mss);
            expect( mss.selected().map( (d) => d.letter ) )
                .to.have.same.members( ['a','b','c'] );        
            expect( mss.selected().map( (d) => d.letter ) )
                .to.have.same.members( ['a','b','c'] );        
        });
    
    });

});