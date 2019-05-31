import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import convert from '@globalfishingwatch/map-convert'
import { LAYER_TYPES, ENCOUNTERS_AIS } from 'app/constants'
import { FORMAT_DATE } from 'app/config'
import PopupStyles from 'styles/components/map/popup.module.scss'
import moment from 'moment'

const getPopupData = (event, layerTitle) => {
  if (event.layer.id === ENCOUNTERS_AIS) {
    const encounter = event.target.properties
    const date = convert.getTimestampFromOffsetedtTimeAtPrecision(encounter.timeIndex)
    const featureTitle = moment(date)
      .utc()
      .format(FORMAT_DATE)
    return {
      layerTitle,
      featureTitle,
    }
  } else if (event.type === 'static') {
    return {
      layerTitle,
      featureTitle: event.target.featureTitle,
    }
  } else if (event.type === 'activity') {
    let featureTitle
    const objects = event.target.objects

    if (event.layer.subtype === LAYER_TYPES.Encounters) {
      const foundVessel = objects[0]
      if (foundVessel.timeIndex) {
        const date = new Date(
          convert.getTimestampFromOffsetedtTimeAtPrecision(foundVessel.timeIndex)
        )
        featureTitle = moment(date)
          .utc()
          .format(FORMAT_DATE)
      }
    } else {
      const numVessels = objects === undefined ? 'multiple' : objects.length
      const vesselPlural = objects === undefined || objects.length > 1 ? 'objects' : 'object'
      featureTitle = `${numVessels} ${vesselPlural} at this location`
    }
    return {
      layerTitle,
      featureTitle,
    }
  }
  return null
}

const HoverPopup = (props) => {
  const { event, layerTitle } = props
  const popup = getPopupData(event, layerTitle)
  return (
    <div className={classnames(PopupStyles.popup, PopupStyles._compact)}>
      {popup.layerTitle}: {popup.featureTitle}
    </div>
  )
}

HoverPopup.propTypes = {
  event: PropTypes.shape({
    type: PropTypes.string.isRequired,
    layer: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    target: PropTypes.shape({
      properties: PropTypes.object,
      objects: PropTypes.array,
      featureTitle: PropTypes.string,
    }),
  }).isRequired,
  layerTitle: PropTypes.string.isRequired,
}

export default HoverPopup