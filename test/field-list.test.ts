import { expect } from 'chai';
import 'mocha';

import { MinimumSampleSet } from '../src/minimum-sample-set';

describe( 'MinimumSampleSet.fieldList()', function() {

    it( 'should return an empty array if there are no fields', function() {
        let mss = new MinimumSampleSet();
        expect( mss.fieldList() ).to.be.empty;
    });

    it( 'should return one field successfully', function() {
        let mss = new MinimumSampleSet().consider('foo');
        expect( mss.fieldList() ).to.have.same.members( ['foo'] );
    });

    it( 'should return multiple fields in sorted order', function() {
        let mss = new MinimumSampleSet()
            .consider('B')
            .consider('C')
            .consider('A');
        let list = mss.fieldList();
        let A = list.indexOf('A');
        let B = list.indexOf('B');
        let C = list.indexOf('C');
        expect( A ).to.be.lessThan( B );
        expect( B ).to.be.lessThan( C );
    });

});