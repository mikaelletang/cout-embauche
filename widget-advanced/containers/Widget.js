import React  from 'react'
import {connect} from 'react-redux'
import {formValueSelector} from 'redux-form'
import InfoZone from '../components/InfoZone'
import InputSection from '../components/InputSection'
import Results from '../containers/Results'
import Affiliation from '../components/Affiliation'
import {INITIAL_REQUEST, TOGGLE_ADVANCED_SECTION, UNSUBMIT_ALL} from '../actions'

let selector = formValueSelector('basicInput')

@connect(state => ({
	activeSection: state.activeSections.top,
	showAdvanced: state.activeSections.advanced,
	infoAlternance: selector(state, 'typeEmployé') == 'apprenti',
	basicInputTouched: state.form.basicInput && (
		state.form.basicInput.active || state.form.basicInput.anyTouched),
}), dispatch => ({
	makeInitialRequest: () => dispatch({type: INITIAL_REQUEST}),
	toggleAdvancedSection: () => {
		dispatch({type: UNSUBMIT_ALL})
		dispatch({type: TOGGLE_ADVANCED_SECTION})
	},
}))
export default class Widget extends React.Component {
	render() {
		let {activeSection, showAdvanced, toggleAdvancedSection, basicInputTouched} = this.props
		return (
				<div>
					<InputSection
						showInput={activeSection == 'input'}
						showAdvanced={showAdvanced}
						toggleAdvancedSection={toggleAdvancedSection}
						basicInputTouched={basicInputTouched}
					/>
					<InfoZone infoAlternance={this.props.infoAlternance} />
					<Results showDetails={activeSection == 'details'}/>
					<Affiliation />
				</div>
		)
	}
	componentDidMount() {
		this.props.makeInitialRequest()
	}
}