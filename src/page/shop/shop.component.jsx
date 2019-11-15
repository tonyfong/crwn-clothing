import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../page/collection/collection.component";

import { updateCollections } from "../../redux/shop/shop.actions";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.util";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    
    fetch('https://firestore.googleapis.com/v1/projects/crwn-1769f/databases/(default)/documents/collections')
    .then(response=>response.json()).then(collections=> console.log(collections));

    this.unsubscribeFromSnapShot = collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading : false});}
    );
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => (<CollectionOverviewWithSpinner isLoading={loading} {...props}/>)}/>
        <Route
          path={`${match.path}/:collectionName`}
          render={(props) => (<CollectionPageWithSpinner isLoading={loading} {...props}/>)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
