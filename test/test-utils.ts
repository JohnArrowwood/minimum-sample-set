import { MinimumSampleSet } from '../src/index';

let letters = ['a','b','c'];
let digits  = ['1','2','3'];
let symbols = ['!','@','#'];
let others  = ['x','y','z'];

export function pickOne(list: Array<any>) {
    return list[ Math.floor( Math.random() * list.length ) ];
}

export function addSamples( mss: MinimumSampleSet ) {
    for ( let i = 0 ; i < 1000 ; i++ ) {
        mss.sample({ 
            letter: pickOne( letters ),
            digit:  pickOne( digits ),
            symbol: pickOne( symbols ),
            other:  pickOne( others ),
            i: i
        });
    }
}
