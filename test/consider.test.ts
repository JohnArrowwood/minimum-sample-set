import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';

describe( 'MinimumSampleSet.consider( field )', function() {

    it( 'should ignore null', function() {
        let mss = new MinimumSampleSet().consider(null);
        expect( mss.fieldList() ).to.be.empty;
    });

    it( 'should ignore undefined', function() {
        let mss = new MinimumSampleSet().consider(undefined);
        expect( mss.fieldList() ).to.be.empty;        
    });

    it( 'should ignore an empty string', function() {
        let mss = new MinimumSampleSet().consider('');
        expect( mss.fieldList() ).to.be.empty;        
    });

    it( 'should accept a string', function() {
        let mss = new MinimumSampleSet().consider('foo');
        expect( mss.fieldList() ).to.have.same.members(['foo']);    
    });

    it( 'should add to what is already there', function() {
        let mss = new MinimumSampleSet()
            .consider('foo')
            .consider('bar');
        expect( mss.fieldList() ).to.have.same.members(['foo','bar']);
    });

});