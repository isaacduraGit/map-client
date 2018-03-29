import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import * as PIXI from 'pixi.js';
import { COLOR_HUES } from 'config';
import { BRUSH_RENDERING_STYLE, BRUSH_ZOOM_RENDERING_STYLE } from 'constants';
import { vesselSatisfiesFilters } from 'utils/heatmapTileData';
import HeatmapSubLayer from './HeatmapSubLayer';

class HeatmapLayer extends React.Component {
  componentDidMount() {
    this._build();
  }

  componentWillUnmount() {
    this._destroy();
  }

  componentDidUpdate() {
    this._redraw();
  }

  componentWillReceiveProps(nextProps) {
    const prevLayer = this.props.layer;
    const newLayer = nextProps.layer;
    if (newLayer.visible !== prevLayer.visible) {
      this.toggleVisibility(newLayer.visible);
    }
    if (newLayer.opacity !== prevLayer.opacity) {
      this.setOpacity(newLayer.opacity);
    }
    // if (newLayer.hue !== prevLayer.hue) {
    //   this.setDefaultHue(newLayer.hue);
    // }
    if (nextProps.useRadialGradientStyle !== this.props.useRadialGradientStyle) {
      this.setBrushZoomRenderingStyle(nextProps.useRadialGradientStyle);
    }
  }

  _build() {
    const { layer, rootStage, useRadialGradientStyle, customRenderingStyle } = this.props;
    this.subLayers = {};
    this.renderingStyle = (layer.header && layer.header.rendering) ? layer.header.rendering : customRenderingStyle;

    this.setBrushRenderingStyle(this.renderingStyle.style);
    this.setBrushZoomRenderingStyle(useRadialGradientStyle);

    this.stage = new PIXI.Container();

    this.toggleVisibility(layer.visible);
    const defaultHue = layer.hue !== undefined ? layer.hue : COLOR_HUES[Object.keys(COLOR_HUES)[0]];
    this.setDefaultHue(defaultHue);
    this.setOpacity(layer.opacity);

    rootStage.addChild(this.stage);
  }

  toggleVisibility(visible) {
    this.stage.visible = visible;
  }

  setOpacity(opacity) {
    this.stage.alpha = opacity;
  }

  setDefaultHue(hue) {
    this.defaultHue = hue;
  }

  setBrushRenderingStyle(style = BRUSH_RENDERING_STYLE.NORMAL) {
    if (typeof style === 'string') {
      this.brushRenderingStyle = BRUSH_RENDERING_STYLE[style.toUpperCase()];
    } else {
      this.brushRenderingStyle = style;
    }
    this._setBrushRenderingStyleIndex();
  }

  setBrushZoomRenderingStyle(useRadialGradientStyle) {
    this.brushZoomRenderingStyle = (useRadialGradientStyle === true)
      ? BRUSH_ZOOM_RENDERING_STYLE.RADIAL_GRADIENT
      : BRUSH_ZOOM_RENDERING_STYLE.CIRCLE;
    this._setBrushRenderingStyleIndex();
  }

  _setBrushRenderingStyleIndex() {
    // only NORMAL brush styles support different zoom styles
    const cappedZoomRenderingStyle = (this.brushRenderingStyle === BRUSH_RENDERING_STYLE.NORMAL) ? this.brushZoomRenderingStyle : 0;
    const newStyleIndex = this.brushRenderingStyle + cappedZoomRenderingStyle;
    if (newStyleIndex === this.renderingStyleIndex) {
      return;
    }
    this.renderingStyleIndex = newStyleIndex;
    Object.values(this.subLayers).forEach((subLayer) => {
      subLayer.setRenderingStyleIndex(this.renderingStyleIndex);
    });
  }

