import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'

import ExpandButtonStyles from 'styles/components/shared/expand-button.module.scss'

class ExpandButton extends Component {
  render() {
    return (
      <button
        onClick={this.props.onExpand}
        className={classnames(ExpandButtonStyles.expandButton, {
          [ExpandButtonStyles._expanded]: this.props.isExpanded,
        })}
      />
    )
  }
}

ExpandButton.propTypes = {
  isExpanded: PropTypes.bool,
  onExpand: PropTypes.func,
}

export default ExpandButton
