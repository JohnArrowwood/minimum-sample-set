import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';

describe( 'MinimumSampleSet.considerAll( fields )', function() {

    it( 'should ignore null', function() {
        let mss = new MinimumSampleSet().considerAll(null);
        expect( mss.fieldList() ).to.be.empty;
    });

    it( 'should ignore undefined', function() {
        let mss = new MinimumSampleSet().considerAll(undefined);
        expect( mss.fieldList() ).to.be.empty;        
    });

    it( 'should ignore an empty list', function() {
        let mss = new MinimumSampleSet().considerAll([]);
        expect( mss.fieldList() ).to.be.empty;        
    });

    it( 'should accept a single field', function() {
        let mss = new MinimumSampleSet()
            .considerAll(['foo']);
        expect( mss.fieldList() ).to.have.same.members(['foo']);    
    });

    it( 'should accept two fields', function() {
        let mss = new MinimumSampleSet()
            .considerAll(['foo','bar']);
        expect( mss.fieldList() ).to.have.same.members(['foo','bar']);    
    });

    it( 'should accept three', function() {
        let mss = new MinimumSampleSet()
        .considerAll(['foo','bar','whatever']);
        expect( mss.fieldList() ).to.have.same.members(['foo','bar','whatever']);    
    });

    it( 'should replace any previously defined fields', function() {
        let mss = new MinimumSampleSet()
            .consider('foo').consider('bar')
            .considerAll(['one','two']);
        expect( mss.fieldList() ).to.have.same.members(['one','two']);    
    });
 
    it( 'should ignore any fields that are an empty string', function() {
        let mss = new MinimumSampleSet()
            .considerAll(['','A','B']);
        expect( mss.fieldList() ).to.have.same.members(['A','B']);                
    });

    it( 'should not add the same field twice', function() {
        let mss = new MinimumSampleSet()
            .considerAll(['A','B','C','B','A']);
        let list = mss.fieldList();
        expect( list.length ).to.equal( 3 );
        expect( list ).to.have.same.members(['A','B','C']);                
    });
});