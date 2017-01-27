import { connect } from 'react-redux';
import MapLayers from 'components/Layers/MapLayers';
import { showPolygon } from 'actions/report';
import { getTile, releaseTile, queryHeatmap } from 'actions/heatmap';

const mapStateToProps = state => ({
  token: state.user.token,
  zoom: state.map.zoom,
  layers: state.layers.workspaceLayers,
  flagsLayers: state.filters.flagsLayers,
  heatmap: state.heatmap,
  timelineOverallExtent: state.filters.timelineOverallExtent, // TODO remove
  timelineInnerExtent: state.filters.timelineInnerExtent,
  timelineInnerExtentIndexes: state.filters.timelineInnerExtentIndexes,
  timelineOuterExtent: state.filters.timelineOuterExtent,
  timelineOverExtent: state.filters.timelineOverExtent,
  timelinePaused: state.filters.timelinePaused,
  vesselTracks: state.vesselInfo.tracks,
  reportLayerId: state.report.layerId,
  reportedPolygonsIds: state.report.polygonsIds
});

const mapDispatchToProps = dispatch => ({
  showPolygon: (polygonData, latLng) => {
    dispatch(showPolygon(polygonData, latLng));
  },
  createTile: (uid, coordinates, canvas, map) => {
    dispatch(getTile(uid, coordinates, canvas, map));
  },
  releaseTile: (uid) => {
    dispatch(releaseTile(uid));
  },
  queryHeatmap: (tileQuery, latLng) => {
    dispatch(queryHeatmap(tileQuery, latLng));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapLayers);
