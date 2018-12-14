import React from 'react';

export default class InputComponent extends React.Component {
	render() {
		const elementId = this.props.id || Math.floor(Math.random()*10000)
		return (
			<div className="row">
				<div className="input-field col s12">
					<input id={elementId}
						   type={this.props.type || 'text'}
						   placeholder={this.props.placeholder || ''}
						   className={this.props.classList || ''} />
	                <label htmlFor={elementId}>{this.props.labelText}{!this.props.optional ? <span className="red-star">*</span> : null}</label>
            	</div>
            </div>
		)
	}
}
