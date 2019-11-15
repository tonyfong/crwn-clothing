import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../../page/collection/collection.component";

import { fetchCollectionsStartsAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapShot = null;

  componentDidMount() {
    const { fetchCollectionsStartsAsync } = this.props;
    fetchCollectionsStartsAsync();
  }

  render() {
    const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionName`}
          render={props => (
            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionsFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartsAsync: () => dispatch(fetchCollectionsStartsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
