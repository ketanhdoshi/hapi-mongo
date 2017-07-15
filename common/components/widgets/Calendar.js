// -----------------------------------------------------------------
// Presentational component for a Date Picker widget
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import '../../scss/rdp.css';    // 3rd party CSS for react-day-picker component

import s from '../../scss/Calendar.scss'

const SELECT_TYPE_SINGLE = "Single";
const SELECT_TYPE_MULTI = "Multi";
const SELECT_TYPE_RANGE = "Range";

// -----------------------------------------------------------------
// Input field component which pops up a DatePicker widget to populate
// its value
// -----------------------------------------------------------------
const DayPickerInputField = (props) => (
    <div>
      <p>Please type a day:</p>
      <DayPickerInput placeholder="MM/DD/YYYY" />
    </div>
)

// -----------------------------------------------------------------
// DatePicker component which has many options which can be set
// via props. It can work in different modes which deteremine how
// the date selection is done viz. select a single date, select multiple
// dates or select a date range. You can pass in a selectType prop to 
// choose which mode it should work in
// -----------------------------------------------------------------
class DayPickerSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleSelect: null, // stores the selected date in Single Select mode
            multiSelect: [],    // stores the selected dates in Multi Select mode
            from: null, // stores the start date in Range mode
            to: null,   // stores the end date in Range mode
            selectType: props.selectType
        } ;
        
        // This binding is necessary to make `this` work in the handleDayClick callback
        // Without it, 'this' will be undefined in the callback and calling this.setState 
        // in the callback will give an error
        // See https://facebook.github.io/react/docs/handling-events.html
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }
    
    // Called when a props are about to change. We use it to handle the
    // passing in of a different selectType
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectType != this.state.selectType) {
            // If the selectType has changed, save the new value
            // and reset all the selected dates
            this.setState({
                singleSelect: null,
                multiSelect: [],
                from: null,
                to: null,
                selectType: nextProps.selectType
            });
        }
    }
    
    // Callback to handle selection of a date in the picker
    handleDayClick (day, { selected }) {
        switch (this.state.selectType) {
            case SELECT_TYPE_RANGE:
                // Save the selected date range - either the start date or the
                // end date
                const range = DateUtils.addDayToRange(day, this.state);
                this.setState(range);
                break;
            case SELECT_TYPE_MULTI:
                // Get the array of previously selected days
                const { multiSelect } = this.state;

                // Toggle the clicked day by add or removing it from the array
                if (selected) {
                    // If the clicked day was previously selected, remove it from the array
                    const selectedIndex = multiSelect.findIndex(selectedDay =>
                        DateUtils.isSameDay(selectedDay, day)
                    );
                    multiSelect.splice(selectedIndex, 1);
                } 
                else {
                    // If the clicked day wasn't previously selected, add it to the array
                    multiSelect.push(day);
                }

                this.setState({ multiSelect });
                break;
            case SELECT_TYPE_SINGLE:
                // Toggle the selected day
                this.setState({
                    singleSelect: selected ? undefined : day
                });    
                break;
        }
    };
    
    // Callback to reset the selected dates
    handleResetClick (e) {        
        e.preventDefault();
        this.setState({
            singleSelect: null,
            multiSelect: [],
            from: null,
            to: null,
        });
    };
    
    render() {
        const { from, to, multiSelect, singleSelect, selectType } = this.state;
        const { numMonths } = this.props;
        let selectedDays = null;
        switch (selectType) {
            case SELECT_TYPE_RANGE:
                selectedDays = [from, { from, to }];
                break;
            case SELECT_TYPE_MULTI:
                selectedDays = multiSelect;
                break;
            case SELECT_TYPE_SINGLE:
                selectedDays = singleSelect;
                break;
        }
            
        return (
            <div>
                <DayPicker 
                    selectedDays={selectedDays}
                    onDayClick={this.handleDayClick}
                    numberOfMonths={numMonths}
                    fixedWeeks
                    enableOutsideDays
                />
                <a href="." onClick={this.handleResetClick}>Reset</a>
            </div>
        )
    }
}

// -----------------------------------------------------------------
// This component constructs the overall page. It is not meant to be
// a reusable widget, but an orchestrator for the widgets on this
// page. It allows you to select various options which it passes in
// as props to those widgets
// -----------------------------------------------------------------
class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numMonths: 2,
            selectType: SELECT_TYPE_MULTI
        } ;
        
        // This binding is necessary to make `this` work in the handleXXX callback
        // Without it, 'this' will be undefined in the callback and calling this.setState 
        // in the callback will give an error
        // See https://facebook.github.io/react/docs/handling-events.html
        this.handleOptionNumMonths = this.handleOptionNumMonths.bind(this);
        this.handleOptionSelectType = this.handleOptionSelectType.bind(this);
    }

    // Callback for the Number Of Months option
    handleOptionNumMonths (e) {        
        const numMonths = parseInt (e.target.value) || 1;
        this.setState({ numMonths });
    };

    // Callback for the Select Type option
    handleOptionSelectType (e) {        
        const selectType = e.target.value || SELECT_TYPE_RANGE;
        this.setState({ selectType });
    };
    
    render() {
        const { numMonths, selectType } = this.state;
        return (                                            
            <div className={s.calendar}>
                <h1>Calendar</h1>
                <p>
                    <select value={numMonths} onChange={this.handleOptionNumMonths}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <select value={selectType} onChange={this.handleOptionSelectType}>
                        <option value={SELECT_TYPE_SINGLE}>Single</option>
                        <option value={SELECT_TYPE_MULTI}>Multi</option>
                        <option value={SELECT_TYPE_RANGE}>Range</option>
                    </select>
                </p>
                
                <DayPickerSelect 
                    selectType={selectType} 
                    numMonths={numMonths} 
                />
                <DayPickerInputField />
                <h1>End</h1>
            </div>
        )
    }
}

export default Calendar

