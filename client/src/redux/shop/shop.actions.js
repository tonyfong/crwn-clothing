import ShopActionTypes from './shop.types';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.util';

export const fetchCollectionsStart =() => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartsAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart());

        // fetch(
        //   "https://firestore.googleapis.com/v1/projects/crwn-1769f/databases/(default)/documents/collections"
        // )
        //   .then(response => response.json())
        //   .then(collections => console.log(collections));
    
        collectionRef.get().then(snapshot => {
          const collectionsMap = convertCollectionSnapshotToMap(snapshot);
          dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
};