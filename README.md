# minimum-sample-set
Sample a large data set into a much smaller one by keeping only those data points that have something not seen before in previous samples.

## What's it for?

This module implements the logic of something known as "pair-wise testing" 
- where instead of testing every combination of possible values, you only 
test each distinct combination of two values.  This greatly reduces the 
number of test cases that you test.

This module offers customization of this logic, including being able to 
select which fields are taken into consideration, to ignore certain 
pairs, or to track every combination of values of certain fields.

### But why?

This module is for use in an application used by software developers
and test professionals to wrangle the number of test cases in situations
where the number of combinations makes it impossible to test them all,
not even automated.

It is meant to be used as part of a "test matrix calculator" which allows
the user to specify the parameters and their possible values, and the
application outputs a minimum set of test cases to test.

## Installation

    npm install --save minimum-sample-set

## Usage

Create the object that does the sampling:

    let mss = new MinimumSampleSet();

Tell it which fields in the data are important to you:

    // either one at a time:
    mss.consider('foo').consider('bar');

    // or all at once
    mss.considerAll( ['foo','bar'] );

You can also add fields in bulk and then remove the ones that do not apply here

    let fields = ['A','B','C','D','E'];
    ...
    mss.considerAll( fields ).ignore( 'C' );

You can also tell it to ignore select field pairings, which means that typically fewer samples will be selected for inclusion in the output.

    mss.ignorePair('A','B').ignorePair('B','C');

Or you can give it groups of fields to consider ALL combinations of:

    mss.considerGroup(['A','C','E']);

Next, push all your data samples into it:

    sample_data.forEach( record => mss.sample( record ) );

Finally, get the selected records out

    let selected_data = mss.selected();

If you need to re-use the MinimumSampleSet object, you can reset it between data sets:

    mss.reset();

## Caution - Memory Intensive

This algorithm works by keeping a hash of unique field/value combinations, and
groups of fields and their values, and pointing each at the record that produced
it.  It is intended to operate only on fields that have limited sample values, 
like enums.  If you throw unique values at the algorithm, it will select every
single record, and use up a lot of memory in the process.


