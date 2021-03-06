import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import Tabs from './Tabs'
import Tab from './Tab'
import HeroInfo from './HeroInfo'
import HeroSlides from './HeroSlides'
import HeroOperate from './HeroOperate'
import HeroSkills from './HeroSkills'

import '../res/Jumbotron.less'

class Jumbotron extends React.Component {
  static propTypes = {
    hero: PropTypes.objectOf(Immutable.Map)
  }
  static defaultProps = {
    hero: null
  }
  render() {
    // const name = this.props.hero.getIn(['data', 'name'])
    // const title = this.props.hero.getIn(['data', 'title'])
    // const blurb = this.props.hero.getIn(['data', 'blurb'])
    // const tag = this.props.hero.getIn(['data', 'tags'])
    // const attribute = this.props.hero.getIn(['data', 'info'])

    if (!this.props.hero) {
      return null
    }
    const data = this.props.hero.get('data')
    if (!data) {
      return null
    }
    const { name, title, blurb, tags, info, skins, allytips, enemytips, passive, spells } = data.toJS()

    return (
      <div className="jumbotron">
        <div className="jumbotron-fore">
          <div className="jumbotron-title">
            <h1>{name} {title}</h1>
          </div>
          <Tabs>
            <Tab id="hero-info" title="背景">
              <HeroInfo blurb={blurb} tags={tags} heroAttr={info} />
            </Tab>
            <Tab id="hero-skill" title="技能" >
              <HeroSkills passive={passive} spells={spells} />
            </Tab>
            <Tab id="hero-use" title="操作" >
              <HeroOperate allytips={allytips} enemytips={enemytips} name={name} />
            </Tab>
          </Tabs>
        </div>
        <div className="jumbotron-back">
          <HeroSlides imgs={skins} />
        </div>
      </div>
    )
  }
}

export default Jumbotron
