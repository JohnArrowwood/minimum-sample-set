import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.considerGroup( data )', function() {
    

    it( 'should ignore null', function() {        
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .considerGroup(null);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.be.lessThan( 27 );
    });
        
    it( 'should ignore undefined', function() {        
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .considerGroup(undefined);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.be.lessThan( 27 );
    });

    it( 'should ignore an empty group', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .considerGroup([]);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.be.lessThan( 27 );
    });

    it( 'should allow a group of one', function() {
        let mss = new MinimumSampleSet()
            .considerGroup(['letter']);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.equal( 3 );
    });

    it( 'should allow a group of two', function() {
        let mss = new MinimumSampleSet()
            .considerGroup(['letter','digit']);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.equal( 9 );
    });

    it( 'should allow a group of three', function() {
        let mss = new MinimumSampleSet()
            .considerGroup(['letter','digit','symbol']);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.equal( 27 );
    });

    it( 'should allow a group of four', function() {
        let mss = new MinimumSampleSet()
            .considerGroup(['letter','digit','symbol','other']);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.equal( 81 );
    });

    it( 'should treat a missing field as undefined and not count', function() {
        let mss = new MinimumSampleSet()
            .considerGroup(['letter','digit','missing-symbol']);
        addSamples(mss);
        let selected = mss.selected();
        expect( selected.length ).to.equal( 9 );

    });

});