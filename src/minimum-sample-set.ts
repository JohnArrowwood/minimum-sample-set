export type FieldName = string;
export type FieldNames = { [name:string]: undefined };
       type IgnorePairing = { [field1:string]: { [field2:string]: undefined }};
export class MinimumSampleSet {

    private _fields: Set<string> = new Set<string>();
    private _order: Array<string> = [];
    private _ignore_pairs: IgnorePairing = {};
    private _groups: { [key:string]: Array<FieldName> } = {};

    private _sample_num: number = 0;
    private _samples: { [key:string]: any } = {};
    
    consider( field: FieldName ) {
        if ( field !== undefined && field !== null && field !== '' ) {
            this._fields.add( field );
            this._order.push( field );
            this._order.sort();
        }
        return this;
    }

    considerAll( fields: Array<FieldName> ) {
        this._fields = new Set<string>();
        this._order = [];
        if ( fields === undefined || fields === null ) return this;
        for ( let field of fields ) {
            if ( field && field !== '' && ! this._fields.has( field ) ) {
                this._fields.add( field );
                this._order.push( field );
            }
        }
        this._order.sort();
        return this;
    }

    considerGroup( list: Array<FieldName> ) {
        if ( list !== undefined && list !== null && list.length > 0 ) {
            let internal = list.slice();
            internal.sort();
            let key = internal.join('::');
            this._groups[key] = internal;
        }
        return this;
    }

    ignore( field: FieldName ) {
        if ( field !== undefined && field !== null && this._fields.has( field ) ) {
            this._fields.delete( field );
            this._order = [];
            for ( let name of Array.from(this._fields) ) {
                this._order.push( name );
            }
            this._order.sort();
        }   
        return this;
    }

    fieldList() {
        return this._order;
    }

    ignorePair( field1: string, field2: string ) {
        // ignore invalid inputs
        if ( field1 === null ||
             field1 === undefined ||
             field1 === '' ||
             (! this._fields.has( field1 )) ||
             field2 === null ||
             field2 === undefined ||
             field2 === '' ||
             (! this._fields.has( field2 )) 
        ) return this;
        // put the fields in order
        let one: string, two: string;
        if ( field2 < field1 ) {
            one = field2;
            two = field1;
        } else {
            one = field1;
            two = field2;
        }
        // save the pair
        if ( ! this._ignore_pairs.hasOwnProperty(one) ) this._ignore_pairs[one] = {};
        this._ignore_pairs[one][two] = undefined;
        
        return this;
    }

    sample( data: any ) {
        
        let keys: Set<string> = new Set<string>();
        let addsValue = false;
        
        // single fields and pairs of fields
        for ( let i = 0 ; i < this._order.length ; i++ ) {
            let field = this._order[i];

            // single fields
            let key = `${field}::${data[field]}`;
            keys.add(key);
            if ( ! this._samples.hasOwnProperty( key ) ) addsValue = true;

            // pairs of fields
            for ( let j = i+1 ; j < this._order.length ; j++ ) {
                let field2 = this._order[j];
                if ( this._ignore_pairs.hasOwnProperty(field) && 
                     this._ignore_pairs[field].hasOwnProperty(field2) ) 
                    continue;  // skip the pairing

                let key_pair = `[${key}]+[${field2}::${data[field2]}]`;
                keys.add(key_pair);
                if ( ! this._samples.hasOwnProperty(key_pair) ) addsValue = true;
            }

        }

        // groups of fields
        for ( let group_id in this._groups ) {
            let group = this._groups[group_id];
            let key_list = [];
            for ( let field of group ) {
                key_list.push( `[${field}::${data[field]}]` );
            }
            let key = key_list.join('+');
            keys.add(key);
            if ( ! this._samples.hasOwnProperty( key ) ) addsValue = true;
        }

        // if this sample gives us something we have never seen before, save it
        if ( addsValue ) {
            let it = { 
                id: this._sample_num++,
                data: data
            };
            for ( let key of Array.from(keys) ) {
                this._samples[key] = it;
            }
        }

        return this;
    }

    reset() {
        this._sample_num = 0;
        this._samples = {};

        return this;
    }

    selected(): Array<any> {
        let seen: Set<number> = new Set<number>();
        let result: Array<any> = [];
        for ( let key in this._samples ) {
            if ( ! seen.has( this._samples[key].id ) ) {
                seen.add( this._samples[key].id );
                result.push( this._samples[key].data );
            }
        }
        return result;
    }

}