import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../preview-collection/preview-collection.component';
import {selectCollectionForPreview} from '../../redux/shop/shop.selector';
import './collections-overview.styles.scss';


const collectionsOverview = ({collections})=>(
    <div className="collection-overview">
        {
                    collections.map(({id,...otherCollectionProps})=>(
                        <CollectionPreview key={id} {...otherCollectionProps} />
                    ))
                }

    </div>
);
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps)(collectionsOverview);
