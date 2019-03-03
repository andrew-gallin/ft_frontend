import React from 'react'
import MUIPlacesAutocomplete from 'mui-places-autocomplete'
import './MaterialLocation.css'

class MaterialLocation extends React.Component {
  constructor() {
    super()

    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  onSuggestionSelected(suggestion) {
    // Add your business logic here. In this case we just log...
    //Need to get geocode too and store
    //TODO bias with searchOptions based on browser location data
    console.log('Selected suggestion:', suggestion)
    this.props.handleLocation(suggestion)
  }

  render() {
    // Use 'renderTarget' prop to render a component/target we want the suggestions to popover

    return (
    <div style={{ position: 'relative' }} className={'locationAutocomplete'}>
        <MUIPlacesAutocomplete
           onSuggestionSelected={this.onSuggestionSelected}
           renderTarget={() => <div />}
           textFieldProps={{ 
                // value: inputValue,
               fullWidth: true, 
               required: true,
               placeholder: "Where are you from?",
            }}
        />
    </div>
    )
  }
}

export default MaterialLocation