  _redraw() {
    //  offsets
    const { layer, data, startIndex, endIndex, filters, baseTexture, maxSprites } = this.props;
    const tiles = data.tiles;
    const defaultHue = this.defaultHue;

    const allHuesToRender = (filters !== undefined && filters.length)
      ? filters
      // pass is set to true by filterGroupActions when none of the filters fields
      // in the filter group is supported by the layer headers
        .filter(f => f.pass !== true)
        .map(f => f.hue.toString())
      : [defaultHue.toString()];
    const currentlyUsedHues = Object.keys(this.subLayers);

    // get all hues, old and new
    const allHues = uniq(allHuesToRender.concat(currentlyUsedHues));

    for (let i = 0; i < allHues.length; i++) {
      const hue = allHues[i];
      if (allHuesToRender.indexOf(hue) === -1) {
        // not on new hues: delete sublayer
        this._destroySubLayer(this.subLayers[hue]);
        delete this.subLayers[hue];
        continue;
      }
      if (currentlyUsedHues.indexOf(hue) === -1) {
        // not on old hues: create sublayer
        this.subLayers[hue] = this._createSublayer(baseTexture, maxSprites, this.renderingStyleIndex, hue);
      }
      this.subLayers[hue].spritesProps = [];
    }

    if (!allHuesToRender.length) return;

    tiles.forEach((tile) => {
      this._setSubLayersSpritePropsForTile({
        data: tile.data,
        startIndex,
        endIndex,
        // offsets,
        filters,
        numFilters: filters.length,
        defaultHue
      });
    });

    allHuesToRender.forEach((hue) => {
      this.subLayers[hue].render();
    });
  }

  _setSubLayersSpritePropsForTile({ data, startIndex, endIndex, /* offsets, */ filters, numFilters, defaultHue }) {
    if (!data /* || offsets === undefined */) {
      return;
    }

    for (let timeIndex = startIndex; timeIndex < endIndex; timeIndex++) {
      const frame = data[timeIndex];

      if (!frame) continue;

      for (let index = 0, len = frame.worldX.length; index < len; index++) {
        let hue;
        if (filters === undefined || !filters.length) {
          hue = defaultHue;
        }
        for (let fi = 0; fi < numFilters; fi++) {
          const filter = filters[fi];
          if (vesselSatisfiesFilters(frame, index, filter.filterValues)) {
            hue = filter.hue;
            break;
          }
        }

        // no filter passes: bail
        if (hue === undefined) {
          continue;
        }

        // const worldX = frame.worldX[index];
        // let originX = offsets.left;
        // if (originX > worldX) {
        //   originX -= 256;
        // }

        const spriteProps = {
          // x: (worldX - originX) * offsets.scale,
          // y: ((frame.worldY[index] - offsets.top) * offsets.scale),
          alpha: (frame.opacity) ? frame.opacity[index] : this.renderingStyle.defaultOpacity,
          scale: (frame.radius) ? frame.radius[index] : this.renderingStyle.defaultSize
        };
        if (Object.prototype.hasOwnProperty.call(this.subLayers, hue)) {
          this.subLayers[hue].spritesProps.push(spriteProps);
        }
      }
    }
  }

  _createSublayer(baseTexture, maxSprites, renderingStyleIndex, hue) {
    const subLayer = new HeatmapSubLayer(baseTexture, maxSprites, renderingStyleIndex, hue);
    this.stage.addChild(subLayer.stage);
    return subLayer;
  }

  _destroy() {
    Object.values(this.subLayers).forEach(this._destroySubLayer);
    this.stage.destroy({ children: true });
    const { rootStage } = this.props;
    rootStage.removeChild(this.stage);
  }

  _destroySubLayer(subLayer) {
    this.stage.removeChild(subLayer.stage);
    subLayer.destroy();
  }

  render() {
    return null;
  }
}

HeatmapLayer.propTypes = {
  layer: PropTypes.object,
  data: PropTypes.object,
  rootStage: PropTypes.object,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  filters: PropTypes.array,
  baseTexture: PropTypes.object,
  maxSprites: PropTypes.number,
  useRadialGradientStyle: PropTypes.bool,
  customRenderingStyle: PropTypes.object
};

export default HeatmapLayer;
