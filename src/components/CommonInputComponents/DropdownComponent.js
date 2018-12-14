import React from 'react'

class DropdownComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    $('#' + this.props.id).material_select();
  }

  renderList() {
    return this.props.optionList.map((el, index)=>{
      return <option key={index} value={index}>{el}</option>
    })
  }
  render() {
    return (
      <div className="row">
        <div className={this.props.classList || ''}>
          <select id={this.props.id}>
            {this.renderList()}
          </select>
          <label>{this.props.title}{!this.props.optional ? <span className="red-star">*</span> : null}</label>
        </div>
      </div>
    )
  }
}

export default DropdownComponent
