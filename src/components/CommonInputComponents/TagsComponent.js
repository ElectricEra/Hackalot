import React from 'react'

class ActivitiesComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  renderList() {
    return this.props.activitiesList.map((el, index)=>{
      return (<p key={index}>
        <input type="checkbox" className="filled-in" id={"filled-in-box" + index} />
        <label htmlFor={"filled-in-box" + index}>{el}</label>
        </p>)

    })
  }
  render() {
    return (
      <div className="row left-align hl-tags">
        <div className={this.props.classList}>
          {this.renderList()}
        </div>
      </div>
    )
  }
}

export default ActivitiesComponent
