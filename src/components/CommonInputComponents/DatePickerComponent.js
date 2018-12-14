import React from 'react'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
      console.log($("body"))
    $('#' + this.props.id).pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 105, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true // Close upon selecting a date,
    });
  }


  render() {
    return (
      <div className="row">
        <input id={this.props.id} type="text" className="datepicker" placeholder={this.props.title}/>
      </div>
    )
  }
}

export default DatePicker
