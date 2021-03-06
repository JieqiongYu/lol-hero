import { connect } from 'react-redux'

import HerosList from '../components/HerosList'
import actionCreators from '../actions/hero-action-creators'

const mapStateToProps = state => ({ selectedHero: state.getIn(['hero', 'selectedHero']) })
const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    selectHero(heroID) {
      if (heroID) {
        dispatch(actionCreators.loadHero(heroID))
        dispatch(actionCreators.selectHero({ heroID: { heroID }, position: ownProps.position }))
      } else {
        dispatch(actionCreators.selectHero({ heroID: null, position: null }))
      }
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HerosList)

// 如果使用 bindActionCreator的话，mapDispatchToProps的actions中的方法被调用一次，只能发起一次action，并调用dispatch一次，在这里，如果选中一个英雄的话，需要修改state中的selectedHero，selectedPosition，并且需要去加载英雄的具体信息，涉及到两次手动调用dispatch的过程，因此不能使用bindActionCreator
