import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';
import { pickOne,addSamples } from './test-utils';

describe( 'MinimumSampleSet.ignore( field )', function() {

    it( 'should be uneffected by null', function() {
        let mss = new MinimumSampleSet()
        .consider('letter')
        .consider('digit')
        .consider('symbol')
        .ignore(null);
        expect( mss.fieldList() ).to.have.same.members( ['letter','digit','symbol'] );
    });

    it( 'should be uneffected by undefined', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .ignore(undefined);
        expect( mss.fieldList() ).to.have.same.members( ['letter','digit','symbol'] );
    });

    it( 'should ignore an empty string', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .ignore('');
        expect( mss.fieldList() ).to.have.same.members( ['letter','digit','symbol'] );
    });

    it( 'should ignore a field not already under consideration', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .ignore('foobar');
        expect( mss.fieldList() ).to.have.same.members( ['letter','digit','symbol'] );
    });

    it( 'should remove a field from consideration', function() {
        let mss = new MinimumSampleSet()
            .consider('letter')
            .consider('digit')
            .consider('symbol')
            .ignore('letter');
        expect( mss.fieldList() ).to.have.same.members( ['digit','symbol'] );
    });

});