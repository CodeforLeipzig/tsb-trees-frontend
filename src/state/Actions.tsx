import { isMobile } from 'react-device-detect';
import { dsv as d3Dsv, easeCubic as d3EaseCubic } from 'd3';
import history from '../history';
import { createAPIUrl, createGeojson, requests } from '../utils';
import { FlyToInterpolator } from 'react-map-gl';
import { Store } from 'unistore';
import { SelectedTreeType, StoreProps, Generic } from '../common/interfaces';
import { TreeLastWateredType } from '../common/types';

var isLocalTesting = process.env.LOCAL_TESTING

interface TreeLastWateredResponseType {
  data: TreeLastWateredType | undefined;
}

interface SelectedTreeResponseType {
  data: SelectedTreeType[];
}

export const loadTrees = (store: Store<StoreProps>) => async () => {
  if (isMobile) {
    store.setState({
      data: {
        type: 'FeatureCollection',
        features: [],
      },
      isTreeDataLoading: false,
    });
  } else {
    if (isLocalTesting) {
      // http://localhost:8080/search?location=id-54243
      const csvData = [{
        'id': 'id-54243',
        'lng': 12.465195780349760,
        'lat': 51.436408951092531,
        'radolan_sum': 457,
        'age': 25
      }]
  
      const geojson = createGeojson(csvData);
      store.setState({ data: geojson, isTreeDataLoading: false });
      return;  
    } else {
      const dataUrl = process.env.TREE_DATA_URL || 'https://trees-radolan-harvester-leipzig-dev.s3.eu-central-1.amazonaws.com/trees.csv.gz';
      d3Dsv(',', dataUrl, { cache: 'force-cache' })
      .then(data => {
        const geojson = createGeojson(data);
        store.setState({ data: geojson, isTreeDataLoading: false });
        return;
      })
      .catch(console.error);
    }
  }
};

export const setAgeRange = (_state, payload) => {
  return {
    ageRange: payload,
  };
};

export const loadCommunityData = (store: Store<StoreProps>) => () => {
  const fetchCommunityDataUrl = createAPIUrl(
    store.getState(),
    `/get?queryType=wateredandadopted`
  );
  requests(fetchCommunityDataUrl)
    .then(json => {
      const obj = {};
      const communityDataWatered: Generic[] = [];
      const communityDataAdopted: Generic[] = [];
      // TODO: Review https://eslint.org/docs/rules/array-callback-return
      // create community data object for map
      if (json.data) {
        json.data.map(item => {
          obj[item.tree_id] = {
            adopted: item.adopted > 0 ? true : false,
            watered: item.watered > 0 ? true : false,
          };
          if (item.adopted > 0) {
            communityDataWatered.push(item.tree_id);
          }
          if (item.watered > 0) {
            communityDataAdopted.push(item.tree_id);
          }
        });
        store.setState({ communityData: obj });
        store.setState({ communityDataAdopted });
        store.setState({ communityDataWatered });
      }
      return;
    })
    .catch(console.error);
};

export const loadData = (store: Store<StoreProps>) => async () => {
  try {
    store.setState({ isTreeDataLoading: true });
    // let geojson = [];
    var rainGeojson;
    if (isLocalTesting) {
      rainGeojson = {"type":"FeatureCollection","properties":{"start":"2021-01-07 00:50:00","end":"2021-02-05 23:50:00"},"features":[{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[12.43489,51.46228],[12.44866,51.46191],[12.44808,51.45333],[12.46185,51.45296],[12.46126,51.44438],[12.43372,51.44511],[12.43489,51.46228]]]]},"properties":{"id":8911,"data":[441]}}]}
    } else {
      const dataUrl = process.env.WEATHER_DATA_URL || 'https://trees-radolan-harvester-leipzig-dev.s3.eu-central-1.amazonaws.com/weather_light.geojson.gz';
      rainGeojson = await requests(dataUrl);
    }
    store.setState({ rainGeojson });
  } catch (error) {
    console.error(error);
  }
};

