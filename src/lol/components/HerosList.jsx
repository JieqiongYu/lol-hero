import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Immutable from 'immutable'

import HeroCover from './HeroCover'

import '../res/HerosList.less'

class HerosList extends React.Component {
  static propTypes = {
    heros: PropTypes.objectOf(Immutable.List).isRequired,
    hasSelection: PropTypes.bool.isRequired,
    selectedHero: PropTypes.objectOf(Immutable.Map),
    actions: PropTypes.shape({
      selectHero: PropTypes.func.isRequired
    }).isRequired
  }
  static defaultProps = {
    selectedHero: Immutable.fromJS({})
  }
  shouldComponentUpdate(nextProps) {
    let shouldUpdate = false
    if (nextProps.hasSelection !== this.props.hasSelection) {
      shouldUpdate = true
    } else if (nextProps.selectedHero !== this.props.selectedHero) {
      shouldUpdate = true
    }

    if (nextProps.heros !== this.props.heros) {
      shouldUpdate = true
    }

    return shouldUpdate
  }
  render() {
    const heroCovers = this.props.heros.map((hero) => {
      const title = hero.get('title')
      const imgPos = hero.get('position')
      const area = hero.get('area')
      const url = hero.get('url')
      const startIndex = url.lastIndexOf('/')
      const endIndex = url.indexOf('_')
      const heroID = url.slice(startIndex + 1, endIndex)

      return (
        <HeroCover
          key={title + area}
          hero={{ title, imgPos, url, area, heroID }}
          hasSelection={this.props.hasSelection}
          selectedHero={this.props.selectedHero}
          selectAction={this.props.actions.selectHero}
        />
      )
    }).toArray()
    return (
      <ul className="hero-carousel">
        {heroCovers}
      </ul>
    )
  }
}

export default HerosList

// let url = this.props.heros.getIn([3, 'url'])
//     if (url) {
//       let startIndex = url.lastIndexOf('/')
//       let endIndex = url.indexOf('_')
//       console.log(url.slice(startIndex+1, endIndex))
//     }