export const setAppState = (_state, payload) => {
  return {
    AppState: payload,
  };
};

export const setDataView = (_state, payload) => {
  return {
    dataView: payload,
  };
};

function setViewport(_state, payload) {
  return {
    viewport: {
      longitude: payload[0],
      latitude: payload[1],
      zoom: 19,
      maxZoom: 19,
      transitionDuration: 2000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: isMobile ? 11 : 9,
      pitch: isMobile ? 0 : 45,
      bearing: 0,
    },
  };
}

function setView(_state, payload) {
  return {
    viewport: payload,
  };
}

export const getWateredTrees = Store => async () => {
  try {
    Store.setState({ isTreeDataLoading: true });
    const url = createAPIUrl(Store.getState(), '/get?queryType=watered');
    const result = await requests(url);

    if (result.data === undefined) {
      throw new Error('data is not defined on getWateredTrees');
    }
    return {
      wateredTrees: result.data.watered,
    };
  } catch (error) {
    console.error(error);
    return { wateredTrees: []};
  }
};

const calcuateRadolan = (radolanDays: number): number => radolanDays / 10;

const parseSelectedTreeResponse = (
  selectedTreeResponse: SelectedTreeResponseType
) => {
  const selectedTree = selectedTreeResponse.data[0];
  // ISSUE:141
  return {
    ...selectedTree,
    radolan_days: selectedTree.radolan_days.map(calcuateRadolan),
    radolan_sum: calcuateRadolan(selectedTree.radolan_sum),
  };
};

const parseTreeLastWateredResponse = (
  treeLastWateredResponse: TreeLastWateredResponseType
): TreeLastWateredType => treeLastWateredResponse.data || [];

export const getTree = (Store: Store<StoreProps>) => async (
  id: string
): Promise<{
  treeLastWatered?: TreeLastWateredType;
  selectedTree?: SelectedTreeType;
}> => {
  try {
    const urlSelectedTree = createAPIUrl(
      Store.getState(),
      `/get?queryType=byid&id=${id}`
    );
    const urlLastWatered = createAPIUrl(
      Store.getState(),
      `/get?queryType=lastwatered&id=${id}`
    );

    const [resSelectedTree, resLastWatered] = await Promise.all([
      requests<SelectedTreeResponseType>(urlSelectedTree),
      requests<TreeLastWateredResponseType>(urlLastWatered),
    ]);
    const treeLastWatered = parseTreeLastWateredResponse(resLastWatered);

    if (resSelectedTree.data.length > 0) {
      return {
        selectedTree: parseSelectedTreeResponse(
          resSelectedTree as SelectedTreeResponseType
        ),
        treeLastWatered,
      };
    } else {
      return {
        selectedTree: undefined,
        treeLastWatered,
      };
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const removeSelectedTree = () => {
  return {
    selectedTree: false,
    selectedTreeState: false,
  };
};

export const getTreeByAge = Store => async (
  state: any,
  start: string,
  end: string
) => {
  try {
    Store.setState({ selectedTreeState: 'LOADING' });
    const url = createAPIUrl(
      state,
      `/get??queryType=byage&start=${start}&end=${end}`
    );

    const res = await requests(url);

    Store.setState({
      selectedTreeState: 'LOADED',
      selectedTrees: res.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const toggleOverlay: (_state: any, payload: any) => { overlay: any } = (
  _state,
  payload
) => ({
  overlay: payload,
});

const setDetailRouteWithListPath = (_state, treeId) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

export default (Store: Store<StoreProps>) => ({
  loadData: loadData(Store),
  setDataView,
  getWateredTrees: getWateredTrees(Store),
  loadCommunityData: loadCommunityData(Store),
  getTree: getTree(Store),
  getTreeByAge: getTreeByAge(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  // setView,
  loadTrees: loadTrees(Store),
  removeSelectedTree,
  setAppState,
  setAgeRange,
  toggleOverlay,
});
